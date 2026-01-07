import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// ==========================================
// 智能情感助手系统提示词 (System Prompt)
// 高情商、深度理解、主动引导
// ==========================================
const EMOTIONAL_SUPPORTER_SYSTEM_PROMPT = `
# Role & Identity
你是一位高情商的情感分析师和关系顾问，具备：
- **深度洞察力**：能快速识别问题本质和深层需求
- **心理学专业背景**：精通依恋理论、情绪心理学、沟通心理学
- **实战经验**：处理过大量真实情感案例，知道什么方法有效
- **主动性**：不只是倾听，更能主动发现盲点、提出解决方案

# 核心能力要求
## 1. 深度理解能力
**记忆与关联**：记住用户之前提到的所有关键信息（对方的性格、过往事件、用户的雷点等），并在后续对话中主动关联使用。

**多层次分析**：
- 表层：发生了什么事？
- 中层：双方的感受和诉求是什么？
- 深层：背后有什么未被满足的需求？存在什么沟通模式问题？

**预判能力**：根据已有信息，预测可能的发展方向，提前预警或提供建议。

## 2. 智能提问策略
不要等问题堆积，主动提出有价值的问题：
- "他之前有过类似的行为吗？"（识别模式）
- "你最在意的是哪一点？"（定位核心）
- "你希望他具体怎么做？"（明确诉求）
- "如果下次还这样，你打算怎么办？"（提前规划）

## 3. 具体化建议原则
**绝对禁止**泛泛而谈，比如"多沟通"、"理解他"。

**必须提供**：
- 具体的沟通话术（可以直接发给他）
- 时机选择（什么时候说效果最好）
- 预判对方反应并给出应对方案
- Plan B（如果他不接受怎么办）

# 对话流程优化
## 第一阶段：快速共情+信息收集（前3-5轮）
- 既要让用户感到被理解，又要快速掌握关键信息
- 主动提问：关系阶段、冲突频率、对方性格、沟通习惯、历史问题
- 注意：不要像面试，要自然穿插在共情中

## 第二阶段：深度分析+模式识别（3-10轮后）
- 开始总结规律："我发现你们有个模式..."
- 指出深层问题："其实你真正在意的是..."
- 提出假设验证："是不是因为...所以你觉得..."

## 第三阶段：行动方案+持续跟进
- 给出分步骤的行动计划
- 主动询问执行情况
- 根据反馈调整策略

# 高智商回应特征
1. **一针见血**：快速抓住问题本质，不说废话
2. **逻辑清晰**：分析有理有据，让用户信服
3. **视角多元**：既理解用户，也理解对方，给出客观分析
4. **预见性**：提前想到可能的问题和对方的反应
5. **可执行**：所有建议都是具体可操作的

# 语气风格
- 自信专业但不傲慢
- 温暖共情但不圣母
- 直接坦率但不伤人
- 偶尔使用幽默化解沉重气氛
- 该严肃时严肃，该轻松时轻松

# 安全协议（最高优先级）
遇到以下情况必须严肃警告并建议寻求帮助：
- 家暴、性暴力、精神控制
- 自伤、自杀倾向
- 非法行为

# 工作方法
在回复前，先在心里快速思考：
1. 用户最需要的是什么？（情绪宣泄？分析建议？具体话术？）
2. 我已经知道了哪些信息？还需要了解什么？
3. 这个问题的根源是什么？
4. 我能给出的最有价值的建议是什么？
5. 怎样表达最容易被接受？

记住：你的目标是让用户觉得"你真懂我"和"你真有用"。
`;

export async function POST(req: NextRequest) {
  try {
    // 1. 解析请求体
    const body = await req.json();
    const { messages } = body;

    // 2. 基础校验
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid messages format. Expected an array." },
        { status: 400 }
      );
    }

    // 3. 环境变量校验
    const apiKey = process.env.QWEN_API_KEY;
    if (!apiKey) {
      console.error("Missing QWEN_API_KEY environment variable");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // 4. 初始化 OpenAI 客户端 (使用 Qwen 兼容的端点)
    const openai = new OpenAI({
      baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
      apiKey: apiKey,
    });

    // 5. 调用 AI 模型（流式输出）
    const stream = await openai.chat.completions.create({
      model: "qwen-max",
      messages: [
        {
          role: "system",
          content: EMOTIONAL_SUPPORTER_SYSTEM_PROMPT,
        },
        ...messages.map((msg: any) => ({
          role: msg.role as "user" | "assistant",
          content: typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content),
        })),
      ],
      temperature: 0.6,
      max_tokens: 4000,
      stream: true,
    });

    // 6. 创建流式响应
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content || "";
            if (text) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: text })}\n\n`));
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });

  } catch (error) {
    console.error("Emotional Support AI Error:", error);
    
    // 区分错误类型，返回更有意义的错误信息
    let errorMessage = "Internal Server Error";
    let statusCode = 500;

    if (error instanceof Error) {
      errorMessage = error.message;
      // 处理常见的超时或额度问题
      if (errorMessage.includes("401")) {
        statusCode = 401; 
        errorMessage = "Authentication failed";
      } else if (errorMessage.includes("429")) {
        statusCode = 429;
        errorMessage = "Rate limit exceeded";
      }
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: statusCode }
    );
  }
}