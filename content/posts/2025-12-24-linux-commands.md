---
title: Linux Commands
titleZh: Linux 命令
slug: linux-commands
excerpt: Essential Linux command line reference for system administration and daily operations
excerptZh: Linux 系统管理和日常操作的基本命令行参考
content: |-
  ```plain
  # 列出当前目录中的文件和子目录
  ls

  # 显示当前工作目录的完整路径
  pwd

  # 切换目录到 /home/user
  cd /home/user

  # 返回上一级目录
  cd ..

  # 创建新目录 mydir
  mkdir mydir

  # 递归创建多级目录 a/b/c
  mkdir -p a/b/c

  # 删除空目录 mydir
  rmdir mydir

  # 强制递归删除目录及其内容（慎用）
  rm -rf mydir

  # 复制文件 file1 为 file2
  cp file1 file2

  # 递归复制目录 dir1 到 dir2
  cp -r dir1 dir2

  # 移动/重命名文件 old 为 new
  mv old new

  # 强制删除文件 file
  rm -f file

  # 查看文件内容（适合小文件）
  cat file

  # 分页查看文件内容（空格翻页，q 退出）
  less file

  # 实时滚动查看文件最新内容
  tail -f file

  # 创建空文件 newfile
  touch newfile

  # 输出文本 Hello
  echo "Hello"

  # 将标准输出重定向到文件（覆盖）
  echo "Hello" > out.txt

  # 将标准输出追加到文件
  echo "World" >> out.txt

  # 查看命令历史记录
  history

  # 清屏
  clear

  # 显示当前用户
  whoami

  # 显示系统运行时间、负载等信息
  uptime

  # 查看磁盘使用情况
  df -h

  # 查看目录/文件大小
  du -sh /path

  # 查看内存使用情况
  free -h

  # 查看进程快照
  ps aux

  # 实时查看进程与系统资源
  top

  # 根据名称查找文件
  find / -name "*.conf"

  # 在文件内搜索字符串
  grep "pattern" file

  # 打包目录为 tar 包
  tar -cvf archive.tar dir/

  # 解包 tar 包
  tar -xvf archive.tar

  # 打包并 gzip 压缩
  tar -czvf archive.tar.gz dir/

  # 解压 .tar.gz 包
  tar -xzvf archive.tar.gz

  # 下载文件
  wget http://example.com/file

  # 查看当前网络接口与地址
  ip a

  # 测试主机连通性
  ping example.com

  # 查看监听端口与对应进程
  ss -tulnp

  # 查看路由表
  ip route

  # 修改文件权限为 755
  chmod 755 file

  # 递归修改目录权限为 644
  chmod -R 644 dir/

  # 修改文件所有者为用户 user、组 group
  chown user:group file

  # 查看当前环境变量
  env

  # 临时导出环境变量
  export MY_VAR=value

  # 查看命令位置
  which python3

  # 查看命令详细路径及手册
  whereis gcc

  # 更新软件包列表（Debian/Ubuntu）
  sudo apt update

  # 升级已安装软件包
  sudo apt upgrade -y

  # 安装软件包
  sudo apt install tree -y

  # 查看命令手册
  man ls

  # 查看内置命令帮助
  help cd

  # linux中清理内存
  sync;echo 3>/proc/sys/vm/drop_caches
  ```
contentZh: |-
  ```plain
  # 列出当前目录中的文件和子目录
  ls

  # 显示当前工作目录的完整路径
  pwd

  # 切换目录到 /home/user
  cd /home/user

  # 返回上一级目录
  cd ..

  # 创建新目录 mydir
  mkdir mydir

  # 递归创建多级目录 a/b/c
  mkdir -p a/b/c

  # 删除空目录 mydir
  rmdir mydir

  # 强制递归删除目录及其内容（慎用）
  rm -rf mydir

  # 复制文件 file1 为 file2
  cp file1 file2

  # 递归复制目录 dir1 到 dir2
  cp -r dir1 dir2

  # 移动/重命名文件 old 为 new
  mv old new

  # 强制删除文件 file
  rm -f file

  # 查看文件内容（适合小文件）
  cat file

  # 分页查看文件内容（空格翻页，q 退出）
  less file

  # 实时滚动查看文件最新内容
  tail -f file

  # 创建空文件 newfile
  touch newfile

  # 输出文本 Hello
  echo "Hello"

  # 将标准输出重定向到文件（覆盖）
  echo "Hello" > out.txt

  # 将标准输出追加到文件
  echo "World" >> out.txt

  # 查看命令历史记录
  history

  # 清屏
  clear

  # 显示当前用户
  whoami

  # 显示系统运行时间、负载等信息
  uptime

  # 查看磁盘使用情况
  df -h

  # 查看目录/文件大小
  du -sh /path

  # 查看内存使用情况
  free -h

  # 查看进程快照
  ps aux

  # 实时查看进程与系统资源
  top

  # 根据名称查找文件
  find / -name "*.conf"

  # 在文件内搜索字符串
  grep "pattern" file

  # 打包目录为 tar 包
  tar -cvf archive.tar dir/

  # 解包 tar 包
  tar -xvf archive.tar

  # 打包并 gzip 压缩
  tar -czvf archive.tar.gz dir/

  # 解压 .tar.gz 包
  tar -xzvf archive.tar.gz

  # 下载文件
  wget http://example.com/file

  # 查看当前网络接口与地址
  ip a

  # 测试主机连通性
  ping example.com

  # 查看监听端口与对应进程
  ss -tulnp

  # 查看路由表
  ip route

  # 修改文件权限为 755
  chmod 755 file

  # 递归修改目录权限为 644
  chmod -R 644 dir/

  # 修改文件所有者为用户 user、组 group
  chown user:group file

  # 查看当前环境变量
  env

  # 临时导出环境变量
  export MY_VAR=value

  # 查看命令位置
  which python3

  # 查看命令详细路径及手册
  whereis gcc

  # 更新软件包列表（Debian/Ubuntu）
  sudo apt update

  # 升级已安装软件包
  sudo apt upgrade -y

  # 安装软件包
  sudo apt install tree -y

  # 查看命令手册
  man ls

  # 查看内置命令帮助
  help cd

  # linux中清理内存
  sync;echo 3>/proc/sys/vm/drop_caches
  ```
category: cloud-native
cover: ''
readTime: 5
publishedAt: 2025-12-24T21:47:00+08:00
likes: 9999
---

