# Noveris Blog CMS 认证设置指南

## 问题说明
GitHub Pages + Sveltia CMS 需要 OAuth 认证服务才能登录管理后台。

---

## 🚀 方案一：快速设置（推荐）

### 步骤 1: 创建 GitHub OAuth App

1. 访问 https://github.com/settings/developers
2. 点击 "OAuth Apps" → "New OAuth App"
3. 填写信息：
   ```
   Application name: Noveris Blog CMS
   Homepage URL: https://noveris-ai.github.io
   Authorization callback URL: https://YOUR-AUTH-SERVER.vercel.app/api/auth
   ```
4. 创建后保存 `Client ID` 和 `Client Secret`

### 步骤 2: 部署认证服务器到 Vercel

1. 安装 Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. 在项目根目录运行:
   ```bash
   cd /Users/passion/Documents/Noveris-Blogs/noveris-blog
   vercel
   ```

3. 按提示登录并部署

4. 设置环境变量:
   ```bash
   vercel env add GITHUB_CLIENT_ID
   vercel env add GITHUB_CLIENT_SECRET
   ```
   输入前面保存的 Client ID 和 Secret

5. 重新部署:
   ```bash
   vercel --prod
   ```

### 步骤 3: 更新 CMS 配置

在 `public/admin/config.yml` 中，将 `base_url` 改为你的 Vercel URL：
```yaml
backend:
  name: github
  repo: Noveris-AI/Noveris-AI.github.io
  branch: main
  base_url: https://YOUR-PROJECT.vercel.app  # 改成你的 Vercel URL
  auth_endpoint: /api/auth
```

### 步骤 4: 更新 GitHub OAuth App

回到 GitHub OAuth App 设置，将 callback URL 改为：
```
https://YOUR-PROJECT.vercel.app/api/auth
```

### 步骤 5: 测试登录

访问 https://noveris-ai.github.io/admin/ 并点击登录！

---

## 📝 方案二：直接编辑（最简单）

如果觉得设置认证太复杂，可以直接在 GitHub 上编辑内容：

### 文章管理
直接编辑仓库中的文件：
- 文章：`content/posts/*.md`
- 分类：`content/categories/*.json`

### 本地编辑
在 `public/admin/config.yml` 中启用本地模式：
```yaml
local_backend: true
```

然后运行：
```bash
npm install -g @sveltia/cms-cli
npx sveltia-cms-proxy
npm run dev
```

访问 http://localhost:5173/admin/ 即可本地编辑。

---

## 🔧 方案三：使用 Netlify Identity（备选）

1. 在 Netlify 创建账号
2. 启用 Netlify Identity
3. 将站点连接到 GitHub
4. 在 `config.yml` 中改为：
   ```yaml
   backend:
     name: git-gateway
     branch: main
   ```

---

## 📋 当前状态

✅ 认证服务器代码已创建（`api/auth.js`）
✅ Vercel 配置已创建（`vercel.json`）
⏳ 等待部署和配置

## 🆘 需要帮助？

如果遇到问题，可以：
1. 查看 Sveltia CMS 文档: https://github.com/sveltia/sveltia-cms
2. 检查认证服务器日志
3. 使用方案二直接编辑文件
