# Noveris Blog Setup Script for Windows
# 自动安装 Node.js、Git 并启动博客

Write-Host "========================================"  -ForegroundColor Green
Write-Host "  Noveris Blog 自动安装脚本"  -ForegroundColor Green
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

# 检查并安装 Chocolatey
Write-Host "[1/5] 检查 Chocolatey 包管理器..." -ForegroundColor Yellow
if (-not (Get-Command choco -ErrorAction SilentlyContinue)) {
    Write-Host "Chocolatey 未安装，正在安装..." -ForegroundColor Red
    Set-ExecutionPolicy Bypass -Scope Process -Force
    [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
    Invoke-Expression ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

    # 刷新环境变量
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

    Write-Host "✓ Chocolatey 安装完成" -ForegroundColor Green
} else {
    Write-Host "✓ Chocolatey 已安装" -ForegroundColor Green
}
Write-Host ""

# 检查并安装 Git
Write-Host "[2/5] 检查 Git..." -ForegroundColor Yellow
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "Git 未安装，正在安装..." -ForegroundColor Red
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
Write-Host "[3/5] 检查 Node.js..." -ForegroundColor Yellow
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "Node.js 未安装，正在安装..." -ForegroundColor Red
    choco install nodejs-lts -y

    # 刷新环境变量
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

    Write-Host "✓ Node.js 安装完成" -ForegroundColor Green
} else {
    $nodeVersion = node --version
    $npmVersion = npm --version
    Write-Host "✓ Node.js 已安装: $nodeVersion" -ForegroundColor Green
    Write-Host "✓ npm 已安装: v$npmVersion" -ForegroundColor Green
}
Write-Host ""

# 克隆或更新仓库
Write-Host "[4/5] 准备项目..." -ForegroundColor Yellow
$repoUrl = "https://github.com/Noveris-AI/Noveris-AI.github.io.git"
$projectDir = "$env:USERPROFILE\Noveris-Blog"

if (Test-Path $projectDir) {
    Write-Host "项目目录已存在，正在更新..."
    Set-Location $projectDir
    git pull
} else {
    Write-Host "正在克隆项目..."
    git clone $repoUrl $projectDir
    Set-Location $projectDir
}
Write-Host "✓ 项目准备完成" -ForegroundColor Green
Write-Host ""

# 安装依赖
Write-Host "[5/5] 安装项目依赖..." -ForegroundColor Yellow
npm install
Write-Host "✓ 依赖安装完成" -ForegroundColor Green
Write-Host ""

# 完成
Write-Host "========================================"  -ForegroundColor Green
Write-Host "  🎉 安装完成！"  -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "项目路径: " -NoNewline
Write-Host $projectDir -ForegroundColor Green
Write-Host ""
Write-Host "运行以下命令启动博客："
Write-Host "cd $projectDir" -ForegroundColor Yellow
Write-Host "npm run dev" -ForegroundColor Yellow
Write-Host ""
Write-Host "访问以下地址："
Write-Host "  博客首页: " -NoNewline
Write-Host "http://localhost:5173" -ForegroundColor Green
Write-Host "  管理界面: " -NoNewline
Write-Host "http://localhost:5173/admin" -ForegroundColor Green
Write-Host ""

# 询问是否立即启动
$start = Read-Host "是否现在启动开发服务器？(Y/N)"
if ($start -eq "Y" -or $start -eq "y") {
    npm run dev
}
