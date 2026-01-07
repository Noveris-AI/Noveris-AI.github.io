import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create a demo user (for development/testing)
  const demoUser = await prisma.user.upsert({
    where: { supabaseId: "demo-user-id" },
    update: {},
    create: {
      supabaseId: "demo-user-id",
      email: "demo@example.com",
      name: "Demo User",
      preferences: {
        create: {
          preferredProvider: "qwen",  // 默认使用阿里云通义千问
          defaultTone: "sincere",
          saveRawInputs: false,
          enableAnalytics: true,
        },
      },
    },
  });

  console.log("Created demo user:", demoUser.email);

  // Create a sample case (for UI testing)
  const sampleCase = await prisma.case.create({
    data: {
      userId: demoUser.id,
      conflictType: "broken_promise",
      conflictDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      relationshipStage: "dating",
      whatIdid: "I promised to pick her up from the airport but forgot because I was gaming with friends.",
      partnerFeelings: "She feels unimportant and that I don't respect her time. She had to take a taxi alone with luggage.",
      myAttitude: "I know I messed up. I want to apologize sincerely and make it up to her.",
      channel: "text",
      generationStatus: "completed",
      generatedOutput: {
        apology_sms: {
          short: "对不起，让你失望了。我的错。",
          medium: "真的很抱歉让你一个人从机场回来。我不应该忘记接你，这是我的责任。我想好好道歉。",
          long: "对不起，让你失望了。我承诺去接你却忘记了，让你一个人打车带着行李回来，这真的很不应该。你的时间和感受很重要，我不应该这样忽视。我想承担这个错误，并且以后不会再发生类似的事。",
        },
        call_outline: [
          "开场：直接道歉，不找借口",
          "承认：承认错误及其影响",
          "倾听：给她表达感受的空间",
          "解决：提出具体补救措施",
          "收尾：尊重她的感受和决定",
        ],
        red_flags_avoid: [
          "不要说'我太忙了'作为借口",
          "不要说'反正你也打车回来了'",
          "不要马上转移话题",
        ],
        one_sentence_bottom_line: "我承认错误，承担责任，尊重你的感受。",
      },
      toneUsed: "sincere",
      messages: {
        create: [
          {
            messageType: "sms_short",
            tone: "sincere",
            content: "对不起，让你失望了。我的错。",
          },
          {
            messageType: "sms_medium",
            tone: "sincere",
            content: "真的很抱歉让你一个人从机场回来。我不应该忘记接你，这是我的责任。我想好好道歉。",
          },
        ],
      },
    },
  });

  console.log("Created sample case:", sampleCase.id);

  console.log("Seed completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
