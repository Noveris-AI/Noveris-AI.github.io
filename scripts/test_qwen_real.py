#!/usr/bin/env python3
"""
测试通义千问真实场景
"""

import requests
import json

# API 配置
API_URL = "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions"
API_KEY = "sk-39514bd560414a039390310e68dd86e2"

# 测试场景
print("🧪 测试通义千问 - 真实道歉场景生成")
print("=" * 60)

# 请求数据
request_data = {
    "model": "qwen-max",
    "messages": [
        {
            "role": "system",
            "content": """你是关系修复助手。帮助用户生成真诚、负责的道歉方案。

原则：
1. 真诚承认错误，不找借口
2. 尊重对方感受
3. 禁止操控性话术

必须返回严格的JSON格式，包含：
{
  "apology_sms": {
    "short": "50字内简短道歉",
    "medium": "100-300字适中道歉",
    "long": "300-500字详细道歉"
  },
  "red_flags_avoid": ["不要说的话1", "不要做的事2"],
  "one_sentence_bottom_line": "一句话总结"
}"""
        },
        {
            "role": "user",
            "content": """场景：我承诺周五晚上去机场接女朋友，但因为和朋友打游戏忘记了。她一个人打车带着行李回家，很生气，觉得我不尊重她的时间和感受。我知道错了，想道歉并保证不再发生类似事情。

请生成完整的修复方案（JSON格式）。"""
        }
    ],
    "temperature": 0.7,
    "max_tokens": 2000
}

# 发送请求
print("📤 发送请求到通义千问...")
print()

try:
    response = requests.post(
        API_URL,
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {API_KEY}"
        },
        json=request_data,
        timeout=60
    )

    # 检查响应
    if response.status_code == 200:
        result = response.json()

        # 提取内容
        content = result.get("choices", [{}])[0].get("message", {}).get("content", "")
        usage = result.get("usage", {})

        print("✅ 生成成功！")
        print()
        print("📝 生成的道歉方案：")
        print("-" * 60)

        # 尝试解析 JSON
        try:
            parsed = json.loads(content)
            print(json.dumps(parsed, ensure_ascii=False, indent=2))
        except:
            print(content)

        print("-" * 60)
        print()
        print(f"📊 Token 使用:")
        print(f"   输入: {usage.get('prompt_tokens', 0)} tokens")
        print(f"   输出: {usage.get('completion_tokens', 0)} tokens")
        print(f"   总计: {usage.get('total_tokens', 0)} tokens")
        print()
        print("✨ 通义千问工作正常！")

    else:
        print(f"❌ 错误: {response.status_code}")
        print(response.text)

except Exception as e:
    print(f"❌ 异常: {e}")
