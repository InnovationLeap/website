# AGENTS.md

This file contains guidelines for agentic coding assistants working in this repository.

## Tech Stack

- **Frontend Framework**: Vue 3 with Composition API (`<script setup>`)
- **Language**: JavaScript (no TypeScript)
- **Build Tool**: Vite
- **Package Manager**: bun (**Do NOT use npm/yarn/pnpm**)
- **Router**: Vue Router
- **Markdown**: markdown-it

## Project Structure

```
src/
├── components/     # Reusable Vue components
├── pages/          # Page-level components
├── directives/     # Custom Vue directives
├── main.js         # Application entry point
├── router.js       # Vue Router configuration
└── i18n.js         # Internationalization config

public/
└── content/        # Markdown content files (en/ and cn/ subdirectories)
```

## Commands

```bash
# Development server (run with Bun)
bun run dev

# Production build
bun run build

# Preview production build
bun run preview

# Linting (fixes issues automatically)
bun run lint

# Deploy (uses deploy.sh)
bun run deploy
```

## Testing

- No test framework is currently configured
- Run `bun run lint` to validate code quality

## Code Style Guidelines

### Imports

- Use named imports for Vue APIs: `import { ref, computed, onMounted } from 'vue'`
- Use named imports for Vue Router: `import { useRoute, useRouter } from 'vue-router'`
- Component imports: `import Header from '../components/Header.vue'`
- Use relative paths for local imports
- Always include file extensions for Vue components

### Vue Components

- Use `<script setup>` syntax exclusively
- Define props with `defineProps({ prop: { type: Type, default: value } })`
- Define emits with `defineEmits(['event-name'])`
- Use Composition API functions: `ref`, `computed`, `watch`, `onMounted`, `onBeforeUnmount`
- Use template refs with `ref(null)` and access with `.value`
- Prefer `<router-link>` for internal navigation over `<a>` tags
- Use `:class="{ active: condition }"` for conditional classes
- Use `v-if`/`v-else` for conditional rendering, `v-for` with unique `:key`

### Naming Conventions

- Components: PascalCase (e.g., `Header.vue`, `Footer.vue`)
- Functions: camelCase (e.g., `adjustMediaAspect`, `loadMarkdown`)
- Variables: camelCase (e.g., `fmTitle`, `mobileMenuOpen`)
- Computed properties: camelCase (e.g., `computedSubnavTitle`)
- Props: camelCase
- CSS classes: kebab-case (e.g., `mobile-nav-toggle`)
- Constants: UPPER_SNAKE_CASE or camelCase (be consistent)

### JavaScript

- Use arrow functions: `const myFunc = () => {}`
- Use async/await for asynchronous operations
- Use optional chaining: `langData.legendWorldRemake?.downloadUrl`
- Use template literals for string interpolation
- Destructure objects and arrays where appropriate
- Use modern ES6+ features

### Styling

- Use scoped styles in components: `<style scoped>`
- Import global CSS files in root components via `@import url('/path/to/file.css')`
- Keep styles consistent with existing CSS patterns
- Use media queries for responsive design (breakpoint at 736px)
- Global styles are imported in App.vue using `@import url()`

### Global Patterns

- Expose functions to window for cross-component access: `window.functionName = func`
- Use MutationObserver for DOM change detection (see App.vue)
- Clean up global functions in `onBeforeUnmount`: `delete window.functionName`

### Error Handling

- Use try-catch blocks for async operations that may fail
- Log errors with `console.error()`
- Provide graceful fallbacks when possible
- Check for null/undefined before accessing properties

### Routing

- Define routes in `src/router.js`
- Use lazy loading for route components: `const Page = () => import('./pages/Page.vue')`
- Use dynamic route parameters with `:param`
- Pass props to route components with `props: r => ({ prop: r.params.param })`
- Access route info with `useRoute()`
- Navigate programmatically with `useRouter().push()`

### Internationalization

- i18n configuration is in `src/i18n.js`
- Structure: `export default { en: {...}, cn: {...} }`
- Access i18n data with `computed(() => i18n[props.lang])`
- Support both English (`en`) and Chinese (`cn`)

### Directives

- Custom directives use `v` prefix: `vLazyLoad`
- Define in `src/directives/` as objects with lifecycle hooks (mounted, updated, etc.)
- Export as: `export const vDirectiveName = { ... }`

### Performance

- Use `keep-alive` for preserving component state
- Implement lazy loading for images and routes
- Cache markdown content (see `MarkdownContent.vue`)
- Use `nextTick()` for DOM updates after reactive changes
- Preload critical assets when component mounts

### Code Organization

- One component per file
- Keep template, script, and style sections together
- Order template -> script setup -> style
- Group related functionality with comments
- Extract reusable logic into composable functions if needed

### Formatting

- No automatic formatting tool is configured
- Follow the existing code style in the codebase
- Use 2 spaces for indentation (consistent with existing files)
- Keep lines reasonably long but readable

## Important Notes

- **Do NOT use npm, yarn, or pnpm** - only bun is allowed
- No TypeScript is used in this project
- The project uses a custom build configuration with gzip and brotli compression
- Console logs are removed in production builds via terser
- The website supports both English and Chinese languages
- Static assets are served from the `public/` directory
