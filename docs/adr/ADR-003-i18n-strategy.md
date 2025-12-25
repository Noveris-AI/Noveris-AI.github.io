# ADR-003: Internationalization (i18n) Strategy

## Status
**Accepted**

## Date
2025-12-25

## Context

Noveris Blog 需要支持中英双语。国际化策略需要解决两个层面的问题：

### 1. UI 文案国际化
- 导航、按钮、提示信息等界面文字
- 相对简单，标准方案成熟

### 2. 内容国际化
- 博客文章、项目介绍等长文本
- 更复杂，涉及翻译管理和内容同步

### 可选方案

**UI 文案方案**:
- @nuxtjs/i18n: Nuxt 生态标准方案，功能完善

**内容国际化方案**:

A. **单文件双语字段**
```yaml
---
title: "English Title"
titleZh: "中文标题"
content: "English content..."
contentZh: "中文内容..."
---
```
- 优点：一个文件管理所有语言，不会遗漏
- 缺点：文件变大，编辑体验差，难以独立发布某一语言版本

B. **多目录分离**
```
content/
├── blog/
│   ├── en/
│   │   └── article-1.md
│   └── zh/
│       └── article-1.md
```
- 优点：文件清晰，适合不同语言独立迭代
- 缺点：需要维护映射关系，可能出现内容不同步

C. **混合方案**
- UI 文案：JSON 文件，严格双语
- 短内容（分类、标签）：单文件双语字段
- 长内容（文章）：多目录分离，通过 slug 关联

## Decision

**选择方案 C: 混合方案**

### 理由

1. **UI 文案**: 使用 @nuxtjs/i18n 的 JSON 文件，严格保证所有界面文字都有翻译
2. **元数据内容**: 分类、标签、作者等使用双语字段，便于一次性管理
3. **长文本内容**: 文章使用目录分离，允许独立迭代，通过 i18n 字段关联

## Implementation

### 目录结构

```
noveris-blog-nuxt/
├── i18n/
│   └── locales/
│       ├── en.json      # 英文 UI 文案
│       └── zh.json      # 中文 UI 文案
├── content/
│   ├── blog/
│   │   ├── en/          # 英文文章
│   │   │   └── *.md
│   │   └── zh/          # 中文文章（主要）
│   │       └── *.md
│   ├── categories/      # 分类（双语字段）
│   │   └── *.json
│   ├── tags/            # 标签（双语字段）
│   │   └── *.json
│   └── authors/         # 作者（双语字段）
│       └── *.json
```

### 文章多语言关联

```yaml
# content/blog/zh/nuxt-migration.md
---
title: "迁移到 Nuxt 4"
slug: "nuxt-migration"
i18n:
  en: "/en/blog/nuxt-migration"   # 英文版本路径
---

# content/blog/en/nuxt-migration.md
---
title: "Migrating to Nuxt 4"
slug: "nuxt-migration"
i18n:
  zh: "/blog/nuxt-migration"      # 中文版本路径（默认语言无前缀）
---
```

### 元数据双语字段

```json
// content/categories/ai.json
{
  "id": "ai",
  "name": {
    "en": "Artificial Intelligence",
    "zh": "人工智能"
  },
  "description": {
    "en": "Articles about AI and machine learning",
    "zh": "关于人工智能和机器学习的文章"
  }
}
```

### @nuxtjs/i18n 配置

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.json', name: 'English' },
      { code: 'zh', iso: 'zh-CN', file: 'zh.json', name: '中文' },
    ],
    defaultLocale: 'zh',
    strategy: 'prefix_except_default',
    langDir: 'i18n/locales',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_locale',
      fallbackLocale: 'zh',
    },
  },
})
```

### 翻译优先级

1. **必翻清单** (Must Translate):
   - 关于页面 (About)
   - 精选文章 (Featured Posts)
   - 系列导读 (Series Introduction)
   - 导航和页脚

2. **按需翻译** (On Demand):
   - 技术文章（优先翻译高访问量文章）
   - 知识库内容

3. **不翻译** (Keep Original):
   - 代码片段
   - 评论内容
   - 外部引用

### 回退策略

当某语言版本不存在时：
1. 显示原始语言版本
2. 添加提示："此内容暂无 [目标语言] 版本"
3. 提供语言切换入口

## Consequences

### 正向影响
- 灵活的内容管理，长短内容使用最适合的方案
- UI 文案严格双语，用户体验一致
- 允许内容按需翻译，降低维护成本

### 负向影响
- 混合方案增加了复杂度
- 需要维护多语言映射关系
- 需要在 CI 中校验翻译完整性

### 未来优化
- 集成 AI 翻译辅助（如 DeepL API）
- 建立翻译状态追踪系统
- 社区贡献翻译流程

## Related Documents
- ADR-001: Content Source of Truth
- @nuxtjs/i18n 文档: https://i18n.nuxtjs.org
