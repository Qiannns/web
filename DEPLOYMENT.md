# 暗区突围博客 - 部署指南

## 部署选项

### 选项一：Vercel（推荐，最简单）
**步骤：**
1. **在 GitHub 创建仓库**
   ```bash
   # 初始化本地仓库
   git init
   git add .
   git commit -m "初始提交"
   
   # 在 GitHub 创建新仓库（不要初始化 README）
   # 然后添加远程仓库
   git remote add origin https://github.com/用户名/仓库名.git
   git branch -M main
   git push -u origin main
   ```

2. **部署到 Vercel**
   - 访问 https://vercel.com
   - 用 GitHub 账号登录
   - 点击 "New Project"
   - 导入您的 GitHub 仓库
   - 点击 "Deploy"

3. **访问网站**
   - 部署完成后访问：`https://项目名.vercel.app`
   - 可以绑定自定义域名

### 选项二：Netlify
**步骤：**
1. 访问 https://app.netlify.com
2. 点击 "Add new site" → "Import an existing project"
3. 连接到 GitHub/GitLab
4. 选择仓库，点击 "Deploy site"
5. 访问：`https://项目名.netlify.app`

### 选项三：GitHub Pages
**步骤：**
1. 在 `package.json` 中添加：
   ```json
   {
     "scripts": {
       "deploy": "npm run build && gh-pages -d dist"
     }
   }
   ```

2. 安装 gh-pages：
   ```bash
   npm install --save-dev gh-pages
   ```

3. 在 `vite.config.ts` 中添加：
   ```typescript
   export default defineConfig({
     base: '/仓库名/',  // 如果是用户名.github.io/仓库名
   })
   ```

4. 部署：
   ```bash
   npm run deploy
   ```

5. 在仓库设置中开启 GitHub Pages

## 本地开发

### 环境要求
- Node.js 18+ 
- npm 9+ 或 yarn 1.22+

### 安装和运行
```bash
# 1. 克隆仓库
git clone https://github.com/用户名/仓库名.git
cd 仓库名

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev

# 4. 打开浏览器
# 访问 http://localhost:5173
```

### 构建生产版本
```bash
# 构建
npm run build

# 预览构建结果
npm run preview

# 构建后的文件在 dist/ 目录
```

## 环境配置

### 开发环境
创建 `.env.development`：
```env
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=暗区突围博客（开发）
```

### 生产环境
创建 `.env.production`：
```env
VITE_API_URL=https://api.darkzone.blog
VITE_APP_NAME=暗区突围博客
```

## 自定义配置

### 修改网站信息
在 `src/data/articles.ts` 中修改：
```typescript
// 网站标题
export const siteConfig = {
  title: "暗区突围博客",
  description: "战术 · 科技 · 策略",
  author: "战术指挥官",
  // ...
}
```

### 修改主题颜色
在 `tailwind.config.js` 中修改：
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // 修改这里的颜色值
        500: '#0ea5e9',
        600: '#0284c7',
      }
    }
  }
}
```

### 添加新页面
1. 在 `src/pages/` 创建新组件
2. 在 `src/App.tsx` 中添加路由
3. 在 `src/components/Layout.tsx` 中添加导航

## 问题排查

### 常见问题

**问题1：npm install 失败**
```bash
# 清除缓存
npm cache clean --force

# 使用淘宝镜像
npm config set registry https://registry.npmmirror.com

# 重新安装
npm install
```

**问题2：构建失败**
```bash
# 检查TypeScript错误
npx tsc --noEmit

# 检查依赖版本
npm outdated

# 更新依赖
npm update
```

**问题3：页面空白**
```bash
# 检查控制台错误
# 检查网络请求
# 清除浏览器缓存
```

**问题4：样式不生效**
```bash
# 重新构建CSS
npm run build

# 检查Tailwind配置
# 确保正确导入CSS
```

### 调试命令
```bash
# 检查TypeScript类型
npx tsc --noEmit

# 检查ESLint错误
npm run lint

# 检查依赖树
npm list --depth=0

# 检查包大小
npx vite-bundle-analyzer
```

## 性能优化

### 构建优化
```bash
# 分析包大小
npm run build -- --report

# 压缩图片
# 使用 WebP 格式
# 启用 gzip 压缩
```

### 代码分割
- 路由级代码分割（已配置）
- 组件级懒加载
- 第三方库单独打包

### 缓存策略
- 静态资源长期缓存
- API 请求适当缓存
- 使用 Service Worker

## 监控和分析

### 添加分析工具
1. **Google Analytics**：
   ```html
   <!-- 在 index.html 中添加 -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   ```

2. **Vercel Analytics**：
   - 在 Vercel 项目中开启
   - 免费提供基本分析

3. **自定义监控**：
   - 错误监控（Sentry）
   - 性能监控（Web Vitals）

## 备份和维护

### 定期备份
```bash
# 备份数据库（如果有）
# 备份上传的文件
# 备份配置
```

### 更新依赖
```bash
# 检查更新
npm outdated

# 安全更新
npm audit fix

# 更新所有
npm update --save
```

### 版本控制
```bash
# 创建新版本
git tag v1.0.0
git push --tags

# 回滚到指定版本
git checkout v1.0.0
```

## 技术支持

### 获取帮助
- **文档**：查看本项目文档
- **GitHub Issues**：报告问题
- **社区**：React/Tailwind 社区

### 贡献指南
1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 创建 Pull Request

---

## 快速参考

### 常用命令
```bash
# 开发
npm run dev

# 构建
npm run build

# 测试
npm run test

# 部署
npm run deploy

# 代码检查
npm run lint
```

### 文件结构
```
关键文件位置：
- 页面组件：src/pages/
- 数据文件：src/data/articles.ts
- 样式配置：tailwind.config.js
- 路由配置：src/App.tsx
- 构建配置：vite.config.ts
```

### 联系方式
- 项目作者：战术指挥官
- 邮箱：commander@darkzone.blog
- GitHub：@darkzone-commander

---
*最后更新：2026年3月12日*
*部署状态：准备就绪*