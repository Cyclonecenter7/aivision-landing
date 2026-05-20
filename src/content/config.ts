import { defineCollection, z } from 'astro:content';

const cases = defineCollection({
  type: 'content',
  schema: z.object({
    id: z.string(),
    tagBg: z.string(),
    tag: z.string(),
    tagSub: z.string(),
    titleLine1: z.string(),
    titleLine2: z.string(),
    description: z.string(),
    problemsIntro: z.string(),
    problems: z.array(z.string()),
    actions: z.array(z.object({
      n: z.string(),
      t: z.string(),
      d: z.string(),
    })),
    results: z.array(z.object({
      v: z.string(),
      l: z.string(),
      c: z.string(),
    })),
    resultsSummary: z.string(),
    sliderVariant: z.enum(['finance', 'crm', 'ecommerce', 'platform']),
    sliderLight: z.boolean().default(false),
    nextId: z.string(),
    nextLabel: z.string(),
    datePublished: z.string().default('2026-03-15'),
    ogImage: z.string().optional(),
  }),
});

export const collections = { cases };
