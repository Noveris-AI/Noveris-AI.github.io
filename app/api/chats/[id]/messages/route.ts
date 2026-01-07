import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

// POST /api/chats/[id]/messages - 保存消息到会话
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const body = await req.json();
    const { role, content } = body;

    // 保存消息
    const message = await prisma.chatMessage.create({
      data: {
        sessionId: id,
        role,
        content,
      },
    });

    // 更新会话的预览和更新时间
    await prisma.chatSession.update({
      where: { id: id },
      data: {
        preview: content.slice(0, 100), // 保存前100个字符作为预览
        updatedAt: new Date(),
      },
    });

    // 如果是第一条用户消息，更新会话标题
    if (role === "user") {
      const messageCount = await prisma.chatMessage.count({
        where: { sessionId: id },
      });

      if (messageCount === 1) {
        await prisma.chatSession.update({
          where: { id: id },
          data: {
            title: content.slice(0, 30) + (content.length > 30 ? "..." : ""),
          },
        });
      }
    }

    return NextResponse.json({ message }, { status: 201 });
  } catch (error) {
    console.error("Error saving message:", error);
    return NextResponse.json(
      { error: "Failed to save message" },
      { status: 500 }
    );
  }
}
