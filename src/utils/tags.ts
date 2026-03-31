import type { TagInfo } from "../types";

export function getAllTags(): TagInfo[] {
  const { posts } = require("../data/posts");
  const tagMap = new Map<string, number>();
  posts.forEach((post: { tags: string[] }) => {
    post.tags.forEach((tag: string) => {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
    });
  });
  return Array.from(tagMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}
