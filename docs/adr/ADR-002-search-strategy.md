# ADR-002: Search Strategy

## Status
**Accepted**

## Date
2025-12-25

## Context

Noveris Blog 需要实现站内搜索功能。Git-based 内容管理方案（见 ADR-001）下，有以下选择：

### 方案 A: 静态索引 (FlexSearch/Lunr)
- **描述**: 构建时生成 JSON 索引文件，前端纯静态搜索
- **优点**:
  - 零运维成本
  - 无外部依赖
  - 完全离线可用
- **缺点**:
  - 索引文件可能较大
  - 中文分词能力有限
  - 缺乏高级搜索功能（拼写纠错、同义词等）

### 方案 B: Meilisearch
- **描述**: 开源搜索引擎，提供云托管服务
- **优点**:
  - 开箱即用的中文分词支持
  - 强大的搜索功能（typo tolerance, filters, facets）
  - Meilisearch Cloud 有免费层（10K 文档，100K 搜索/月）
  - Rust 实现，性能优异
- **缺点**:
  - 依赖外部服务
  - 需要管理 API Key
  - 免费层有限制

### 方案 C: Algolia
- **描述**: 商业搜索服务，行业领先
- **优点**:
  - 功能最强大，文档最完善
  - 开源项目有免费额度
- **缺点**:
  - 免费层限制严格（10K 请求/月）
  - 商业版价格较高
  - 数据存储在海外

### 方案 D: 简单过滤
- **描述**: 前端直接过滤文章数组
- **优点**: 最简单，无额外依赖
- **缺点**: 只适合文章数量很少的情况

## Decision

**选择方案 B: Meilisearch**

### 理由

1. **中文支持**: 开箱即用的中文分词，无需额外配置
2. **免费额度充足**: 个人博客 10K 文档绰绰有余
3. **开源优势**: 如需要可自行部署，不被云服务锁定
4. **开发体验**: 官方 SDK 完善，与 Nuxt 集成简单

## Implementation

### 索引 Schema

```json
{
  "uid": "posts",
  "primaryKey": "slug",
  "searchableAttributes": [
    "title",
    "titleZh",
    "description",
    "descriptionZh",
    "content",
    "contentZh",
    "tags"
  ],
  "filterableAttributes": [
    "category",
    "tags",
    "status",
    "locale"
  ],
  "sortableAttributes": [
    "publishedAt",
    "readTime"
  ],
  "displayedAttributes": [
    "slug",
    "title",
    "titleZh",
    "description",
    "descriptionZh",
    "category",
    "tags",
    "publishedAt",
    "readTime",
    "cover"
  ]
}
```

### 索引更新流程

```
Content Update (Git Push)
         ↓
   GitHub Actions
         ↓
   Build Nuxt Site
         ↓
  Update Meilisearch Index
         ↓
   Deploy to GitHub Pages
```

### 环境变量

```env
# 公开（搜索用）
NUXT_PUBLIC_MEILISEARCH_HOST=https://xxx.meilisearch.com
NUXT_PUBLIC_MEILISEARCH_SEARCH_KEY=xxx

# 私密（索引用，仅 CI）
NUXT_MEILISEARCH_API_KEY=xxx
```

## Consequences

### 正向影响
- 用户获得高质量的搜索体验
- 支持高级搜索（过滤、排序、高亮）
- 中英文内容都能被有效检索

### 负向影响
- 引入外部服务依赖
- 需要在 CI 中维护索引同步逻辑
- 需要管理 API Key（存储在 GitHub Secrets）

### 回退方案
如 Meilisearch 服务不可用：
1. 短期：提示用户使用浏览器搜索 (Ctrl+F)
2. 长期：回退到方案 A（静态索引）

## Related Documents
- ADR-001: Content Source of Truth
- Meilisearch 官方文档: https://docs.meilisearch.com
