# 本地 CMS 使用指南（最简单方案）

## 🎯 为什么选择本地模式？

- ✅ 无需复杂的 Vercel/OAuth 设置
- ✅ 完整的可视化编辑界面
- ✅ 实时预览
- ✅ 5分钟内开始使用

---

## 🚀 快速开始

### 步骤 1：启动本地 CMS 代理

打开终端，运行：

```bash
cd /Users/passion/Documents/Noveris-Blogs/noveris-blog
npx @sveltia/cms-cli proxy &
npm run dev
```

### 步骤 2：访问 CMS

打开浏览器，访问：
```
http://localhost:5173/admin/
```

### 步骤 3：开始编辑

- 左侧看到 "分类 / Categories" 和 "文章 / Posts"
- 点击即可创建、编辑文章
- 支持实时预览
- 支持中英文切换

### 步骤 4：发布更改

编辑完成后，在终端：

```bash
git add content/
git commit -m "Update blog content"
git push origin main
```

GitHub Actions 会自动部署！

---

## 📝 创建新文章流程

1. 访问 http://localhost:5173/admin/
2. 点击 "文章 / Posts"
3. 点击 "New Post"
4. 填写信息：
   - 英文标题 / Title (English)
   - 中文标题 / Title (Chinese)
   - URL 标识 / Slug
   - 摘要（中英文）
   - 正文（中英文）
   - 选择分类
   - 上传封面图
   - 设置阅读时长
5. 点击 "Publish"
6. 文章会保存到 `content/posts/` 目录
7. 用 Git 推送即可发布

---

## 🛑 停止本地服务

按 `Ctrl + C` 停止开发服务器

---

## ⚠️ 注意事项

1. **本地模式只能在你的电脑上使用**
   - 访问线上 https://noveris-ai.github.io/admin/ 仍然会报错
   - 但这不影响，你只在本地编辑即可

2. **记得推送更改**
   - 本地编辑后的文件需要 Git 推送
   - 推送后 GitHub Actions 自动部署

3. **团队协作**
   - 如果团队成员也要编辑，每个人都在本地运行
   - 或者使用方案 A（GitHub 直接编辑）

---

## 🎉 就这么简单！

不需要 Vercel、不需要 OAuth、不需要任何云服务配置。

现在运行：
```bash
npx @sveltia/cms-cli proxy &
npm run dev
```

然后访问 http://localhost:5173/admin/ 开始写作！
