@echo off
chcp 65001 >nul
echo ========================================
echo   Noveris Blog 一键安装
echo ========================================
echo.
echo 正在启动 PowerShell 脚本...
echo.

powershell -ExecutionPolicy Bypass -File "%~dp0setup.ps1"

if errorlevel 1 (
    echo.
    echo 如果出现错误，请：
    echo 1. 右键点击 setup.bat
    echo 2. 选择"以管理员身份运行"
    echo.
    pause
)
