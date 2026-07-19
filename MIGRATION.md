# INNOVATION LEAP 网站迁移文档

## 概述

本文档记录 INNOVATION LEAP 网站（`https://inleap.marioforever.net`）从 **ViteSSG + Vue 3 + jQuery + HTML5 UP Verti 模板** 迁移至 **Astro 7 + Tailwind CSS v4 + TypeScript** 的全过程与最终架构。

迁移目标：

- 消除 jQuery 及遗留插件（dropotron、breakpoints 等）依赖，降低运行时体积
- 用 Tailwind CSS v4 的 CSS-first 设计 token 体系替代 HTML5 UP Verti 模板的散落 CSS
- 用 Astro Content Collections 在构建时处理 Markdown，取代运行时 `markdown-it` 渲染
- 引入 TypeScript strict 类型检查与 ESLint 静态校验
- 用原生 JS + CSS 实现轮播，移除 `vue3-carousel` 第三方库
- URL 结构（`/cn/`、`/en/` 双语前缀）完全保留，确保 SEO 与外链稳定

## 技术架构变化

### 迁移前

- 框架: ViteSSG + Vue 3
- 样式: HTML5 UP Verti 模板 + 自定义 CSS + FontAwesome
- 脚本: jQuery + 遗留插件（dropotron, breakpoints 等，vendored 在 `src/lib/`）
- 内容: Markdown 通过 `markdown-it` 在运行时渲染
- 轮播: `vue3-carousel`（独立 vendor chunk）
- 类型: JavaScript（无类型检查）
- 路由: `/:lang(en|cn)/...`，所有路由渲染同一个 `Page.vue`
- SSG 路由硬编码在 `vite.config.js` 的 `ssgOptions.includedRoutes`

### 迁移后

- 框架: Astro 7（静态生成 SSG，`output: 'static'`）
- 样式: Tailwind CSS v4（通过 `@tailwindcss/vite` 插件接入，CSS-first `@theme` 配置 + 设计 token）
- 脚本: 原生 JavaScript（无 jQuery，零运行时框架开销）
- 内容: Astro Content Collections（`glob` loader，构建时处理 Markdown）
- 轮播: 原生 JS + CSS（`GallerySlider.astro` 组件 + `ContentPage.astro` 内联增强脚本）
- 类型: TypeScript（strict 模式，`astro check` 校验）
- 代码检查: ESLint flat config + `eslint-plugin-astro` + `astro-eslint-parser` + `typescript-eslint`
- 包管理器: bun（唯一允许）

### 依赖清单（`package.json`）

**dependencies**:

- `@fontsource-variable/bricolage-grotesque` - 标题字体
- `@fontsource-variable/hanken-grotesk` - 正文字体

**devDependencies**:

- `astro@^7.0.0`、`@astrojs/check@^0.9.0`
- `tailwindcss@^4.0.0`、`@tailwindcss/vite@^4.0.0`
- `typescript@^6.0.0`
- `eslint@^10.0.0`、`eslint-plugin-astro@^3.0.0`、`astro-eslint-parser@^3.0.0`
- `typescript-eslint@^8.0.0`
- `@eslint/js@^10.0.0`、`globals@^17.0.0`

**scripts**:

| 命令 | 作用 |
|------|------|
| `bun run dev` | 启动 Astro 开发服务器（`astro dev --host`） |
| `bun run build` | 生产构建（`astro build`） |
| `bun run preview` | 预览生产构建（`astro preview`） |
| `bun run lint` | ESLint 检查并自动修复（`eslint . --fix`） |
| `bun run check` | TypeScript 类型检查（`astro check`） |
| `bun run deploy` | 执行部署脚本（`bash deploy.sh`） |

## 路由结构

### URL 映射

URL 路径完全保留，遵循 `/{lang}/{page}/` 格式（`trailingSlash: 'always'`）。

