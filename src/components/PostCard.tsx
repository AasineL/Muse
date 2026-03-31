import { Link } from "react-router-dom";
import type { Post } from "../types";
import { getTagColor } from "../types";
import { CalendarIcon, ClockIcon } from "./Icons";

function estimateReadTime(content: string): number {
  const words = content.length;
  return Math.max(1, Math.ceil(words / 500));
}

export default function PostCard({ post, index = 0 }: { post: Post; index?: number }) {
  const readTime = estimateReadTime(post.content);

  return (
    <Link
      to={`/post/${post.slug}`}
      className={`group block animate-fade-in-up opacity-0 stagger-${Math.min(index + 1, 6)}`}
    >
      <article className="overflow-hidden rounded-2xl bg-white dark:bg-gray-900/50 border border-gray-200/80 dark:border-gray-800/50 hover-lift">
        {/* Cover Image */}
        <div className="aspect-[2/1] overflow-hidden">
          <img
            src={post.cover}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTagColor(
                  tag
                )} transition-transform duration-200 hover:scale-105`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200 line-clamp-2 mb-2">
            {post.title}
          </h2>

          {/* Excerpt */}
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
            {post.excerpt}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-gray-500">
            <span className="flex items-center gap-1">
              <CalendarIcon size={14} />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <ClockIcon size={14} />
              {readTime} 分钟阅读
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
