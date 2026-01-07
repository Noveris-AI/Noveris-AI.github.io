/**
 * AI Generation Module
 * Orchestrates LLM calls with safety checks and output validation
 */

import { openai, createOpenAI } from "@ai-sdk/openai";
import { streamText, generateText } from "ai";
import { RepairPlanSchema, type RepairPlan, type CreateCaseInput } from "./schemas";
import {
  SYSTEM_PROMPT,
  DEVELOPER_PROMPT,
  buildUserPrompt,
  SAFETY_CHECK_PROMPT,
  SAFETY_PROMPTS,
  buildRegeneratePrompt,
} from "./prompts";
import prisma from "@/lib/db";

// Configuration
const MAX_RETRIES = 2;
const TIMEOUT_MS = 60000; // 60 seconds

/**
 * Get AI provider based on configuration
 */
function getAIProvider(provider: string = "qwen") {
  switch (provider) {
    case "openai":
      if (!process.env.OPENAI_API_KEY) {
        throw new Error("OPENAI_API_KEY not configured");
      }
      return openai("gpt-4o");

    case "qwen":
      // 阿里云通义千问 (DashScope)
      if (!process.env.QWEN_API_KEY) {
        throw new Error("QWEN_API_KEY not configured");
      }
      const qwenClient = createOpenAI({
        baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
        apiKey: process.env.QWEN_API_KEY,
      });
      return qwenClient("qwen-max");

    default:
      // Default to first available provider
      if (process.env.QWEN_API_KEY) {
        const qwenClient = createOpenAI({
          baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
          apiKey: process.env.QWEN_API_KEY,
        });
        return qwenClient("qwen-max");
      }
      if (process.env.OPENAI_API_KEY) {
        return openai("gpt-4o");
      }
      throw new Error("No AI provider API key configured. Please set QWEN_API_KEY or OPENAI_API_KEY");
  }
}

/**
 * Safety check for user input
 * Detects attempts to generate manipulative/harmful content
 */
async function safetyCheck(input: CreateCaseInput): Promise<{
  safe: boolean;
  reason?: string;
  warning?: string;
}> {
  const textToCheck = [
    input.whatIdid,
    input.partnerFeelings,
    input.myAttitude,
    input.redFlags || "",
  ].join(" ").toLowerCase();

  // Basic keyword detection (can be enhanced with ML classifier)
  const harmfulPatterns = [
    { pattern: /让.*内疚|让.*难过|让.*害怕/, reason: "试图让对方产生负面情绪" },
    { pattern: /假装.*改变|装.*好/, reason: "建议假装改变而非真诚修复" },
    { pattern: /堵.*门口|去.*楼下|一直.*等/, reason: "可能构成跟踪或骚扰" },
    { pattern: /威胁|恐吓|不听.*就/, reason: "包含威胁性语言" },
    { pattern: /骗.*一下|隐瞒|不说.*实话/, reason: "建议撒谎或隐瞒" },
    { pattern: /冷.*她|不理她|惩罚/, reason: "建议冷暴力或报复" },
    { pattern: /让她.*求.*我|让她.*后悔/, reason: "试图操控或报复" },
  ];

  for (const { pattern, reason } of harmfulPatterns) {
    if (pattern.test(textToCheck)) {
      return {
        safe: false,
        reason: `输入内容包含不当意图：${reason}`,
        warning: "本工具旨在帮助真诚道歉，不支持操控性或伤害性行为。",
      };
    }
  }

  // Check for sensitive situations that need warnings
  if (textToCheck.includes("自残") || textToCheck.includes("自杀") || textToCheck.includes("伤害自己")) {
    return {
      safe: true,
      warning: SAFETY_PROMPTS.self_harm,
    };
  }

  if (textToCheck.includes("暴力") || textToCheck.includes("打") || textToCheck.includes("威胁")) {
    return {
      safe: true,
      warning: SAFETY_PROMPTS.violence,
    };
  }

  return { safe: true };
}

/**
 * Generate repair plan from user input
 */
export async function generateRepairPlan(
  input: CreateCaseInput,
  options: {
    provider?: string;
    userId?: string;
    saveRawInputs?: boolean;
  } = {}
): Promise<{ success: boolean; data?: RepairPlan; error?: string; warning?: string }> {
  try {
    // Safety check first
    const safetyResult = await safetyCheck(input);
    if (!safetyResult.safe) {
      return {
        success: false,
        error: safetyResult.reason,
        warning: safetyResult.warning,
      };
    }

    const provider = options.provider || process.env.AI_PROVIDER || "anthropic";
    const model = getAIProvider(provider);

    // Build prompts
    const userPrompt = buildUserPrompt({
      conflictType: input.conflictType,
      conflictDate: input.conflictDate,
      relationshipStage: input.relationshipStage,
      whatIdid: input.whatIdid,
      partnerFeelings: input.partnerFeelings,
      myAttitude: input.myAttitude,
      redFlags: input.redFlags,
      channel: input.channel,
      tone: input.tone,
    });

    // Generate with retry logic
    let lastError: Error | null = null;

    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
      try {
        const result = await generateText({
          model,
          system: `${SYSTEM_PROMPT}\n\n${DEVELOPER_PROMPT}`,
          prompt: userPrompt,
          temperature: 0.7,
        });

        // Parse and validate output
        const parsedOutput = JSON.parse(result.text);
        const validatedOutput = RepairPlanSchema.parse(parsedOutput);

        // Success!
        return {
          success: true,
          data: validatedOutput,
          warning: safetyResult.warning,
        };
      } catch (parseError) {
        lastError = parseError as Error;
        console.error(`Parse/validation error (attempt ${attempt + 1}):`, parseError);

        // If it's the last attempt, fail
        if (attempt === MAX_RETRIES - 1) {
          break;
        }

        // Otherwise retry with error feedback
        // (In production, you might want to adjust the prompt based on the error)
      }
    }

    // All retries failed
    return {
      success: false,
      error: `生成失败：输出格式不符合要求。${lastError?.message || ""}`,
    };
  } catch (error) {
    console.error("Generation error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "未知错误",
    };
  }
}

