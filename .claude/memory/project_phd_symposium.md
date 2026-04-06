---
name: "PHD Symposium 2026 Project State"
description: "Full architecture and content decisions for the 28th EMBL PhD Symposium website"
type: project
---

28th EMBL PhD Symposium website — "Shifting Gears to Scale up Discovery".
Built with Astro 6 + Tailwind CSS v4. Static site deployed to GitHub Pages.

**How to apply:** Follow these conventions when updating or extending the site.
All content lives in Markdown/YAML files — no component knowledge needed for data changes.

## CLAUDE.md
Project-level instructions live in `CLAUDE.md` at the repo root. Read it first.
This memory file is the backing detail store for Claude sessions.

## Stack
- Astro 6 — static output, Content Layer API
- Tailwind CSS v4 via `@tailwindcss/vite`, `@theme` tokens in `src/styles/global.css`
- Zod v4 — content schema validation in `src/content.config.ts`
- Google Fonts: Syne (headings) · Source Serif 4 (body) · JetBrains Mono (labels)

## Design
- Theme: "Bio-Industrial Editorial" — scientific journal meets European design studio
- Colors: Deep green (#1A5C36 = `bg-green-800`), EMBL red (#C1121F = `bg-red-600`), warm parchment (#FAF8F3) background
- Hero: Dark green background, slowly rotating gear SVGs, large outline "28" background text, Syne 800 display font
- Diagonal section breaks via `clip-path` CSS utilities (`clip-diagonal-down`, etc.)
- Gear SVGs copied from `src/assets/` to `public/` for URL access

## Content Structure
- `src/content/speakers/*.md` — 9 speakers (3 keynotes + 6 talks), frontmatter + bio body
- `src/content/schedule/day-{1,2,3}.yaml` — 3-day program (Nov 5–7, 2026)
- `src/content/sponsors/*.yaml` — 6 sponsors (platinum / gold / silver / bronze)

## Pages
- `/` (index.astro): Hero, About/theme, Day cards, Keynote speakers, Other speakers grid, Key dates, Venue teaser, Sponsors
- `/program` (program.astro): Full 3-day schedule using ScheduleDay component
- `/speakers` (speakers.astro): Cards + full bio panels grouped by day
- `/about` (about.astro): History, venue, travel, accommodation, FAQ, Code of Conduct
- `/404` (404.astro): Themed 404 with gear background

## Key Technical Decisions
- Config file: `src/content.config.ts` (NOT `src/content/config.ts` — that is the deprecated Astro 4 path)
- Collections use `glob()` loaders; entry identifier is `entry.id` (not `entry.slug`)
- `zod` v4 installed directly; import `z` from `'zod'` not `'astro:content'`
- Base path: `base: '/phd-symposium-2026/'` with trailing slash — `BASE_URL` is `/phd-symposium-2026/`
- All internal hrefs and asset srcs use `${import.meta.env.BASE_URL}path` — never bare `/path`
- `trailingSlash: "ignore"` in astro.config.mjs so GitHub Pages handles both `/program` and `/program/`
- TypeScript strict mode on; some implicit `any` warnings in .astro files are non-blocking