| URL | 页面文件 | 说明 |
|-----|---------|------|
| `/` | `src/pages/index.astro` | 根路径，根据浏览器语言重定向到 `/cn/` 或 `/en/` |
| `/cn/` | `src/pages/cn/index.astro` | 中文首页（渲染 `<HomePage lang="cn" />`） |
| `/cn/about/` | `src/pages/cn/about/index.astro` | 中文「关于 INL」 |
| `/cn/about/team/` | `src/pages/cn/about/team.astro` | 中文「团队」 |
| `/cn/legend-world-remake/` | `src/pages/cn/legend-world-remake/index.astro` | 中文「Legend World Remake」概述 |
| `/cn/legend-world-remake/changelog/` | `src/pages/cn/legend-world-remake/changelog.astro` | 中文「更新日志」 |
| `/cn/legend-world-remake/legend-world-on-mario-worker/` | `src/pages/cn/legend-world-remake/legend-world-on-mario-worker.astro` | 中文「了解原版」 |
| `/en/` | `src/pages/en/index.astro` | 英文首页 |
| `/en/about/` | `src/pages/en/about/index.astro` | 英文「About」 |
| `/en/about/team/` | `src/pages/en/about/team.astro` | 英文「Our team」 |
| `/en/legend-world-remake/` | `src/pages/en/legend-world-remake/index.astro` | 英文「Legend World Remake」 |
| `/en/legend-world-remake/changelog/` | `src/pages/en/legend-world-remake/changelog.astro` | 英文「Changelog」 |
| `/en/legend-world-remake/legend-world-on-mario-worker/` | `src/pages/en/legend-world-remake/legend-world-on-mario-worker.astro` | 英文「MW 1.1 edition」 |

### 根路径重定向

`src/pages/index.astro` 是一个纯 HTML 页面，同时使用 `<meta http-equiv="refresh">` 和 `is:inline` 脚本：

```html
<meta http-equiv="refresh" content="0; url=/en/">
<script is:inline>
(function() {
  const lang = (navigator.language || navigator.userLanguage || '').toLowerCase().startsWith('zh') ? 'cn' : 'en'
  window.location.replace('/' + lang + '/')
})()
</script>
```

浏览器语言以 `zh` 开头则跳转到 `/cn/`，否则跳转到 `/en/`。

### 重定向配置

`astro.config.mjs` 中配置了 `redirects`，用于兼容旧版 URL：

```js
redirects: {
  '/cn/team': '/cn/about/team/',
  '/en/team': '/en/about/team/',
  '/en/super-mario-worker-project': 'https://smwp.marioforever.net/',
  '/en/super-mario-worker-project/version-archive': 'https://smwp.marioforever.net/',
  '/en/super-mario-worker-project/changelog': 'https://smwp.marioforever.net/'
}
```

- `/cn/team`、`/en/team` → 迁移到 `/about/team/` 子路径
- `/en/super-mario-worker-project/*` → 外链到独立的 SMWP 站点

### Astro i18n 配置

```js
i18n: {
  defaultLocale: 'en',
  locales: ['en', 'cn'],
  routing: {
    prefixDefaultLocale: true
  }
}
```

默认语言 `en` 也会带前缀（`/en/`），确保两种语言 URL 结构对称。

## Content Collections

### 配置

`src/content.config.ts` 使用 Astro 的 `glob` loader 和 Zod schema：

```ts
import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content' }),
  schema: z.object({
    title: z.string()
    // 允许其他 frontmatter 字段
  })
})

export const collections = { pages }
```

- `base: './src/content'` - 扫描 `src/content/` 下所有 Markdown
- `schema` 只强制要求 `title` 字段，其他 frontmatter 字段宽松处理
- Markdown body 由 Astro 内置渲染器处理（不再依赖 `markdown-it`）

### 内容文件

目录结构：

```
src/content/
├── cn/
│   ├── about.md
│   ├── changelog.md
│   ├── legend-world-on-mario-worker.md
│   ├── legend-world-remake.md
│   └── team.md
└── en/
    ├── about.md
    ├── changelog.md
    ├── legend-world-on-mario-worker.md
    ├── legend-world-remake.md
    └── team.md
```

内容文件迁移自原项目的 `src/content/{en,cn}/`，**内容本身未做修改**。每个 `.md` 文件需在 frontmatter 中提供 `title` 字段。

### Markdown 渲染

在 `src/layouts/ContentPage.astro` 中通过 `getEntry` + `render` 获取并渲染：

```astro
---
import { getEntry, render } from 'astro:content'

const { lang, page } = Astro.props
const entry = await getEntry('pages', `${lang}/${page}`)
if (!entry) {
  return Astro.redirect('/404')
}
const { Content } = await render(entry)
const title = entry.data.title
---

<article class="prose-content" data-content>
  <Content />
</article>
```

