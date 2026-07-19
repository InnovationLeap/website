# AGENTS.md

## 命令

```bash
bun run dev        # Astro 开发服务器 (host: 0.0.0.0)
bun run build      # 生产构建 + gzip + brotli 压缩
bun run preview    # 预览生产构建
bun run lint       # ESLint 自动修复 (--fix)
bun run check      # Astro 类型检查 (astro check)
bun run deploy     # 运行 deploy.sh
```

- **包管理器: 仅限 bun** — 不要使用 npm/yarn/pnpm
- **无测试框架** — `bun run lint` 和 `bun run check` 是唯一的验证步骤
- Lint 使用 ESLint flat config + `eslint-plugin-astro` + `typescript-eslint`

## 架构

使用 **Astro 7** (+ Tailwind CSS v4 + TypeScript) 的静态站点。

- `src/pages/` — 基于文件系统的路由，格式为 `/{lang}/{page}/index.astro`
- `src/layouts/BaseLayout.astro` — 基础 HTML 布局（含主题初始化脚本防 FOUC）
- `src/layouts/ContentPage.astro` — 内容页面布局，通过 Astro Content Collections 加载 Markdown 渲染
- `src/components/` — 组件（Header.astro, Footer.astro, SubNav.astro, ThemeToggle.astro, HomePage.astro, GallerySlider.astro）
- `src/i18n/ui.ts` — TypeScript 化的 i18n 配置，含完整类型定义
- `src/content.config.ts` — Content Collections 配置，通过 `glob()` loader 加载 `src/content/{en,cn}/*.md`
- `src/styles/global.css` — Tailwind CSS v4 配置 + 设计 token 系统（`@theme` + 语义色变量）
- 内容文件位于 `src/content/{en,cn}/`，通过 `getEntry('pages', '${lang}/${page}')` 获取

## 路由

- 根路径 `/` 根据浏览器语言（`navigator.language`）重定向至 `/cn/` 或 `/en/`
- 所有路由格式为 `/{lang}/{page}/`（`trailingSlash: 'always'`）
- `/{lang}/team/` 重定向至 `/{lang}/about/team/`
- `/en/super-mario-worker-project/*` 外部重定向至 `https://smwp.marioforever.net/`
- 路由通过 `redirects` 在 `astro.config.mjs` 中配置

## 设计系统

- **Tailwind CSS v4** — CSS-first 配置，通过 `@tailwindcss/vite` 插件集成
- **设计 token**: 通过 `@theme` 定义主色（蓝色系 `#006eff` 演变）、字体、圆角、过渡
- **语义色**: `bg-bg`, `bg-surface`, `text-text`, `text-text-muted`, `border-border` 等，自动适配深色/浅色模式
- **深色模式**: 基于 `data-theme` 属性 + `@custom-variant dark`，通过 `localStorage` 持久化
- **字体**: Bricolage Grotesque Variable（展示）+ Hanken Grotesk Variable（正文），通过 `@fontsource-variable` 加载
- 所有 UI 组件使用 Tailwind 工具类，无 `<style>` 标签（内容页面样式除外）

## 组件

| 组件 | 说明 |
|------|------|
| `Header.astro` | 顶部导航，`sticky` 仅在没有 SubNav 的页面生效 |
| `Footer.astro` | 多列页脚，含语言切换、构建时间、SVG 社交图标 |
| `SubNav.astro` | 子导航（sticky），含移动端下拉菜单、下载按钮 |
| `ThemeToggle.astro` | 深色/浅色模式切换（太阳/月亮 SVG） |
| `HomePage.astro` | 首页内容（Hero + 项目卡片 + 关于摘要） |
| `GallerySlider.astro` | 原生 JS 图集轮播（替代 vue3-carousel） |

## ESLint 规则

来自 `eslint.config.js`，与默认值有差异：

- **禁止分号**: `semi: ['error', 'never']`
- **单引号**: `quotes: ['error', 'single']`（允许模板字面量）
- **禁止尾逗号**: `comma-dangle: ['error', 'never']`
- **花括号内加空格**: `object-curly-spacing: ['error', 'always']`
- **2 空格缩进**，`SwitchCase: 1`
- 强制使用 **`prefer-const`** 和 **`no-var`**
- 强制使用 **`eqeqeq`**（null 比较除外）
- **未使用变量**: 警告，加 `_` 前缀可抑制
- **文件末尾换行**: `eol-last: ['error', 'always']`
- **禁止行尾空格**: `no-trailing-spaces: 'error'`
- **最多一个空行**: `no-multiple-empty-lines: ['error', { max: 1, maxEOF: 0 }]`
- **多行语句必须使用花括号**: `curly: ['error', 'multi-line']`

支持的文件类型: `.astro`（通过 `astro-eslint-parser`）、`.ts`（通过 `typescript-eslint`）、`.js/.mjs/.cjs`

## 代码规范

- 组件文件使用 `.astro` 扩展名，PascalCase 命名
- 使用 Astro `<script>` 标签（TypeScript）实现客户端交互
- 所有样式优先使用 Tailwind 工具类，仅在内容页面样式等必要场景使用 `<style>` 标签
- 不使用 `window` 全局函数暴露（与旧 Vue 架构不同，无需清理）
- 不需要 `keep-alive`（Astro 静态生成，SPA 路由切换）
- 响应式断点: `md:`（768px，Tailwind 默认）
- TypeScript 严格模式（`strict: true`，继承 `astro/tsconfigs/strict`）

## 注意事项

- 构建会通过 Terser 移除 `console.log`/`debugger` — `console.error` 不受影响
- Markdown 内容通过 Astro Content Collections 在构建时处理（`getEntry` + `render`），不是运行时获取
- 内容页面中的 `<div class="image-gallery">` 通过客户端 JS 增强为轮播组件
- 图片使用 `loading="lazy"` + `decoding="async"` 实现懒加载
- 构建输出 `dist/` 目录包含 gzip（`.gz`）和 brotli（`.br`）压缩文件
- 安装新依赖时使用 `bun add <package>`，开发依赖用 `bun add -d <package>`
