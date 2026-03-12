# 暗区突围个人博客网站

一个以"暗区突围"游戏为主题的个人博客网站，包含文章列表、文章详情、标签分类和关于页面，支持 Markdown 渲染。

## 功能特性

### 🎯 核心功能
- **文章列表**：响应式网格布局，支持按标签筛选
- **文章详情**：完整的 Markdown 渲染，代码高亮显示
- **标签系统**：彩色标签分类，标签统计信息
- **关于页面**：作者介绍，技能展示，联系信息

### 🎨 设计特色
- **暗黑科技风格**：深色背景搭配霓虹色点缀
- **战术元素**：网格背景，数据展示面板，军事风格卡片
- **响应式设计**：完美适配从手机到桌面的所有设备
- **无障碍设计**：键盘导航支持，屏幕阅读器友好

### ⚡ 技术栈
- **React 18**：现代前端框架
- **TypeScript**：类型安全的开发体验
- **Tailwind CSS**：实用优先的 CSS 框架
- **React Router**：客户端路由管理
- **React Markdown**：Markdown 内容渲染
- **Lucide React**：高质量的图标库

## 项目结构

```
darkzone-blog/
├── src/
│   ├── components/          # 可复用组件
│   │   └── Layout.tsx      # 主布局组件
│   ├── pages/              # 页面组件
│   │   ├── HomePage.tsx    # 首页
│   │   ├── ArticlePage.tsx # 文章详情页
│   │   ├── TagPage.tsx     # 标签分类页
│   │   └── AboutPage.tsx   # 关于页面
│   ├── data/               # 模拟数据
│   │   └── articles.ts     # 文章和标签数据
│   ├── types/              # TypeScript 类型定义
│   │   └── index.ts        # 接口定义
│   ├── App.tsx             # 应用入口
│   └── main.tsx            # 渲染入口
├── public/                 # 静态资源
├── design-system.md        # 设计系统文档
├── package.json           # 项目依赖
├── vite.config.ts         # Vite 配置
├── tailwind.config.js     # Tailwind 配置
└── README.md              # 项目说明
```

## 快速开始

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run dev
```
访问 http://localhost:5173

### 生产构建
```bash
npm run build
```
构建后的文件位于 `dist/` 目录

## 设计系统

项目包含完整的设计系统，详细说明在 `design-system.md` 文件中：

### 色彩系统
- **背景色**：`#0a0a0a` (深黑)
- **表面色**：`#1a1a1a` (深灰)
- **主强调色**：`#0ea5e9` (科技蓝)
- **次强调色**：`#10b981` (战术绿)

### 字体系统
- **主字体**：Inter (无衬线字体)
- **代码字体**：JetBrains Mono (等宽字体)

### 间距系统
基于 8px 网格系统，确保布局的一致性

## 数据模型

### 文章接口
```typescript
interface Article {
  id: string
  title: string
  content: string        // Markdown 格式
  excerpt: string
  author: string
  publishedAt: string
  updatedAt: string
  readTime: number
  views: number
  tags: string[]
  coverImage?: string
}
```

### 标签接口
```typescript
interface Tag {
  id: string
  name: string
  slug: string
  color: string
  count: number
}
```

## 页面预览

### 首页
![首页预览](https://via.placeholder.com/800x450/0a0a0a/0ea5e9?text=暗区突围博客首页)

### 文章详情页
![文章详情页](https://via.placeholder.com/800x450/1a1a1a/ffffff?text=文章详情+Markdown渲染)

### 标签分类页
![标签分类页](https://via.placeholder.com/800x450/2a2a2a/10b981?text=标签分类+文章筛选)

### 关于页面
![关于页面](https://via.placeholder.com/800x450/1a1a1a/0ea5e9?text=关于作者+技能展示)

## 功能截图

<details>
<summary>点击查看功能截图</summary>

### 导航栏
![导航栏](https://via.placeholder.com/1200x80/1a1a1a/ffffff?text=暗区突围博客+首页+文章+标签+关于)

### 文章卡片
![文章卡片](https://via.placeholder.com/400x200/2a2a2a/ffffff?text=文章标题+摘要+标签+元信息)

### 侧边栏
![侧边栏](https://via.placeholder.com/300x400/2a2a2a/ffffff?text=热门标签+最新文章+博客统计)

### 移动端适配
![移动端](https://via.placeholder.com/375x667/0a0a0a/ffffff?text=移动端适配+汉堡菜单+单列布局)

</details>

## 扩展计划

### 短期计划
1. 添加搜索功能
2. 实现用户收藏
3. 添加评论系统
4. 集成分析工具

### 长期计划
1. 后端 API 集成
2. 用户系统
3. 内容管理系统
4. 多语言支持

## 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 联系方式

- **作者**：战术指挥官
- **邮箱**：commander@darkzone.blog
- **GitHub**：[@darkzone-commander](https://github.com/darkzone-commander)

---

**战术 · 科技 · 策略** - 专注于暗区突围游戏攻略和技术分析