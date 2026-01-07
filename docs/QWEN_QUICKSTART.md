# 阿里云通义千问快速配置

## 1. 配置 API Key（1 分钟）

在项目根目录创建 `.env.local` 文件：

```bash
# 在项目根目录执行
cat > .env.local << EOF
# 数据库（先简单配置，稍后可改）
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/relationship_repair?schema=public"

# 阿里云通义千问 API Key
QWEN_API_KEY="sk-39514bd560414a039390310e68dd86e2"

# 应用配置
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXTAUTH_SECRET="any-random-string-here-is-ok"
EOF
```

## 2. 测试连接（30 秒）

```bash
# 安装依赖（如果还没有）
pnpm install

# 测试通义千问连接
pnpm test:qwen
```

如果看到 ✅ 连接成功!，说明配置正确！

## 3. 启动数据库（1 分钟）

```bash
cd deploy
cp .env.example .env
docker-compose up -d postgres redis
cd ..
```

## 4. 初始化数据库（30 秒）

```bash
pnpm db:push
```

## 5. 启动应用（10 秒）

```bash
pnpm dev
```

访问 http://localhost:3000

## ✅ 完成！

现在可以：
1. 点击"开始使用"注册/登录
2. 创建一个测试案例
3. 查看通义千问生成的道歉方案

---

## 常见问题

**Q: 提示 API Key 无效？**
A: 检查 Key 是否正确复制，应该是 `sk-` 开头

**Q: 连接超时？**
A: 检查网络，确保能访问阿里云服务

**Q: 想切换到其他 AI？**
A: 在设置页面选择，或添加对应的 API Key

---

**详细配置文档**: [QWEN_SETUP.md](QWEN_SETUP.md)
