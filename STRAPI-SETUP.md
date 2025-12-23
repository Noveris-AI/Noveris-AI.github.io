# Noveris Blog - Strapi CMS 部署指南

## 架构说明

```
┌─────────────────────────────────────────────────────────────┐
│                      GitHub Pages                            │
│                   (Vue 前端静态托管)                          │
│                 passion-lab.github.io                        │
└──────────────────────────┬──────────────────────────────────┘
                           │ API 请求
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                     你的服务器                               │
│              Docker: Strapi CMS (端口 1337)                  │
│                   数据库 + 图片存储                          │
└─────────────────────────────────────────────────────────────┘
```

- **前端**：GitHub Pages 托管，自动部署
- **后端**：Strapi CMS，Docker 运行在你的服务器
- **实时更新**：前端每30秒自动检查内容更新

---

## 第一步：部署 Strapi 后端

### 1.1 准备服务器

需要一台有公网 IP 的服务器，安装 Docker 和 Docker Compose。

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install docker.io docker-compose -y
sudo systemctl enable docker
```

### 1.2 上传文件到服务器

将以下文件上传到服务器：

```
/your-path/
├── docker-compose.yml
└── strapi-config/
    └── middlewares.js
```

### 1.3 启动 Strapi

```bash
cd /your-path
docker-compose up -d

# 查看日志（首次启动需要几分钟）
docker-compose logs -f strapi
```

### 1.4 创建管理员账户

访问 `http://你的服务器IP:1337/admin`，创建管理员账户。

### 1.5 配置 CORS（重要！）

Strapi 初始化完成后，需要配置 CORS 允许 GitHub Pages 访问：

```bash
# 复制 CORS 配置
cp strapi-config/middlewares.js strapi/config/middlewares.js

# 重启 Strapi
docker-compose restart strapi
```

编辑 `strapi/config/middlewares.js`，确保 origin 包含你的域名：

```javascript
{
  name: 'strapi::cors',
  config: {
    origin: [
      'https://passion-lab.github.io',  // 你的 GitHub Pages
      // 'https://blog.your-domain.com',  // 自定义域名
    ]
  }
}
```

### 1.6 创建内容类型

在 Strapi 管理面板中创建：

#### Category（分类）

| 字段 | 类型 | 说明 |
|------|------|------|
| name | Text | 英文名 |
| nameZh | Text | 中文名 |
| slug | UID (基于 name) | URL 标识 |
| icon | Text | Emoji |
| color | Text | 颜色代码 |

#### Post（文章）

| 字段 | 类型 | 说明 |
|------|------|------|
| title | Text | 英文标题 |
| titleZh | Text | 中文标题 |
| slug | UID (基于 title) | URL 标识 |
| excerpt | Text (Long) | 英文摘要 |
| excerptZh | Text (Long) | 中文摘要 |
| content | Rich Text | 英文内容 |
| contentZh | Rich Text | 中文内容 |
| readTime | Number | 阅读时间 |
| likes | Number | 点赞数 |
| category | Relation (多对一) | 关联分类 |
| cover | Media | 封面图 |

### 1.7 配置 API 权限

Settings → Roles → Public → 勾选：
- Post: find, findOne
- Category: find, findOne

---

## 第二步：配置前端

### 2.1 设置 Strapi URL

编辑 `.env` 文件：

```env
# 替换为你的服务器地址
VITE_STRAPI_URL=http://你的服务器IP:1337
```

### 2.2 构建并部署

```bash
npm run build
git add .
git commit -m "Update Strapi URL"
git push
```

GitHub Actions 会自动部署到 GitHub Pages。

---

## HTTPS 配置（推荐）

GitHub Pages 使用 HTTPS，如果 Strapi 使用 HTTP，浏览器会阻止混合内容。

### 方案 1：Cloudflare Tunnel（推荐，免费）

```bash
# 安装 cloudflared
curl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -o cloudflared
chmod +x cloudflared
sudo mv cloudflared /usr/local/bin/

# 登录并创建隧道
cloudflared tunnel login
cloudflared tunnel create strapi-tunnel
cloudflared tunnel route dns strapi-tunnel api.your-domain.com

# 运行隧道
cloudflared tunnel --url http://localhost:1337 run strapi-tunnel
```

### 方案 2：Nginx + Let's Encrypt

```bash
# 安装 nginx 和 certbot
sudo apt install nginx certbot python3-certbot-nginx -y

# 配置 nginx
sudo nano /etc/nginx/sites-available/strapi
```

```nginx
server {
    listen 80;
    server_name api.your-domain.com;

    location / {
        proxy_pass http://localhost:1337;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# 启用配置并获取证书
sudo ln -s /etc/nginx/sites-available/strapi /etc/nginx/sites-enabled/
sudo certbot --nginx -d api.your-domain.com
```

---

## 添加分类（示例数据）

在 Strapi Content Manager 中添加：

| name | nameZh | slug | icon | color |
|------|--------|------|------|-------|
| Artificial Intelligence | 人工智能 | ai | 🤖 | #0d9488 |
| Cloud Native | 云原生 | cloud-native | ☁️ | #0ea5e9 |
| Development | 开发 | development | 💻 | #8b5cf6 |
| Large Language Models | 大语言模型 | llm | 🧠 | #f59e0b |

---

## 写文章

1. 访问 Strapi 管理面板
2. Content Manager → Post → Create new entry
3. 填写中英文内容
4. 上传封面图
5. 选择分类
6. 点击 Publish

前端会在 30 秒内自动显示新文章！

---

## 数据备份与迁移

### 备份

```bash
# 备份整个数据目录
tar -czf strapi-backup.tar.gz strapi/
```

### 迁移到新服务器

```bash
# 在新服务器上
tar -xzf strapi-backup.tar.gz
docker-compose up -d
```

---

## 常见问题

### Q: 图片无法显示？

确保 `.env` 中的 `VITE_STRAPI_URL` 正确，图片 URL 会自动拼接。

### Q: API 请求被阻止？

检查 Strapi 的 CORS 配置是否包含你的 GitHub Pages 域名。

### Q: 如何更新 Strapi？

```bash
docker-compose pull
docker-compose up -d
```

### Q: 更换服务器后数据还在吗？

只要保留 `strapi/` 目录，数据就会保留。SQLite 数据库在 `strapi/.tmp/data.db`。
