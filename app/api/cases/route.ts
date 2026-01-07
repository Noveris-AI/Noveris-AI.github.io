import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/lib/supabase/server";
import { getOrCreateDbUser } from "@/lib/supabase/server";
import { generateRepairPlan, logGenerationEvent } from "@/lib/ai/generate";
import { CreateCaseSchema } from "@/lib/ai/schemas";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import prisma from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    // Auth check
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get or create DB user
    const dbUser = await getOrCreateDbUser(user.id);

    // Rate limit check
    const rateLimit = await checkRateLimit(
      dbUser.id,
      "create_case",
      RATE_LIMITS.create_case
    );

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded",
          resetAt: rateLimit.resetAt,
        },
        { status: 429 }
      );
    }

    // Parse and validate input
    const body = await request.json();
    const validationResult = CreateCaseSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Invalid input",
          details: validationResult.error.errors,
        },
        { status: 400 }
      );
    }

    const input = validationResult.data;

    // Check preferences for privacy
    const preferences = dbUser.preferences;
    const saveRawInputs = preferences?.saveRawInputs ?? false;

    // Create case
    const newCase = await prisma.case.create({
      data: {
        userId: dbUser.id,
        conflictType: input.conflictType,
        conflictDate: new Date(input.conflictDate),
        relationshipStage: input.relationshipStage,
        whatIdid: saveRawInputs ? input.whatIdid : null,
        partnerFeelings: saveRawInputs ? input.partnerFeelings : null,
        myAttitude: saveRawInputs ? input.myAttitude : null,
        redFlags: saveRawInputs ? input.redFlags : null,
        channel: input.channel,
        toneUsed: input.tone,
        generationStatus: "generating",
        generationStartedAt: new Date(),
      },
    });

    // Generate repair plan (async - don't block the response)
    generateRepairPlan(input, {
      provider: preferences?.preferredProvider || undefined,
      userId: dbUser.id,
      saveRawInputs,
    })
      .then(async (result) => {
        const startTime = Date.now();

        if (result.success && result.data) {
          // Update case with generated output
          await prisma.case.update({
            where: { id: newCase.id },
            data: {
              generatedOutput: result.data as any,
              generationStatus: "completed",
              generationCompletedAt: new Date(),
            },
          });

          // Create message records
          if (result.data.apology_sms) {
            await prisma.message.createMany({
              data: [
                {
                  caseId: newCase.id,
                  messageType: "sms_short",
                  tone: input.tone,
                  content: result.data.apology_sms.short,
                },
                {
                  caseId: newCase.id,
                  messageType: "sms_medium",
                  tone: input.tone,
                  content: result.data.apology_sms.medium,
                },
                {
                  caseId: newCase.id,
                  messageType: "sms_long",
                  tone: input.tone,
                  content: result.data.apology_sms.long,
                },
              ],
            });
          }

          // Log analytics
          await logGenerationEvent("generation_completed", {
            userId: dbUser.id,
            conflictType: input.conflictType,
            tone: input.tone,
            hasWarning: !!result.warning,
            duration: Date.now() - startTime,
            success: true,
          });
        } else {
          // Generation failed
          await prisma.case.update({
            where: { id: newCase.id },
            data: {
              generationStatus: "failed",
              generationError: result.error,
            },
          });

          await logGenerationEvent("generation_failed", {
            userId: dbUser.id,
            conflictType: input.conflictType,
            duration: Date.now() - startTime,
            success: false,
          });
        }
      })
      .catch(async (error) => {
        console.error("Generation error:", error);
        await prisma.case.update({
          where: { id: newCase.id },
          data: {
            generationStatus: "failed",
            generationError: error instanceof Error ? error.message : "Unknown error",
          },
        });
      });

    return NextResponse.json(
      {
        caseId: newCase.id,
        message: "Case created and generating...",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dbUser = await getOrCreateDbUser(user.id);

    // Get query params
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "20");
    const offset = parseInt(searchParams.get("offset") || "0");

    // Fetch user's cases
    const cases = await prisma.case.findMany({
      where: { userId: dbUser.id },
      orderBy: { createdAt: "desc" },
      take: limit,
      skip: offset,
      select: {
        id: true,
        conflictType: true,
        conflictDate: true,
        relationshipStage: true,
        generationStatus: true,
        toneUsed: true,
        createdAt: true,
        markedSent: true,
        resolvedAt: true,
      },
    });

    return NextResponse.json({ cases });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
