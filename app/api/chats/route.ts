import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

// GET /api/chats - 获取所有聊天会话
export async function GET() {
  try {
    const sessions = await prisma.chatSession.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      take: 50, // 限制返回最近50个会话
      include: {
        _count: {
          select: { messages: true },
        },
      },
    });

    return NextResponse.json({ sessions });
  } catch (error) {
    console.error("Error fetching chat sessions:", error);
    return NextResponse.json(
      { error: "Failed to fetch chat sessions" },
      { status: 500 }
    );
  }
}

// POST /api/chats - 创建新聊天会话
export async function POST() {
  try {
    const newSession = await prisma.chatSession.create({
      data: {
        title: "新对话",
      },
    });

    return NextResponse.json({ session: newSession }, { status: 201 });
  } catch (error) {
    console.error("Error creating chat session:", error);
    return NextResponse.json(
      { error: "Failed to create chat session" },
      { status: 500 }
    );
  }
}
