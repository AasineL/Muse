import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "../components/Icons";

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center animate-fade-in">
      <div className="text-8xl mb-6 gradient-text font-extrabold">404</div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
        页面未找到
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
        你访问的页面不存在或已被移除。请检查 URL 是否正确，或返回首页继续浏览。
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition-all duration-200 hover:shadow-lg hover:shadow-primary-500/25"
      >
        <ArrowLeftIcon size={16} />
        返回首页
      </Link>
    </div>
  );
}
