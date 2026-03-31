export function extractHeadings(content: string): { id: string; text: string; level: number }[] {
  const lines = content.split("\n");
  const headings: { id: string; text: string; level: number }[] = [];
  
  lines.forEach((line) => {
    const match = line.match(/^(#{2,4})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].replace(/[*`~]/g, "").trim();
      const id = text
        .toLowerCase()
        .replace(/[^\p{L}\p{N}\s-]/gu, "")
        .replace(/\s+/g, "-");
      headings.push({ id, text, level });
    }
  });
  
  return headings;
}
