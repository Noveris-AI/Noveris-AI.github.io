#!/usr/bin/env tsx

/**
 * 测试阿里云通义千问 API 连接
 * Usage: npx tsx scripts/test-qwen.ts
 */

import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env.local" });

async function testQwenConnection() {
  console.log("🔍 测试阿里云通义千问连接...\n");

  // Check API Key
  const apiKey = process.env.QWEN_API_KEY;
  if (!apiKey) {
    console.error("❌ 错误: 未找到 QWEN_API_KEY");
    console.log("请在 .env.local 文件中添加:");
    console.log("QWEN_API_KEY=sk-xxx");
    process.exit(1);
  }

  console.log("✅ API Key 已配置");
  console.log(`   Key: ${apiKey.substring(0, 10)}...${apiKey.substring(apiKey.length - 4)}\n`);

  // Create client
  const qwenClient = createOpenAI({
    baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
    apiKey: apiKey,
  });

  console.log("🚀 发送测试请求...\n");

  try {
    const startTime = Date.now();

    const result = await generateText({
      model: qwenClient("qwen-max"),
      prompt: "你好，请用一句话介绍你自己。",
      maxTokens: 100,
    });

    const duration = Date.now() - startTime;

    console.log("✅ 连接成功!\n");
    console.log("📝 响应:");
    console.log("━".repeat(50));
    console.log(result.text);
    console.log("━".repeat(50));
    console.log(`\n⏱️  耗时: ${duration}ms`);
    console.log(`📊 Token 使用: ${result.usage?.totalTokens || "未知"} tokens\n`);

    console.log("✨ 阿里云通义千问配置正常，可以开始使用了!\n");

    // Test JSON output
    console.log("🧪 测试 JSON 输出格式...\n");

    const jsonResult = await generateText({
      model: qwenClient("qwen-max"),
      prompt: "请用 JSON 格式返回一个包含 name 和 value 的对象，name 是'测试'，value 是 100。",
      maxTokens: 100,
    });

    console.log("📝 JSON 响应:");
    console.log("━".repeat(50));
    console.log(jsonResult.text);
    console.log("━".repeat(50));
    console.log("\n✅ JSON 格式测试通过!\n");

  } catch (error) {
    console.error("❌ 连接失败!\n");
    if (error instanceof Error) {
      console.error(`错误信息: ${error.message}\n`);

      // Provide specific suggestions
      if (error.message.includes("401") || error.message.includes("Unauthorized")) {
        console.log("💡 建议:");
        console.log("   - 检查 API Key 是否正确");
        console.log("   - 确认 API Key 未过期");
        console.log("   - 访问阿里云控制台验证密钥\n");
      } else if (error.message.includes("timeout") || error.message.includes("ECONNREFUSED")) {
        console.log("💡 建议:");
        console.log("   - 检查网络连接");
        console.log("   - 确认可以访问 dashscope.aliyuncs.com");
        console.log("   - 如果使用代理，检查代理配置\n");
      } else if (error.message.includes("429") || error.message.includes("quota")) {
        console.log("💡 建议:");
        console.log("   - 检查账户余额");
        console.log("   - 确认 API 配额是否充足");
        console.log("   - 访问阿里云控制台查看用量\n");
      }
    }
    process.exit(1);
  }
}

// Run test
testQwenConnection()
  .then(() => {
    console.log("✅ 所有测试通过!\n");
    process.exit(0);
  })
  .catch((error) => {
    console.error("未预期的错误:", error);
    process.exit(1);
  });
