import type { Post } from "./types";

export const posts: Post[] = [
  {
    slug: "react-19-new-features",
    title: "React 19 新特性全面解读",
    excerpt: "深入探索 React 19 带来的重大更新：Server Components、Actions、新 Hooks 以及性能提升等核心特性。",
    date: "2026-03-25",
    tags: ["React", "前端", "JavaScript"],
    cover: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
    content: `## React 19 带来了什么？

React 19 是自 React 18 以来最重要的一次更新，引入了大量令人兴奋的新特性。

### Server Components

Server Components 允许组件在服务端渲染，减少客户端 JavaScript 体积：

\`\`\`tsx
// 这是一个 Server Component
async function BlogPost({ id }: { id: string }) {
  const post = await db.posts.findUnique({ where: { id } });
  return <article>{post.content}</article>;
}
\`\`\`

### Actions

Actions 简化了表单提交和数据变更的流程：

\`\`\`tsx
function CreatePost() {
  async function handleSubmit(formData: FormData) {
    "use server";
    await db.posts.create({
      data: {
        title: formData.get("title"),
        content: formData.get("content"),
      },
    });
  }

  return (
    <form action={handleSubmit}>
      <input name="title" />
      <textarea name="content" />
      <button type="submit">发布</button>
    </form>
  );
}
\`\`\`

### 新 Hooks

- **\`use()\`** — 读取 context 或 promise
- **\`useOptimistic()\`** — 乐观更新
- **\`useFormStatus()\`** — 表单状态管理

### 性能提升

React 19 在编译器层面做了大量优化，自动的 memoization 让你不再需要手动使用 \`useMemo\` 和 \`useCallback\`。

> 这意味着更少的代码，更好的性能。

### 迁移建议

1. 逐步升级，不必一次性迁移
2. 先尝试 Actions，体验表单处理的简化
3. Server Components 适合内容密集型页面
4. 利用新的 DevTools 进行性能分析

---

React 19 不是一个渐进式改进，而是一次范式转移。拥抱它，你的开发体验将会大幅提升。`,
  },
  {
    slug: "typescript-advanced-types",
    title: "TypeScript 高级类型体操实战指南",
    excerpt: "从 Conditional Types 到 Template Literal Types，掌握 TypeScript 类型系统的精髓，写出更安全的代码。",
    date: "2026-03-18",
    tags: ["TypeScript", "前端", "JavaScript"],
    cover: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop",
    content: `## 为什么需要高级类型？

TypeScript 的类型系统是图灵完备的，这意味着你可以在类型层面做几乎任何事情。

### Conditional Types

条件类型让你根据条件选择不同的类型：

\`\`\`typescript
type IsString<T> = T extends string ? true : false;

type A = IsString<"hello">;  // true
type B = IsString<42>;       // false
\`\`\`

### Mapped Types

映射类型是批量转换类型的利器：

\`\`\`typescript
type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};

type Optional<T> = {
  [K in keyof T]?: T[K];
};
\`\`\`

### Template Literal Types

模板字面量类型是 TypeScript 4.1 引入的强大特性：

\`\`\`typescript
type EventName<T extends string> = \`on\${Capitalize<T>}\`;

type ClickEvent = EventName<"click">;  // "onClick"
type FocusEvent = EventName<"focus">;  // "onFocus"
\`\`\`

### 实战案例：类型安全的事件系统

\`\`\`typescript
type EventMap = {
  login: { userId: string };
  logout: undefined;
  message: { from: string; text: string };
};

function on<K extends keyof EventMap>(
  event: K,
  handler: EventMap[K] extends undefined
    ? () => void
    : (data: EventMap[K]) => void
) {
  // ...
}

// 类型安全！
on("login", (data) => console.log(data.userId));  // ✅
on("logout", () => console.log("logged out"));     // ✅
\`\`\`

> 记住：好的类型设计不是炫技，而是让错误在编译阶段暴露。

### 递归类型

\`\`\`typescript
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object
    ? T[K] extends Function
      ? T[K]
      : DeepReadonly<T[K]>
    : T[K];
};
\`\`\`

掌握这些高级类型技巧，你的 TypeScript 代码将会更加健壮和优雅。`,
  },
  {
    slug: "modern-css-techniques-2026",
    title: "2026 现代CSS 技巧与最佳实践",
    excerpt: "容器查询、级联层、视图过渡 API——这些现代 CSS 特性正在改变前端开发的方式。",
    date: "2026-03-10",
    tags: ["CSS", "前端", "设计"],
    cover: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&h=400&fit=crop",
    content: `## CSS 正在经历文艺复兴

过去几年 CSS 的进化速度远超预期，许多曾经需要 JavaScript 实现的效果现在纯 CSS 就能做到。

### 容器查询

容器查询让组件根据父容器大小自适应，而不是视口：

\`\`\`css
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
}
\`\`\`

### 级联层（Cascade Layers）

级联层让你精确控制 CSS 优先级：

\`\`\`css
@layer reset, base, components, utilities;

@layer reset {
  * { margin: 0; padding: 0; box-sizing: border-box; }
}

@layer base {
  body { font-family: system-ui; line-height: 1.6; }
}

@layer components {
  .btn { padding: 0.5rem 1rem; border-radius: 0.25rem; }
}

@layer utilities {
  .mt-4 { margin-top: 1rem; }
}
\`\`\`

### 视图过渡 API

页面切换动画从未如此简单：

\`\`\`css
::view-transition-old(root) {
  animation: fade-out 0.3s ease;
}

::view-transition-new(root) {
  animation: fade-in 0.3s ease;
}
\`\`\`

### 嵌套语法

原生 CSS 现在支持嵌套了：

\`\`\`css
.card {
  background: white;
  border-radius: 8px;

  & .title {
    font-size: 1.25rem;
    font-weight: 600;
  }

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
}
\`\`\`

> 这些特性意味着更少的预处理器依赖、更少的 JavaScript、更好的性能。

### :has() 选择器

终于有了"父选择器"：

\`\`\`css
/* 当表单有 invalid 输入时 */
form:has(:invalid) {
  border-color: red;
}

/* 当卡片包含图片时 */
.card:has(img) {
  grid-template-rows: auto 1fr;
}
\`\`\`

现代 CSS 强大到令人兴奋。拥抱这些新特性，你的样式代码将更简洁、更强大。`,
  },
  {
    slug: "frontend-performance-optimization",
    title: "前端性能优化完全手册",
    excerpt: "从 Core Web Vitals 到渲染管线优化，系统性地提升 Web 应用性能的实战指南。",
    date: "2026-03-02",
    tags: ["性能优化", "前端", "工程化"],
    cover: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    content: `## 性能不是事后补丁

性能优化应该贯穿开发全流程，而不是上线前的补救措施。

### Core Web Vitals

Google 定义的核心指标：

| 指标 | 含义 | 目标 |
|------|------|------|
| LCP | 最大内容绘制 | < 2.5s |
| INP | 交互到下次绘制 | < 200ms |
| CLS | 累积布局偏移 | < 0.1 |

### 资源加载优化

\`\`\`html
<!-- 预加载关键资源 -->
<link rel="preload" href="critical.css" as="style">
<link rel="preload" href="hero-font.woff2" as="font" crossorigin>

<!-- 预连接到关键域名 -->
<link rel="preconnect" href="https://api.example.com">

<!-- 懒加载非关键图片 -->
<img src="photo.jpg" loading="lazy" decoding="async">
\`\`\`

### JavaScript 性能

\`\`\`javascript
// 使用 requestIdleCallback 处理低优先级任务
requestIdleCallback(() => {
  analytics.trackPageView();
});

// 虚拟滚动处理大量列表
import { useVirtualizer } from "@tanstack/react-virtual";
\`\`\`

### 渲染优化

1. **避免强制同步布局** — 读写分离
2. **使用 CSS containment** — \`contain: layout paint\`
3. **will-change 提示浏览器** — 提前优化

### 图片优化

\`\`\`html
<picture>
  <source srcset="photo.avif" type="image/avif">
  <source srcset="photo.webp" type="image/webp">
  <img src="photo.jpg" alt="描述" width="800" height="400">
</picture>
\`\`\`

> 性能优化没有银弹，但系统性的方法论能让你找到 80% 性能收益所在的 20% 关键路径。

### 监控与测量

使用 Performance API 进行运行时监控：

\`\`\`javascript
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log(entry.name, entry.startTime);
  }
});
observer.observe({ entryTypes: ["largest-contentful-paint"] });
\`\`\`

持续测量、持续优化，性能是一个永无止境的追求。`,
  },
  {
    slug: "building-design-system",
    title: "从零构建组件设计系统",
    excerpt: "设计 Token、组件规范、文档自动化——打造可扩展的前端设计系统的完整方法论。",
    date: "2026-02-20",
    tags: ["架构", "前端", "设计"],
    cover: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&h=400&fit=crop",
    content: `## 设计系统的价值

一个好的设计系统不是组件库，而是一套**设计语言**和**工程实践**的结合。

### 设计 Token

Token 是设计系统的原子单元：

\`\`\`typescript
const tokens = {
  color: {
    primary: { 50: "#eff6ff", 500: "#3b82f6", 900: "#1e3a8a" },
    neutral: { 50: "#f8fafc", 500: "#64748b", 900: "#0f172a" },
  },
  spacing: { xs: "0.25rem", sm: "0.5rem", md: "1rem", lg: "1.5rem", xl: "2rem" },
  radius: { sm: "0.375rem", md: "0.5rem", lg: "0.75rem", full: "9999px" },
  shadow: {
    sm: "0 1px 2px rgba(0,0,0,0.05)",
    md: "0 4px 6px rgba(0,0,0,0.07)",
    lg: "0 10px 15px rgba(0,0,0,0.1)",
  },
};
\`\`\`

### 组件分层

- **Primitives** — 原子组件（Button, Input, Text）
- **Composites** — 组合组件（SearchBar, DataTable, Modal）
- **Patterns** — 模式组件（LoginForm, Navigation, HeroSection）

### 变体管理

\`\`\`tsx
type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}
\`\`\`

### 文档自动化

每个组件都应该有：

1. **使用示例** — 可交互的 demo
2. **API 文档** — Props 说明
3. **设计规范** — 间距、颜色、排版指南
4. **无障碍** — ARIA 属性和键盘导航

> 好的设计系统让 80% 的场景开箱即用，20% 的场景灵活可定制。

### 版本管理

使用语义化版本（SemVer），通过 Changesets 管理变更日志。重大变更需要迁移指南和 codemod。

构建设计系统是一项投资，但它会在长期开发中带来指数级的回报。`,
  },
  {
    slug: "open-source-contributions",
    title: "如何高效参与开源项目",
    excerpt: "从选择项目到提交第一个 PR，一份实用的高质量开源贡献指南。",
    date: "2026-02-12",
    tags: ["开源", "工程化"],
    cover: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop",
    content: `## 为什么要参与开源？

参与开源不只是 altruism，它是最有效的职业投资之一。

### 选择合适的开源项目

好的起点：

1. **你日常使用的工具** — 熟悉度高，痛点清晰
2. **标注 \`good first issue\` 的项目** — 门槛低
3. **活跃度高的项目** — 维护者响应快
4. **文档完善的项目** — 上手成本低

### 第一个贡献

\`\`\`bash
# 1. Fork 并克隆
git clone https://github.com/your-username/project.git

# 2. 创建功能分支
git checkout -b fix/issue-123-description

# 3. 开发、测试、提交
git commit -m "fix: resolve issue #123 - description"

# 4. 推送并创建 PR
git push origin fix/issue-123-description
\`\`\`

### PR 最佳实践

一个高质量的 PR 应该：

- **标题清晰** — 使用 conventional commits 格式
- **描述完整** — 说明变更原因、测试方式、截图
- **粒度适中** — 一个 PR 做一件事
- **通过 CI** — 确保所有检查通过

### 与维护者沟通

\`\`\`markdown
## 问题

简要描述你发现的问题。

## 复现步骤

1. 安装版本 x.x.x
2. 执行 y 操作
3. 期望结果是 z，实际结果是 w

## 建议方案

我觉得可以这样做...

## 截图/日志

（如有）
\`\`\`

> 开源社区的核心是信任和尊重。保持谦逊，接受反馈，持续贡献。

### 从贡献到维护者

持续的贡献会让你从一个 contributor 成长为 maintainer：

1. 先从文档、bug fix 开始
2. 逐步参与 feature 讨论
3. 承担 code review 职责
4. 最终获得 maintain 权限

开源世界欢迎每一个真诚的贡献者。开始你的第一个 PR 吧！`,
  },
];
