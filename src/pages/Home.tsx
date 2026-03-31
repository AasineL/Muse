import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { posts } from "../data/posts";
import { getTagColor } from "../types";
import PostCard from "../components/PostCard";
import { SearchIcon } from "../components/Icons";

export default function Home() {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const tagMap = new Map<string, number>();
    posts.forEach((p) => p.tags.forEach((t) => tagMap.set(t, (tagMap.get(t) || 0) + 1)));
    return Array.from(tagMap.entries())
      .sort((a, b) => b[1] - a[1]);
  }, []);

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      const matchSearch =
        !search ||
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(search.toLowerCase());
      const matchTag = !activeTag || post.tags.includes(activeTag);
      return matchSearch && matchTag;
    });
  }, [search, activeTag]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Hero Section */}
      <div className="mb-10 sm:mb-14 animate-fade-in-up opacity-0">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
          探索<span className="gradient-text">技术</span>的无限可能
        </h1>
        <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-2xl">
          记录前端开发中的思考、实践与成长。每一篇文章都是一次知识的沉淀。
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="mb-8 space-y-4 animate-fade-in-up opacity-0 stagger-1">
        {/* Search Input */}
        <div className="relative max-w-md">
          <SearchIcon
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="搜索文章..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all placeholder:text-gray-400"
          />
        </div>

        {/* Tags Filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTag(null)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
              !activeTag
                ? "bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300 ring-1 ring-primary-200 dark:ring-primary-700"
                : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            全部
          </button>
          {allTags.map(([tag]) => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${getTagColor(
                tag
              )} ${
                activeTag === tag
                  ? "ring-1 ring-current"
                  : "opacity-80 hover:opacity-100"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6 text-sm text-gray-500 dark:text-gray-400">
        共 {filtered.length} 篇文章
        {activeTag && (
          <span>
            {" "}
            · 标签: <span className="text-primary-600 dark:text-primary-400">{activeTag}</span>
            <button
              onClick={() => setActiveTag(null)}
              className="ml-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              x
            </button>
          </span>
        )}
      </div>

      {/* Post Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((post, i) => (
            <PostCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 animate-fade-in">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            没有找到相关文章
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            试试其他关键词或浏览{" "}
            <Link to="/tags" className="text-primary-600 dark:text-primary-400 hover:underline">
              全部标签
            </Link>
          </p>
          <button
            onClick={() => {
              setSearch("");
              setActiveTag(null);
            }}
            className="px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition-colors"
          >
            清除筛选
          </button>
        </div>
      )}
    </div>
  );
}
