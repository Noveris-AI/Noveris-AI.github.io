# Noveris Blog - Sveltia CMS 使用指南

## 🎉 什么是 Sveltia CMS？

Sveltia CMS 是一个现代化的内容管理系统，特点：
- ✅ **完全免费** - 开源，无需服务器
- ✅ **跨平台** - Windows/Mac/Linux 都可以用
- ✅ **数据在 GitHub** - 文章存为 Markdown，自动备份
- ✅ **可视化编辑器** - 所见即所得
- ✅ **自动部署** - 提交后 1-2 分钟自动发布

---

## 🚀 快速开始

### 在任何电脑上使用（跨平台）

#### 1. 克隆仓库

```bash
git clone https://github.com/Noveris-AI/Noveris-AI.github.io.git
cd Noveris-AI.github.io
npm install
```

#### 2. 启动本地开发

```bash
npm run dev
```

#### 3. 访问管理界面

打开浏览器访问：`http://localhost:5173/admin/`

#### 4. 登录 GitHub

点击 **"Login with GitHub"**，授权访问你的仓库。

---

## ✍️ 写文章

### 方式 1：通过管理界面（推荐）

1. 访问 `http://localhost:5173/admin/`
2. 点击 **Posts** → **New Post**
3. 填写：
   - 英文标题 / 中文标题
   - 英文内容 / 中文内容
   - 选择分类
   - 上传封面图（可选）
4. 点击 **Publish** → **Publish now**
5. 自动提交到 GitHub，1-2 分钟后生效

### 方式 2：直接编辑文件

```bash
# 创建新文章
code content/posts/2025-12-24-my-first-post.md
```

文章格式：

```markdown
---
title: My First Post
titleZh: 我的第一篇文章
slug: my-first-post
excerpt: This is my first post
excerptZh: 这是我的第一篇文章
category: ai
readTime: 5
publishedAt: 2025-12-24T10:00:00Z
cover: /images/posts/cover.jpg
---

# 正文内容

这里写你的文章内容...
```

---

## 📂 文件结构

```
noveris-blog/
├── content/
│   ├── categories/           # 分类数据（JSON）
│   │   ├── ai.json
│   │   ├── cloud-native.json
│   │   ├── development.json
│   │   └── llm.json
│   └── posts/                # 文章（Markdown）
│       └── 2025-12-24-my-post.md
├── public/
│   ├── admin/                # Sveltia CMS 管理界面
│   │   ├── index.html
│   │   └── config.yml
│   └── images/
│       └── posts/            # 文章图片
└── src/                      # Vue 前端代码
```

---

## 🔄 工作流程

```
1. 本地写文章
   ↓
2. Sveltia CMS 自动提交到 GitHub
   ↓
3. GitHub Actions 自动构建
   ↓
4. 自动部署到 GitHub Pages
   ↓
5. 1-2 分钟后博客更新 ✨
```

---

## 🌐 在线管理（推送后）

部署到 GitHub Pages 后，可以直接在线管理：

访问：`https://passion-lab.github.io/Noveris-Blogs/admin/`

**注意**：首次访问需要授权 GitHub OAuth。

---

## 🎨 管理分类

### 添加新分类

1. 访问管理界面
2. 点击 **Categories** → **New Category**
3. 填写分类信息：
   - 英文名 / 中文名
   - Slug（URL 标识符）
   - Emoji 图标
   - 颜色代码

或手动创建 JSON 文件：

```json
{
  "name": "Machine Learning",
  "nameZh": "机器学习",
  "slug": "ml",
  "icon": "🤖",
  "color": "#10b981"
}
```

---

## 📸 上传图片

### 方式 1：通过 CMS 上传

在文章编辑器中：
1. 点击工具栏的图片按钮
2. 选择本地图片
3. 自动上传到 `public/images/posts/`

### 方式 2：手动添加

```bash
# 复制图片到目录
cp my-image.jpg public/images/posts/

# 在 Markdown 中引用
![图片说明](/images/posts/my-image.jpg)
```

---

## 🔧 常见问题

### Q: 换电脑后怎么办？

只需要：
```bash
git clone https://github.com/Noveris-AI/Noveris-AI.github.io.git
cd Noveris-AI.github.io
npm install
npm run dev
```

### Q: 文章没有显示？

1. 检查文章的 `publishedAt` 日期是否正确
2. 确保文章已经 commit 并 push 到 GitHub
3. 等待 1-2 分钟让 GitHub Actions 完成部署

### Q: 如何备份数据？

所有数据都在 GitHub 上：
- 文章：`content/posts/`
- 分类：`content/categories/`
- 图片：`public/images/posts/`

只需 `git clone` 即可完整备份。

### Q: 可以离线写文章吗？

可以！在 `content/posts/` 直接创建 Markdown 文件，然后 push 到 GitHub 即可。

---

## 🎯 下一步

1. **写第一篇文章** - 访问 `/admin/` 开始
2. **自定义样式** - 修改 `src/style.css`
3. **添加功能** - 扩展 Vue 组件

---

## 📚 相关资源

- [Sveltia CMS 文档](https://github.com/sveltia/sveltia-cms)
- [Markdown 语法](https://www.markdownguide.org/)
- [GitHub Pages 文档](https://docs.github.com/pages)
