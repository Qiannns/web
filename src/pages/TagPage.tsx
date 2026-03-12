import { useParams, Link } from 'react-router-dom'
import { Tag, Hash, TrendingUp, FileText, Clock, Calendar, Eye } from 'lucide-react'
import { tags, getArticlesByTag } from '../data/articles'

const TagPage = () => {
  const { tag: tagSlug } = useParams<{ tag: string }>()
  const currentTag = tags.find(t => t.slug === tagSlug)
  const articles = getArticlesByTag(tagSlug || 'all')

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  // 如果没有找到标签，显示所有文章
  const displayTag = currentTag || { 
    id: 'all', 
    name: '所有标签', 
    slug: 'all', 
    color: 'primary', 
    count: articles.length 
  }

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
  }[displayTag.color] || 'bg-dark-surface border-dark-border text-gray-300'

  return (
    <div className="space-y-8">
      {/* 标签头部 */}
      <div className="bg-gradient-to-br from-dark-surface to-dark-card border border-dark-border rounded-2xl p-8">
        <div className="flex items-start justify-between">
          <div>
            <div className="inline-flex items-center px-4 py-2 rounded-full mb-4">
              <Tag className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">标签分类</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4">
              <span className={colorClasses.replace('text-', '')}>
                {displayTag.name}
              </span>
            </h1>
            <p className="text-gray-300 mb-6 max-w-2xl">
              探索与 <span className="font-semibold">{displayTag.name}</span> 相关的所有文章。这里汇集了最新的攻略、技巧和深度分析，帮助你更好地理解这个主题。
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="px-4 py-2 rounded-lg bg-dark-surface border border-dark-border">
                <div className="flex items-center">
                  <FileText className="w-4 h-4 mr-2 text-primary-400" />
                  <span className="text-gray-300">{articles.length} 篇文章</span>
                </div>
              </div>
              <div className="px-4 py-2 rounded-lg bg-dark-surface border border-dark-border">
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-2 text-emerald-400" />
                  <span className="text-gray-300">
                    {articles.reduce((sum, article) => sum + article.views, 0).toLocaleString()} 次阅读
                  </span>
                </div>
              </div>
              <div className="px-4 py-2 rounded-lg bg-dark-surface border border-dark-border">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-amber-400" />
                  <span className="text-gray-300">
                    {articles.reduce((sum, article) => sum + article.readTime, 0)} 分钟总阅读时间
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className={`hidden md:flex items-center justify-center w-24 h-24 rounded-2xl ${colorClasses}`}>
            <Hash className="w-12 h-12" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* 标签列表 */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <div className="bg-dark-card border border-dark-border rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-100 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-primary-400" />
                热门标签
              </h3>
              <div className="space-y-2">
                {tags
                  .sort((a, b) => b.count - a.count)
                  .slice(0, 10)
                  .map(tag => {
                    const tagColorClasses = {
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
                        className={`flex items-center justify-between p-3 rounded-lg border transition-colors hover:scale-[1.02] ${
                          tag.slug === displayTag.slug
                            ? 'scale-[1.02] shadow-lg shadow-primary/10 ' + tagColorClasses
                            : 'border-dark-border hover:border-primary-500 ' + tagColorClasses.replace('text-', 'text-gray-400 hover:text-')
                        }`}
                      >
                        <div className="flex items-center">
                          <Hash className="w-4 h-4 mr-2" />
                          <span>{tag.name}</span>
                        </div>
                        <span className="text-sm opacity-75">({tag.count})</span>
                      </Link>
                    )
                  })}
              </div>
              <Link 
                to="/tag/all" 
                className="mt-4 inline-flex items-center justify-center w-full py-2 border border-dark-border text-gray-400 hover:border-primary-500 hover:text-primary-400 rounded-lg transition-colors"
              >
                查看所有标签
              </Link>
            </div>

            {/* 标签统计 */}
            <div className="mt-6 bg-dark-card border border-dark-border rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-100 mb-4">标签统计</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-400 mb-1">
                    <span>总标签数</span>
                    <span>{tags.length}</span>
                  </div>
                  <div className="h-2 bg-dark-surface rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary-500 to-emerald-500 rounded-full"
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm text-gray-400 mb-1">
                    <span>平均文章数/标签</span>
                    <span>{Math.round(tags.reduce((sum, tag) => sum + tag.count, 0) / tags.length)}</span>
                  </div>
                  <div className="h-2 bg-dark-surface rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-500 to-red-500 rounded-full"
                      style={{ width: '70%' }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm text-gray-400 mb-1">
                    <span>最热门标签</span>
                    <span>{Math.max(...tags.map(t => t.count))}篇文章</span>
                  </div>
                  <div className="h-2 bg-dark-surface rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                      style={{ width: '90%' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 文章列表 */}
        <div className="lg:col-span-3">
          {articles.length === 0 ? (
            <div className="text-center py-12 border border-dark-border rounded-xl">
              <Tag className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-100 mb-2">暂无文章</h3>
              <p className="text-gray-400 mb-6">该标签下暂时没有文章。</p>
              <Link 
                to="/tag/all" 
                className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
              >
                查看所有标签
              </Link>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-100">
                  相关文章 ({articles.length}篇)
                </h2>
                <div className="text-sm text-gray-400">
                  按发布时间排序
                </div>
              </div>

              <div className="space-y-6">
                {articles.map(article => (
                  <article 
                    key={article.id}
                    className="bg-dark-card border border-dark-border rounded-xl overflow-hidden card-hover group"
                  >
                    <Link to={`/article/${article.id}`} className="block">
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-100 group-hover:text-primary-400 transition-colors mb-3">
                              {article.title}
                            </h3>
                            <p className="text-gray-400 mb-4 line-clamp-2">
                              {article.excerpt}
                            </p>
                            
                            <div className="flex flex-wrap items-center gap-2 mb-4">
                              {article.tags.map(tag => (
                                <span 
                                  key={tag}
                                  className="px-3 py-1 text-xs rounded-full bg-dark-surface text-gray-300 border border-dark-border"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          {article.coverImage && (
                            <div className="ml-6 flex-shrink-0 hidden sm:block">
                              <div className="w-32 h-32 rounded-lg overflow-hidden border border-dark-border">
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
                        <div className="flex flex-wrap items-center justify-between text-sm text-gray-500 pt-4 border-t border-dark-border">
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
                              {article.views.toLocaleString()}次阅读
                            </span>
                          </div>
                          <div className="mt-3 sm:mt-0">
                            <span className="text-gray-300">{article.author}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>

              {/* 分页（占位） */}
              {articles.length > 5 && (
                <div className="mt-8 flex justify-center">
                  <nav className="flex items-center space-x-2">
                    <button className="px-4 py-2 rounded-lg border border-dark-border text-gray-400 hover:border-primary-500 hover:text-primary-400 transition-colors">
                      上一页
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-primary-900/20 border border-primary-800/50 text-primary-300">
                      1
                    </button>
                    <button className="px-4 py-2 rounded-lg border border-dark-border text-gray-400 hover:border-primary-500 hover:text-primary-400 transition-colors">
                      2
                    </button>
                    <button className="px-4 py-2 rounded-lg border border-dark-border text-gray-400 hover:border-primary-500 hover:text-primary-400 transition-colors">
                      3
                    </button>
                    <span className="px-2 text-gray-500">...</span>
                    <button className="px-4 py-2 rounded-lg border border-dark-border text-gray-400 hover:border-primary-500 hover:text-primary-400 transition-colors">
                      下一页
                    </button>
                  </nav>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default TagPage