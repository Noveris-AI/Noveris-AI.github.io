# 阿里云通义千问配置指南

本文档介绍如何配置和使用阿里云通义千问作为 AI 提供商。

## 📋 为什么选择通义千问？

✅ **性价比高** - 相比 Claude 和 GPT-4，价格更优惠
✅ **中文优化** - 针对中文场景深度优化
✅ **性能优秀** - Qwen-Max 在多项评测中表现优异
✅ **OpenAI 兼容** - 兼容 OpenAI API 格式，易于集成
✅ **国内访问** - 无需翻墙，稳定快速

## 🚀 快速开始

### 1. 获取 API Key

1. 访问 [阿里云百炼平台](https://bailian.console.aliyun.com/)
2. 登录阿里云账号（如果没有，先注册）
3. 进入"API-KEY 管理"页面
4. 创建新的 API Key
5. 复制保存 API Key（格式：`sk-xxxxxxxxxxxxx`）

### 2. 配置环境变量

在项目根目录的 `.env.local` 文件中添加：

```env
QWEN_API_KEY="sk-39514bd560414a039390310e68dd86e2"
```

### 3. 设置默认提供商（可选）

在用户设置页面选择"阿里云通义千问"作为默认 AI 提供商，或者在创建环境变量时设置：

```env
# 在 .env.local 中添加
AI_PROVIDER="qwen"
```

### 4. 测试配置

```bash
# 启动开发服务器
pnpm dev

# 访问 http://localhost:3000
# 创建一个测试案例，验证 AI 生成是否正常
```

## 🎯 可用模型

本项目默认使用 **Qwen-Max**（通义千问最大模型）。

其他可选模型（需修改代码）：
- `qwen-max` - 最强性能模型（默认）
- `qwen-plus` - 性能平衡模型
- `qwen-turbo` - 快速响应模型
- `qwen-long` - 长文本处理模型

### 切换模型

编辑 `lib/ai/generate.ts`：

```typescript
case "qwen":
  const qwenClient = createOpenAI({
    baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
    apiKey: process.env.QWEN_API_KEY,
  });
  return qwenClient("qwen-turbo"); // 改为其他模型
```

## 💰 价格对比（参考）

| 模型 | 输入价格 | 输出价格 |
|------|----------|----------|
| Qwen-Max | ¥0.02/1K tokens | ¥0.06/1K tokens |
| Qwen-Plus | ¥0.004/1K tokens | ¥0.012/1K tokens |
| Qwen-Turbo | ¥0.0008/1K tokens | ¥0.002/1K tokens |
| Claude 3.5 Sonnet | $0.003/1K tokens | $0.015/1K tokens |
| GPT-4o | $0.005/1K tokens | $0.015/1K tokens |

> 价格仅供参考，请以官方定价为准。

## 🔧 高级配置

### 自定义 Base URL

如果需要使用代理或自定义端点：

```env
QWEN_API_BASE_URL="https://your-proxy.com/v1"
QWEN_API_KEY="sk-xxx"
```

修改 `lib/ai/generate.ts`：

```typescript
case "qwen":
  const qwenClient = createOpenAI({
    baseURL: process.env.QWEN_API_BASE_URL || "https://dashscope.aliyuncs.com/compatible-mode/v1",
    apiKey: process.env.QWEN_API_KEY,
  });
  return qwenClient("qwen-max");
```

### 设置参数限制

在 `lib/ai/generate.ts` 中调整：

```typescript
const result = await generateText({
  model: getAIProvider(provider),
  system: `${SYSTEM_PROMPT}\n\n${DEVELOPER_PROMPT}`,
  prompt: userPrompt,
  temperature: 0.7,
  maxTokens: 4000,  // Qwen-Max 最大支持 30K tokens
  timeout: TIMEOUT_MS,
});
```

## 🐛 故障排查

### 问题 1：API Key 无效

**错误信息**：`QWEN_API_KEY not configured` 或 `401 Unauthorized`

**解决方案**：
1. 检查 `.env.local` 文件是否存在 `QWEN_API_KEY`
2. 确认 API Key 格式正确（`sk-` 开头）
3. 验证 API Key 在阿里云控制台是否有效
4. 重启开发服务器

### 问题 2：请求超时

**错误信息**：`Request timeout` 或 `504 Gateway Timeout`

**解决方案**：
1. 检查网络连接
2. 确认可以访问 `dashscope.aliyuncs.com`
3. 增加超时时间（修改 `TIMEOUT_MS`）
4. 如果使用代理，检查代理配置

### 问题 3：配额不足

**错误信息**：`Quota exceeded` 或 `429 Too Many Requests`

**解决方案**：
1. 检查阿里云账户余额
2. 确认 API 调用额度是否用尽
3. 在阿里云控制台购买更多配额

### 问题 4：内容审核失败

**错误信息**：`Content moderation violation`

**解决方案**：
1. 检查输入内容是否包含敏感词
2. 联系阿里云客服申请白名单
3. 调整 Prompt 避免触发审核规则

## 📊 监控与日志

### 查看调用统计

在阿里云控制台的"用量统计"页面查看：
- API 调用次数
- Token 使用量
- 费用统计

### 启用详细日志

在 `.env.local` 中添加：

```env
DEBUG="ai:*"
```

## 🔒 安全最佳实践

1. **不要泄露 API Key**
   - ✅ 将 `.env.local` 添加到 `.gitignore`
   - ✅ 使用环境变量管理密钥
   - ❌ 不要将 API Key 提交到代码仓库

2. **设置访问权限**
   - 在阿里云控制台设置 IP 白名单
   - 限制 API Key 的使用权限
   - 定期轮换 API Key

3. **监控异常使用**
   - 设置告警阈值
   - 定期检查账单
   - 记录 API 调用日志

## 📚 相关资源

- [阿里云百炼平台](https://bailian.console.aliyun.com/)
- [通义千问 API 文档](https://help.aliyun.com/zh/dashscope/developer-reference/api-details)
- [价格说明](https://help.aliyun.com/zh/dashscope/pricing/overview)
- [SDK 和工具](https://help.aliyun.com/zh/dashscope/developer-reference/quick-start)

## 🆘 获取帮助

如果遇到问题：

1. 查看 [阿里云帮助文档](https://help.aliyun.com/zh/dashscope/)
2. 提交 [GitHub Issue](https://github.com/your-repo/issues)
3. 联系阿里云技术支持

---

**祝使用愉快！** 🎉
