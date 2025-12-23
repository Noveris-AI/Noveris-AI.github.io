# 🚀 Noveris Blog - 快速开始指南

欢迎使用 Noveris 技术博客！这是一个完全免费、跨平台的博客系统。

---

## ⚡ 30 秒快速启动

### Windows 用户
1. 解压文件到任意位置
2. 双击 `setup.bat`（右键选择"以管理员身份运行"）
3. 等待安装完成
4. 打开浏览器访问 http://localhost:5173

### macOS 用户
1. 解压文件到任意位置
2. 打开终端（Terminal），cd 到项目目录
3. 运行命令：`chmod +x setup.sh && ./setup.sh`
4. 打开浏览器访问 http://localhost:5173

### Linux 用户
1. 解压文件到任意位置
2. 打开终端，cd 到项目目录
3. 运行命令：`chmod +x setup.sh && ./setup.sh`
4. 打开浏览器访问 http://localhost:5173

---

## 📚 文档导航

### 新手必读
1. **QUICK-START.md**（本文件）- 快速开始
2. **SETUP-README.md** - 详细安装说明和常见问题
3. **SVELTIA-GUIDE.md** - 如何写文章和管理内容

### 进阶文档
- **README.md** - 项目详细介绍
- **STRAPI-SETUP.md** - Strapi CMS 配置（可选）

---

## 🎯 你能用这个博客做什么？

### ✍️ 写文章
- 访问 http://localhost:5173/admin
- 用 GitHub 账号登录
- 可视化编辑器，支持 Markdown
- 上传图片
- 一键发布

### 🎨 管理分类
- 创建自定义分类（AI、云原生、开发等）
- 为每个分类设置图标和颜色
- 支持中英文双语

### 🌐 发布到互联网
- 所有文章自动保存到 GitHub
- 自动部署到 GitHub Pages
- 1-2 分钟后全世界可访问
- 完全免费，无需服务器

### 🔄 跨平台使用
- 在 Windows 上写文章
- 在 Mac 上继续编辑
- 在 Linux 服务器上部署
- 数据永远在 GitHub 上，永不丢失

---

## 🛠️ 系统要求

### 自动安装（推荐）
运行 setup 脚本会自动安装以下软件：
- Node.js v18 或更高版本
- Git
- 项目依赖包

### 手动安装
如果你已经安装了 Node.js 和 Git：
```bash
npm install
npm run dev
```

---

## 🌐 访问地址

安装完成后：

| 页面 | 地址 | 说明 |
|------|------|------|
| 博客首页 | http://localhost:5173 | 查看你的博客 |
| 管理后台 | http://localhost:5173/admin | 写文章、管理内容 |

---

## 💡 使用流程

```
1. 运行安装脚本
   ↓
2. 访问管理后台 (http://localhost:5173/admin)
   ↓
3. 用 GitHub 账号登录
   ↓
4. 写第一篇文章
   ↓
5. 点击发布
   ↓
6. 自动提交到 GitHub
   ↓
7. 1-2 分钟后文章出现在博客上
   ↓
8. 分享给朋友！🎉
```

---

## ❓ 常见问题

### Q: 我需要付费吗？
**A**: 不需要！完全免费，无限使用，无额度限制。

### Q: 我需要服务器吗？
**A**: 不需要！内容存储在 GitHub，前端托管在 GitHub Pages，都是免费的。

### Q: 换电脑后怎么办？
**A**: 只需把项目文件夹复制到新电脑，运行安装脚本即可。或者直接从 GitHub 克隆。

### Q: 数据会丢失吗？
**A**: 不会！所有数据都在 GitHub 上，有完整的版本历史和备份。

### Q: 支持手机访问吗？
**A**: 支持！博客前端是响应式设计，在手机、平板、电脑上都能完美显示。

### Q: 可以自定义样式吗？
**A**: 当然！修改 `src/style.css` 和 Vue 组件即可自定义任何样式。

### Q: 我不会编程怎么办？
**A**: 没关系！管理后台是可视化的，和使用 Word 一样简单。只需要会写 Markdown 即可。

---

## 🎓 学习资源

### Markdown 语法
Markdown 是一种简单的文本格式，非常容易学习：
- 官方教程：https://www.markdownguide.org/
- 中文教程：https://markdown.com.cn/

### Git 基础
虽然 Sveltia CMS 会自动处理 Git，但了解基础知识很有帮助：
- Git 简明指南：https://rogerdudler.github.io/git-guide/index.zh.html

### Vue.js（进阶）
如果你想修改博客前端：
- Vue 3 官方文档：https://cn.vuejs.org/

---

## 📁 项目结构

```
noveris-blog/
├── setup.sh              # Mac/Linux 安装脚本
├── setup.ps1             # Windows 安装脚本
├── setup.bat             # Windows 快捷启动
│
├── QUICK-START.md        # 快速开始（本文件）
├── SETUP-README.md       # 详细安装说明
├── SVELTIA-GUIDE.md      # 内容管理指南
├── README.md             # 项目介绍
│
├── content/              # 博客内容（Markdown）
│   ├── categories/       # 分类数据（JSON）
│   └── posts/            # 文章（Markdown）
│
├── public/               # 静态资源
│   ├── admin/            # Sveltia CMS 管理界面
│   │   ├── index.html
│   │   └── config.yml    # CMS 配置
│   └── images/           # 图片资源
│       └── posts/        # 文章图片
│
├── src/                  # Vue 源代码
│   ├── components/       # Vue 组件
│   ├── views/            # 页面视图
│   ├── router/           # 路由配置
│   ├── i18n/             # 国际化
│   └── ...
│
├── package.json          # 项目依赖
└── vite.config.ts        # Vite 配置
```

---

## 🚀 下一步

1. **立即开始**: 运行安装脚本，启动博客
2. **写第一篇文章**: 访问 http://localhost:5173/admin
3. **探索功能**: 尝试分类、标签、图片上传
4. **发布到互联网**: 参考 SVELTIA-GUIDE.md
5. **自定义样式**: 修改 CSS 和组件

---

## 💬 获取帮助

- **详细文档**: 阅读 SETUP-README.md 和 SVELTIA-GUIDE.md
- **GitHub Issues**: https://github.com/Noveris-AI/Noveris-AI.github.io/issues
- **Sveltia 官方文档**: https://github.com/sveltia/sveltia-cms

---

## 📝 版本信息

- **当前版本**: 1.0.0
- **更新日期**: 2024-12-24
- **Vue 版本**: 3.5.13
- **Vite 版本**: 6.0.5
- **Node.js 要求**: v18+

---

## 🎉 开始你的创作之旅！

一切准备就绪，现在运行安装脚本，开始写你的第一篇博客文章吧！

**Remember**:
- 所有数据都在 GitHub 上，安全可靠
- 完全免费，无限使用
- 跨平台，随时随地写作
- 简单易用，专注内容

**祝写作愉快！** ✍️

---

*Made with ❤️ by Passion (Liu Yaojie)*
