# AGENTS.md

## 命令

```bash
bun run dev        # Vite 开发服务器 (host: 0.0.0.0)
bun run build      # 生产构建，含 gzip + brotli 压缩
bun run preview    # 预览生产构建
bun run lint       # ESLint 自动修复 (--fix)
bun run deploy     # 运行 deploy.sh
```

- **包管理器: 仅限 bun** — 不要使用 npm/yarn/pnpm
- **无测试框架** — `bun run lint` 是唯一的验证步骤
- Lint 使用 ESLint flat config + `eslint-plugin-vue` (flat/recommended)

## 架构

使用 **ViteSSG** (`vite-ssg`) 的单页 Vue 3 静态站点。

- `src/main.js` — 入口文件，使用 `ViteSSG`（不是直接用 `createApp`）
- `src/pages/Page.vue` — **唯一的页面组件**，所有路由都渲染它
- `src/router.js` — 所有路由格式为 `/:lang(en|cn)/...`，props 传递 `lang` 和 `page` 名称
- `src/i18n.js` — 简单的 `{ en: {...}, cn: {...} }` 导出，无 i18n 库
- Markdown 内容通过 `import.meta.glob('/src/content/**/*.md', { eager: true })` 在构建时导入
- 遗留 jQuery 脚本仅在客户端加载（vendored 在 `src/lib/`，排除在 ESLint 之外）

内容文件位于 `src/content/{en,cn}/`（引用为 `/content/{lang}/{page}.md`）。

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
- `BUILD_TIME` 是只读全局变量（在 vite.config.js 中定义）

Vue 相关：
- `vue/multi-word-component-names: off`
- `vue/no-v-html: off`
- 单行元素最多 3 个属性，多行每行 1 个
- Props 必须使用 camelCase
- Props 应有默认值和类型定义（警告级别）

## 代码规范

- 仅使用 **`<script setup>`** — 不用 Options API
- Props 使用 `defineProps({ name: { type: Type, default: val } })`
- CSS 类: kebab-case；组件文件: PascalCase
- 全局函数通过 `window` 暴露供跨组件使用（如 `window.adjustMediaAspect`）
- `onBeforeUnmount` 中必须清理: `delete window.functionName`
- `keep-alive` 包裹 `App.vue` 中的所有路由切换
- 作用域样式: `<style scoped>`，全局 CSS 在 `App.vue` 中通过 `@import url()` 导入
- 响应式断点: 736px

## 注意事项

- 构建会通过 terser 移除 `console.log`/`debugger` — `console.error` 不受影响
- `MarkdownContent.vue` 通过 `createApp().mount()` 将 Vue 组件（GallerySlider）挂载到 markdown 渲染的 HTML 中 — 卸载时清理至关重要
- Markdown 文件在构建时通过 eager import 导入，不是运行时获取
- `vue3-carousel` 是单独的 chunk（`vendor`）— 可用但不在每个组件中
- SSG 路由硬编码在 `vite.config.js` 的 `ssgOptions.includedRoutes` — 新路由必须在此添加
