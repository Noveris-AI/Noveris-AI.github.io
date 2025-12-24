# Noveris Blog CMS 认证服务

这是一个用于 Sveltia CMS GitHub 认证的 serverless 函数。

## 环境变量

需要在 Vercel 中设置：
- `GITHUB_CLIENT_ID` - GitHub OAuth App Client ID
- `GITHUB_CLIENT_SECRET` - GitHub OAuth App Client Secret

## 使用方法

1. 在 GitHub 创建 OAuth App
2. 部署到 Vercel
3. 在 CMS config.yml 中配置 base_url