- `getEntry('pages', 'cn/about')` 按集合名 + ID 获取条目
- `render(entry)` 返回可直接在模板中渲染的 `Content` 组件
- Markdown 中的 HTML（如 `<div class="image-gallery">`）会被保留，由客户端脚本增强为轮播

## 设计系统

### 设计 Token

`src/styles/global.css` 使用 Tailwind CSS v4 的 CSS-first 配置。核心结构：

```css
/* 导入 Tailwind CSS v4 */
@import "tailwindcss";

/* 导入字体 */
@import "@fontsource-variable/bricolage-grotesque";
@import "@fontsource-variable/hanken-grotesk";

/* 配置深色模式变体 - 基于 data-theme 属性手动切换 */
@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *));
```

`@theme` 块定义静态设计 token：

| 类别 | 变量 | 示例 |
|------|------|------|
| 字体族 | `--font-display` | Bricolage Grotesque Variable + PingFang SC 回退 |
| 字体族 | `--font-body` | Hanken Grotesk Variable + PingFang SC 回退 |
| 主色 | `--color-primary-50` ~ `--color-primary-900` | `#006eff` 演变的蓝色系 |
| 强调色 | `--color-accent-400/500/600` | 暖橙色（按钮、高亮） |
| 圆角 | `--radius-sm/md/lg/xl/full` | `0.375rem` ~ `9999px` |
| 过渡 | `--transition-fast/normal/slow` | `150ms` / `250ms` / `400ms` |

### 语义化颜色（深浅模式切换）

浅色模式（`:root`）与深色模式（`[data-theme="dark"]`）定义同名变量，通过 `@theme inline` 映射到 Tailwind 主题：

```css
:root {
  --color-bg: #ffffff;
  --color-bg-subtle: #f8fafc;
  --color-bg-muted: #f1f5f9;
  --color-surface: #ffffff;
  --color-border: #e2e8f0;
  --color-text: #0f172a;
  --color-text-muted: #64748b;
  --color-text-subtle: #94a3b8;
  --color-shadow: rgba(0, 0, 0, 0.08);
  --color-shadow-lg: rgba(0, 0, 0, 0.12);
  --color-overlay: rgba(255, 255, 255, 0.8);
}

[data-theme="dark"] {
  --color-bg: #0a0e1a;
  --color-bg-subtle: #0f1623;
  --color-bg-muted: #1a2332;
  --color-surface: #131c2e;
  --color-border: #1e293b;
  --color-text: #f1f5f9;
  --color-text-muted: #94a3b8;
  --color-text-subtle: #64748b;
  --color-shadow: rgba(0, 0, 0, 0.3);
  --color-shadow-lg: rgba(0, 0, 0, 0.5);
  --color-overlay: rgba(10, 14, 26, 0.8);
}

@theme inline {
  --color-bg: var(--color-bg);
  --color-bg-subtle: var(--color-bg-subtle);
  /* ...其他语义色映射 */
}
```

这样在模板中可直接使用 `bg-bg`、`text-text`、`border-border`、`text-text-muted` 等工具类，并随 `data-theme` 自动切换。

### 深色/浅色模式实现机制

- **属性控制**：通过 `<html data-theme="light|dark">` 属性切换
- **Tailwind 变体**：`@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *))` 让 `dark:` 前缀基于 `data-theme` 而非 `prefers-color-scheme`
- **防 FOUC**：`BaseLayout.astro` 在 `<head>` 中注入 `is:inline` 脚本，在页面渲染前同步读取主题：

  ```html
  <script is:inline>
    (function() {
      const saved = localStorage.getItem('theme')
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const theme = saved || (prefersDark ? 'dark' : 'light')
      document.documentElement.setAttribute('data-theme', theme)
    })()
  </script>
  ```

- **持久化**：`ThemeToggle.astro` 在切换时写入 `localStorage.setItem('theme', next)`
- **自动检测**：未保存过主题时，通过 `prefers-color-scheme: dark` 媒体查询自动跟随系统
- **平滑过渡**：全局 `*, *::before, *::after` 添加 `transition: background-color / border-color / color`

## 组件架构

### 布局

