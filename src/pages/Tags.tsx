import { useMemo } from "react";
import { Link } from "react-router-dom";
import { posts } from "../data/posts";
import { getTagColor } from "../types";
import { TagIcon } from "../components/Icons";

export default function Tags() {
  const tagData = useMemo(() => {
    const map = new Map<string, { count: number; posts: typeof posts }>();
    posts.forEach((post) => {
      post.tags.forEach((tag) => {
        if (!map.has(tag)) map.set(tag, { count: 0, posts: [] });
        const entry = map.get(tag)!;
        entry.count++;
        entry.posts.push(post);
      });
    });
    return Array.from(map.entries())
      .sort((a, b) => b[1].count - a[1].count)
      .map(([name, data]) => ({ name, ...data }));
  }, []);

  const totalPosts = posts.length;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 animate-fade-in">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 rounded-xl bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400">
            <TagIcon size={22} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">标签分类</h1>
        </div>
        <p className="text-gray-500 dark:text-gray-400">
          共 <span className="font-medium text-gray-700 dark:text-gray-200">{tagData.length}</span> 个标签，{" "}
          <span className="font-medium text-gray-700 dark:text-gray-200">{totalPosts}</span> 篇文章
        </p>
      </div>

      {/* Tag Cloud */}
      <div className="mb-12 p-6 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200/80 dark:border-gray-800/50">
        <div className="flex flex-wrap gap-3">
          {tagData.map(({ name, count }) => {
            const scale = 0.85 + (count / totalPosts) * 0.35;
            return (
              <Link
                key={name}
                to={`/tags`}
                onClick={() => {
                  // Scroll to the tag section below
                  setTimeout(() => {
                    document.getElementById(`tag-${name}`)?.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-200 hover:scale-110 hover:shadow-md ${getTagColor(name)}`}
                style={{ fontSize: `${scale}rem` }}
              >
                <TagIcon size={14 * scale} />
                {name}
                <span className="opacity-60">{count}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Tag Sections */}
      <div className="space-y-10">
        {tagData.map(({ name, count, posts: tagPosts }, index) => (
          <section
            key={name}
            id={`tag-${name}`}
            className="animate-fade-in-up opacity-0 stagger-${Math.min(index + 1, 6)}"
          >
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">{name}</h2>
              <span className="text-xs font-medium text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
                {count} 篇
              </span>
            </div>

            <div className="space-y-3">
              {tagPosts.map((post) => (
                <Link
                  key={post.slug}
                  to={`/post/${post.slug}`}
                  className="group flex items-start gap-4 p-4 rounded-xl border border-gray-200/80 dark:border-gray-800/50 bg-white dark:bg-gray-900/30 hover:border-primary-300 dark:hover:border-primary-700 hover:bg-primary-50/30 dark:hover:bg-primary-950/20 transition-all duration-200"
                >
                  <img
                    src={post.cover}
                    alt=""
                    className="w-20 h-14 rounded-lg object-cover shrink-0 opacity-80 group-hover:opacity-100 transition-opacity"
                    loading="lazy"
                  />
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-primary-600 dark:group-hover:text-primary-400 line-clamp-1 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">
                      {post.excerpt}
                    </p>
                    <span className="text-xs text-gray-400 dark:text-gray-500 mt-1.5 block">
                      {post.date}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
