export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  cover: string;
  content: string;
}

export interface TagInfo {
  name: string;
  count: number;
  color: string;
}

export const tagColorMap: Record<string, string> = {
  "React": "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  "TypeScript": "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300",
  "前端": "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
  "CSS": "bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300",
  "性能优化": "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  "架构": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  "JavaScript": "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300",
  "工程化": "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300",
  "设计": "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
  "开源": "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300",
};

export function getTagColor(tag: string): string {
  return tagColorMap[tag] || "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
}
