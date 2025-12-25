// 自动生成的文章数据
// 由 scripts/sync-cms-content.mjs 生成
// 最后更新: 2025-12-25T04:02:12.799Z

export interface Post {
  id?: number
  slug: string
  title: string
  titleZh: string
  excerpt: string
  excerptZh: string
  content: string
  contentZh: string
  category: string
  createdAt: string  // ISO timestamp
  updatedAt?: string // ISO timestamp
  readTime: number
  icon?: string
  color?: string
  likes?: number
  cover?: string
  comments?: Comment[]
}

export interface Comment {
  id: string
  author: string
  email: string
  content: string
  createdAt: string
  likes: number
  replies?: Comment[]
}

export interface Category {
  id: string
  name: string
  nameZh: string
  icon: string
  color: string
}

export const categories: Category[] = [
  {
    "id": "ai",
    "name": "Artificial Intelligence",
    "nameZh": "人工智能",
    "icon": "🤖",
    "color": "#0d9488"
  },
  {
    "id": "cloud-native",
    "name": "Cloud Native",
    "nameZh": "云原生",
    "icon": "☁️",
    "color": "#0ea5e9"
  },
  {
    "id": "development",
    "name": "Development",
    "nameZh": "开发",
    "icon": "💻",
    "color": "#8b5cf6"
  },
  {
    "id": "llm",
    "name": "Large Language Models",
    "nameZh": "大语言模型",
    "icon": "🧠",
    "color": "#f59e0b"
  }
]

export const posts: Post[] = [
  {
    "slug": "linux-commands",
    "title": "Linux Commands",
    "titleZh": "Linux 命令",
    "excerpt": "Essential Linux command line reference for system administration and daily operations",
    "excerptZh": "Linux 系统管理和日常操作的基本命令行参考",
    "content": "```plain\n  # 列出当前目录中的文件和子目录\n  ls\n\n  # 显示当前工作目录的完整路径\n  pwd\n\n  # 切换目录到 /home/user\n  cd /home/user\n\n  # 返回上一级目录\n  cd ..\n\n  # 创建新目录 mydir\n  mkdir mydir\n\n  # 递归创建多级目录 a/b/c\n  mkdir -p a/b/c\n\n  # 删除空目录 mydir\n  rmdir mydir\n\n  # 强制递归删除目录及其内容（慎用）\n  rm -rf mydir\n\n  # 复制文件 file1 为 file2\n  cp file1 file2\n\n  # 递归复制目录 dir1 到 dir2\n  cp -r dir1 dir2\n\n  # 移动/重命名文件 old 为 new\n  mv old new\n\n  # 强制删除文件 file\n  rm -f file\n\n  # 查看文件内容（适合小文件）\n  cat file\n\n  # 分页查看文件内容（空格翻页，q 退出）\n  less file\n\n  # 实时滚动查看文件最新内容\n  tail -f file\n\n  # 创建空文件 newfile\n  touch newfile\n\n  # 输出文本 Hello\n  echo \"Hello\"\n\n  # 将标准输出重定向到文件（覆盖）\n  echo \"Hello\" > out.txt\n\n  # 将标准输出追加到文件\n  echo \"World\" >> out.txt\n\n  # 查看命令历史记录\n  history\n\n  # 清屏\n  clear\n\n  # 显示当前用户\n  whoami\n\n  # 显示系统运行时间、负载等信息\n  uptime\n\n  # 查看磁盘使用情况\n  df -h\n\n  # 查看目录/文件大小\n  du -sh /path\n\n  # 查看内存使用情况\n  free -h\n\n  # 查看进程快照\n  ps aux\n\n  # 实时查看进程与系统资源\n  top\n\n  # 根据名称查找文件\n  find / -name \"*.conf\"\n\n  # 在文件内搜索字符串\n  grep \"pattern\" file\n\n  # 打包目录为 tar 包\n  tar -cvf archive.tar dir/\n\n  # 解包 tar 包\n  tar -xvf archive.tar\n\n  # 打包并 gzip 压缩\n  tar -czvf archive.tar.gz dir/\n\n  # 解压 .tar.gz 包\n  tar -xzvf archive.tar.gz\n\n  # 下载文件\n  wget http://example.com/file\n\n  # 查看当前网络接口与地址\n  ip a\n\n  # 测试主机连通性\n  ping example.com\n\n  # 查看监听端口与对应进程\n  ss -tulnp\n\n  # 查看路由表\n  ip route\n\n  # 修改文件权限为 755\n  chmod 755 file\n\n  # 递归修改目录权限为 644\n  chmod -R 644 dir/\n\n  # 修改文件所有者为用户 user、组 group\n  chown user:group file\n\n  # 查看当前环境变量\n  env\n\n  # 临时导出环境变量\n  export MY_VAR=value\n\n  # 查看命令位置\n  which python3\n\n  # 查看命令详细路径及手册\n  whereis gcc\n\n  # 更新软件包列表（Debian/Ubuntu）\n  sudo apt update\n\n  # 升级已安装软件包\n  sudo apt upgrade -y\n\n  # 安装软件包\n  sudo apt install tree -y\n\n  # 查看命令手册\n  man ls\n\n  # 查看内置命令帮助\n  help cd\n\n  # linux中清理内存\n  sync;echo 3>/proc/sys/vm/drop_caches\n  ```",
    "contentZh": "```plain\n  # 列出当前目录中的文件和子目录\n  ls\n\n  # 显示当前工作目录的完整路径\n  pwd\n\n  # 切换目录到 /home/user\n  cd /home/user\n\n  # 返回上一级目录\n  cd ..\n\n  # 创建新目录 mydir\n  mkdir mydir\n\n  # 递归创建多级目录 a/b/c\n  mkdir -p a/b/c\n\n  # 删除空目录 mydir\n  rmdir mydir\n\n  # 强制递归删除目录及其内容（慎用）\n  rm -rf mydir\n\n  # 复制文件 file1 为 file2\n  cp file1 file2\n\n  # 递归复制目录 dir1 到 dir2\n  cp -r dir1 dir2\n\n  # 移动/重命名文件 old 为 new\n  mv old new\n\n  # 强制删除文件 file\n  rm -f file\n\n  # 查看文件内容（适合小文件）\n  cat file\n\n  # 分页查看文件内容（空格翻页，q 退出）\n  less file\n\n  # 实时滚动查看文件最新内容\n  tail -f file\n\n  # 创建空文件 newfile\n  touch newfile\n\n  # 输出文本 Hello\n  echo \"Hello\"\n\n  # 将标准输出重定向到文件（覆盖）\n  echo \"Hello\" > out.txt\n\n  # 将标准输出追加到文件\n  echo \"World\" >> out.txt\n\n  # 查看命令历史记录\n  history\n\n  # 清屏\n  clear\n\n  # 显示当前用户\n  whoami\n\n  # 显示系统运行时间、负载等信息\n  uptime\n\n  # 查看磁盘使用情况\n  df -h\n\n  # 查看目录/文件大小\n  du -sh /path\n\n  # 查看内存使用情况\n  free -h\n\n  # 查看进程快照\n  ps aux\n\n  # 实时查看进程与系统资源\n  top\n\n  # 根据名称查找文件\n  find / -name \"*.conf\"\n\n  # 在文件内搜索字符串\n  grep \"pattern\" file\n\n  # 打包目录为 tar 包\n  tar -cvf archive.tar dir/\n\n  # 解包 tar 包\n  tar -xvf archive.tar\n\n  # 打包并 gzip 压缩\n  tar -czvf archive.tar.gz dir/\n\n  # 解压 .tar.gz 包\n  tar -xzvf archive.tar.gz\n\n  # 下载文件\n  wget http://example.com/file\n\n  # 查看当前网络接口与地址\n  ip a\n\n  # 测试主机连通性\n  ping example.com\n\n  # 查看监听端口与对应进程\n  ss -tulnp\n\n  # 查看路由表\n  ip route\n\n  # 修改文件权限为 755\n  chmod 755 file\n\n  # 递归修改目录权限为 644\n  chmod -R 644 dir/\n\n  # 修改文件所有者为用户 user、组 group\n  chown user:group file\n\n  # 查看当前环境变量\n  env\n\n  # 临时导出环境变量\n  export MY_VAR=value\n\n  # 查看命令位置\n  which python3\n\n  # 查看命令详细路径及手册\n  whereis gcc\n\n  # 更新软件包列表（Debian/Ubuntu）\n  sudo apt update\n\n  # 升级已安装软件包\n  sudo apt upgrade -y\n\n  # 安装软件包\n  sudo apt install tree -y\n\n  # 查看命令手册\n  man ls\n\n  # 查看内置命令帮助\n  help cd\n\n  # linux中清理内存\n  sync;echo 3>/proc/sys/vm/drop_caches\n  ```",
    "category": "cloud-native",
    "createdAt": "2025-12-24T21:47:00+08:00",
    "readTime": 5,
    "cover": "",
    "likes": 9999,
    "comments": []
  }
]

