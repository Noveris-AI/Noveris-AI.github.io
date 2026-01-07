import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/lib/supabase/server";
import { getOrCreateDbUser } from "@/lib/supabase/server";
import prisma from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dbUser = await getOrCreateDbUser(user.id);

    // Fetch case
    const testCase = await prisma.case.findFirst({
      where: {
        id: params.id,
        userId: dbUser.id,
      },
      include: {
        messages: true,
        notes: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!testCase) {
      return NextResponse.json({ error: "Case not found" }, { status: 404 });
    }

    return NextResponse.json({ case: testCase });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dbUser = await getOrCreateDbUser(user.id);

    // Verify ownership
    const testCase = await prisma.case.findFirst({
      where: {
        id: params.id,
        userId: dbUser.id,
      },
    });

    if (!testCase) {
      return NextResponse.json({ error: "Case not found" }, { status: 404 });
    }

    // Parse update data
    const body = await request.json();
    const { markedSent, resolvedAt, feedbackNote } = body;

    // Update case
    const updatedCase = await prisma.case.update({
      where: { id: params.id },
      data: {
        ...(markedSent !== undefined && { markedSent }),
        ...(resolvedAt !== undefined && { resolvedAt: resolvedAt ? new Date() : null }),
        ...(feedbackNote !== undefined && { feedbackNote }),
      },
    });

    return NextResponse.json({ case: updatedCase });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dbUser = await getOrCreateDbUser(user.id);

    // Verify ownership
    const testCase = await prisma.case.findFirst({
      where: {
        id: params.id,
        userId: dbUser.id,
      },
    });

    if (!testCase) {
      return NextResponse.json({ error: "Case not found" }, { status: 404 });
    }

    // Delete case (cascade will delete messages and notes)
    await prisma.case.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Case deleted" });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
