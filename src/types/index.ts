// 文章接口
export interface Article {
  id: string
  title: string
  content: string
  excerpt: string
  author: string
  publishedAt: string
  updatedAt: string
  readTime: number
  views: number
  tags: string[]
  coverImage?: string
}

// 标签接口
export interface Tag {
  id: string
  name: string
  slug: string
  color: string
  count: number
}

// 作者接口
export interface Author {
  id: string
  name: string
  bio: string
  avatar: string
  role: string
  socialLinks: {
    github?: string
    twitter?: string
    email?: string
  }
  stats: {
    articles: number
    totalViews: number
    followers: number
  }
}

// 评论接口
export interface Comment {
  id: string
  author: string
  avatar: string
  content: string
  createdAt: string
  replies?: Comment[]
}

// API 响应接口
export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  meta?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}