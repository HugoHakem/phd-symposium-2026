# CLAUDE.md

This file gives Claude Code context about the project. Extended memory lives in
`.claude/memory/` (tracked in this repo — accessible to all contributors).

---

## Project

28th EMBL PhD Symposium website — **"Shifting Gears to Scale up Discovery"**
December 2–4, 2026 · EMBL Heidelberg, Germany

Static site built with Astro 6 + Tailwind CSS v4. Deployed to GitHub Pages at
`https://HugoHakem.github.io/phd-symposium-2026/`.

---

## Stack

- **Astro 6** — static output, Content Layer API
- **Tailwind CSS v4** — via `@tailwindcss/vite` plugin, `@theme` tokens in `src/styles/global.css`
- **Zod v4** — content schema validation in `src/content.config.ts`
- **Google Fonts** — Sora (headings) · Spectral (body) · Space Mono (labels)

---

## Key conventions

### Content Layer API (Astro 6)
- Config is `src/content.config.ts` (NOT `src/content/config.ts` — that is the deprecated Astro 4 path)
- Collections use `glob()` loaders, not `type: 'content'` / `type: 'data'`
- Entry identifier is `entry.id`, NOT `entry.slug` (slug was removed in Astro 5)

### Base path
- `base: '/phd-symposium-2026/'` in `astro.config.mjs` — note the **trailing slash**
- `import.meta.env.BASE_URL` resolves to `/phd-symposium-2026/` at build time
- All internal links and public asset `src` attributes use `${import.meta.env.BASE_URL}path`
  (e.g. `href={'${import.meta.env.BASE_URL}program'}`, `src={'${import.meta.env.BASE_URL}brand/gear1.svg'}`)
- **Never** use bare absolute paths like `/program` or `/brand/gear1.svg` — they break on GitHub Pages

### Public assets
- `publicDir` is set to `static/` in `astro.config.mjs` (not the Astro default `public/`)
- Layout: `static/brand/` (symposium logo, gear SVGs, white EMBL logo for nav/footer),
  `static/sponsors/<tier folder>/<sponsor-id>.svg` (the logos the site shows; originals of adapted ones in
  `static/sponsors-original-unused/`, see `docs/logos.md`), `static/speakers/`, `static/qrcode/`;
  `favicon.svg` and `og-image.png` stay at the root
- Gear SVGs are served from `static/brand/`; `src/assets/` keeps originals — **edit `static/` when changing served files**
- Reference them as `${import.meta.env.BASE_URL}brand/gear1.svg` etc.

### Tailwind colours
Custom tokens are defined in `src/styles/global.css` under `@theme` and generate
standard Tailwind utilities. The site is **dark-mode-first**: `cream`/`parchment`
are near-black surfaces and `ink` is near-white text, despite the names.

| Token | Hex | Utility example |
|-------|-----|-----------------|
| `green-800` | `#0E3535` | `bg-green-800`, `text-green-800` (dark teal) |
| `green-900` | `#071F1F` | `bg-green-900` |
| `green-500` | `#5DB5B5` | `text-green-500` (primary cyan/teal accent) |
| `red-600`   | `#CB24CB` | `bg-red-600` (magenta accent, used for CTAs/keynote) |
| `cream`     | `#071414` | `bg-cream` |
| `parchment` | `#040D0D` | `bg-parchment` |
| `ink`       | `#DDF0F0` | `text-ink` |
| `muted`     | `#5A9898` | `text-muted` |

Session-type badges (`.badge-talk`, `.badge-workshop`, etc. in `global.css`) use
a separate 7-hue set validated for colourblind-safe separation — see
`docs/design-system.md` for the full table and the rule about not reordering
them without re-validating.

---

## Content — how to update

All site data lives in `src/content/`. No component knowledge required.

| What | Where | Format |
|------|-------|--------|
| Add/edit a speaker | `src/content/speakers/<slug>.md` | Frontmatter + Markdown bio |
| Edit the schedule | `src/content/schedule/day-{1,2,3}.yaml` | YAML sessions array |
| Add/edit a sponsor | `src/content/sponsors/<slug>.yaml` | YAML |
| Countdown date | `src/components/HeroSection.astro` → `targetDate` in `<script>` | ISO 8601 string |
| Key dates list | `src/pages/index.astro` → "Mark Your Calendar" section | Hardcoded array |

See `docs/content-guide.md` for field-by-field instructions.

---

## Pages

| File | Route | Purpose |
|------|-------|---------|
| `src/pages/index.astro` | `/` | Hero, about, day cards, speakers, dates, sponsors |
| `src/pages/program.astro` | `/program` | Full 3-day schedule |
| `src/pages/speakers.astro` | `/speakers` | Cards + full bio panels |
| `src/pages/about.astro` | `/about` | Venue, travel, FAQ, CoC |
| `src/pages/404.astro` | `/404` | Not-found page |

---

## Deployment

Push to `main` → GitHub Actions builds and deploys automatically.
Workflow: `.github/workflows/deploy.yml` using `withastro/action@v6`.

See `docs/deployment.md` for full details including custom domain setup.
