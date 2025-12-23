#!/bin/bash

# Noveris Blog Setup Script for Linux/Mac
# 在当前目录安装并启动博客

set -e

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Noveris Blog 自动安装脚本${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# 检测操作系统
OS="$(uname -s)"
case "${OS}" in
    Linux*)     MACHINE=Linux;;
    Darwin*)    MACHINE=Mac;;
    *)          MACHINE="UNKNOWN:${OS}"
esac

echo -e "${BLUE}检测到系统: ${MACHINE}${NC}"
echo -e "${BLUE}当前目录: $(pwd)${NC}"
echo ""

# 检查并安装 Git
echo -e "${YELLOW}[1/3] 检查 Git...${NC}"
if ! command -v git &> /dev/null; then
    echo -e "${RED}Git 未安装，正在安装...${NC}"

    if [ "$MACHINE" = "Mac" ]; then
        # macOS 使用 Homebrew
        if ! command -v brew &> /dev/null; then
            echo "正在安装 Homebrew..."
            /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

            # 为 Apple Silicon Mac 添加 Homebrew 到 PATH
            if [[ $(uname -m) == 'arm64' ]]; then
                echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
                eval "$(/opt/homebrew/bin/brew shellenv)"
            fi
        fi
        brew install git
    elif [ "$MACHINE" = "Linux" ]; then
        # Linux 使用系统包管理器
        if command -v apt-get &> /dev/null; then
            sudo apt-get update
            sudo apt-get install -y git
        elif command -v yum &> /dev/null; then
            sudo yum install -y git
        elif command -v dnf &> /dev/null; then
            sudo dnf install -y git
        elif command -v pacman &> /dev/null; then
            sudo pacman -S --noconfirm git
        else
            echo -e "${RED}无法识别包管理器，请手动安装 Git${NC}"
            exit 1
        fi
    fi
    echo -e "${GREEN}✓ Git 安装完成${NC}"
else
    GIT_VERSION=$(git --version)
    echo -e "${GREEN}✓ Git 已安装: ${GIT_VERSION}${NC}"
fi
echo ""

# 检查并安装 Node.js
echo -e "${YELLOW}[2/3] 检查 Node.js...${NC}"
NODE_REQUIRED_VERSION=18

if ! command -v node &> /dev/null; then
    echo -e "${RED}Node.js 未安装，正在安装...${NC}"

    if [ "$MACHINE" = "Mac" ]; then
        # macOS 使用 Homebrew
        if ! command -v brew &> /dev/null; then
            echo "正在安装 Homebrew..."
            /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

            if [[ $(uname -m) == 'arm64' ]]; then
                eval "$(/opt/homebrew/bin/brew shellenv)"
            fi
        fi
        brew install node
    elif [ "$MACHINE" = "Linux" ]; then
        # 使用 NodeSource 安装最新 LTS
        if command -v apt-get &> /dev/null; then
            curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
            sudo apt-get install -y nodejs
        elif command -v yum &> /dev/null; then
            curl -fsSL https://rpm.nodesource.com/setup_lts.x | sudo bash -
            sudo yum install -y nodejs
        elif command -v dnf &> /dev/null; then
            curl -fsSL https://rpm.nodesource.com/setup_lts.x | sudo bash -
            sudo dnf install -y nodejs
        else
            # 使用 NVM 作为备选方案
            if [ ! -d "$HOME/.nvm" ]; then
                echo "正在安装 NVM..."
                curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
                export NVM_DIR="$HOME/.nvm"
                [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
            fi
            nvm install --lts
            nvm use --lts
        fi
    fi
    echo -e "${GREEN}✓ Node.js 安装完成${NC}"
else
    NODE_VERSION=$(node --version)
    NPM_VERSION=$(npm --version)
    echo -e "${GREEN}✓ Node.js 已安装: ${NODE_VERSION}${NC}"
    echo -e "${GREEN}✓ npm 已安装: v${NPM_VERSION}${NC}"

    # 检查版本是否满足要求
    NODE_MAJOR=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_MAJOR" -lt "$NODE_REQUIRED_VERSION" ]; then
        echo -e "${YELLOW}⚠ 警告: Node.js 版本过低 (需要 v${NODE_REQUIRED_VERSION}+)${NC}"
        echo -e "${YELLOW}建议升级 Node.js 以获得最佳体验${NC}"
    fi
fi
echo ""

# 安装项目依赖
echo -e "${YELLOW}[3/3] 安装项目依赖...${NC}"

# 检查是否存在 package.json
if [ ! -f "package.json" ]; then
    echo -e "${RED}错误: 未找到 package.json 文件${NC}"
    echo -e "${RED}请确保在项目根目录下运行此脚本${NC}"
    exit 1
fi

npm install

echo -e "${GREEN}✓ 依赖安装完成${NC}"
echo ""

# 完成
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  🎉 安装完成！${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "项目路径: ${GREEN}$(pwd)${NC}"
echo ""
echo -e "运行以下命令启动博客："
echo -e "${YELLOW}npm run dev${NC}"
echo ""
echo -e "或者构建生产版本："
echo -e "${YELLOW}npm run build${NC}"
echo ""
echo -e "访问以下地址："
echo -e "  博客首页: ${GREEN}http://localhost:5173${NC}"
echo -e "  管理界面: ${GREEN}http://localhost:5173/admin${NC}"
echo ""

# 询问是否立即启动
read -p "是否现在启动开发服务器？(y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo -e "${GREEN}正在启动开发服务器...${NC}"
    echo -e "${YELLOW}按 Ctrl+C 停止服务器${NC}"
    echo ""
    npm run dev
fi
