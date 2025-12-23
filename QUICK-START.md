# 🚀 Noveris Blog - 博客编辑环境快速启动

这是 **Passion 的个人博客编辑环境**，用于在不同电脑上编辑和管理博客内容。

---

## ⚡ 30 秒快速启动

### Windows 用户
1. 解压文件到任意位置
2. 双击 `setup.bat`（右键选择"以管理员身份运行"）
3. 等待安装完成
4. 访问 http://localhost:5173/admin **编辑博客**

### macOS 用户
1. 解压文件到任意位置
2. 打开终端（Terminal），cd 到项目目录
3. 运行命令：`chmod +x setup.sh && ./setup.sh`
4. 访问 http://localhost:5173/admin **编辑博客**

### Linux 用户
1. 解压文件到任意位置
2. 打开终端，cd 到项目目录
3. 运行命令：`chmod +x setup.sh && ./setup.sh`
4. 访问 http://localhost:5173/admin **编辑博客**

---

## 🎯 这个包是做什么的？

### 核心用途
这是一个**博客内容编辑环境**，让你可以：

- ✍️ 在任何电脑上编辑博客文章
- 🖼️ 上传和管理图片
- 🏷️ 创建和管理分类标签
- 👀 本地预览博客效果
- ☁️ 自动同步到 GitHub，发布到互联网

### 适用场景
- 📱 在公司电脑写文章
- 💻 在家里电脑继续编辑
- 🖥️ 在 Linux 服务器上管理内容
- 🔄 换新电脑时快速恢复编辑环境

---

## 📚 文档导航

### 必读文档
1. **QUICK-START.md**（本文件）- 快速开始
2. **SETUP-README.md** - 详细安装说明和常见问题
3. **SVELTIA-GUIDE.md** - 如何编辑文章和管理内容

### 参考文档
- **README.md** - 博客项目介绍
- **STRAPI-SETUP.md** - Strapi CMS 配置（已弃用，使用 Sveltia）

---

## 💡 工作流程

```
1. 在新电脑上解压项目
   ↓
2. 运行安装脚本（setup.sh 或 setup.bat）
   ↓
3. 访问 http://localhost:5173/admin
   ↓
4. 用 GitHub 账号登录（Noveris-AI 账号）
   ↓
5. 编辑文章、上传图片、管理分类
   ↓
6. 点击"Publish"发布
   ↓
7. Sveltia CMS 自动提交到 GitHub
   ↓
8. GitHub Actions 自动部署（1-2 分钟）
   ↓
9. 博客更新完成！🎉
```

---

## 🌐 访问地址

安装完成后：

| 页面 | 地址 | 用途 |
|------|------|------|
| **管理后台** | http://localhost:5173/admin | ✍️ **编辑文章（主要使用）** |
| 博客预览 | http://localhost:5173 | 👀 预览博客效果 |
| 线上博客 | https://noveris-ai.github.io | 🌐 公开访问的博客 |

---

## 🛠️ 系统要求

### 自动安装（推荐）
运行 setup 脚本会自动安装：
- Node.js v18 或更高版本
- Git
- 项目依赖包

### 手动安装
如果已安装 Node.js 和 Git：
```bash
npm install
npm run dev
```

---

## ❓ 常见问题

### Q: 这个包可以分享给别人吗？
**A**: 这是你的个人编辑环境，包含你的博客仓库配置。**不建议分享**。如果别人想建博客，需要 fork 仓库后修改配置。

### Q: 换电脑后怎么办？
**A**: 把这个文件夹复制到新电脑（U盘/网盘），或者重新从 GitHub 克隆，然后运行安装脚本。

### Q: 数据会丢失吗？
**A**: 不会！所有文章都在 GitHub 仓库中，有完整版本历史。即使本地删除，从 GitHub 重新克隆即可。

### Q: 需要连接互联网吗？
**A**:
- **编辑时**: 需要，因为 Sveltia CMS 要连接 GitHub
- **预览时**: 不需要，可以离线预览博客效果

### Q: 可以在多台电脑同时编辑吗？
**A**: 可以，但建议一次只在一台电脑编辑，避免 Git 冲突。如果遇到冲突，需要手动解决。

### Q: 我忘记在哪台电脑上编辑了，怎么办？
**A**: 没关系！所有修改都在 GitHub 上。在任何电脑运行 `git pull` 获取最新内容即可。

---

## 📁 项目结构