- `src/layouts/BaseLayout.astro` - 基础 HTML 骨架
  - Props: `lang: Lang`、`title: string`、`description?: string`
  - 设置 `<html lang>`、`<title>`、`<meta description>`、favicon
  - 注入防 FOUC 主题脚本
  - 渲染 `<Header>`、`<main><slot /></main>`、`<Footer>`
  - `<Header>` 的默认 slot 用于放置 `<ThemeToggle />`
- `src/layouts/ContentPage.astro` - 内容页面布局
  - Props: `lang: Lang`、`page: string`
  - 通过 `getEntry('pages', '${lang}/${page}')` 获取 Markdown
  - 计算 SubNav 项（按 `about/team`、`legend-world-remake/changelog`、`legend-world-on-mario-worker` 分组）
  - 计算下载链接（从 `ui[lang]` 读取）
  - 渲染 `<BaseLayout>` + `<SubNav>` + `<article class="prose-content"><Content /></article>`
  - 内联 `<style>` 定义 Markdown 渲染样式（h2/h3/p/a/blockquote/code/table/img/iframe 等）
  - 内联 `<script>` 增强：`enhanceGalleries()`（将 `.image-gallery` 转为轮播）、`enhanceTables()`（表格响应式包裹）

### 组件

| 组件 | 文件 | 职责 |
|------|------|------|
| `Header.astro` | `src/components/Header.astro` | 顶部导航（`sticky top-0`、毛玻璃背景、汉堡菜单） |
| `Footer.astro` | `src/components/Footer.astro` | 页脚（多列链接 + 语言切换 + 构建时间 + 社交图标） |
| `SubNav.astro` | `src/components/SubNav.astro` | 子导航（`sticky`、移动端下拉、下载按钮） |
| `ThemeToggle.astro` | `src/components/ThemeToggle.astro` | 深色/浅色切换按钮（月亮/太阳图标，支持键盘） |
| `GallerySlider.astro` | `src/components/GallerySlider.astro` | 图集轮播（原生 JS，左右箭头 + 分页指示器 + 自动播放） |
| `HomePage.astro` | `src/components/HomePage.astro` | 首页内容（Hero + 项目卡片 + 关于摘要） |

#### Header 细节

- 从 `ui[lang].nav` 读取导航项
- `isCurrent(href)` 判断当前路由高亮（首页精确匹配，其他前缀匹配）
- `isExternal(href)` 判断外链，自动加 `target="_blank" rel="noopener"`
- 桌面端 `md:flex` 横向导航，移动端汉堡菜单

#### Footer 细节

- 从 `ui[lang].footer.sections` 读取多列链接
- 语言切换：基于当前路径替换 `/en` ↔ `/cn` 前缀
- 社交图标通过 `iconMap` 将 `fa-twitter` / `fa-youtube` 映射为内联 SVG（移除 FontAwesome 依赖）
- 显示构建时间（`new Date()` 格式化为 `YYYY-MM-DD HH:mm:ss`）

#### SubNav 细节

- Props: `items: SubNavItem[]`、`title: string`、`downloadUrl?: string`、`downloadText?: string`
- `sticky top-0 z-40`，毛玻璃背景
- 桌面端横向标签，移动端下拉切换（`data-subnav-toggle`）
- 右侧可选下载按钮

#### GallerySlider 细节

- Props: `images: GalleryImage[]`（`{ src, alt }`）
- 桌面端每屏 2 张（`md:w-1/2`），移动端每屏 1 张（`w-full`）
- 控件：左右箭头（`data-prev` / `data-next`）+ 分页指示器（`data-dot`）
- 自动播放 3 秒间隔，鼠标悬停暂停
- 同样的轮播逻辑也内联在 `ContentPage.astro` 中，用于增强 Markdown 中的 `.image-gallery` 元素

## 国际化

### 配置

`src/i18n/ui.ts` 导出类型化的 UI 字符串配置：

