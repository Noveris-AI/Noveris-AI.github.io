# Noveris Blog CMS 认证设置 - 快速上手

## 🎯 设置流程（按顺序执行）

### 第一步：安装 Vercel CLI

```bash
npm install -g vercel
```

等待安装完成（约1分钟）。

---

### 第二步：部署项目到 Vercel

1. 在终端运行：
```bash
cd /Users/passion/Documents/Noveris-Blogs/noveris-blog
vercel
```

2. 首次使用会提示登录：
   - 选择 "Continue with GitHub" 或 "Continue with Email"
   - 在浏览器中完成登录

3. 回答 Vercel 的问题：
   ```
   ? Set up and deploy "~/Documents/Noveris-Blogs/noveris-blog"? [Y/n]
   → 输入: Y

   ? Which scope do you want to deploy to?
   → 选择你的账号

   ? Link to existing project? [y/N]
   → 输入: N

   ? What's your project's name?
   → 输入: noveris-blog-auth (或任何你喜欢的名字)

   ? In which directory is your code located?
   → 按回车（使用默认 ./ ）

   ? Want to override the settings? [y/N]
   → 输入: N
   ```

4. 部署完成后，会显示类似：
   ```
   ✅ Production: https://noveris-blog-auth.vercel.app
   ```

   **重要：复制这个 URL！** 这就是你的认证服务器地址。

---

### 第三步：创建 GitHub OAuth App

1. 访问 https://github.com/settings/developers

2. 点击 "OAuth Apps" → "New OAuth App"

3. 填写信息（使用刚才获得的 Vercel URL）：
   ```
   Application name: Noveris Blog CMS
   Homepage URL: https://noveris-ai.github.io
   Authorization callback URL: https://noveris-blog-auth.vercel.app/api/auth
                               ↑ 改成你自己的 Vercel URL
   ```

4. 点击 "Register application"

5. 在下一个页面：
   - 复制 **Client ID**（保存到记事本）
   - 点击 "Generate a new client secret"
   - 复制 **Client Secret**（保存到记事本，只显示一次！）

---

### 第四步：配置 Vercel 环境变量

1. 在终端运行：
```bash
vercel env add GITHUB_CLIENT_ID
```
粘贴你的 Client ID，按回车

2. 选择环境：
```
? What's the value of GITHUB_CLIENT_ID?
→ 粘贴 Client ID

? Add GITHUB_CLIENT_ID to which Environments?
→ 用空格选中 Production, Preview, Development，按回车
```

3. 添加 Client Secret：
```bash
vercel env add GITHUB_CLIENT_SECRET
```
粘贴你的 Client Secret，按回车

---

### 第五步：重新部署到生产环境

```bash
vercel --prod
```

这会重新部署并使用你配置的环境变量。

---

### 第六步：更新 CMS 配置

1. 编辑 `public/admin/config.yml`

2. 取消注释并填入你的 Vercel URL：
```yaml
backend:
  name: github
  repo: Noveris-AI/Noveris-AI.github.io
  branch: main
  base_url: https://noveris-blog-auth.vercel.app  # 改成你的 URL
  auth_endpoint: /api/auth
```

3. 保存文件

---

### 第七步：构建并部署到 GitHub Pages

```bash
npm run build
git add public/admin/config.yml
git commit -m "Configure CMS authentication with Vercel"
git push origin main
```

---

### 第八步：测试登录 🎉

1. 等待 GitHub Actions 部署完成（约2分钟）

2. 访问 https://noveris-ai.github.io/admin/

3. 点击 "Login with GitHub"

4. 授权后即可使用 CMS！

---

## 📝 快速命令清单

如果你只想快速复制命令，按顺序执行：

```bash
# 1. 安装 Vercel
npm install -g vercel

# 2. 部署项目
cd /Users/passion/Documents/Noveris-Blogs/noveris-blog
vercel

# 3. 记下 Vercel URL，然后去 GitHub 创建 OAuth App

# 4. 配置环境变量
vercel env add GITHUB_CLIENT_ID
vercel env add GITHUB_CLIENT_SECRET

# 5. 重新部署
vercel --prod

# 6. 更新 config.yml（手动编辑）

# 7. 推送到 GitHub
npm run build
git add public/admin/config.yml
git commit -m "Configure CMS authentication"
git push origin main
```

---

## ❓ 常见问题

**Q: Vercel 免费吗？**
A: 是的！个人项目完全免费，包含无限部署。

**Q: 为什么要用 Vercel？**
A: 因为 GitHub Pages 不支持 serverless 函数，Vercel 提供免费的函数托管。

**Q: 可以用其他服务吗？**
A: 可以用 Netlify、Cloudflare Workers 等，但 Vercel 设置最简单。

**Q: 忘记保存 Client Secret 怎么办？**
A: 在 GitHub OAuth App 设置中重新生成一个即可。

**Q: 部署后登录还是失败？**
A: 检查：
1. GitHub OAuth App 的 callback URL 是否正确
2. Vercel 环境变量是否设置
3. 是否重新部署了（`vercel --prod`）

---

## 🆘 需要帮助？

遇到问题可以检查：
- Vercel 部署日志：`vercel logs`
- GitHub OAuth App 设置是否正确
- 环境变量是否都配置了

开始第一步吧！运行：
```bash
npm install -g vercel
```
