# 快速启动指南

5 分钟快速启动 `关系修复助手`。

## 📋 前置要求

- ✅ Node.js 24+ 和 pnpm
- ✅ Docker 和 Docker Compose（可选，用于本地数据库）
- ✅ Anthropic 或 OpenAI API Key

---

## 方案 A：本地开发（推荐）

### 1. 安装依赖

```bash
cd "/Users/passion/Documents/Project/To appease one's girlfriend"
pnpm install
```

### 2. 启动数据库

```bash
cd deploy
cp .env.example .env
docker-compose up -d postgres redis
```

### 3. 配置环境变量

在项目根目录创建 `.env.local`：

```env
# 数据库
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/relationship_repair?schema=public"

# AI Key（至少配置一个，推荐使用阿里云通义千问）
QWEN_API_KEY="sk-xxx"

# 或者使用其他 AI 提供商
# ANTHROPIC_API_KEY="sk-ant-xxx"
# OPENAI_API_KEY="sk-xxx"

# 应用配置
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXTAUTH_SECRET="any-random-string-here"
```

### 4. 初始化数据库

```bash
# 从项目根目录
pnpm db:push
```

### 5. 启动开发服务器

```bash
pnpm dev
```

访问 http://localhost:3000

---

## 方案 B：使用 Supabase（最简单）

### 1. 创建 Supabase 项目

访问 [supabase.com](https://supabase.com) 并创建新项目。

### 2. 获取连接信息

在 Supabase Dashboard → Settings → Database 获取：
- Connection string
- Project URL
- Anon key

### 3. 配置环境变量

创建 `.env.local`：

```env
# Supabase
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"
NEXT_PUBLIC_SUPABASE_URL="https://[YOUR-PROJECT-REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[YOUR-ANON-KEY]"
SUPABASE_SERVICE_ROLE_KEY="[YOUR-SERVICE-ROLE-KEY]"

# AI Key（至少配置一个，推荐使用阿里云通义千问）
QWEN_API_KEY="sk-xxx"

# 或者使用其他 AI 提供商
# ANTHROPIC_API_KEY="sk-ant-xxx"
# OPENAI_API_KEY="sk-xxx"
```

### 4. 初始化数据库

```bash
pnpm db:push
```

### 5. 启动

```bash
pnpm dev
```

---

## 方案 C：完全容器化

```bash
# 进入 deploy 目录
cd deploy

# 配置
cp .env.example .env
nano .env  # 编辑密码

# 启动所有服务
docker-compose up -d

# 等待容器就绪
sleep 10

# 初始化数据库
cd ..
export DATABASE_URL="postgresql://postgres:postgres@localhost:5432/relationship_repair?schema=public"
pnpm db:push

# 启动应用
pnpm dev
```

---

## ✅ 验证安装

### 1. 检查数据库连接

```bash
pnpm prisma studio
```

访问 http://localhost:5555 查看 Prisma Studio。

### 2. 测试 API

```bash
# 登录（在浏览器中访问 http://localhost:3000 并使用 Email OTP 登录）
# 然后创建一个测试案例
```

### 3. 运行健康检查

```bash
cd deploy
./scripts/health-check.sh
```

---

## 🛑 停止服务

### 停止开发服务器

```bash
Ctrl + C  # 在运行 pnpm dev 的终端
```

### 停止数据库

```bash
cd deploy
docker-compose down

# 删除数据（谨慎！）
docker-compose down -v
```

---

## 🐛 常见问题

### Q: 数据库连接失败

**A:** 检查：
1. Docker 容器是否运行：`docker ps`
2. DATABASE_URL 是否正确
3. PostgreSQL 是否已启动：`cd deploy && docker-compose logs postgres`

### Q: AI 生成失败

**A:** 检查：
1. API Key 是否有效
2. 是否有足够配额
3. 网络是否正常

### Q: 端口已被占用

**A:** 修改 `.env.local` 或 `deploy/.env` 中的端口配置：
```env
POSTGRES_PORT=5433  # 改为其他端口
```

### Q: Prisma 迁移失败

**A:** 强制重置：
```bash
pnpm prisma migrate reset
```

---

## 📞 下一步

1. 阅读 [README.md](README.md) 了解完整功能
2. 阅读 [SECURITY_CHECKLIST.md](SECURITY_CHECKLIST.md) 了解安全设计
3. 阅读 [deploy/README.md](deploy/README.md) 了解部署选项

---

## 🎯 功能测试清单

- [ ] 用户注册/登录
- [ ] 创建案例
- [ ] AI 生成修复方案
- [ ] 查看不同 Tab（道歉消息/提纲/行动/回复）
- [ ] 复制文案
- [ ] 重新生成方案
- [ ] 标记为已发送
- [ ] 更新设置
- [ ] 删除案例

祝使用愉快！🎉