// Utility: Format date in China timezone (UTC+8)
export const formatChinaDate = (isoString: string, locale: string = 'zh'): string => {
  const date = new Date(isoString)
  return date.toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-US', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Utility: Format datetime in China timezone
export const formatChinaDateTime = (isoString: string, locale: string = 'zh'): string => {
  const date = new Date(isoString)
  return date.toLocaleString(locale === 'zh' ? 'zh-CN' : 'en-US', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Utility: Get relative time in China timezone
export const getRelativeTime = (isoString: string, locale: string = 'zh'): string => {
  const now = new Date()
  const date = new Date(isoString)
  const diffMs = now.getTime() - date.getTime()
  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHour = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHour / 24)
  const diffWeek = Math.floor(diffDay / 7)
  const diffMonth = Math.floor(diffDay / 30)
  const diffYear = Math.floor(diffDay / 365)

  if (locale === 'zh') {
    if (diffSec < 60) return '刚刚'
    if (diffMin < 60) return `${diffMin} 分钟前`
    if (diffHour < 24) return `${diffHour} 小时前`
    if (diffDay < 7) return `${diffDay} 天前`
    if (diffWeek < 4) return `${diffWeek} 周前`
    if (diffMonth < 12) return `${diffMonth} 个月前`
    return `${diffYear} 年前`
  } else {
    if (diffSec < 60) return 'just now'
    if (diffMin < 60) return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`
    if (diffHour < 24) return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`
    if (diffDay < 7) return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`
    if (diffWeek < 4) return `${diffWeek} week${diffWeek > 1 ? 's' : ''} ago`
    if (diffMonth < 12) return `${diffMonth} month${diffMonth > 1 ? 's' : ''} ago`
    return `${diffYear} year${diffYear > 1 ? 's' : ''} ago`
  }
}
