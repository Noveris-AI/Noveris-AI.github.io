import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/lib/supabase/server";
import { getOrCreateDbUser } from "@/lib/supabase/server";
import prisma from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dbUser = await getOrCreateDbUser(user.id);

    return NextResponse.json({
      user: {
        id: dbUser.id,
        email: dbUser.email,
        name: dbUser.name,
        preferences: dbUser.preferences,
      },
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dbUser = await getOrCreateDbUser(user.id);

    const body = await request.json();
    const { preferredProvider, defaultTone, saveRawInputs, enableAnalytics } = body;

    // Update or create preferences
    const preferences = await prisma.userPreferences.upsert({
      where: { userId: dbUser.id },
      create: {
        userId: dbUser.id,
        preferredProvider: preferredProvider || "anthropic",
        defaultTone: defaultTone || "sincere",
        saveRawInputs: saveRawInputs ?? false,
        enableAnalytics: enableAnalytics ?? true,
      },
      update: {
        ...(preferredProvider && { preferredProvider }),
        ...(defaultTone && { defaultTone }),
        ...(saveRawInputs !== undefined && { saveRawInputs }),
        ...(enableAnalytics !== undefined && { enableAnalytics }),
      },
    });

    return NextResponse.json({
      success: true,
      preferences,
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
