# Deployment Guide

本目录包含部署 `关系修复助手` 所需的配置文件和脚本。

## 📁 目录结构

```
deploy/
├── docker-compose.yml          # Docker Compose 配置（完整服务）
├── .env.example                # 环境变量模板
├── init-scripts/               # 数据库初始化脚本
│   └── 01-init-db.sh          # PostgreSQL 初始化
├── postgres/                   # PostgreSQL 数据和配置
│   ├── config/                # PostgreSQL 配置文件
│   │   └── postgresql.conf    # 优化的数据库配置
│   └── data/                  # 数据库数据（自动生成）
├── redis/                      # Redis 数据（自动生成）
└── pgadmin/                   # PgAdmin 数据（自动生成）
```

## 🚀 快速开始

### 1. 配置环境变量

```bash
# 复制环境变量模板
cp .env.example .env

# 编辑 .env 文件，设置你的密码
nano .env
```

**重要**：修改以下密码为强密码：
- `POSTGRES_PASSWORD`
- `REDIS_PASSWORD`
- `PGADMIN_PASSWORD`

### 2. 启动服务

#### 基础服务（PostgreSQL + Redis）
```bash
docker-compose up -d
```

#### 包含管理工具（PostgreSQL + Redis + PgAdmin + Redis Commander）
```bash
docker-compose --profile admin up -d
```

### 3. 查看日志

```bash
# 查看所有服务日志
docker-compose logs -f

# 查看特定服务日志
docker-compose logs -f postgres
docker-compose logs -f redis
```

### 4. 停止服务

```bash
# 停止服务
docker-compose down

# 停止并删除数据卷（⚠️ 会删除所有数据）
docker-compose down -v
```

## 🗄️ 访问管理界面

### PgAdmin（PostgreSQL 管理）

1. 启动时包含 `--profile admin`
2. 访问：http://localhost:5050
3. 登录凭证（在 `.env` 中配置）：
   - Email: `PGADMIN_EMAIL`
   - Password: `PGADMIN_PASSWORD`

#### 添加服务器连接

在 PgAdmin 中：
1. 点击 "Add New Server"
2. General → Name: `relationship_repair_db`
3. Connection → Host name/address: `postgres`
4. Port: `5432`
5. Username: `POSTGRES_USER`
6. Password: `POSTGRES_PASSWORD`

### Redis Commander（Redis 管理）

1. 启动时包含 `--profile admin`
2. 访问：http://localhost:8081

## 📊 数据库迁移

### 方法 1：使用 Prisma CLI

```bash
# 从项目根目录
cd ..

# 设置数据库连接
export DATABASE_URL="postgresql://postgres:your_password@localhost:5432/relationship_repair?schema=public"

# 推送 schema
pnpm db:push

# 或运行 migration
pnpm db:migrate

# （可选）填充种子数据
pnpm db:seed
```

### 方法 2：在容器内执行

```bash
# 进入 PostgreSQL 容器
docker-compose exec postgres sh

# 安装 Prisma CLI（如果没有）
npm install -g prisma

# 运行迁移
cd /app
prisma db push
```

## 🔧 配置说明

### PostgreSQL 配置

文件：`postgres/config/postgresql.conf`

优化设置：
- **内存使用**：根据服务器内存调整 `shared_buffers`
- **连接数**：`max_connections = 100`
- **WAL 设置**：优化写入性能
- **日志记录**：记录关键操作

### 性能调优

如果你的服务器有更多资源：

```conf
# For 4GB RAM server
shared_buffers = 1GB
effective_cache_size = 3GB
maintenance_work_mem = 256MB
work_mem = 64MB

# For 8GB RAM server
shared_buffers = 2GB
effective_cache_size = 6GB
maintenance_work_mem = 512MB
work_mem = 128MB
```

## 🔄 备份与恢复

### 备份数据库

```bash
# 创建备份目录
mkdir -p backups

# 备份数据库
docker-compose exec postgres pg_dump \
  -U postgres \
  -d relationship_repair \
  --clean \
  --if-exists \
  > backups/backup_$(date +%Y%m%d_%H%M%S).sql
```

### 恢复数据库

```bash
# 从备份恢复
docker-compose exec -T postgres psql \
  -U postgres \
  -d relationship_repair \
  < backups/backup_20240101_120000.sql
```

### 定时备份（使用 cron）

```bash
# 编辑 crontab
crontab -e

# 每天凌晨 2 点自动备份
0 2 * * * cd /path/to/deploy && docker-compose exec -T postgres pg_dump -U postgres relationship_repair --clean > backups/backup_$(date +\%Y\%m\%d).sql
```

## 🔒 安全建议

### 生产环境

1. **更改默认密码**
   ```bash
   # 生成强密码
   openssl rand -base64 32
   ```

2. **限制网络访问**
   - 不要暴露 PostgreSQL 到公网
   - 使用防火墙限制访问
   - 仅允许来自应用服务器的连接

3. **启用 SSL/TLS**
   - 配置 PostgreSQL SSL 连接
   - 使用证书验证

4. **定期备份**
   - 自动化每日备份
   - 测试恢复流程
   - 存储备份到异地

5. **监控**
   - 监控数据库性能
   - 设置告警
   - 定期检查日志

## 🌐 与主应用集成

在主应用的 `.env.local` 中：

```env
# Database
DATABASE_URL="postgresql://postgres:your_secure_password_here@localhost:5432/relationship_repair?schema=public"

# Redis
REDIS_URL="redis://localhost:6379"
REDIS_PASSWORD="your_redis_password_here"

# AI Provider
ANTHROPIC_API_KEY="sk-ant-..."
```

然后启动应用：

```bash
# 在项目根目录
pnpm dev
```

## 📱 健康检查

检查服务状态：

```bash
# 检查 PostgreSQL
docker-compose exec postgres pg_isready -U postgres

# 检查 Redis
docker-compose exec redis redis-cli ping

# 查看服务状态
docker-compose ps
```

## 🛠️ 故障排查

### PostgreSQL 无法启动

```bash
# 查看日志
docker-compose logs postgres

# 检查数据目录权限
ls -la postgres/data/

# 重建容器（⚠️ 数据会丢失）
docker-compose down -v
docker-compose up -d
```

### 连接被拒绝

1. 检查端口是否被占用：
   ```bash
   lsof -i :5432
   ```

2. 检查防火墙设置

3. 确认 DATABASE_URL 正确

### 性能问题

1. 查看 PostgreSQL 统计：
   ```sql
   SELECT * FROM pg_stat_statements ORDER BY total_time DESC LIMIT 10;
   ```

2. 检查连接数：
   ```sql
   SELECT count(*) FROM pg_stat_activity;
   ```

3. 分析慢查询：
   ```sql
   SELECT query, mean_exec_time, calls
   FROM pg_stat_statements
   ORDER BY mean_exec_time DESC
   LIMIT 10;
   ```

## 📚 更多资源

- [PostgreSQL 官方文档](https://www.postgresql.org/docs/)
- [Docker Compose 文档](https://docs.docker.com/compose/)
- [PgAdmin 文档](https://www.pgadmin.org/docs/)
- [Prisma 部署指南](https://www.prisma.io/docs/guides/deployment)

## 🆘 获取帮助

如有问题，请：
1. 检查日志：`docker-compose logs`
2. 查看主项目 README.md
3. 提交 GitHub Issue
