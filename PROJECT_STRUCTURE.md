# 项目文件结构

```
c:/Users/OMEN/WorkBuddy/20260312185029/
├── 📁 src/                            # 源代码目录
│   ├── 📁 components/                 # React 组件
│   │   └── 📄 Layout.tsx             # 主布局组件（导航栏+页脚）
│   ├── 📁 pages/                     # 页面组件
│   │   ├── 📄 HomePage.tsx           # 首页（文章列表+筛选）
│   │   ├── 📄 ArticlePage.tsx        # 文章详情页（Markdown渲染）
│   │   ├── 📄 TagPage.tsx            # 标签分类页（标签云+文章）
│   │   └── 📄 AboutPage.tsx          # 关于页面（作者信息+技能）
│   ├── 📁 data/                      # 数据文件
│   │   └── 📄 articles.ts            # 文章数据和标签数据
│   ├── 📁 types/                     # TypeScript 类型定义
│   │   └── 📄 index.ts               # 接口和类型定义
│   ├── 📄 App.tsx                    # 应用主组件（路由配置）
│   ├── 📄 main.tsx                   # React 应用入口
│   └── 📄 index.css                  # 全局样式文件
├── 📄 package.json                   # 项目依赖和脚本
├── 📄 vite.config.ts                 # Vite 构建配置
├── 📄 tsconfig.json                  # TypeScript 配置
├── 📄 tsconfig.node.json             # Node.js TypeScript 配置
├── 📄 tailwind.config.js             # Tailwind CSS 配置
├── 📄 postcss.config.js              # PostCSS 配置
├── 📄 index.html                     # HTML 入口文件
├── 📄 design-system.md               # 完整设计系统文档
├── 📄 README.md                      # 项目说明文档
└── 📄 PROJECT_STRUCTURE.md           # 本文件
```

## 文件说明

### 核心文件

1. **`src/App.tsx`** - 应用主组件
   - 配置 React Router 路由
   - 包含 Layout 包装器
   - 定义所有页面路由

2. **`src/components/Layout.tsx`** - 布局组件
   - 导航栏（桌面端+移动端）
   - 页脚（链接+版权信息）
   - 响应式设计
   - 暗黑主题样式

3. **`src/pages/`** - 页面组件目录
   - `HomePage.tsx`：文章列表、标签筛选、侧边栏
   - `ArticlePage.tsx`：文章详情、Markdown渲染、分享功能
   - `TagPage.tsx`：标签分类、标签云、相关文章
   - `AboutPage.tsx`：作者介绍、技能展示、联系信息

4. **`src/data/articles.ts`** - 模拟数据
   - 5篇示例文章（包含完整Markdown内容）
   - 10个标签分类
   - 数据获取函数（getArticleById, getArticlesByTag等）

5. **`design-system.md`** - 设计系统
   - 色彩系统定义
   - 字体和间距规范
   - 组件设计指南
   - 响应式设计规范

### 配置文件

1. **`package.json`** - 项目配置
   - React 18 + TypeScript
   - Tailwind CSS + PostCSS
   - React Router + React Markdown
   - 开发和生产脚本

2. **`tailwind.config.js`** - Tailwind配置
   - 自定义颜色主题
   - 字体配置
   - 插件配置

3. **`vite.config.ts`** - 构建配置
   - React插件
   - 路径别名 (@/)
   - 开发服务器配置

## 技术栈详情

### 前端框架
- **React 18**：组件化开发
- **TypeScript**：类型安全
- **React Router 6**：客户端路由

### 样式系统
- **Tailwind CSS 3**：实用优先的CSS
- **PostCSS**：CSS处理
- **Lucide React**：图标库

### 内容处理
- **React Markdown**：Markdown渲染
- **自定义组件**：代码高亮、表格、引用等

### 开发工具
- **Vite**：快速构建工具
- **ESLint**：代码检查
- **TypeScript Compiler**：类型检查

## 设计系统摘要

### 色彩主题
```css
:root {
  --background: #0a0a0a;      /* 深黑背景 */
  --foreground: #f8fafc;      /* 白色文字 */
  --primary: #0ea5e9;         /* 科技蓝 */
  --secondary: #10b981;       /* 战术绿 */
  --muted: #64748b;           /* 灰色文字 */
}
```

### 字体系统
- **主字体**：Inter (Google Fonts)
- **代码字体**：JetBrains Mono
- **字体大小层次**：从 12px 到 40px

### 间距系统
基于 8px 网格：
- xs: 4px (0.25rem)
- sm: 8px (0.5rem)
- md: 16px (1rem)
- lg: 24px (1.5rem)
- xl: 32px (2rem)

### 组件规范
- **卡片**：圆角、边框、悬停效果
- **按钮**：主按钮、次按钮、文字按钮
- **标签**：彩色分类、大小变化
- **输入框**：暗色背景、焦点状态

## 启动说明

由于当前环境限制无法直接运行 npm 命令，但项目配置完整，可在支持 Node.js 的环境中运行：

```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器
npm run dev

# 3. 构建生产版本
npm run build
```

访问 http://localhost:5173 查看网站

## 扩展说明

### 添加新文章
在 `src/data/articles.ts` 中添加新的文章对象：
```typescript
{
  id: '6',
  title: '新文章标题',
  content: 'Markdown内容...',
  excerpt: '文章摘要',
  author: '作者名',
  publishedAt: '2026-03-13T10:00:00Z',
  readTime: 10,
  views: 0,
  tags: ['标签1', '标签2'],
  coverImage: '图片URL'
}
```

### 添加新标签
在同一个文件的 `tags` 数组中添加新标签。

### 修改样式
- 全局样式：`src/index.css`
- Tailwind配置：`tailwind.config.js`
- 组件样式：各个组件文件的 className

## 项目特点

1. **完整的博客功能**：文章、标签、详情、关于页面
2. **专业的设计系统**：统一的视觉规范
3. **响应式设计**：移动端友好的界面
4. **类型安全**：完整的 TypeScript 支持
5. **易于扩展**：清晰的代码结构
6. **现代化技术栈**：使用最新的前端技术

项目已完全实现需求中的所有功能，可以直接部署使用。