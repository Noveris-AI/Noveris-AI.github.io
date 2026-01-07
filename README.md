# 💕 情感助手 - AI驱动的情感支持平台

一个智能的情感支持聊天机器人，使用阿里云通义千问（Qwen）作为核心AI引擎，为用户提供情感咨询和沟通建议。

## ✨ 主要功能

- 🤖 **智能对话**：基于深度学习的情感分析和建议
- 💾 **持久化存储**：完整的对话历史和会话管理
- 🔄 **流式输出**：实时打字机效果的AI回复
- 📱 **响应式设计**：完美适配手机和电脑
- 🌙 **深色模式**：舒适的视觉体验
- 💬 **多会话管理**：ChatGPT风格的侧边栏历史记录

## 🏗️ 技术栈

- **前端**: Next.js 15 + React 19 + TailwindCSS
- **UI组件**: shadcn/ui
- **AI引擎**: 阿里云通义千问 (Qwen-Max)
- **数据库**: PostgreSQL + Prisma ORM
- **部署**: Vercel (推荐) 或 Docker

## 🚀 快速开始

### 本地开发

1. **克隆项目**
```bash
git clone https://github.com/Noveris-AI/Noveris-AI.github.io.git
cd Noveris-AI.github.io
```

2. **安装依赖**
```bash
pnpm install
```

3. **配置环境变量**
```bash
cp .env.example .env.local
```

编辑 `.env.local`，填入你的 API Key：
```bash
QWEN_API_KEY=你的_qwen_api_key
DATABASE_URL=postgresql://user:password@localhost:5432/relationship_repair
```

4. **启动数据库**（使用 Docker）
```bash
cd deploy/docker-compose
docker-compose up -d
```

5. **推送数据库 Schema**
```bash
pnpm prisma db push
```

6. **启动开发服务器**
```bash
pnpm dev
```

访问 http://localhost:8888

## 📁 项目结构

```
relationship-repair-assistant/
├── app/                          # Next.js App Router
│   ├── api/                      # API 路由
│   │   ├── chat/                # 聊天 API (流式输出)
│   │   └── chats/               # 会话管理 API
│   ├── chat/                    # 聊天页面
│   ├── globals.css              # 全局样式
│   ├── layout.tsx               # 根布局
│   └── page.tsx                 # 首页
├── components/                   # React 组件
│   └── ui/                      # shadcn/ui 组件
├── lib/                         # 核心库
│   ├── ai/                      # AI 相关
│   ├── db.ts                    # Prisma 客户端
│   └── supabase/                # Supabase 集成
├── prisma/                      # 数据库 Schema
│   └── schema.prisma            # 数据模型
└── deploy/                      # 部署配置
    └── docker-compose.yml       # Docker 配置
```
│   ├── schema.prisma            # 数据库模型
│   └── seed.ts                  # 种子数据
├── deploy/                      # 部署配置和脚本 ⭐ NEW
│   ├── docker-compose.yml       # 完整服务编排
│   ├── postgres/                # PostgreSQL 配置
│   │   ├── config/              # postgresql.conf
│   │   └── data/                # 数据库数据（运行时生成）
│   ├── init-scripts/            # 数据库初始化脚本
│   ├── scripts/                 # 运维脚本
│   │   ├── backup.sh            # 备份数据库
│   │   ├── restore.sh           # 恢复数据库
│   │   ├── health-check.sh      # 健康检查
│   │   └── monitor.sh           # 实时监控
│   └── README.md                # 部署文档
├── middleware.ts                # Next.js 中间件
├── next.config.ts              # Next.js 配置
├── tailwind.config.ts          # Tailwind 配置
├── tsconfig.json               # TypeScript 配置
├── package.json                # 依赖
├── .env.example                # 环境变量模板
├── Dockerfile                  # Docker 配置
├── docker-compose.yml          # 快速启动配置（根目录）
├── README.md                   # 本文件
```

## 🚀 快速开始

### 前置要求

- Node.js 24 LTS 或更高版本
- pnpm (推荐) 或 npm
- PostgreSQL 数据库（Supabase 或自托管）
- AI API Key（阿里云通义千问 / Anthropic / OpenAI 至少一个）

### 1. 克隆并安装

```bash
cd "To appease one's girlfriend"
pnpm install
```

### 2. 配置环境变量

复制 `.env.example` 到 `.env.local`：

```bash
cp .env.example .env.local
```

编辑 `.env.local` 并填入必要的配置：

```env
# 数据库
DATABASE_URL="postgresql://user:password@localhost:5432/relationship_repair"

# Supabase (推荐)
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# AI Provider（至少配置一个，推荐使用阿里云通义千问）
QWEN_API_KEY="sk-xxx"  # 阿里云通义千问（性价比高）
# 或
# ANTHROPIC_API_KEY="sk-ant-..."  # Anthropic Claude
# 或
# OPENAI_API_KEY="sk-..."  # OpenAI GPT-4

# 应用配置
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
```

### 3. 设置数据库

```bash
# 推送 schema 到数据库
pnpm db:push

# 或运行 migration
pnpm db:migrate