```ts
export type Lang = 'en' | 'cn'

export interface NavItem {
  text: string
  href: string
  target?: string
}

export interface DownloadConfig {
  downloadUrl: string
  downloadText: string
}

export interface FooterLink {
  text?: string
  href?: string
  target?: string
  icon?: string
}

export interface FooterSection {
  title: string
  links: FooterLink[]
}

export interface FooterConfig {
  sections: FooterSection[]
  switchLang: { text: string; href: string }
  copyright: string
}

export interface LangConfig {
  logoAlt: string
  nav: NavItem[]
  legendWorldRemake: DownloadConfig
  legendWorldMW: DownloadConfig
  smwp: DownloadConfig
  footer: FooterConfig
}

export const ui: Record<Lang, LangConfig> = {
  cn: { /* ...中文配置... */ },
  en: { /* ...英文配置... */ }
}
```

`ui[lang]` 提供：logo alt 文本、导航数组、三个下载配置（Legend World Remake / Legend World MW / SMWP）、页脚配置（多列链接 + 语言切换 + 版权）。

### 语言切换

`Footer.astro` 中的语言切换逻辑：

```ts
const currentPath = Astro.url.pathname
const switchLangUrl = currentPath.replace(/^\/(en|cn)/, `/${lang === 'en' ? 'cn' : 'en'}`)
```

- 中文页显示「English」按钮 → 跳转到对应英文路径
- 英文页显示「Chinese」按钮 → 跳转到对应中文路径
- 路径其余部分保持不变，实现双语镜像切换

## 构建与部署

### 开发

```bash
bun run dev
```

启动 Astro 开发服务器（`astro dev --host`），监听所有网络接口，支持 HMR。

### 构建

```bash
bun run build
```

执行 `astro build`：

1. 扫描 `src/content/**/*.md`，通过 `glob` loader 注入 Content Collections
2. 为每个 `src/pages/**/*.astro` 生成静态 HTML
3. 应用 `astro.config.mjs` 中的 `redirects`
4. Vite 打包 CSS / JS
5. 输出到 `dist/`（`build.format: 'directory'`，每个路由生成目录 + `index.html`）

### 部署

`deploy.sh` 在服务器端执行：

```sh
#!/usr/bin/env sh
export PATH="$HOME/.bun/bin:$PATH"
set -e

WORK_DIR=/data/inleap-next
BRANCH=master

cd $WORK_DIR || exit
git pull origin $BRANCH
bun install
bun run build

echo "**************************** 本地部署 *************************"
rsync -av --checksum --delete dist/ /data/wwwroot/inleap.marioforever.net/
chown -R www-data:www-data /data/wwwroot/inleap.marioforever.net/
echo "**************************** 部署成功 *************************"
```

流程：

1. 进入服务器工作目录 `/data/inleap-next`
2. `git pull origin master` 拉取最新代码
3. `bun install` 安装依赖
4. `bun run build` 构建
5. `rsync -av --checksum --delete dist/ /data/wwwroot/inleap.marioforever.net/` 同步到 Web 根目录（`--delete` 删除目标目录中不存在于源目录的文件）
6. `chown -R www-data:www-data` 修正文件权限

本地可通过 `bun run deploy` 触发（需服务器 SSH 访问权限）。

### 代码检查

```bash
bun run lint    # ESLint 自动修复
bun run check   # TypeScript 类型检查（astro check）
```

`bun run lint` 是日常开发的主要验证步骤（项目无测试框架）。

## 维护指南

### 新增页面

1. 在 `src/content/{lang}/` 添加 Markdown 文件（如 `src/content/cn/new-page.md`），frontmatter 需包含 `title`：
   ```md
   ---
   title: 新页面标题
   ---
   正文内容...
   ```
2. 在 `src/pages/{lang}/` 创建对应 `.astro` 页面文件（如 `src/pages/cn/new-page.astro`）：
   ```astro
   ---
   import ContentPage from '../../layouts/ContentPage.astro'
   ---
   <ContentPage lang="cn" page="new-page" />
   ```
3. 如果页面属于某个分组（如 `about` 或 `legend-world-remake`），在 `ContentPage.astro` 的 `getSubnavItems()` 函数中添加对应分支，让 SubNav 正确高亮。
4. 如果是新的路由级别或需要兼容旧 URL，在 `astro.config.mjs` 的 `redirects` 中添加条目。
5. 如需在导航或页脚暴露，编辑 `src/i18n/ui.ts` 中对应语言的 `nav` 数组或 `footer.sections`。

### 修改内容

- 直接编辑 `src/content/{lang}/*.md` 文件
- 构建时自动处理，无需改动代码
- Markdown 中可使用原生 HTML（如 `<div class="image-gallery">` 会被客户端脚本增强为轮播）

