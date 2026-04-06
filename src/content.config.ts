import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

const speakers = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/speakers' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    institution: z.string(),
    country: z.string(),
    topic: z.string(),
    day: z.number().min(1).max(3),
    sessionType: z.enum(['keynote', 'talk', 'workshop-lead', 'panel']),
    image: z.string().optional(),
    website: z.string().optional(),
    twitter: z.string().optional(),
  }),
});

const schedule = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/schedule' }),
  schema: z.object({
    day: z.number(),
    date: z.string(),
    title: z.string(),
    theme: z.string(),
    color: z.string(),
    sessions: z.array(
      z.object({
        time: z.string(),
        title: z.string(),
        type: z.enum(['keynote', 'talk', 'workshop', 'break', 'lunch', 'social', 'ceremony', 'panel', 'poster']),
        speaker: z.string().optional(),
        speakerSlug: z.string().optional(),
        abstract: z.string().optional(),
        location: z.string().optional(),
      })
    ),
  }),
});

const sponsors = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/sponsors' }),
  schema: z.object({
    name: z.string(),
    tier: z.enum(['platinum', 'gold', 'silver', 'bronze', 'media']),
    website: z.string(),
    description: z.string(),
    logo: z.string().optional(),
  }),
});

export const collections = { speakers, schedule, sponsors };
