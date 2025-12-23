# Noveris Blog Setup Script for Windows
# 在当前目录安装并启动博客

Write-Host "========================================" -ForegroundColor Green
Write-Host "  Noveris Blog 自动安装脚本" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# 检查管理员权限
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")

if (-not $isAdmin) {
    Write-Host "警告: 建议以管理员身份运行此脚本" -ForegroundColor Yellow
    Write-Host "右键点击 PowerShell -> 以管理员身份运行" -ForegroundColor Yellow
    Write-Host ""
    $continue = Read-Host "是否继续? (Y/N)"
    if ($continue -ne "Y" -and $continue -ne "y") {
        exit
    }
}

Write-Host "检测到系统: Windows" -ForegroundColor Blue
Write-Host "当前目录: $(Get-Location)" -ForegroundColor Blue
Write-Host ""

# 检查并安装 Git
Write-Host "[1/3] 检查 Git..." -ForegroundColor Yellow
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "Git 未安装，正在安装..." -ForegroundColor Red

    # 检查并安装 Chocolatey
    if (-not (Get-Command choco -ErrorAction SilentlyContinue)) {
        Write-Host "正在安装 Chocolatey..." -ForegroundColor Yellow
        Set-ExecutionPolicy Bypass -Scope Process -Force
        [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
        Invoke-Expression ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

        # 刷新环境变量
        $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
    }

    choco install git -y

    # 刷新环境变量
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

    Write-Host "✓ Git 安装完成" -ForegroundColor Green
} else {
    $gitVersion = git --version
    Write-Host "✓ Git 已安装: $gitVersion" -ForegroundColor Green
}
Write-Host ""

# 检查并安装 Node.js
Write-Host "[2/3] 检查 Node.js..." -ForegroundColor Yellow
$NODE_REQUIRED_VERSION = 18

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "Node.js 未安装，正在安装..." -ForegroundColor Red

    # 确保 Chocolatey 已安装
    if (-not (Get-Command choco -ErrorAction SilentlyContinue)) {
        Write-Host "正在安装 Chocolatey..." -ForegroundColor Yellow
        Set-ExecutionPolicy Bypass -Scope Process -Force
        [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
        Invoke-Expression ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

        # 刷新环境变量
        $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
    }

    choco install nodejs-lts -y

    # 刷新环境变量
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

    Write-Host "✓ Node.js 安装完成" -ForegroundColor Green
} else {
    $nodeVersion = node --version
    $npmVersion = npm --version
    Write-Host "✓ Node.js 已安装: $nodeVersion" -ForegroundColor Green
    Write-Host "✓ npm 已安装: v$npmVersion" -ForegroundColor Green

    # 检查版本是否满足要求
    $nodeMajor = [int]($nodeVersion -replace 'v(\d+)\..*', '$1')
    if ($nodeMajor -lt $NODE_REQUIRED_VERSION) {
        Write-Host "⚠ 警告: Node.js 版本过低 (需要 v${NODE_REQUIRED_VERSION}+)" -ForegroundColor Yellow
        Write-Host "建议升级 Node.js 以获得最佳体验" -ForegroundColor Yellow
    }
}
Write-Host ""

# 安装项目依赖
Write-Host "[3/3] 安装项目依赖..." -ForegroundColor Yellow

# 检查是否存在 package.json
if (-not (Test-Path "package.json")) {
    Write-Host "错误: 未找到 package.json 文件" -ForegroundColor Red
    Write-Host "请确保在项目根目录下运行此脚本" -ForegroundColor Red
    exit 1
}

npm install

Write-Host "✓ 依赖安装完成" -ForegroundColor Green
Write-Host ""

# 完成
Write-Host "========================================" -ForegroundColor Green
Write-Host "  🎉 安装完成！" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "项目路径: " -NoNewline
Write-Host (Get-Location) -ForegroundColor Green
Write-Host ""
Write-Host "运行以下命令启动博客："
Write-Host "npm run dev" -ForegroundColor Yellow
Write-Host ""
Write-Host "或者构建生产版本："
Write-Host "npm run build" -ForegroundColor Yellow
Write-Host ""
Write-Host "访问以下地址："
Write-Host "  博客首页: " -NoNewline
Write-Host "http://localhost:5173" -ForegroundColor Green
Write-Host "  管理界面: " -NoNewline
Write-Host "http://localhost:5173/admin/index.html" -ForegroundColor Green
Write-Host ""

# 询问是否立即启动
$start = Read-Host "是否现在启动开发服务器？(Y/N)"
if ($start -eq "Y" -or $start -eq "y") {
    Write-Host ""
    Write-Host "正在启动开发服务器..." -ForegroundColor Green
    Write-Host "按 Ctrl+C 停止服务器" -ForegroundColor Yellow
    Write-Host ""
    npm run dev
}
