# 🚀 Vercel 部署完整指南

代码已成功推送到 GitHub：https://github.com/Noveris-AI/Noveris-AI.github.io

## 📋 接下来的步骤（5分钟完成）

### 第一步：在 Vercel 创建项目

1. **访问 Vercel**
   - 打开 https://vercel.com
   - 点击 "Sign Up" 或 "Log In"
   - **选择使用 GitHub 账号登录**（这会简化部署流程）

2. **导入项目**
   - 点击 "Add New..." → "Project"
   - 你会看到你的 GitHub 仓库列表
   - 找到并点击 `Noveris-AI/Noveris-AI.github.io`
   - 点击 "Import"

### 第二步：配置项目

Vercel 会自动检测这是 Next.js 项目，并填入大部分配置。你需要确认/修改以下内容：

#### **Framework Preset**
- ✅ Next.js（自动检测）

#### **Build & Development Settings**
```
Build Command: pnpm build
Output Directory: .next
Install Command: pnpm install
```

#### **Environment Variables**（关键！）

点击 "Environment Variables" 展开设置，添加以下变量：

```bash
# 必需变量
QWEN_API_KEY = 你的_通义千问_API_Key

# 可选变量（强烈推荐使用 Vercel Postgres）
DATABASE_URL = 稍后会设置

# 如果使用 Supabase 认证（可选）
NEXT_PUBLIC_SUPABASE_URL = 你的_Supabase_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY = 你的_Supabase_Anon_Key
```

### 第三步：配置数据库（推荐）

#### 选项 A：使用 Vercel Postgres（最简单）

1. 在项目导入后，你会看到 "Add Database" 按钮
2. 点击它，选择 "Postgres"
3. Vercel 会自动：
   - 创建数据库
   - 设置 `DATABASE_URL` 环境变量
   - 给你连接信息

#### 选项 B：使用其他数据库

1. 点击 "Storage" 标签
2. 选择你已有的数据库
3. 复制连接字符串到 `DATABASE_URL` 环境变量

### 第四步：部署

1. 点击 "Deploy" 按钮
2. 等待 2-3 分钟（首次部署会慢一些）
3. 部署完成后，你会得到一个 URL，比如：
   ```
   https://emotional-assistant.vercel.app
   ```

### 第五步：初始化数据库

部署完成后，你需要推送数据库 Schema：

1. 在本地运行：
```bash
cd "/Users/passion/Documents/Project/To appease one's girlfriend"
pnpm prisma db push
```

2. 或者在 Vercel 中：
   - 进入项目设置
   - 找到 "Database" 部分
   - 使用 Prisma 推送 Schema

## ✅ 部署后检查

访问你的 Vercel URL，测试：

- [ ] 首页可以正常打开
- [ ] 点击"开始倾诉"进入聊天页面
- [ ] 发送消息，AI 能够回复
- [ ] 创建新会话功能正常
- [ ] 刷新页面，会话历史仍然存在

## 🔧 环境变量详解

### QWEN_API_KEY（必需）

获取方式：
1. 访问 https://dashscope.aliyuncs.com
2. 登录阿里云账号
3. 进入"API-KEY 管理"
4. 创建新的 API Key
5. 复制到 Vercel 环境变量

### DATABASE_URL（推荐）

格式：
```
postgresql://user:password@host:port/database?schema=public
```

使用 Vercel Postgres 会自动设置。

### NEXT_PUBLIC_SUPABASE_URL（可选）

如果你想要用户认证功能：
1. 访问 https://supabase.com
2. 创建新项目
3. 获取 API URL 和 Key
4. 添加到环境变量

## 📊 费用说明

### Vercel 免费额度

- ✅ 每月 100GB 带宽
- ✅ 无限次部署
- ✅ 自动 HTTPS
- ✅ CDN 全球加速
- ✅ 1000 次函数调用/天
- ✅ 512MB 内存

对于个人项目，**完全免费**！

### Vercel Postgres 定价

- **免费版**（Hobby）：
  - 256MB 存储
  - 60 小时计算时间/月
  - 适合开发和小流量

- **付费版**（Pro）：
  - 1GB 存储 - $20/月
  - 500 小时计算时间/月

### Qwen API 定价

- **免费额度**：
  - 每月 100万 tokens
  - 足够个人使用

- **付费**：
  - ¥0.008/千tokens（极便宜）
  - ¥20 可以用 250 万 tokens

## 🔄 更新部署

以后更新代码只需要：

```bash
# 在本地修改代码
git add .
git commit -m "描述你的修改"
git push
```

Vercel 会**自动检测到 GitHub 更新**并重新部署！

## 📱 自定义域名（可选）

1. 在 Vercel 项目中，进入 "Settings" → "Domains"
2. 添加你的域名，比如 `emotional-assistant.com`
3. Vercel 会自动配置 SSL 证书
4. 按照提示在域名注册商设置 DNS

## 🆘 遇到问题？

### 构建失败

**检查**：
- 环境变量是否都设置正确
- 特别是 `QWEN_API_KEY` 不能为空

**解决方案**：
- 在 Vercel 查看 "Build Logs"
- 确认所有必需的环境变量都已设置

### 数据库连接失败

**检查**：
- `DATABASE_URL` 格式是否正确
- 数据库是否允许 Vercel 的 IP 访问

**解决方案**：
- 使用 Vercel Postgres（自动配置）
- 或在数据库设置中允许外部访问

### AI 不回复

**检查**：
- `QWEN_API_KEY` 是否有效
- API Key 额度是否用完

**解决方案**：
- 登录 https://dashscope.aliyuncs.com 检查
- 生成新的 API Key

## 📈 监控和分析

在 Vercel Dashboard 中：

- **Analytics**: 查看访问量、性能
- **Logs**: 查看错误日志
- **Deployments**: 查看部署历史
- **Settings**: 管理环境变量、域名

## 🎉 完成！

你的情感助手现在已经在线上运行了！

- **访问地址**：你的 Vercel URL
- **GitHub**: https://github.com/Noveris-AI/Noveris-AI.github.io
- **管理后台**: https://vercel.com/dashboard

---

有任何问题，随时查看 [DEPLOYMENT.md](./DEPLOYMENT.md) 或提交 Issue！
