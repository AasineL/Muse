import { GithubIcon, TwitterIcon } from "./Icons";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 mt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <span className="gradient-text font-semibold">Muse</span>
            <span className="mx-1">&copy;</span>
            <span>{new Date().getFullYear()}</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              aria-label="Twitter"
            >
              <TwitterIcon size={18} />
            </a>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800/50 text-center">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            使用 React + TypeScript + Tailwind CSS 构建
          </p>
        </div>
      </div>
    </footer>
  );
}
