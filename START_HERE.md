# 🚀 立即部署到 Vercel - 3 步完成

## ✅ 已完成

- ✅ 代码已推送到 GitHub
- ✅ Vercel 配置文件已创建
- ✅ 部署文档已准备完毕

## 📝 现在只需要 3 步

### 1️⃣ 登录 Vercel 并导入项目

**访问**：https://vercel.com/new

1. 使用 **GitHub 账号登录**（推荐）
2. 点击 "Import" 导入你的仓库：
   ```
   Noveris-AI / Noveris-AI.github.io
   ```
3. Vercel 会自动检测 Next.js 项目

### 2️⃣ 配置环境变量

在 "Environment Variables" 部分添加：

```bash
QWEN_API_KEY = sk-你的通义千问API_Key
```

**获取 API Key**：
- 访问 https://dashscope.aliyuncs.com
- 登录 → API-KEY 管理 → 创建新的 API Key

### 3️⃣ 点击 Deploy

等待 2-3 分钟，你的应用就会上线！

**部署后 URL**：`https://your-project-name.vercel.app`

---

## 🎯 部署后必做

### 设置数据库（推荐）

在 Vercel 项目中：
1. 点击 "Storage" → "Create Database"
2. 选择 "Postgres"
3. Vercel 自动配置好 `DATABASE_URL`

### 初始化数据库

在本地运行：
```bash
pnpm prisma db push
```

---

## 📚 完整文档

- **快速开始**：[VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)
- **详细指南**：[DEPLOYMENT.md](./DEPLOYMENT.md)
- **项目 README**：[README.md](./README.md)

---

## 🔗 有用的链接

- **Vercel Dashboard**：https://vercel.com/dashboard
- **你的 GitHub 仓库**：https://github.com/Noveris-AI/Noveris-AI.github.io
- **通义千问控制台**：https://dashscope.aliyuncs.com

---

## 💡 提示

- **完全免费**：Vercel 免费额度对个人项目完全够用
- **自动部署**：以后 `git push` 会自动触发部署
- **HTTPS**：Vercel 自动配置 SSL 证书
- **全球 CDN**：自动加速访问

---

有问题？查看 [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) 的详细说明！
