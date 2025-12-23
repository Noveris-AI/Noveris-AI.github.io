#!/bin/bash

# Noveris Blog Setup Script for Linux/Mac
# 自动安装 Node.js、Git 并启动博客

set -e

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
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

echo -e "${YELLOW}检测到系统: ${MACHINE}${NC}"
echo ""

# 检查并安装 Git
echo -e "${YELLOW}[1/4] 检查 Git...${NC}"
if ! command -v git &> /dev/null; then
    echo -e "${RED}Git 未安装，正在安装...${NC}"

    if [ "$MACHINE" = "Mac" ]; then
        # macOS 使用 Homebrew
        if ! command -v brew &> /dev/null; then
            echo "正在安装 Homebrew..."
            /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
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
echo -e "${YELLOW}[2/4] 检查 Node.js...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}Node.js 未安装，正在安装...${NC}"

    # 使用 NVM 安装 Node.js（适用于 Mac 和 Linux）
    if [ ! -d "$HOME/.nvm" ]; then
        echo "正在安装 NVM..."
        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

        # 加载 NVM
        export NVM_DIR="$HOME/.nvm"
        [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    fi

    # 安装最新 LTS 版本的 Node.js
    nvm install --lts
    nvm use --lts
    echo -e "${GREEN}✓ Node.js 安装完成${NC}"
else
    NODE_VERSION=$(node --version)
    NPM_VERSION=$(npm --version)
    echo -e "${GREEN}✓ Node.js 已安装: ${NODE_VERSION}${NC}"
    echo -e "${GREEN}✓ npm 已安装: v${NPM_VERSION}${NC}"
fi
echo ""

# 克隆或更新仓库
echo -e "${YELLOW}[3/4] 准备项目...${NC}"
REPO_URL="https://github.com/Noveris-AI/Noveris-AI.github.io.git"
PROJECT_DIR="$HOME/Noveris-Blog"

if [ -d "$PROJECT_DIR" ]; then
    echo "项目目录已存在，正在更新..."
    cd "$PROJECT_DIR"
    git pull
else
    echo "正在克隆项目..."
    git clone "$REPO_URL" "$PROJECT_DIR"
    cd "$PROJECT_DIR"
fi
echo -e "${GREEN}✓ 项目准备完成${NC}"
echo ""

# 安装依赖
echo -e "${YELLOW}[4/4] 安装项目依赖...${NC}"
npm install
echo -e "${GREEN}✓ 依赖安装完成${NC}"
echo ""

# 完成
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  🎉 安装完成！${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "项目路径: ${GREEN}${PROJECT_DIR}${NC}"
echo ""
echo -e "运行以下命令启动博客："
echo -e "${YELLOW}cd ${PROJECT_DIR}${NC}"
echo -e "${YELLOW}npm run dev${NC}"
echo ""
echo -e "访问以下地址："
echo -e "  博客首页: ${GREEN}http://localhost:5173${NC}"
echo -e "  管理界面: ${GREEN}http://localhost:5173/admin${NC}"
echo ""

# 询问是否立即启动
read -p "是否现在启动开发服务器？(y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    npm run dev
fi