```
noveris-blog/
├── 🚀 安装脚本
│   ├── setup.sh              # Mac/Linux
│   ├── setup.ps1             # Windows PowerShell
│   └── setup.bat             # Windows 快捷启动
│
├── 📚 文档
│   ├── QUICK-START.md        # 本文件
│   ├── SETUP-README.md       # 详细说明
│   ├── SVELTIA-GUIDE.md      # 编辑指南
│   └── README.md
│
├── ✍️ 博客内容（你主要编辑的部分）
│   └── content/
│       ├── categories/       # 分类（JSON）
│       └── posts/            # 文章（Markdown）
│
├── 🎨 管理界面
│   └── public/admin/
│       ├── index.html        # Sveltia CMS 入口
│       └── config.yml        # CMS 配置
│
└── 💻 源代码
    ├── src/                  # Vue 前端代码
    ├── package.json          # 依赖配置
    └── vite.config.ts        # 构建配置
```

---

## 🎓 使用技巧

### 1. 本地预览
编辑后想看效果：
```bash
# 开发服务器会自动刷新
访问 http://localhost:5173
```

### 2. 查看提交历史
想看之前写过什么：
```bash
git log --oneline
git show <commit-id>
```

### 3. 撤销修改
不小心改错了：
```bash
# 撤销未提交的修改
git checkout -- <文件名>

# 或者通过 Sveltia CMS 的版本历史恢复
```

### 4. 更新博客内容
在另一台电脑编辑后，当前电脑需要更新：
```bash
git pull origin main
```

---

## 🔄 典型使用场景

### 场景 1: 在公司写文章，回家继续
```bash
# 在公司
1. 解压项目，运行 setup.sh
2. 写了一半的文章，点击 "Save"（保存草稿）
3. 点击 "Publish"（发布到 GitHub）

# 回到家
1. 解压项目（或 git pull）
2. 运行 setup.sh
3. 访问 /admin，继续编辑
4. 完成后发布
```

### 场景 2: 换新电脑
```bash
# 旧电脑
- 文章都在 GitHub 上，不用特意备份

# 新电脑
1. 复制项目文件夹（或重新克隆）
2. 运行安装脚本
3. 登录 GitHub 账号
4. 继续写作
```

### 场景 3: 在服务器上快速修改
```bash
# SSH 登录服务器
ssh user@server

# 克隆项目
git clone https://github.com/Noveris-AI/Noveris-AI.github.io.git
cd Noveris-AI.github.io

# 安装并启动
./setup.sh

# 通过 SSH 隧道访问
# 在本地电脑：ssh -L 5173:localhost:5173 user@server
# 然后访问 http://localhost:5173/admin
```

---

## 🔐 安全提示

### GitHub 认证
- Sveltia CMS 使用 GitHub OAuth 认证
- 首次登录需要授权 Sveltia 访问你的仓库
- 认证是安全的，通过 GitHub 官方 OAuth

### 敏感信息
- **不要提交** `.env` 文件（已在 .gitignore）
- **不要提交** 包含密钥的配置文件
- 图片可以直接提交到仓库

---

## 📝 重要提醒

### ⚠️ 这不是部署工具
这个包**不是**用来部署新博客的，它是：
- ✅ 你的个人编辑环境
- ✅ 用于在不同电脑编辑同一个博客
- ✅ 连接到你的 GitHub 仓库（Noveris-AI/Noveris-AI.github.io）

### ✅ 正确使用方式
- 在需要编辑博客的电脑上解压
- 运行安装脚本
- 通过 /admin 编辑内容
- 内容自动同步到 GitHub
- 博客自动部署到 https://noveris-ai.github.io

---

## 🚀 开始编辑

一切准备就绪！现在：

1. 运行安装脚本（setup.sh 或 setup.bat）
2. 访问 http://localhost:5173/admin
3. 用你的 GitHub 账号登录
4. 开始写作！

**提示**: 详细的编辑指南请阅读 **SVELTIA-GUIDE.md**

---

## 💬 获取帮助

- **详细文档**: SETUP-README.md 和 SVELTIA-GUIDE.md
- **GitHub 仓库**: https://github.com/Noveris-AI/Noveris-AI.github.io
- **Sveltia 文档**: https://github.com/sveltia/sveltia-cms

---

**专注内容创作，其他交给工具！** ✍️

*Made with ❤️ by Passion (Liu Yaojie)*
