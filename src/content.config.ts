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
    sessionType: z.enum(['talk', 'workshop-lead', 'panel']),
    keynote: z.boolean().optional(),
    embo: z.boolean().optional(),
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
    color: z.string(),
    sessions: z.array(
      z.object({
        time: z.string(),
        // Optional end time (HH:MM). When omitted, a session ends when the next
        // one starts — so it's only needed before a gap, or on a day's last session.
        end: z.string().optional(),
        title: z.string(),
        type: z.enum(['talk', 'workshop', 'break', 'lunch', 'social', 'ceremony', 'panel', 'poster']),
        keynote: z.boolean().optional(),
        embo: z.boolean().optional(),
        speaker: z.string().optional(),
        speakerSlug: z.string().optional(),
        abstract: z.string().optional(),
        // External page for the session (e.g. a company's website). Speaker
        // talks link to their bio via speakerSlug instead.
        url: z.string().optional(),
        location: z.string().optional(),
      })
    ),
  }),
});

const sponsors = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/sponsors' }),
  schema: z.object({
    name: z.string(),
    tier: z.enum(['sponsor', 'supporter', 'grant', 'cpp']),
    subTier: z.enum(['founder_partner', 'corporate_partner', 'associate_partner']).optional(),
    website: z.string().optional(),
    description: z.string(),
    logo: z.string().optional(),
    // 'invert' flips a dark-on-transparent logo to light-on-transparent via
    // CSS filter (see SponsorsSection.astro) — for logos that are illegible
    // against the site's dark cards but shouldn't be edited at the source.
    logoTreatment: z.enum(['normal', 'invert']).optional(),
  }),
});

export const collections = { speakers, schedule, sponsors };
