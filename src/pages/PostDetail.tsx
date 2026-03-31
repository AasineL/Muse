import { useParams, Link, useNavigate } from "react-router-dom";
import { posts } from "../data/posts";
import { getTagColor } from "../types";
import { extractHeadings } from "../utils/markdown";
import { ArrowLeftIcon, CalendarIcon, ClockIcon, TagIcon } from "../components/Icons";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import type { Components } from "react-markdown";
import { useEffect, useState, useMemo, useCallback } from "react";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-");
}

function estimateReadTime(content: string): number {
  return Math.max(1, Math.ceil(content.length / 500));
}

export default function PostDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [activeHeading, setActiveHeading] = useState<string>("");

  const post = posts.find((p) => p.slug === slug);
  const headings = post ? extractHeadings(post.content) : [];
  const readTime = post ? estimateReadTime(post.content) : 0;

  // Find prev/next posts
  const currentIndex = posts.findIndex((p) => p.slug === slug);

  // Custom heading renderer that adds id attributes for TOC linking
  const markdownComponents = useMemo<Components>(() => {
    return {
      h2: ({ children, ...props }) => {
        const text = String(children).replace(/<[^>]*>/g, "");
        const id = slugify(text);
        return <h2 id={id} {...props}>{children}</h2>;
      },
      h3: ({ children, ...props }) => {
        const text = String(children).replace(/<[^>]*>/g, "");
        const id = slugify(text);
        return <h3 id={id} {...props}>{children}</h3>;
      },
      h4: ({ children, ...props }) => {
        const text = String(children).replace(/<[^>]*>/g, "");
        const id = slugify(text);
        return <h4 id={id} {...props}>{children}</h4>;
      },
    };
  }, []);

  const handleTocClick = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveHeading(id);
    }
  }, []);

  // Reset scroll position and heading state when navigating between posts
  useEffect(() => {
    setActiveHeading("");
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -80% 0px", threshold: 0 }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [slug, headings]);

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center animate-fade-in">
        <div className="text-6xl mb-4">📄</div>
        <h2 className="text-2xl font-bold mb-4">文章未找到</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          你访问的文章不存在或已被移除
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition-colors"
        >
          <ArrowLeftIcon size={16} />
          返回首页
        </Link>
      </div>
    );
  }

  const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const nextPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 animate-fade-in">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 mb-8 transition-colors group"
      >
        <ArrowLeftIcon size={16} className="transition-transform group-hover:-translate-x-0.5" />
        返回
      </button>

      <div className="flex gap-10">
        {/* Main Content */}
        <article className="flex-1 min-w-0">
          {/* Header */}
          <header className="mb-8">
            {/* Cover */}
            <div className="aspect-[2.2/1] rounded-2xl overflow-hidden mb-8">
              <img
                src={post.cover}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  to={`/tags`}
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium transition-transform hover:scale-105 ${getTagColor(
                    tag
                  )}`}
                >
                  <TagIcon size={12} />
                  {tag}
                </Link>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 mb-4 leading-tight">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1.5">
                <CalendarIcon size={15} />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <ClockIcon size={15} />
                {readTime} 分钟阅读
              </span>
            </div>
          </header>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent mb-8" />

          {/* Markdown Content */}
          <div className="prose prose-lg prose-gray dark:prose-invert max-w-none">
            <Markdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={markdownComponents}
            >
              {post.content}
            </Markdown>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent mt-12 mb-8" />

          {/* Prev / Next Navigation */}
          <nav className="grid grid-cols-2 gap-4">
            {prevPost ? (
              <Link
                to={`/post/${prevPost.slug}`}
                className="group p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-primary-300 dark:hover:border-primary-700 transition-all hover:bg-primary-50/50 dark:hover:bg-primary-950/20"
              >
                <span className="text-xs text-gray-400 mb-1 block">上一篇</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 line-clamp-1 transition-colors">
                  {prevPost.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {nextPost && (
              <Link
                to={`/post/${nextPost.slug}`}
                className="group p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-primary-300 dark:hover:border-primary-700 transition-all hover:bg-primary-50/50 dark:hover:bg-primary-950/20 text-right"
              >
                <span className="text-xs text-gray-400 mb-1 block">下一篇</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 line-clamp-1 transition-colors">
                  {nextPost.title}
                </span>
              </Link>
            )}
          </nav>
        </article>

        {/* Table of Contents (Sidebar) */}
        {headings.length > 0 && (
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="sticky top-24">
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                目录
              </h4>
              <nav className="space-y-0.5 border-l border-gray-200 dark:border-gray-800 pl-3">
                {headings.map(({ id, text, level }) => (
                  <button
                    key={id}
                    type="button"
                    className={`toc-link text-left w-full ${level === 3 ? "pl-4" : ""} ${
                      activeHeading === id ? "active" : ""
                    }`}
                    onClick={() => handleTocClick(id)}
                  >
                    {text}
                  </button>
                ))}
              </nav>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