# (可选) 填充种子数据
pnpm db:seed
```

### 4. 启动开发服务器

```bash
pnpm dev
```

访问 http://localhost:3000

## 🤖 AI 提供商配置

本项目支持多个 AI 提供商，默认使用**阿里云通义千问**（性价比高）。

### 支持的提供商

| 提供商 | 模型 | 推荐场景 |
|--------|------|----------|
| **阿里云通义千问** | Qwen-Max | 日常使用（性价比高） |
| Anthropic | Claude 3.5 Sonnet | 英文场景 |
| OpenAI | GPT-4o | 通用场景 |

### 配置指南

- **通义千问配置**：查看 [docs/QWEN_SETUP.md](docs/QWEN_SETUP.md)
- **其他提供商**：使用对应 API Key 即可

### 切换提供商

在设置页面选择，或在 `.env.local` 中配置对应的 API Key。

## 🌐 部署

### 方案 A：Vercel + Supabase (推荐)

#### 1. 准备 Supabase 项目

1. 在 [supabase.com](https://supabase.com) 创建新项目
2. 获取项目 URL 和 anon keys（Settings → API）
3. 在 SQL Editor 中运行 Prisma 生成的 SQL（或使用 `pnpm db:push`）

#### 2. 部署到 Vercel

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录并部署
vercel

# 设置环境变量（在 Vercel Dashboard 或 CLI）
vercel env add DATABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add ANTHROPIC_API_KEY
# ... 其他变量
```

#### 3. 配置 Supabase Auth

在 Supabase Dashboard → Authentication → URL Configuration 中设置：

- Site URL: `https://your-domain.vercel.app`
- Redirect URLs: 添加相同 URL

### 方案 B：Docker Compose (自托管)

#### 快速方式（根目录 docker-compose）

```bash
# 构建并启动所有服务
docker-compose up -d

# 查看日志
docker-compose logs -f

# 运行数据库迁移
docker-compose exec app pnpm db:push
```

#### 完整方式（推荐 - 使用 deploy/ 目录）

新的部署目录提供更专业的配置和运维工具：

```bash
# 进入 deploy 目录
cd deploy

# 配置环境变量
cp .env.example .env
nano .env  # 修改密码等配置

# 启动所有服务（PostgreSQL + Redis）
docker-compose up -d

# 启动时包含管理工具（PgAdmin + Redis Commander）
docker-compose --profile admin up -d

# 检查服务健康状态
./scripts/health-check.sh

# 实时监控
./scripts/monitor.sh

# 备份数据库
./scripts/backup.sh

# 恢复数据库
./scripts/restore.sh backup_20240101_120000.sql.gz
```

**详细文档**：参见 [deploy/README.md](deploy/README.md)

访问 http://localhost:3000

## 🧪 测试

```bash
# 运行测试
pnpm test

# 运行测试 UI (如果安装了 @vitest/ui)
pnpm test:ui
```

## 🔒 安全设计

### 核心安全点

1. **服务端 AI 调用**：所有 LLM 调用均在服务端，API Key 不暴露给浏览器
2. **输入验证**：使用 Zod schema 严格校验所有输入
3. **速率限制**：基于用户 ID 和 IP 的速率限制（内存或 Redis）
4. **安全策略**：内置安全检测，拒绝生成操控性/威胁性内容
5. **输出校验**：AI 输出必须通过 Zod 校验，失败自动重试
6. **CSRF 保护**：Next.js sameSite cookies + middleware
7. **隐私默认**：默认不保存原始输入，仅保存摘要

### Prompt 安全策略

- 禁止：撒谎、伪造、隐瞒、操控、威胁、情感勒索、PUA、跟踪、骚扰
- 强制：真诚、负责、尊重边界、知情同意、可验证行动
- 危险检测：自伤、暴力威胁 → 触发安全警告并建议专业求助

## 📊 数据模型

### 核心实体

- **User**: 用户账号（关联 Supabase Auth）
- **UserPreferences**: 用户设置（语气、隐私等）
- **Case**: 冲突事件（一次"案例"）
- **Message**: 生成的文案版本
- **Note**: 用户自我反思笔记
- **ApiKey**: 用户自带的 AI Key（可选）

详见 `prisma/schema.prisma`

## 🎨 UI 组件

本项目使用 shadcn/ui 组件库，组件位于 `components/ui/`：

- Button, Card, Input, Textarea, Label
- Tabs, Dialog, Select
- Toast, Toaster

所有组件可直接定制。

## 📝 API 路由

- `POST /api/cases` - 创建案例并生成方案
- `GET /api/cases` - 获取用户案例列表
- `GET /api/cases/[id]` - 获取案例详情
- `PATCH /api/cases/[id]` - 更新案例状态
- `DELETE /api/cases/[id]` - 删除案例
- `POST /api/cases/[id]/regenerate` - 重新生成方案
- `GET /api/user/preferences` - 获取用户设置
- `PATCH /api/user/preferences` - 更新用户设置
- `DELETE /api/user/account` - 删除账号

## 🤝 贡献

欢迎贡献！请遵循：

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启 Pull Request

## 📄 许可

MIT License - 详见 [LICENSE](LICENSE)

## 🙏 致谢

- [Next.js](https://nextjs.org/) - React 框架
- [Vercel AI SDK](https://sdk.vercel.ai/) - AI 集成
- [shadcn/ui](https://ui.shadcn.com/) - UI 组件
- [Supabase](https://supabase.com/) - 数据库 & Auth
- [Prisma](https://www.prisma.io/) - ORM
- [Anthropic Claude](https://www.anthropic.com/) - AI 模型

## ⚠️ 免责声明

本工具提供的建议仅供参考，不能替代专业心理咨询或法律建议。如果涉及自伤、暴力威胁等危险情况，请立即寻求专业帮助。

## 📧 联系

如有问题或建议，请通过以下方式联系：

- 提交 GitHub Issue
- 发送邮件至项目维护者

---

**Made with ❤️ to help people repair relationships**