### 添加组件

1. 在 `src/components/` 创建 `.astro` 文件
2. 使用 Tailwind CSS 工具类和设计 token（如 `bg-bg`、`text-text-muted`、`border-border`、`text-primary-500`）
3. 遵循代码风格规范（见下文 ESLint 配置）：
   - 无分号
   - 单引号
   - 2 空格缩进
   - 无尾逗号
   - 花括号内加空格
4. Props 使用 TypeScript 接口定义，通过 `Astro.props` 获取
5. 客户端脚本写在 `<script>` 标签中（Astro 会自动打包）

### 修改设计 Token

- 编辑 `src/styles/global.css` 中的 `@theme` 块修改静态 token（主色、字体、圆角、过渡）
- 编辑 `:root` 和 `[data-theme="dark"]` 修改语义化颜色（bg、surface、border、text 等）
- 新增语义色需同时在 `:root` / `[data-theme="dark"]` 定义变量，并在 `@theme inline` 中映射到 Tailwind

### 添加导航项

- 编辑 `src/i18n/ui.ts` 中对应语言的 `nav` 数组：
  ```ts
  nav: [
    { text: '首页', href: '/cn/' },
    { text: '新项目', href: '/cn/new-project/' },
    // ...
  ]
  ```
- 外链项需提供 `target: '_blank'`
- `Header.astro` 会自动根据 `href` 判断当前路由高亮

## ESLint 配置

`eslint.config.js` 使用 flat config，组合多个插件：

```js
import js from '@eslint/js'
import astro from 'eslint-plugin-astro'
import * as astroParser from 'astro-eslint-parser'
import tseslint from 'typescript-eslint'
import globals from 'globals'

export default [
  { ignores: ['dist/**', '.astro/**', '.vite-ssg-temp/**', 'node_modules/**', 'public/**', 'src/content/**', 'deploy.sh', 'bunfig.toml', 'bun.lock'] },
  js.configs.recommended,
  ...astro.configs.recommended,
  ...tseslint.configs.recommended,
  // ...
]
```

### 支持的文件类型

- `**/*.{js,mjs,cjs,ts,astro}` - 通用规则
- `**/*.astro` - 使用 `astro-eslint-parser`，额外规则：`astro/no-set-html-directive: off`、`astro/no-unused-css-selector: warn`
- `**/*.ts` - 使用 `@typescript-eslint/parser`

### 忽略目录

`dist/`、`.astro/`、`.vite-ssg-temp/`（遗留 ViteSSG 临时目录）、`node_modules/`、`public/`、`src/content/`（Markdown 内容不检查）、`deploy.sh`、`bunfig.toml`、`bun.lock`

### 代码风格规则

| 规则 | 配置 | 说明 |
|------|------|------|
| `indent` | `2, { SwitchCase: 1, ... }` | 2 空格缩进，switch case 缩进 1 级 |
| `quotes` | `'single', { avoidEscape: true, allowTemplateLiterals: true }` | 单引号，允许模板字面量 |
| `semi` | `never` | 禁止分号 |
| `comma-dangle` | `never` | 禁止尾逗号 |
| `object-curly-spacing` | `always` | 花括号内加空格 |
| `no-unused-vars` | `warn, { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' }` | 未使用变量警告，`_` 前缀可抑制 |
| `no-empty` | `{ allowEmptyCatch: true }` | 允许空 catch |
| `no-console` | `off` | 允许 console（构建时由 terser 移除 `console.log`） |
| `no-debugger` | `warn` | debugger 警告 |
| `no-multiple-empty-lines` | `{ max: 1, maxEOF: 0 }` | 最多 1 个空行，文件末尾无空行 |
| `no-trailing-spaces` | `error` | 禁止行尾空格 |
| `eol-last` | `always` | 文件末尾换行 |
| `prefer-const` | `error` | 强制 const |
| `no-var` | `error` | 禁止 var |
| `eqeqeq` | `always, { null: 'ignore' }` | 严格相等（null 除外） |
| `curly` | `multi-line` | 多行语句必须使用花括号 |

### 全局变量

`globals.browser`、`globals.node`、`globals.es2022` 均已注入，无需额外声明 `window`、`document`、`localStorage` 等。
