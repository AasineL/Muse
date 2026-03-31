import { GithubIcon, TwitterIcon } from "../components/Icons";

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 animate-fade-in">
      {/* Header */}
      <div className="mb-10 animate-fade-in-up opacity-0">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
          关于<span className="gradient-text">我</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400">一个热爱技术、追求极致的开发者</p>
      </div>

      {/* Profile Card */}
      <div className="animate-fade-in-up opacity-0 stagger-1 p-6 sm:p-8 rounded-2xl bg-white dark:bg-gray-900/50 border border-gray-200/80 dark:border-gray-800/50 mb-8">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          {/* Avatar */}
          <div className="shrink-0">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary-400 to-purple-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-primary-500/20">
              M
            </div>
          </div>

          {/* Info */}
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
              Muse
            </h2>
            <p className="text-primary-600 dark:text-primary-400 text-sm font-medium mb-3">
              前端开发者 / 技术写作者
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
              专注于现代 Web 技术栈，热衷于探索 React 生态系统、TypeScript 高级用法和 CSS 创新技巧。
              相信好的技术文章能够帮助更多人成长，坚持用中文分享有深度的技术内容。
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                aria-label="GitHub"
              >
                <GithubIcon size={18} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                aria-label="Twitter"
              >
                <TwitterIcon size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* About Content */}
      <div className="prose prose-gray dark:prose-invert max-w-none animate-fade-in-up opacity-0 stagger-2">
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-gray-900/50 border border-gray-200/80 dark:border-gray-800/50 space-y-6">
          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">
              技术栈
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { name: "React", color: "from-cyan-400 to-blue-500" },
                { name: "TypeScript", color: "from-blue-400 to-indigo-500" },
                { name: "Next.js", color: "from-gray-700 to-gray-900" },
                { name: "Tailwind CSS", color: "from-teal-400 to-cyan-500" },
                { name: "Node.js", color: "from-green-500 to-emerald-600" },
                { name: "CSS/SCSS", color: "from-pink-400 to-purple-500" },
              ].map((tech) => (
                <div
                  key={tech.name}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/50 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${tech.color}`} />
                  {tech.name}
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">
              关于本站
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              这个博客使用 React + TypeScript + Tailwind CSS 构建，采用现代前端技术栈开发。
              文章支持 Markdown 渲染，包含代码高亮、表格、引用等丰富的内容展示方式。
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              站点支持亮色/暗色/系统主题切换，响应式设计适配各种设备尺寸。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">
              联系方式
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              如果你对我的文章有任何疑问、建议或发现错误，欢迎通过以下方式联系我。
              我会认真阅读每一条反馈。
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
