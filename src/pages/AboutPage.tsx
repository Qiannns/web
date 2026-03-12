import { User, MapPin, Mail, Github, Twitter, Gamepad, Target, Shield, Zap, Calendar, FileText, Users, Award } from 'lucide-react'

const AboutPage = () => {
  const skills = [
    { name: '战术分析', level: 95, icon: Target, color: 'primary' },
    { name: '装备评测', level: 90, icon: Shield, color: 'emerald' },
    { name: '地图策略', level: 88, icon: MapPin, color: 'amber' },
    { name: '团队指挥', level: 92, icon: Users, color: 'red' },
    { name: '经济管理', level: 85, icon: Award, color: 'purple' },
    { name: '医疗救援', level: 87, icon: Shield, color: 'cyan' },
  ]

  const gameStats = [
    { label: '游戏时长', value: '1,250+ 小时', icon: Calendar, color: 'primary' },
    { label: '文章发布', value: '42 篇', icon: FileText, color: 'emerald' },
    { label: '团队胜利', value: '320 次', icon: Users, color: 'amber' },
    { label: '最高段位', value: '传奇战士', icon: Award, color: 'red' },
  ]

  const experiences = [
    {
      year: '2024',
      title: '暗区突围资深玩家',
      description: '开始专注研究游戏机制和战术策略，建立个人战术体系。',
      tags: ['入门精通', '基础战术']
    },
    {
      year: '2025',
      title: '战术分析师',
      description: '开始撰写游戏攻略和分析文章，在社区分享经验。',
      tags: ['攻略撰写', '社区贡献']
    },
    {
      year: '2026',
      title: '暗区突围博客创始人',
      description: '创建个人博客，系统化整理和分享游戏知识。',
      tags: ['知识体系', '内容创作']
    }
  ]

  return (
    <div className="space-y-12">
      {/* 英雄区域 */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-dark-surface to-dark-card border border-dark-border">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            {/* 头像 */}
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-4 border-dark-border">
                <div className="w-full h-full bg-gradient-to-br from-primary-900/30 to-emerald-900/30 flex items-center justify-center">
                  <User className="w-20 h-20 text-primary-400" />
                </div>
              </div>
              <div className="absolute -bottom-3 -right-3 w-12 h-12 rounded-full bg-amber-900/80 border border-amber-800/50 flex items-center justify-center">
                <Gamepad className="w-6 h-6 text-amber-400" />
              </div>
            </div>

            {/* 个人信息 */}
            <div className="flex-1">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-900/20 border border-primary-800/50 text-primary-300 text-sm mb-3">
                <Zap className="w-4 h-4 mr-2" />
                战术指挥官
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-100 mb-3">
                暗区突围战术专家
              </h1>
              <p className="text-lg text-gray-300 mb-6 max-w-3xl">
                专注暗区突围游戏攻略、战术分析和装备评测的技术博主。拥有超过1200小时游戏经验，
                致力于帮助玩家提升游戏技巧，分享最新战术策略。
              </p>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center text-gray-400">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>战术指挥中心</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <Mail className="w-5 h-5 mr-2" />
                  <span>commander@darkzone.blog</span>
                </div>
              </div>

              {/* 社交链接 */}
              <div className="flex gap-3 mt-6">
                <a 
                  href="#" 
                  className="p-3 rounded-lg border border-dark-border bg-dark-surface hover:border-primary-500 hover:text-primary-400 transition-colors"
                  title="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="p-3 rounded-lg border border-dark-border bg-dark-surface hover:border-primary-500 hover:text-primary-400 transition-colors"
                  title="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="p-3 rounded-lg border border-dark-border bg-dark-surface hover:border-primary-500 hover:text-primary-400 transition-colors"
                  title="游戏主页"
                >
                  <Gamepad className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 左侧栏 */}
        <div className="lg:col-span-2 space-y-8">
          {/* 关于我 */}
          <section className="bg-dark-card border border-dark-border rounded-xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-100 mb-6 flex items-center">
              <User className="w-6 h-6 mr-3 text-primary-400" />
              关于我
            </h2>
            <div className="space-y-4 text-gray-300">
              <p>
                我是暗区突围的资深玩家和战术分析师。从游戏上线初期就开始深入研究，
                见证了游戏机制的每一次重大更新。
              </p>
              <p>
                我的游戏理念是"策略至上，生存为王"。在暗区突围中，我认为真正的胜利
                不仅仅是消灭敌人，更重要的是制定周密的计划、管理好资源、与团队有效配合，
                最终安全撤离。
              </p>
              <p>
                通过这个博客，我希望能够分享我的经验和见解，帮助更多玩家提升游戏水平。
                无论是刚入门的新手还是寻求突破的老玩家，都能在这里找到有价值的内容。
              </p>
              <p>
                我的分析基于大量实战数据和深度研究，力求客观、实用、可操作。
                每一篇攻略都经过反复验证，确保能够真正帮助到读者。
              </p>
            </div>
          </section>

          {/* 专业技能 */}
          <section className="bg-dark-card border border-dark-border rounded-xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-100 mb-6 flex items-center">
              <Target className="w-6 h-6 mr-3 text-primary-400" />
              专业技能
            </h2>
            <div className="space-y-6">
              {skills.map((skill, index) => {
                const Icon = skill.icon
                const colorClass = `text-${skill.color}-400`
                const bgClass = `bg-${skill.color}-900/20`
                const borderClass = `border-${skill.color}-800/50`
                
                return (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-lg ${bgClass} border ${borderClass} flex items-center justify-center mr-3`}>
                          <Icon className={`w-5 h-5 ${colorClass}`} />
                        </div>
                        <span className="font-medium text-gray-100">{skill.name}</span>
                      </div>
                      <span className="text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-dark-surface rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r from-${skill.color}-500 to-${skill.color === 'primary' ? 'emerald' : skill.color}-500 rounded-full transition-all duration-1000`}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* 经历时间线 */}
          <section className="bg-dark-card border border-dark-border rounded-xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-100 mb-6 flex items-center">
              <Calendar className="w-6 h-6 mr-3 text-primary-400" />
              发展经历
            </h2>
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div key={index} className="relative pl-10">
                  {/* 时间线节点 */}
                  <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-primary-900 border-2 border-primary-800 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary-400"></div>
                  </div>
                  
                  {/* 时间线连接线 */}
                  {index < experiences.length - 1 && (
                    <div className="absolute left-3 top-6 bottom-0 w-0.5 bg-primary-900"></div>
                  )}
                  
                  <div className="mb-2">
                    <span className="inline-block px-3 py-1 rounded-full bg-primary-900/20 border border-primary-800/50 text-primary-300 text-sm">
                      {exp.year}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-100 mb-2">{exp.title}</h3>
                  <p className="text-gray-400 mb-4">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="px-3 py-1 text-sm rounded-full bg-dark-surface text-gray-300 border border-dark-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* 右侧栏 */}
        <div className="space-y-8">
          {/* 游戏数据统计 */}
          <section className="bg-dark-card border border-dark-border rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-100 mb-6 flex items-center">
              <Gamepad className="w-5 h-5 mr-2 text-primary-400" />
              游戏数据
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {gameStats.map((stat, index) => {
                const Icon = stat.icon
                const colorClass = `text-${stat.color}-400`
                
                return (
                  <div 
                    key={index}
                    className="text-center p-4 rounded-lg bg-dark-surface border border-dark-border"
                  >
                    <div className={`w-10 h-10 rounded-lg bg-${stat.color}-900/20 border border-${stat.color}-800/50 flex items-center justify-center mx-auto mb-3`}>
                      <Icon className={`w-5 h-5 ${colorClass}`} />
                    </div>
                    <div className="text-2xl font-bold text-gray-100 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* 博客使命 */}
          <section className="bg-dark-card border border-dark-border rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-100 mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2 text-primary-400" />
              博客使命
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-primary-900/20 border border-primary-800/50 flex items-center justify-center mr-3 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-primary-400"></div>
                </div>
                <span className="text-gray-300">提供高质量的战术分析和攻略</span>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-emerald-900/20 border border-emerald-800/50 flex items-center justify-center mr-3 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                </div>
                <span className="text-gray-300">帮助玩家提升游戏技能和策略</span>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-amber-900/20 border border-amber-800/50 flex items-center justify-center mr-3 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                </div>
                <span className="text-gray-300">构建积极的游戏社区环境</span>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-purple-900/20 border border-purple-800/50 flex items-center justify-center mr-3 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                </div>
                <span className="text-gray-300">分享最新的游戏资讯和更新</span>
              </li>
            </ul>
          </section>

          {/* 联系我 */}
          <section className="bg-dark-card border border-dark-border rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-100 mb-4 flex items-center">
              <Mail className="w-5 h-5 mr-2 text-primary-400" />
              联系我
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              如果你有任何问题、建议或合作意向，欢迎通过以下方式联系我。
            </p>
            <div className="space-y-3">
              <a 
                href="mailto:commander@darkzone.blog" 
                className="flex items-center p-3 rounded-lg border border-dark-border text-gray-300 hover:border-primary-500 hover:text-primary-400 transition-colors"
              >
                <Mail className="w-5 h-5 mr-3" />
                commander@darkzone.blog
              </a>
              <a 
                href="#" 
                className="flex items-center p-3 rounded-lg border border-dark-border text-gray-300 hover:border-primary-500 hover:text-primary-400 transition-colors"
              >
                <Github className="w-5 h-5 mr-3" />
                GitHub
              </a>
              <a 
                href="#" 
                className="flex items-center p-3 rounded-lg border border-dark-border text-gray-300 hover:border-primary-500 hover:text-primary-400 transition-colors"
              >
                <Twitter className="w-5 h-5 mr-3" />
                Twitter
              </a>
            </div>
          </section>

          {/* 支持博客 */}
          <section className="bg-dark-card border border-dark-border rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-100 mb-4">支持博客</h3>
            <p className="text-gray-400 text-sm mb-6">
              如果我的内容对你有帮助，可以考虑以下方式支持博客的持续发展。
            </p>
            <div className="space-y-3">
              <button className="w-full py-3 rounded-lg bg-primary-900/20 border border-primary-800/50 text-primary-300 hover:bg-primary-900/30 transition-colors">
                分享给其他玩家
              </button>
              <button className="w-full py-3 rounded-lg bg-emerald-900/20 border border-emerald-800/50 text-emerald-300 hover:bg-emerald-900/30 transition-colors">
                参与社区讨论
              </button>
              <button className="w-full py-3 rounded-lg bg-amber-900/20 border border-amber-800/50 text-amber-300 hover:bg-amber-900/30 transition-colors">
                提供反馈建议
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default AboutPage