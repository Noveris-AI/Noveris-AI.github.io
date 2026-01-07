# Vercel 部署指南

## 📦 部署步骤

### 1. 准备 GitHub 仓库

确保代码已推送到 GitHub：
```bash
cd "/Users/passion/Documents/Project/To appease one's girlfriend"

# 初始化 Git（如果还没有）
git init

# 添加远程仓库
git remote add origin https://github.com/Noveris-AI/Noveris-AI.github.io.git

# 添加所有文件
git add .

# 提交
git commit -m "feat: 情感助手 - AI驱动的情感支持平台"

# 推送
git push -u origin main
```

### 2. 在 Vercel 创建项目

1. 访问 **https://vercel.com**
2. 使用 GitHub 账号登录
3. 点击 "Add New Project"
4. 导入你的 GitHub 仓库：`Noveris-AI/Noveris-AI.github.io`

### 3. 配置项目

在 Vercel 项目设置中：

#### **Framework Preset**: Next.js

#### **Build & Development Settings**:
- Build Command: `pnpm build`
- Output Directory: `.next`
- Install Command: `pnpm install`
- Dev Command: `pnpm dev`

#### **Environment Variables**（必须配置）:

在 Settings → Environment Variables 中添加：

```bash
# 必需的环境变量
QWEN_API_KEY=你的_通义千问_API_Key
DATABASE_URL=你的_数据库连接字符串

# 可选环境变量
NEXT_PUBLIC_SUPABASE_URL=你的_Supabase_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的_Supabase_Anon_Key
NEXTAUTH_SECRET=随机生成的密钥

# 其他 AI Provider（可选）
ANTHROPIC_API_KEY=你的_Anthropic_Key
OPENAI_API_KEY=你的_OpenAI_Key
```

### 4. 数据库配置

#### 选项 A：使用 Vercel Postgres（推荐）
1. 在 Vercel 项目中，进入 "Storage" 标签
2. 点击 "Create Database"
3. 选择 "Postgres" 并创建
4. Vercel 会自动设置 `DATABASE_URL`

#### 选项 B：使用 Supabase
1. 访问 https://supabase.com
2. 创建新项目
3. 获取数据库连接字符串
4. 在 Prisma Schema 中配置

#### 选项 C：使用现有 PostgreSQL
使用你自己的数据库连接字符串

### 5. 部署

1. 点击 "Deploy" 按钮
2. Vercel 会自动构建和部署
3. 几分钟后，你的应用将在 `https://your-project.vercel.app` 上线

### 6. 配置自定义域名（可选）

1. 在 Vercel 项目设置中，进入 "Domains"
2. 添加你的域名
3. 按照提示配置 DNS

## 🔧 环境变量说明

### 必需变量

| 变量名 | 说明 | 获取方式 |
|--------|------|----------|
| `QWEN_API_KEY` | 阿里云通义千问 API Key | https://dashscope.aliyuncs.com |
| `DATABASE_URL` | PostgreSQL 数据库连接 | Vercel/Supabase/自托管 |

### 可选变量

| 变量名 | 说明 |
|--------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 项目 URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase 匿名密钥 |
| `NEXTAUTH_SECRET` | NextAuth 密钥 |
| `ANTHROPIC_API_KEY` | Anthropic Claude API Key |
| `OPENAI_API_KEY` | OpenAI API Key |

## 📊 数据库设置

### 首次部署后运行迁移

在 Vercel 部署完成后，你需要初始化数据库：

1. 在本地运行：
```bash
pnpm prisma db push
```

2. 或者在 Vercel 项目中设置环境变量后重新部署

### 数据库管理

- **Prisma Studio**（本地）: `pnpm db:studio`
- **Supabase Dashboard**（在线）: 访问你的 Supabase 项目

## 🚀 部署后检查清单

- [ ] 访问部署的 URL，确认网站可访问
- [ ] 测试聊天功能是否正常
- [ ] 检查数据库连接是否正常
- [ ] 验证环境变量是否正确配置
- [ ] 测试创建新会话功能
- [ ] 测试消息持久化

## 🔄 自动部署

配置完成后，每次推送代码到 GitHub main 分支，Vercel 会自动重新部署。

## 💡 常见问题

### 1. 构建失败
- 检查环境变量是否配置完整
- 查看 Vercel 构建日志

### 2. 数据库连接失败
- 确认 `DATABASE_URL` 格式正确
- 检查数据库是否允许 Vercel IP 访问

### 3. API 调用失败
- 确认 `QWEN_API_KEY` 有效
- 检查 API Key 额度是否用完

## 📈 监控和日志

- Vercel Dashboard: 查看部署历史和日志
- Analytics: 查看访问统计
- Logs: 查看错误和调试信息

## 🔐 安全建议

1. **永远不要**将 `.env` 文件提交到 Git
2. 使用 Vercel 的环境变量管理敏感信息
3. 定期更新 API Key
4. 使用强密码和随机密钥

## 📞 支持

- Vercel 文档: https://vercel.com/docs
- Next.js 文档: https://nextjs.org/docs
- Prisma 文档: https://www.prisma.io/docs
