# ADR-001: Content Source of Truth

## Status
**Accepted**

## Date
2025-12-25

## Context

Noveris Blog 需要选择一个内容管理方案作为"单一真相源"。当前存在两种主要路径：

### 方案 A: Git-based 内容管理
- **描述**: 内容以 Markdown/JSON 文件形式存储在 Git 仓库中
- **CMS**: Sveltia CMS (Netlify/Decap CMS 的现代替代)
- **部署**: GitHub Pages 静态托管
- **优点**:
  - 内容与代码同仓库，便于版本管理和审计
  - 零运维成本，无需数据库
  - 天然支持 Git 工作流（PR 审核、分支预览）
  - 完美适配 GitHub Pages 静态部署
- **缺点**:
  - 复杂字段关系需要手动约束
  - 高频写入场景不适合（如评论、点赞）
  - 搜索/推荐等动态功能需要额外方案

### 方案 B: Headless CMS (Strapi)
- **描述**: 使用 Strapi 作为后端 CMS，数据库存储内容
- **部署**: 需要独立服务器/云服务托管 Strapi
- **优点**:
  - 结构化内容管理，强大的关系支持
  - 内置权限、工作流、媒体管理
  - 更接近"企业级 CMS"标准
- **缺点**:
  - 运维成本高（需要数据库、服务器）
  - 与 GitHub Pages 纯静态托管存在架构鸿沟
  - 密钥和环境变量管理复杂度增加

## Decision

**选择方案 A: Git-based 内容管理**

### 理由

1. **部署目标明确**: 项目使用 GitHub Pages 作为前台托管，Git-based 方案与其天然适配
2. **成本考量**: 个人技术博客不需要企业级 CMS 的复杂功能，零运维成本更实际
3. **版本控制优势**: 技术博客内容变更需要可追溯，Git 提供完整的变更历史
4. **渐进式升级**: 保留向 Strapi 迁移的可能性，但不作为当前优先级

### 迁移策略

当满足以下条件时，可考虑迁移到方案 B:
- 需要多租户/多作者权限管理
- 需要复杂的内容关系和工作流
- 需要实时协作编辑功能
- 愿意承担额外的运维成本

## Consequences

### 正向影响
- 简化部署流程，CI/CD 只需构建静态文件
- 内容更新通过 Git commit 完成，有完整审计轨迹
- 前端框架（Nuxt Content）直接读取本地文件，无网络延迟

### 负向影响
- 评论、点赞等动态功能需要外部服务（选择 Giscus）
- 搜索功能需要独立方案（选择 Meilisearch）
- 大量媒体文件会增加仓库体积（建议使用 CDN 或外链）

### 技术约束
1. **内容模型需要严格规范**: 使用 Schema 定义 Frontmatter 字段，CI 中校验
2. **多语言映射需要手动维护**: 建立 zh/en 内容对照机制
3. **媒体资源统一管理**: 建立 `/public/images/` 规范，避免资源散落

## Related Documents
- ADR-002: Search Strategy
- ADR-003: i18n Strategy
- 内容模型 Schema 规范
