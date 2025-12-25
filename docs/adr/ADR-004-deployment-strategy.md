# ADR-004: Deployment Strategy

## Status
**Accepted**

## Date
2025-12-25

## Context

Noveris Blog 需要确定部署策略。项目涉及以下组件：

1. **前端静态站点**: Nuxt 生成的 HTML/CSS/JS
2. **API 功能**: 联系表单、搜索代理等
3. **OAuth 认证**: CMS 登录需要的 GitHub OAuth

### 当前架构

- 前端: GitHub Pages (noveris-ai.github.io)
- API: Vercel Functions (noveris-blog-auth.vercel.app)
- 搜索: Meilisearch Cloud

### 部署方案对比

**方案 A: 全部 GitHub Pages**
- 前端静态文件托管在 GitHub Pages
- 无法运行服务端代码
- API 功能需要外部服务

**方案 B: 全部 Vercel**
- 前端 + API 统一部署
- 支持 Edge Functions
- 免费层有 100GB 带宽限制

**方案 C: 混合部署 (当前方案)**
- 前端: GitHub Pages (无带宽限制，适合静态资源)
- API: Vercel Functions (支持服务端逻辑)
- 各司其职，最大化利用免费资源

## Decision

**选择方案 C: 混合部署**

### 理由

1. **成本优化**: GitHub Pages 无带宽限制，适合托管静态资源
2. **功能分离**: API 功能相对简单，Vercel Functions 免费层足够
3. **现有基础**: 当前架构已经是混合部署，无需大幅调整
4. **灵活性**: 未来可以方便地迁移任一组件

## Implementation

### 架构图

```
┌──────────────────────────────────────────────────────────────┐
│                        用户浏览器                             │
└──────────────────────────┬───────────────────────────────────┘
                           │
           ┌───────────────┼───────────────┐
           │               │               │
           ▼               ▼               ▼
┌──────────────────┐ ┌──────────┐ ┌────────────────┐
│  GitHub Pages    │ │  Vercel  │ │ Meilisearch    │
│  (前端静态站点)   │ │  (API)   │ │ (搜索服务)      │
│                  │ │          │ │                │
│ noveris-ai.      │ │ api/     │ │ xxx.meilisearch│
│ github.io        │ │ contact  │ │ .com           │
│                  │ │ auth     │ │                │
└──────────────────┘ └──────────┘ └────────────────┘
         │                │               │
         │                │               │
         ▼                ▼               ▼
┌──────────────────────────────────────────────────────────────┐
│                    GitHub Repository                          │
│                 (noveris-ai.github.io)                       │
└──────────────────────────────────────────────────────────────┘
```

### GitHub Pages 配置

**部署方式**: GitHub Actions → 静态文件 → Pages

**关键配置**:
- 用户/组织站点 (username.github.io)
- 从 main 分支根目录部署
- 自定义域名可选 (CNAME)

**构建输出**:
```
.output/public/
├── index.html
├── blog/
│   ├── index.html
│   └── [slug]/index.html
├── _nuxt/
│   └── [hashed files]
├── sitemap.xml
├── rss.xml
└── robots.txt
```

### Vercel Functions 配置

**vercel.json**:
```json
{
  "functions": {
    "api/auth.js": {
      "memory": 1024,
      "maxDuration": 10
    },
    "api/contact.ts": {
      "memory": 1024,
      "maxDuration": 10
    }
  },
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "https://noveris-ai.github.io"
        },
        {
          "key": "Access-Control-Allow-Methods",
          "value": "GET, POST, OPTIONS"
        }
      ]
    }
  ]
}
```

### CI/CD 流程

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  # Job 1: 代码质量检查
  lint-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run lint
      - run: npm run test:unit

  # Job 2: 构建静态站点
  build:
    needs: lint-test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run generate
      - uses: actions/upload-pages-artifact@v3
        with:
          path: .output/public

  # Job 3: 部署到 GitHub Pages
  deploy:
    needs: build
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
    steps:
      - uses: actions/deploy-pages@v4

  # Job 4: 更新搜索索引 (可选)
  index:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm run index:meilisearch
        env:
          MEILISEARCH_API_KEY: ${{ secrets.MEILISEARCH_API_KEY }}
```

### 环境分层

| 环境 | 前端 | API | 用途 |
|------|------|-----|------|
| Production | noveris-ai.github.io | api.noveris.ai | 线上环境 |
| Preview | PR 预览 (Vercel) | Vercel Preview | PR 审核 |
| Development | localhost:3000 | localhost:3000 | 本地开发 |

### 环境变量管理

**公开变量** (写入前端代码):
```env
NUXT_PUBLIC_SITE_URL=https://noveris-ai.github.io
NUXT_PUBLIC_API_URL=https://noveris-blog-auth.vercel.app
NUXT_PUBLIC_MEILISEARCH_HOST=https://xxx.meilisearch.com
NUXT_PUBLIC_MEILISEARCH_SEARCH_KEY=xxx
```

**私密变量** (仅 CI/服务端):
```env
# GitHub Secrets
MEILISEARCH_API_KEY=xxx
EMAIL_PASSWORD=xxx
GITHUB_CLIENT_SECRET=xxx
```

## Consequences

### 正向影响
- 最大化利用免费资源
- 各组件独立部署，故障隔离
- 灵活的扩展能力

### 负向影响
- 两个平台需要分别管理
- CORS 配置需要注意
- 需要维护两套部署流程

### 监控要点
- GitHub Pages: 通过 Actions 日志监控
- Vercel: 内置监控面板
- Meilisearch: Cloud 控制台

### 回退方案
如某服务不可用：
- GitHub Pages 不可用: 临时切换到 Vercel 静态托管
- Vercel 不可用: 联系表单降级为 mailto 链接
- Meilisearch 不可用: 搜索功能临时禁用

## Related Documents
- ADR-001: Content Source of Truth
- ADR-002: Search Strategy
- GitHub Pages 文档: https://docs.github.com/pages
- Vercel 文档: https://vercel.com/docs
