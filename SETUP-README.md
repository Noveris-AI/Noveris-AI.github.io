# 🚀 Noveris Blog 一键安装脚本

适用于 **Windows / macOS / Linux** 的自动安装脚本，无需任何手动配置！

---

## ✨ 功能

- ✅ 自动检测操作系统
- ✅ 自动安装最新版 Node.js
- ✅ 自动安装 Git
- ✅ 自动克隆项目
- ✅ 自动安装依赖
- ✅ 一键启动博客

---

## 📦 使用方法

### 🪟 Windows

#### 方式 1：双击运行（推荐）

1. 下载 `setup.bat` 文件
2. 右键点击 `setup.bat`
3. 选择 **"以管理员身份运行"**
4. 等待自动安装完成

#### 方式 2：PowerShell

```powershell
# 下载脚本
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/Noveris-AI/Noveris-AI.github.io/main/setup.ps1" -OutFile "setup.ps1"

# 运行脚本
powershell -ExecutionPolicy Bypass -File setup.ps1
```

---

### 🍎 macOS

打开终端（Terminal），运行：

```bash
# 方式 1：直接运行在线脚本（推荐）
bash <(curl -fsSL https://raw.githubusercontent.com/Noveris-AI/Noveris-AI.github.io/main/setup.sh)

# 方式 2：下载后运行
curl -O https://raw.githubusercontent.com/Noveris-AI/Noveris-AI.github.io/main/setup.sh
chmod +x setup.sh
./setup.sh
```

---

### 🐧 Linux

打开终端，运行：

```bash
# 方式 1：直接运行在线脚本（推荐）
bash <(curl -fsSL https://raw.githubusercontent.com/Noveris-AI/Noveris-AI.github.io/main/setup.sh)

# 方式 2：下载后运行
curl -O https://raw.githubusercontent.com/Noveris-AI/Noveris-AI.github.io/main/setup.sh
chmod +x setup.sh
./setup.sh
```

---

## 🎯 脚本做了什么？

1. **检测系统**
   - 自动识别 Windows / macOS / Linux

2. **安装 Git**
   - Windows: 通过 Chocolatey
   - macOS: 通过 Homebrew
   - Linux: 通过 apt/yum/dnf

3. **安装 Node.js**
   - Windows: 通过 Chocolatey（LTS 版本）
   - macOS/Linux: 通过 NVM（LTS 版本）

4. **克隆项目**
   - 自动从 GitHub 克隆到 `~/Noveris-Blog`（Windows: `%USERPROFILE%\Noveris-Blog`）
   - 如果已存在，则自动更新

5. **安装依赖**
   - 自动运行 `npm install`

6. **启动博客**
   - 询问是否立即启动开发服务器

---

## 📍 安装位置

### Windows
```
C:\Users\你的用户名\Noveris-Blog\
```

### macOS / Linux
```
~/Noveris-Blog/
```

---

## 🌐 访问地址

安装完成后，访问：

- **博客首页**: http://localhost:5173
- **管理界面**: http://localhost:5173/admin

---

## 🔧 手动启动

如果之后需要启动博客：

```bash
# Windows
cd %USERPROFILE%\Noveris-Blog
npm run dev

# macOS / Linux
cd ~/Noveris-Blog
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

### Q: 安装失败怎么办？

1. 检查网络连接
2. 确保有管理员/sudo 权限
3. 查看错误信息
4. 参考 [SVELTIA-GUIDE.md](./SVELTIA-GUIDE.md) 手动安装

---

## 📚 下一步

安装完成后：

1. 访问 http://localhost:5173/admin
2. 用 GitHub 登录
3. 开始写你的第一篇文章！

详细使用说明：[SVELTIA-GUIDE.md](./SVELTIA-GUIDE.md)

---

## 🎨 脚本特点

- ✅ **跨平台** - 一套脚本，三个系统通用
- ✅ **智能检测** - 自动识别已安装的软件
- ✅ **增量安装** - 只安装缺失的组件
- ✅ **安全可靠** - 使用官方源，开源透明
- ✅ **友好提示** - 彩色输出，进度清晰

---

## 📄 许可证

MIT License

---

**享受写作的乐趣！** ✍️
