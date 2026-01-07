import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/lib/supabase/server";
import { getOrCreateDbUser } from "@/lib/supabase/server";
import { regenerateRepairPlan, logGenerationEvent } from "@/lib/ai/generate";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import prisma from "@/lib/db";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dbUser = await getOrCreateDbUser(user.id);
    if (!dbUser) {
      return NextResponse.json({ error: "Failed to get user" }, { status: 500 });
    }

    // Fetch case
    const testCase = await prisma.case.findFirst({
      where: {
        id: id,
        userId: dbUser.id,
      },
    });

    if (!testCase) {
      return NextResponse.json({ error: "Case not found" }, { status: 404 });
    }

    // Rate limit check
    const rateLimit = await checkRateLimit(
      dbUser.id,
      "regenerate",
      RATE_LIMITS.regenerate
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

    // Parse request body
    const body = await request.json();
    const { tone, feedback } = body;

    // Update status
    await prisma.case.update({
      where: { id: id },
      data: {
        generationStatus: "generating",
        generationStartedAt: new Date(),
      },
    });

    // Regenerate
    const startTime = Date.now();
    const result = await regenerateRepairPlan(
      id,
      feedback || "",
      tone,
      {
        provider: dbUser.preferences?.preferredProvider || undefined,
        userId: dbUser.id,
      }
    );

    if (result.success && result.data) {
      await logGenerationEvent("regeneration_completed", {
        userId: dbUser.id,
        conflictType: testCase.conflictType,
        tone: tone || testCase.toneUsed,
        duration: Date.now() - startTime,
        success: true,
      });

      return NextResponse.json({
        success: true,
        data: result.data,
      });
    } else {
      await logGenerationEvent("regeneration_failed", {
        userId: dbUser.id,
        conflictType: testCase.conflictType,
        duration: Date.now() - startTime,
        success: false,
      });

      return NextResponse.json(
        {
          error: result.error || "Regeneration failed",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
