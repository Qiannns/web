import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Home, 
  FileText, 
  Tag, 
  User, 
  Menu, 
  X,
  Zap,
  Search
} from 'lucide-react'
import { useState } from 'react'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const navigation = [
    { name: '首页', href: '/', icon: Home },
    { name: '文章', href: '#', icon: FileText },
    { name: '标签', href: '/tag/all', icon: Tag },
    { name: '关于', href: '/about', icon: User },
  ]

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <div className="min-h-screen bg-dark-bg text-gray-100">
      {/* 导航栏 */}
      <header className="sticky top-0 z-50 glass-effect border-b border-dark-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <div className="p-2 bg-primary-900/20 rounded-lg border border-primary-800/50">
                  <Zap className="w-6 h-6 text-primary-400" />
                </div>
                <div className="hidden md:block">
                  <span className="text-xl font-bold bg-gradient-to-r from-primary-400 to-emerald-400 bg-clip-text text-transparent">
                    暗区突围博客
                  </span>
                  <span className="text-xs text-gray-400 block">战术 · 科技 · 策略</span>
                </div>
              </Link>
            </div>

            {/* 桌面端导航 */}
            <nav className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => {
                const Icon = item.icon
                const active = isActive(item.href)
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
                      active
                        ? 'bg-primary-900/20 text-primary-300 border border-primary-800/50 shadow-lg shadow-primary/10'
                        : 'text-gray-300 hover:bg-dark-surface hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </Link>
                )
              })}
              
              {/* 搜索按钮 */}
              <button className="ml-4 p-2 rounded-lg border border-dark-border hover:border-primary-500 hover:text-primary-400 transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </nav>

            {/* 移动端菜单按钮 */}
            <button
              className="md:hidden p-2 rounded-lg border border-dark-border hover:border-primary-500 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* 移动端菜单 */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-dark-border bg-dark-surface/95 backdrop-blur-md">
            <div className="container mx-auto px-4 py-3">
              <div className="space-y-1">
                {navigation.map((item) => {
                  const Icon = item.icon
                  const active = isActive(item.href)
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                        active
                          ? 'bg-primary-900/20 text-primary-300 border border-primary-800/50'
                          : 'text-gray-300 hover:bg-dark-border'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      {item.name}
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* 主要内容 */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* 页脚 */}
      <footer className="border-t border-dark-border bg-dark-surface/50 mt-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Logo 和描述 */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-primary-900/20 rounded-lg border border-primary-800/50">
                  <Zap className="w-6 h-6 text-primary-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">暗区突围博客</h3>
                  <p className="text-sm text-gray-400">战术 · 科技 · 策略</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                专注于暗区突围游戏攻略、战术分析、装备评测的技术博客。
              </p>
            </div>

            {/* 快速链接 */}
            <div>
              <h4 className="font-bold mb-4 text-gray-200">快速链接</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">
                    首页
                  </Link>
                </li>
                <li>
                  <Link to="/tag/all" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">
                    所有标签
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">
                    关于作者
                  </Link>
                </li>
              </ul>
            </div>

            {/* 联系信息 */}
            <div>
              <h4 className="font-bold mb-4 text-gray-200">联系我</h4>
              <p className="text-gray-400 text-sm mb-4">
                如果有任何问题或合作意向，欢迎通过以下方式联系。
              </p>
              <div className="flex space-x-3">
                <a href="#" className="p-2 rounded-lg border border-dark-border hover:border-primary-500 hover:text-primary-400 transition-colors">
                  <span className="text-sm">GitHub</span>
                </a>
                <a href="#" className="p-2 rounded-lg border border-dark-border hover:border-primary-500 hover:text-primary-400 transition-colors">
                  <span className="text-sm">Twitter</span>
                </a>
                <a href="#" className="p-2 rounded-lg border border-dark-border hover:border-primary-500 hover:text-primary-400 transition-colors">
                  <span className="text-sm">Email</span>
                </a>
              </div>
            </div>
          </div>

          {/* 版权信息 */}
          <div className="border-t border-dark-border mt-8 pt-6 text-center">
            <p className="text-gray-500 text-sm">
              © 2026 暗区突围博客. 保留所有权利. 
              <span className="mx-2">·</span>
              主题: 暗黑科技战术风格
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout