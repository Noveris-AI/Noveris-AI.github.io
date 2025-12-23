# 🚀 Noveris Blog 一键安装脚本

适用于 **Windows / macOS / Linux** 的自动安装脚本，无需任何手动配置！

---

## ✨ 功能

- ✅ 自动检测操作系统
- ✅ 自动安装最新版 Node.js (v18+)
- ✅ 自动安装 Git
- ✅ 自动安装项目依赖
- ✅ 一键启动博客
- ✅ **支持任意目录运行** - 在解压后的目录中直接运行

---

## 📦 使用方法

### 🪟 Windows

#### 方式 1：双击运行（推荐）

1. 解压项目文件到任意目录
2. 右键点击 `setup.bat`
3. 选择 **"以管理员身份运行"**
4. 等待自动安装完成

#### 方式 2：PowerShell

```powershell
# 进入项目目录
cd 你的项目路径

# 运行脚本
powershell -ExecutionPolicy Bypass -File setup.ps1
```

---

### 🍎 macOS

打开终端（Terminal），进入项目目录，运行：

```bash
# 方式 1：直接运行（推荐）
chmod +x setup.sh
./setup.sh

# 方式 2：使用 bash
bash setup.sh
```

---

### 🐧 Linux

打开终端，进入项目目录，运行：

```bash
# 方式 1：直接运行（推荐）
chmod +x setup.sh
./setup.sh

# 方式 2：使用 bash
bash setup.sh
```

---

## 🎯 脚本做了什么？

### 1. **检测系统**
   - 自动识别 Windows / macOS / Linux
   - 显示当前目录路径

### 2. **安装 Git**
   - Windows: 通过 Chocolatey
   - macOS: 通过 Homebrew
   - Linux: 通过 apt/yum/dnf/pacman
   - 如果已安装，显示版本信息

### 3. **安装 Node.js**
   - Windows: 通过 Chocolatey（LTS 版本）
   - macOS: 通过 Homebrew
   - Linux: 通过 NodeSource / NVM（LTS 版本）
   - 要求 Node.js v18 或更高版本
   - 如果已安装，显示版本信息并检查是否满足要求

### 4. **安装项目依赖**
   - 检查当前目录是否存在 `package.json`
   - 自动运行 `npm install` 安装所有依赖
   - 显示安装进度

### 5. **启动博客**
   - 询问是否立即启动开发服务器
   - 如果选择是，自动运行 `npm run dev`

---

## 📍 安装位置

**重要**: 脚本会在**当前目录**安装依赖，不会修改其他位置。

### 使用场景

#### 场景 1：解压后直接运行
```
你的任意目录/
  ├── noveris-blog/      # 解压的项目文件夹
  │   ├── setup.sh       # Linux/Mac 脚本
  │   ├── setup.bat      # Windows 脚本
  │   ├── setup.ps1      # Windows PowerShell 脚本
  │   ├── package.json
  │   └── ...
```

进入 `noveris-blog/` 目录，运行安装脚本即可。

#### 场景 2：在服务器上部署
```bash
# 上传项目文件到服务器
scp -r noveris-blog user@server:/path/to/deploy/

# SSH 登录服务器
ssh user@server

# 进入目录
cd /path/to/deploy/noveris-blog

# 运行安装脚本
./setup.sh
```

#### 场景 3：在 U 盘/移动硬盘运行
```
移动存储设备/
  └── noveris-blog/
      ├── setup.sh
      └── ...
```

插入设备后，进入目录运行脚本，依赖会安装在项目的 `node_modules/` 文件夹中。

---

## 🌐 访问地址

安装完成后，访问：

- **博客首页**: http://localhost:5173
- **管理界面**: http://localhost:5173/admin/index.html

---

## 🔧 手动启动

如果之后需要启动博客：

```bash
# Windows
cd 你的项目路径
npm run dev

# macOS / Linux
cd 你的项目路径
npm run dev
```

---

## 🛠️ 常见问题

### Q: Windows 提示"无法运行脚本"

**解决方法**：右键点击 `setup.bat`，选择 **"以管理员身份运行"**

### Q: macOS 提示"权限被拒绝"

**解决方法**：
```bash
chmod +x setup.sh
./setup.sh
```

### Q: Linux 提示"curl: command not found"

**解决方法**：先安装 curl
```bash
# Ubuntu/Debian
sudo apt-get install curl

# CentOS/RHEL
sudo yum install curl
```

### Q: 提示"未找到 package.json 文件"

**原因**: 你不在项目根目录中

**解决方法**：
```bash
# 查看当前目录
pwd  # Linux/Mac
cd   # Windows

# 确保你在包含 package.json 的目录中
ls package.json  # 应该能看到这个文件

# 如果不在，cd 到正确的目录
cd /path/to/noveris-blog
```

### Q: Node.js 版本过低怎么办？

如果脚本提示版本过低（需要 v18+）：

**Windows**:
```powershell
choco upgrade nodejs-lts
```

**macOS**:
```bash
brew upgrade node
```

**Linux**:
```bash
# 使用 NVM 升级
nvm install --lts
nvm use --lts
```

### Q: 安装失败怎么办？

1. 检查网络连接
2. 确保有管理员/sudo 权限
3. 查看错误信息
4. 参考 [SVELTIA-GUIDE.md](./SVELTIA-GUIDE.md) 手动安装

### Q: 可以在不同电脑之间移动项目吗？

**可以！** 这就是脚本的设计目的：

1. 将整个项目文件夹复制到新电脑（U 盘、网盘、压缩包等）
2. 在新电脑上进入项目目录
3. 运行安装脚本
4. 完成！

所有依赖都会重新安装，无需手动配置。

### Q: 脚本会修改系统设置吗？

脚本只会：
- ✅ 安装 Git（如果未安装）
- ✅ 安装 Node.js（如果未安装）
- ✅ 在项目目录中安装 npm 依赖

**不会**：
- ❌ 修改系统环境变量（除了 Git/Node.js 安装时）
- ❌ 在系统其他位置创建文件
- ❌ 修改已有的 Git/Node.js 配置

---

## 📚 下一步

安装完成后：

1. 访问 http://localhost:5173/admin/index.html
2. 用 GitHub 登录
3. 开始写你的第一篇文章！

详细使用说明：[SVELTIA-GUIDE.md](./SVELTIA-GUIDE.md)

---

## 🎨 脚本特点

- ✅ **跨平台** - 一套脚本，三个系统通用
- ✅ **智能检测** - 自动识别已安装的软件
- ✅ **增量安装** - 只安装缺失的组件
- ✅ **便携式** - 可以在任意目录运行
- ✅ **安全可靠** - 使用官方源，开源透明
- ✅ **友好提示** - 彩色输出，进度清晰

---

## 🔍 技术细节

### Windows (setup.ps1)
- 使用 Chocolatey 包管理器
- 自动检测管理员权限
- 支持环境变量刷新
- 彩色 PowerShell 输出

### macOS (setup.sh)
- 使用 Homebrew 包管理器
- 支持 Apple Silicon (M1/M2/M3) 芯片
- 自动配置 Homebrew PATH
- ANSI 颜色输出

### Linux (setup.sh)
- 支持多种包管理器：apt, yum, dnf, pacman
- NVM 作为备选 Node.js 安装方案
- 自动检测发行版
- ANSI 颜色输出

---

## 📄 许可证

MIT License

---

**享受写作的乐趣！** ✍️
