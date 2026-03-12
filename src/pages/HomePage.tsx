import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Clock, Eye, Tag, ChevronRight, TrendingUp, Zap } from 'lucide-react'
import { articles, getPopularTags, getRecentArticles } from '../data/articles'

const HomePage = () => {
  const [selectedTag, setSelectedTag] = useState<string>('all')
  const popularTags = getPopularTags(8)
  const recentArticles = getRecentArticles(6)

  const filteredArticles = selectedTag === 'all' 
    ? articles 
    : articles.filter(article => article.tags.some(tag => 
        tag.toLowerCase().includes(selectedTag.toLowerCase())
      ))

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="space-y-12">
      {/* 英雄区域 */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-dark-surface to-dark-card border border-dark-border">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative p-8 md:p-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-900/20 border border-primary-800/50 text-primary-300 text-sm mb-4">
              <Zap className="w-4 h-4 mr-2" />
              最新战报
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              欢迎来到<span className="text-primary-400"> 暗区突围</span>战术博客
            </h1>
            <p className="text-lg text-gray-300 mb-6">
              这里汇聚了最新的游戏攻略、装备评测、战术分析和生存技巧。无论是新手入门还是高手进阶，你都能找到有价值的内容。
            </p>
            <div className="flex flex-wrap gap-3">
              <Link 
                to="/article/1" 
                className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors inline-flex items-center"
              >
                阅读最新指南
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
              <Link 
                to="/tag/all" 
                className="px-6 py-3 border border-dark-border hover:border-primary-500 text-gray-300 hover:text-primary-400 rounded-lg font-medium transition-colors"
              >
                浏览所有标签
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 主要内容区域 */}
        <div className="lg:col-span-2">
          {/* 标签筛选 */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-100">精选文章</h2>
              <div className="flex items-center text-gray-400">
                <TrendingUp className="w-5 h-5 mr-2" />
                <span className="text-sm">实时更新</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => setSelectedTag('all')}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  selectedTag === 'all'
                    ? 'bg-primary-900/20 border-primary-800/50 text-primary-300'
                    : 'border-dark-border text-gray-400 hover:border-primary-500 hover:text-primary-400'
                }`}
              >
                全部
              </button>
              {popularTags.map(tag => (
                <button
                  key={tag.id}
                  onClick={() => setSelectedTag(tag.name)}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    selectedTag === tag.name
                      ? 'bg-primary-900/20 border-primary-800/50 text-primary-300'
                      : 'border-dark-border text-gray-400 hover:border-primary-500 hover:text-primary-400'
                  }`}
                >
                  {tag.name} ({tag.count})
                </button>
              ))}
            </div>
          </div>

          {/* 文章列表 */}
          <div className="space-y-6">
            {filteredArticles.map(article => (
              <article 
                key={article.id}
                className="bg-dark-card border border-dark-border rounded-xl overflow-hidden card-hover group"
              >
                <Link to={`/article/${article.id}`} className="block">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-100 group-hover:text-primary-400 transition-colors mb-2">
                          {article.title}
                        </h3>
                        <p className="text-gray-400 mb-4 line-clamp-2">
                          {article.excerpt}
                        </p>
                      </div>
                      {article.coverImage && (
                        <div className="ml-4 flex-shrink-0">
                          <div className="w-24 h-24 rounded-lg overflow-hidden border border-dark-border">
                            <img 
                              src={article.coverImage} 
                              alt={article.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* 文章元信息 */}
                    <div className="flex flex-wrap items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(article.publishedAt)}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {article.readTime}分钟阅读
                        </span>
                        <span className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {article.views}次阅读
                        </span>
                      </div>
                      <div className="flex items-center mt-3 sm:mt-0">
                        <Tag className="w-4 h-4 mr-2" />
                        <div className="flex flex-wrap gap-1">
                          {article.tags.slice(0, 3).map(tag => (
                            <span 
                              key={tag}
                              className="px-2 py-1 text-xs rounded bg-dark-surface text-gray-300 border border-dark-border"
                            >
                              {tag}
                            </span>
                          ))}
                          {article.tags.length > 3 && (
                            <span className="px-2 py-1 text-xs rounded bg-dark-surface text-gray-400 border border-dark-border">
                              +{article.tags.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>

        {/* 侧边栏 */}
        <div className="space-y-8">
          {/* 热门标签 */}
          <div className="bg-dark-card border border-dark-border rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-100 mb-4 flex items-center">
              <Tag className="w-5 h-5 mr-2 text-primary-400" />
              热门标签
            </h3>
            <div className="flex flex-wrap gap-2">
              {popularTags.map(tag => {
                const colorClasses = {
                  primary: 'bg-primary-900/20 border-primary-800/50 text-primary-300',
                  emerald: 'bg-emerald-900/20 border-emerald-800/50 text-emerald-300',
                  amber: 'bg-amber-900/20 border-amber-800/50 text-amber-300',
                  red: 'bg-red-900/20 border-red-800/50 text-red-300',
                  purple: 'bg-purple-900/20 border-purple-800/50 text-purple-300',
                  blue: 'bg-blue-900/20 border-blue-800/50 text-blue-300',
                  green: 'bg-green-900/20 border-green-800/50 text-green-300',
                  orange: 'bg-orange-900/20 border-orange-800/50 text-orange-300',
                  cyan: 'bg-cyan-900/20 border-cyan-800/50 text-cyan-300',
                  pink: 'bg-pink-900/20 border-pink-800/50 text-pink-300',
                }[tag.color] || 'bg-dark-surface border-dark-border text-gray-300'

                return (
                  <Link
                    key={tag.id}
                    to={`/tag/${tag.slug}`}
                    className={`px-3 py-2 rounded-lg border text-sm transition-colors hover:scale-105 ${colorClasses}`}
                  >
                    {tag.name}
                    <span className="ml-1 text-xs opacity-75">({tag.count})</span>
                  </Link>
                )
              })}
            </div>
            <Link 
              to="/tag/all" 
              className="mt-4 inline-flex items-center text-primary-400 hover:text-primary-300 text-sm"
            >
              查看所有标签
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          {/* 最新文章 */}
          <div className="bg-dark-card border border-dark-border rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-100 mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-primary-400" />
              最新文章
            </h3>
            <div className="space-y-4">
              {recentArticles.map(article => (
                <Link 
                  key={article.id}
                  to={`/article/${article.id}`}
                  className="block group"
                >
                  <div className="p-3 rounded-lg border border-dark-border hover:border-primary-500 transition-colors">
                    <h4 className="font-medium text-gray-100 group-hover:text-primary-400 transition-colors mb-1 line-clamp-1">
                      {article.title}
                    </h4>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />
                      {formatDate(article.publishedAt)}
                      <span className="mx-2">·</span>
                      <Eye className="w-3 h-3 mr-1" />
                      {article.views}阅读
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* 统计数据 */}
          <div className="bg-dark-card border border-dark-border rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-100 mb-4">博客统计</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 rounded-lg bg-dark-surface border border-dark-border">
                <div className="text-2xl font-bold text-primary-400 mb-1">
                  {articles.length}
                </div>
                <div className="text-sm text-gray-400">文章总数</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-dark-surface border border-dark-border">
                <div className="text-2xl font-bold text-emerald-400 mb-1">
                  {popularTags.length}
                </div>
                <div className="text-sm text-gray-400">标签分类</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-dark-surface border border-dark-border">
                <div className="text-2xl font-bold text-amber-400 mb-1">
                  {articles.reduce((sum, article) => sum + article.views, 0).toLocaleString()}
                </div>
                <div className="text-sm text-gray-400">总阅读量</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-dark-surface border border-dark-border">
                <div className="text-2xl font-bold text-purple-400 mb-1">
                  {Math.round(articles.reduce((sum, article) => sum + article.readTime, 0) / 60)}
                </div>
                <div className="text-sm text-gray-400">总阅读时长(小时)</div>
              </div>
            </div>
          </div>

          {/* 快速导航 */}
          <div className="bg-dark-card border border-dark-border rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-100 mb-4">快速导航</h3>
            <div className="space-y-2">
              <Link 
                to="/article/1"
                className="flex items-center p-3 rounded-lg border border-dark-border hover:border-primary-500 hover:text-primary-400 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-primary-900/20 border border-primary-800/50 flex items-center justify-center mr-3">
                  <Zap className="w-4 h-4 text-primary-400" />
                </div>
                <span>新手入门指南</span>
              </Link>
              <Link 
                to="/tag/gear-review"
                className="flex items-center p-3 rounded-lg border border-dark-border hover:border-primary-500 hover:text-primary-400 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-900/20 border border-emerald-800/50 flex items-center justify-center mr-3">
                  <Tag className="w-4 h-4 text-emerald-400" />
                </div>
                <span>装备评测专栏</span>
              </Link>
              <Link 
                to="/about"
                className="flex items-center p-3 rounded-lg border border-dark-border hover:border-primary-500 hover:text-primary-400 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-amber-900/20 border border-amber-800/50 flex items-center justify-center mr-3">
                  <TrendingUp className="w-4 h-4 text-amber-400" />
                </div>
                <span>关于作者</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage