# 🔧 故障排查指南

## 常见问题和解决方案

---

## 1. GitHub Pages 白屏问题

### 症状
访问 https://noveris-ai.github.io/ 时偶尔出现白屏，没有任何内容显示。

### 原因分析
1. **GitHub Pages CDN 缓存问题** - CDN 节点可能缓存了旧版本
2. **Jekyll 处理干扰** - GitHub Pages 默认使用 Jekyll，可能影响资源加载
3. **资源加载失败** - JavaScript 或 CSS 文件加载失败
4. **构建产物不完整** - 部署时文件传输不完整

### 解决方案

#### 已实施的修复：

1. **添加 `.nojekyll` 文件**
   - 禁用 GitHub Pages 的 Jekyll 处理
   - 文件位置：`public/.nojekyll`
   - 构建时自动复制到 `dist/.nojekyll`

2. **改进构建配置**
   - 使用稳定的文件名哈希策略
   - 确保资源路径一致性
   - 文件：`vite.config.ts`

3. **添加错误处理**
   - 全局错误捕获
   - Vue 错误处理器
   - Promise rejection 处理
   - 文件：`src/main.ts`

4. **改进部署流程**
   - 构建完成后立即复制 404.html
   - 添加构建信息文件
   - 文件：`.github/workflows/deploy.yml`

#### 如何验证修复：

1. **强制刷新页面**
   ```
   Windows: Ctrl + F5
   Mac: Cmd + Shift + R
   Linux: Ctrl + Shift + R
   ```

2. **清除浏览器缓存**
   - Chrome: 设置 → 隐私和安全 → 清除浏览数据
   - 选择"缓存的图片和文件"
   - 时间范围选择"全部时间"

3. **检查浏览器控制台**
   - 按 F12 打开开发者工具
   - 查看 Console 标签页
   - 检查是否有错误信息

4. **检查网络请求**
   - 开发者工具 → Network 标签
   - 刷新页面
   - 查看所有资源是否正常加载（状态码 200）

5. **查看构建信息**
   - 访问：https://noveris-ai.github.io/build-info.txt
   - 查看最新构建时间
   - 确认部署成功

#### 预防措施：

1. **推送前本地测试**
   ```bash
   npm run build
   npm run preview
   ```
   访问 http://localhost:4173 测试构建产物

2. **监控 GitHub Actions**
   - 访问：https://github.com/Noveris-AI/Noveris-AI.github.io/actions
   - 确保构建和部署任务都成功完成
   - 查看日志排查问题

3. **使用浏览器隐私模式测试**
   - 隐私模式不使用缓存
   - 能准确反映最新部署状态

#### 应急方案：

如果白屏持续出现：

1. **手动触发重新部署**
   ```bash
   git commit --allow-empty -m "Trigger rebuild"
   git push
   ```

2. **等待 CDN 缓存刷新**
   - GitHub Pages CDN 缓存通常 10-30 分钟刷新
   - 不同地区可能时间不同

3. **使用 GitHub Actions 重新运行**
   - 访问 Actions 页面
   - 选择最新的工作流
   - 点击 "Re-run all jobs"

---

## 2. 管理后台 404 错误

### 症状
访问 `/admin` 显示 404 Not Found

### 解决方案
访问完整路径：`/admin/index.html`

**原因**: Vue Router 拦截了 `/admin` 路由，需要访问完整的 HTML 文件路径。

---

## 3. 本地开发端口冲突

### 症状
运行 `npm run dev` 时提示端口被占用

### 解决方案

**自动解决**: Vite 会自动尝试其他端口（5174, 5175, 5176...）

**手动指定端口**:
```bash
npm run dev -- --port 3000
```

**查找占用端口的进程**:
```bash
# Mac/Linux
lsof -i :5173
kill -9 <PID>

# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

---

## 4. 图片上传失败

### 症状
通过 Sveltia CMS 上传图片时失败

### 解决方案

1. **检查图片大小**
   - GitHub 单文件限制：100MB
   - 建议单图不超过 5MB

2. **检查文件格式**
   - 支持：JPG, PNG, GIF, SVG, WebP
   - 不支持：BMP, TIFF

3. **检查 GitHub 权限**
   - Sveltia CMS 需要仓库写权限
   - 重新授权：访问 GitHub Settings → Applications

---

## 5. 文章不显示

### 症状
发布文章后在博客列表中看不到

### 检查清单

1. **Front Matter 格式正确**
   ```yaml
   ---
   title: 文章标题
   titleZh: 中文标题
   slug: article-slug
   publishedAt: 2024-12-24T10:00:00Z
   category: ai
   ---
   ```

2. **发布日期不能是未来时间**
   - 检查 `publishedAt` 字段
   - 确保是当前或过去的时间

3. **分类存在**
   - 确保 `category` 字段对应的分类文件存在
   - 位置：`content/categories/<category>.json`

4. **文件已提交到 GitHub**
   ```bash
   git status
   git log --oneline -5
   ```

---

## 6. 样式显示异常

### 症状
页面样式错乱或缺失

### 解决方案

1. **清除缓存**
   - 强制刷新页面（Ctrl+F5 / Cmd+Shift+R）

2. **检查 CSS 文件加载**
   - F12 → Network → 过滤 CSS
   - 确保所有 CSS 文件状态码为 200

3. **检查浏览器兼容性**
   - 推荐使用最新版本 Chrome/Firefox/Safari/Edge
   - 避免使用 IE 浏览器

---

## 7. Git 冲突

### 症状
推送时提示 `rejected` 或 `conflict`

### 解决方案

```bash
# 拉取远程更改
git pull --rebase

# 如果有冲突，解决冲突后
git add .
git rebase --continue

# 推送
git push
```

**预防措施**：
- 编辑前先 `git pull`
- 避免在多台电脑同时编辑

---

## 8. 构建失败

### 症状
GitHub Actions 构建失败，部署中断

### 检查步骤

1. **查看 Actions 日志**
   - GitHub → Actions → 点击失败的工作流
   - 查看错误信息

2. **本地测试构建**
   ```bash
   npm run build
   ```
   如果本地构建失败，说明代码有问题

3. **常见构建错误**
   - TypeScript 类型错误
   - ESLint 错误
   - 依赖包版本冲突

4. **修复后重新推送**
   ```bash
   git add .
   git commit -m "Fix build error"
   git push
   ```

---

## 获取帮助

如果以上方案都无法解决问题：

1. **查看 GitHub Issues**
   - https://github.com/Noveris-AI/Noveris-AI.github.io/issues

2. **查看 Sveltia CMS 文档**
   - https://github.com/sveltia/sveltia-cms

3. **查看 Vite 文档**
   - https://vitejs.dev/

---

**最后更新**: 2024-12-24
