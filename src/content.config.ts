import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

// 定义内容集合 schema
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content' }),
  schema: z.object({
    title: z.string()
    // 允许其他 frontmatter 字段
    // 通过 transform 保留 body 中的 HTML
  })
})

export const collections = { pages }
