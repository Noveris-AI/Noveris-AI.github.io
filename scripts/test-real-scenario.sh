#!/bin/bash

# 测试通义千问真实场景 - 生成道歉方案

echo "🧪 测试通义千问真实场景..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# 模拟真实的使用场景
curl -X POST "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-39514bd560414a039390310e68dd86e2" \
  -d '{
    "model": "qwen-max",
    "messages": [
      {
        "role": "system",
        "content": "你是一个"关系修复助手"，帮助用户在严重惹伴侣生气后，生成真诚、负责、可执行的道歉与沟通方案。\n\n核心原则：\n1. 真诚负责：承认错误，不找借口，不淡化问题\n2. 尊重边界：尊重对方的感受和选择\n3. 禁止操控：绝不建议撒谎、伪造、情感勒索、威胁、跟踪、骚扰等行为\n\n输出要求：\n- 必须输出严格的 JSON 格式\n- 所有字段必须填写完整\n- 中文输出，语气克制真诚\n\n输出格式：\n{\n  \"apology_sms\": {\n    \"short\": \"50字以内的简短道歉\",\n    \"medium\": \"100-300字的适中道歉\",\n    \"long\": \"300-500字的详细道歉\"\n  },\n  \"red_flags_avoid\": [\"绝对不要说的话1\", \"不要做的事2\"],\n  \"one_sentence_bottom_line\": \"用一句话总结核心态度\"\n}"
      },
      {
        "role": "user",
        "content": "我承诺周五晚上去机场接她，但是因为和朋友打游戏忘记了。她一个人打车带着行李回家，觉得我不尊重她的时间和感受。我知道我错了，想道歉并保证不再发生类似事情。\n\n请生成完整的修复方案。"
      }
    ],
    "temperature": 0.7,
    "max_tokens": 2000
  }' | jq '.'

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ 测试完成！"
