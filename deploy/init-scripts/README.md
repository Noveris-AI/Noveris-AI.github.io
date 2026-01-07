# Init Scripts

此目录包含在 PostgreSQL 容器首次启动时自动执行的初始化脚本。

## 📜 脚本执行顺序

脚本按文件名字母顺序执行：

1. `01-init-db.sh` - 初始化数据库、创建扩展、设置权限

## 🔧 添加新脚本

1. 创建新脚本文件，命名格式：`NN-description.sh`
   - `NN`：两位数字，决定执行顺序
   - `description`：简短描述

2. 确保脚本可执行：
   ```bash
   chmod +x init-scripts/02-your-script.sh
   ```

3. 重新创建容器：
   ```bash
   docker-compose down -v
   docker-compose up -d
   ```

## ⚠️ 注意事项

- 脚本仅在容器首次启动时执行
- 如果需要重新执行，必须删除卷并重建：
  ```bash
  docker-compose down -v
  docker-compose up -d
  ```
- 脚本以 `postgres` 用户执行
- 使用 `psql` 命令执行 SQL 时：
  - 变量会自动替换为环境变量值
  - 使用 `psql -v ON_ERROR_STOP=1` 确保错误时停止

## 📝 示例脚本

### 创建自定义表

`02-create-tables.sh`：

```bash
#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    -- 创建自定义表
    CREATE TABLE IF NOT EXISTS custom_table (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    SELECT 'Custom table created!' AS status;
EOSQL
```

### 插入初始数据

`03-seed-data.sh`：

```bash
#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    -- 插入示例数据
    INSERT INTO custom_table (name) VALUES
        ('Example 1'),
        ('Example 2')
    ON CONFLICT DO NOTHING;

    SELECT 'Seed data inserted!' AS status;
EOSQL
```

### 创建数据库用户

`04-create-users.sh`：

```bash
#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    -- 创建只读用户
    CREATE USER readonly_user WITH PASSWORD 'secure_password';
    GRANT CONNECT ON DATABASE $POSTGRES_DB TO readonly_user;
    GRANT USAGE ON SCHEMA public TO readonly_user;
    GRANT SELECT ON ALL TABLES IN SCHEMA public TO readonly_user;

    -- 自动授予未来新表的 SELECT 权限
    ALTER DEFAULT PRIVILEGES IN SCHEMA public
        GRANT SELECT ON TABLES TO readonly_user;

    SELECT 'Read-only user created!' AS status;
EOSQL
```
