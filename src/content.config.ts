import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const baseSchema = z.object({
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
});

export const collections = {
  ayat: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/ayat' }),
    schema: baseSchema.extend({
      surah: z.string(),
      surahNumber: z.number().int().positive(),
      ayahFrom: z.number().int().positive(),
      ayahTo: z.number().int().positive().optional(),
      arabic: z.string(),
      translation: z.string(),
      translationSource: z.string(),
      translationBn: z.string().optional(),
      translationSourceBn: z.string().optional(),
      tags: z.array(z.string()).default([]),
      note: z.string().optional(),
      noteBn: z.string().optional(),
      dateAdded: z.coerce.date(),
    }),
  }),

  hadith: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/hadith' }),
    schema: baseSchema.extend({
      collection: z.string(),
      bookNumber: z.union([z.string(), z.number()]).optional(),
      hadithNumber: z.string(),
      narrator: z.string(),
      grading: z.string().optional(),
      arabic: z.string().optional(),
      translation: z.string(),
      translationSource: z.string(),
      translationBn: z.string().optional(),
      translationSourceBn: z.string().optional(),
      reference: z.string(),
      tags: z.array(z.string()).default([]),
      note: z.string().optional(),
      noteBn: z.string().optional(),
      dateAdded: z.coerce.date(),
    }),
  }),

  events: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
    schema: baseSchema.extend({
      title: z.string(),
      titleBn: z.string().optional(),
      hijriDate: z.string().optional(),
      gregorianDate: z.string().optional(),
      era: z.string().optional(),
      location: z.string().optional(),
      summary: z.string(),
      summaryBn: z.string().optional(),
      sources: z.array(z.string()).default([]),
      tags: z.array(z.string()).default([]),
      dateAdded: z.coerce.date(),
    }),
  }),

  sahaba: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/sahaba' }),
    schema: baseSchema.extend({
      title: z.string(),
      titleBn: z.string().optional(),
      sahabi: z.string(),
      relatedEvent: z.string().optional(),
      summary: z.string(),
      summaryBn: z.string().optional(),
      sources: z.array(z.string()).default([]),
      tags: z.array(z.string()).default([]),
      dateAdded: z.coerce.date(),
    }),
  }),

  writings: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/writings' }),
    schema: baseSchema.extend({
      title: z.string(),
      titleBn: z.string().optional(),
      author: z.string(),
      originalSource: z.string().optional(),
      type: z.enum(['quote', 'article', 'reflection', 'poem']),
      summary: z.string().optional(),
      summaryBn: z.string().optional(),
      tags: z.array(z.string()).default([]),
      dateAdded: z.coerce.date(),
    }),
  }),
};