/**
 * Stream repair plan generation (for real-time UI updates)
 */
export async function streamRepairPlan(
  input: CreateCaseInput,
  onChunk: (chunk: string) => void,
  options: {
    provider?: string;
    userId?: string;
  } = {}
): Promise<{ success: boolean; data?: RepairPlan; error?: string }> {
  try {
    // Safety check first (non-streaming)
    const safetyResult = await safetyCheck(input);
    if (!safetyResult.safe) {
      return {
        success: false,
        error: safetyResult.reason,
      };
    }

    const provider = options.provider || process.env.AI_PROVIDER || "anthropic";
    const model = getAIProvider(provider);

    const userPrompt = buildUserPrompt({
      conflictType: input.conflictType,
      conflictDate: input.conflictDate,
      relationshipStage: input.relationshipStage,
      whatIdid: input.whatIdid,
      partnerFeelings: input.partnerFeelings,
      myAttitude: input.myAttitude,
      redFlags: input.redFlags,
      channel: input.channel,
      tone: input.tone,
    });

    let fullText = "";

    const result = await streamText({
      model,
      system: `${SYSTEM_PROMPT}\n\n${DEVELOPER_PROMPT}`,
      prompt: userPrompt,
      temperature: 0.7,
    });

    // Consume the stream
    for await (const chunk of result.textStream) {
      fullText += chunk;
      onChunk(chunk);
    }

    // Parse and validate
    const parsedOutput = JSON.parse(fullText);
    const validatedOutput = RepairPlanSchema.parse(parsedOutput);

    return {
      success: true,
      data: validatedOutput,
    };
  } catch (error) {
    console.error("Stream generation error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "未知错误",
    };
  }
}

/**
 * Regenerate with feedback
 */
export async function regenerateRepairPlan(
  caseId: string,
  feedback: string,
  tone?: string,
  options: {
    provider?: string;
    userId?: string;
  } = {}
): Promise<{ success: boolean; data?: RepairPlan; error?: string }> {
  try {
    // Fetch original case
    const originalCase = await prisma.case.findUnique({
      where: { id: caseId },
    });

    if (!originalCase) {
      return {
        success: false,
        error: "案例不存在",
      };
    }

    if (!originalCase.generatedOutput) {
      return {
        success: false,
        error: "原始生成内容不存在",
      };
    }

    const provider = options.provider || process.env.AI_PROVIDER || "anthropic";
    const model = getAIProvider(provider);

    const userPrompt = buildRegeneratePrompt(
      originalCase.generatedOutput,
      feedback,
      tone
    );

    const result = await generateText({
      model,
      system: `${SYSTEM_PROMPT}\n\n${DEVELOPER_PROMPT}`,
      prompt: userPrompt,
      temperature: 0.7,
    });

    const parsedOutput = JSON.parse(result.text);
    const validatedOutput = RepairPlanSchema.parse(parsedOutput);

    // Update case with new output
    await prisma.case.update({
      where: { id: caseId },
      data: {
        generatedOutput: validatedOutput,
        toneUsed: tone || originalCase.toneUsed,
        generationStatus: "completed",
        generationCompletedAt: new Date(),
      },
    });

    return {
      success: true,
      data: validatedOutput,
    };
  } catch (error) {
    console.error("Regeneration error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "未知错误",
    };
  }
}

/**
 * Mask sensitive content for logging
 */
export function maskSensitiveContent(text: string, keepLength: number = 50): string {
  if (!text) return "";
  if (text.length <= keepLength) return text;
  return text.substring(0, keepLength) + "...";
}

/**
 * Log generation event (anonymized)
 */
export async function logGenerationEvent(
  eventType: string,
  metadata: {
    userId?: string;
    conflictType?: string;
    tone?: string;
    hasWarning?: boolean;
    duration?: number;
    success?: boolean;
  }
) {
  try {
    if (process.env.ENABLE_ANALYTICS === "false") return;

    await prisma.analyticsEvent.create({
      data: {
        eventType,
        metadata,
      },
    });
  } catch (error) {
    console.error("Failed to log analytics:", error);
    // Don't throw - analytics failures shouldn't break the app
  }
}
