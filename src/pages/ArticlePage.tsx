import { useParams, Link } from 'react-router-dom'
import { Calendar, Clock, Eye, Tag, User, ChevronLeft, Share2, Bookmark, MessageCircle } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { getArticleById, getRecentArticles } from '../data/articles'
import { useState } from 'react'

const ArticlePage = () => {
  const { id } = useParams<{ id: string }>()
  const article = getArticleById(id || '')
  const recentArticles = getRecentArticles(3)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)

  if (!article) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-100 mb-4">文章未找到</h1>
        <p className="text-gray-400 mb-6">抱歉，您查找的文章不存在或已被删除。</p>
        <Link 
          to="/" 
          className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          返回首页
        </Link>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      })
    } else {
      setShowShareMenu(!showShareMenu)
    }
  }

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setShowShareMenu(false)
    // 这里可以添加一个 toast 提示
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* 返回按钮 */}
      <div className="mb-8">
        <Link 
          to="/" 
          className="inline-flex items-center text-gray-400 hover:text-primary-400 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          返回文章列表
        </Link>
      </div>

      {/* 文章头部 */}
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          {article.tags.slice(0, 3).map(tag => (
            <span 
              key={tag}
              className="px-3 py-1 text-sm rounded-full bg-dark-surface text-gray-300 border border-dark-border"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4">
          {article.title}
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-gray-400">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              {article.author}
            </span>
            <span className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {formatDate(article.publishedAt)}
            </span>
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              {article.readTime}分钟阅读
            </span>
            <span className="flex items-center">
              <Eye className="w-4 h-4 mr-2" />
              {article.views.toLocaleString()}次阅读
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`p-2 rounded-lg border transition-colors ${
                isBookmarked
                  ? 'bg-primary-900/20 border-primary-800/50 text-primary-400'
                  : 'border-dark-border text-gray-400 hover:border-primary-500 hover:text-primary-400'
              }`}
              title={isBookmarked ? '已收藏' : '收藏文章'}
            >
              <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>

            <div className="relative">
              <button
                onClick={handleShare}
                className="p-2 rounded-lg border border-dark-border text-gray-400 hover:border-primary-500 hover:text-primary-400 transition-colors"
                title="分享文章"
              >
                <Share2 className="w-5 h-5" />
              </button>
              
              {showShareMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-dark-surface border border-dark-border rounded-lg shadow-lg z-10">
                  <button
                    onClick={copyLink}
                    className="w-full px-4 py-3 text-left text-gray-300 hover:bg-dark-border transition-colors rounded-t-lg"
                  >
                    复制链接
                  </button>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-3 text-left text-gray-300 hover:bg-dark-border transition-colors"
                  >
                    分享到 Twitter
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 封面图片 */}
      {article.coverImage && (
        <div className="mb-8 rounded-xl overflow-hidden border border-dark-border">
          <img 
            src={article.coverImage} 
            alt={article.title}
            className="w-full h-64 md:h-80 object-cover"
          />
        </div>
      )}

      {/* 文章内容 */}
      <article className="prose prose-invert prose-lg max-w-none mb-12">
        <div className="bg-dark-card border border-dark-border rounded-xl p-6 md:p-8">
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1 className="text-3xl font-bold text-gray-100 mt-8 mb-4 border-l-4 border-primary-500 pl-4">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl font-bold text-gray-100 mt-8 mb-4 border-l-4 border-emerald-500 pl-4">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl font-bold text-gray-100 mt-6 mb-3">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="text-gray-300 mb-4 leading-relaxed">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="text-gray-300 mb-4 pl-6 space-y-2">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="text-gray-300 mb-4 pl-6 space-y-2">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="pl-2">{children}</li>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-amber-500 pl-4 py-2 my-4 italic text-gray-400 bg-dark-surface/50 rounded-r">
                  {children}
                </blockquote>
              ),
              code: ({ children, className }) => {
                const isInline = !className
                if (isInline) {
                  return (
                    <code className="px-2 py-1 bg-dark-surface text-primary-300 rounded text-sm font-mono">
                      {children}
                    </code>
                  )
                }
                return (
                  <div className="my-6">
                    <div className="bg-dark-surface border border-dark-border rounded-t-lg px-4 py-2 flex justify-between items-center">
                      <span className="text-sm text-gray-400">代码示例</span>
                      <button 
                        className="text-xs text-gray-400 hover:text-primary-400 transition-colors"
                        onClick={() => {
                          navigator.clipboard.writeText(String(children))
                        }}
                      >
                        复制代码
                      </button>
                    </div>
                    <pre className="bg-dark-card border border-dark-border border-t-0 rounded-b-lg p-4 overflow-x-auto">
                      <code className={`text-sm font-mono text-gray-300 ${className}`}>
                        {children}
                      </code>
                    </pre>
                  </div>
                )
              },
              table: ({ children }) => (
                <div className="overflow-x-auto my-6">
                  <table className="min-w-full divide-y divide-dark-border">
                    {children}
                  </table>
                </div>
              ),
              th: ({ children }) => (
                <th className="px-4 py-3 bg-dark-surface text-left text-sm font-medium text-gray-300 border border-dark-border">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="px-4 py-3 text-sm text-gray-400 border border-dark-border">
                  {children}
                </td>
              ),
            }}
          >
            {article.content}
          </ReactMarkdown>
        </div>
      </article>

      {/* 文章标签 */}
      <div className="mb-12">
        <div className="flex items-center mb-4">
          <Tag className="w-5 h-5 text-primary-400 mr-2" />
          <h3 className="text-lg font-bold text-gray-100">文章标签</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {article.tags.map(tag => (
            <Link
              key={tag}
              to={`/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
              className="px-4 py-2 rounded-lg border border-dark-border bg-dark-surface text-gray-300 hover:border-primary-500 hover:text-primary-400 transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>

      {/* 相关文章 */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-100">相关文章</h3>
          <Link 
            to="/" 
            className="text-sm text-primary-400 hover:text-primary-300 transition-colors"
          >
            查看全部
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentArticles
            .filter(a => a.id !== article.id)
            .slice(0, 3)
            .map(relatedArticle => (
              <Link
                key={relatedArticle.id}
                to={`/article/${relatedArticle.id}`}
                className="bg-dark-card border border-dark-border rounded-xl overflow-hidden card-hover group"
              >
                {relatedArticle.coverImage && (
                  <div className="h-40 overflow-hidden">
                    <img 
                      src={relatedArticle.coverImage} 
                      alt={relatedArticle.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h4 className="font-bold text-gray-100 group-hover:text-primary-400 transition-colors mb-2 line-clamp-2">
                    {relatedArticle.title}
                  </h4>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-3 h-3 mr-1" />
                    {formatDate(relatedArticle.publishedAt)}
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>

      {/* 评论区（占位） */}
      <div className="border-t border-dark-border pt-8">
        <div className="flex items-center mb-6">
          <MessageCircle className="w-6 h-6 text-primary-400 mr-3" />
          <h3 className="text-xl font-bold text-gray-100">评论</h3>
          <span className="ml-3 px-3 py-1 bg-dark-surface text-gray-400 rounded-full text-sm">
            即将上线
          </span>
        </div>
        <div className="text-center py-12 border border-dark-border rounded-xl">
          <MessageCircle className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">评论区功能即将上线</p>
          <p className="text-sm text-gray-600">我们正在开发评论系统，敬请期待！</p>
        </div>
      </div>
    </div>
  )
}

export default ArticlePage