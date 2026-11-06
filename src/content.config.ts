import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(170),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.enum(['how-to', 'gear', 'made-in-usa']),
    tags: z.array(z.string()).default([]),
    species: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    heroImage: z
      .object({
        src: z.string(),
        alt: z.string(),
        credit: z.string(),
        creditUrl: z.string(),
      })
      .optional(),
  }),
});

export const collections = { posts };
