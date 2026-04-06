# 28th EMBL PhD Symposium 2026

**Shifting Gears to Scale up Discovery**
November 5–7, 2026 · EMBL Heidelberg, Germany

Live site: [HugoHakem.github.io/PhD_Symposium_2026](https://HugoHakem.github.io/PhD_Symposium_2026)

---

## Overview

Conference website for the 28th EMBL PhD Symposium — a 3-day scientific meeting
organised by PhD students at the European Molecular Biology Laboratory.

Built with [Astro 6](https://astro.build) and [Tailwind CSS v4](https://tailwindcss.com).
Content is managed via Markdown and YAML files — no code changes needed to update
speakers, the schedule, or sponsors.

---

## Quick Start

```bash
# Prerequisites: Node >= 22, pnpm
curl -fsSL https://get.pnpm.io/install.sh | sh -

# Install dependencies
pnpm install

# Start local dev server
pnpm dev
# → http://localhost:4321/PhD_Symposium_2026/
```

---

## Commands

| Command | Action |
|---------|--------|
| `pnpm dev` | Start dev server at `localhost:4321` |
| `pnpm build` | Build production site to `dist/` |
| `pnpm preview` | Preview the production build locally |

---

## Updating Content

All site content lives in `src/content/`. No component knowledge required.

| What to update | Where |
|----------------|-------|
| Speakers | `src/content/speakers/<name>.md` |
| Schedule | `src/content/schedule/day-{1,2,3}.yaml` |
| Sponsors | `src/content/sponsors/<name>.yaml` |
| Key dates | `src/pages/index.astro` (search `Mark Your Calendar`) |
| Countdown date | `src/components/HeroSection.astro` (search `targetDate`) |
| Venue / Travel / FAQ | `src/pages/about.astro` |

See [docs/content-guide.md](docs/content-guide.md) for field-by-field instructions.

---

## Documentation

| Document | Description |
|----------|-------------|
| [docs/project-structure.md](docs/project-structure.md) | Every file and directory explained |
| [docs/content-guide.md](docs/content-guide.md) | How to add/edit speakers, schedule, sponsors |
| [docs/design-system.md](docs/design-system.md) | Colours, fonts, CSS utilities reference |
| [docs/deployment.md](docs/deployment.md) | GitHub Pages deployment and custom domain setup |

---

## Deployment

Pushes to `main` trigger an automatic deployment to GitHub Pages via GitHub Actions.
See [docs/deployment.md](docs/deployment.md) for details and custom domain setup.

---

## Tech Stack

- **Framework:** [Astro 6](https://astro.build) — static site generation
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com) via `@tailwindcss/vite`
- **Fonts:** Syne · Source Serif 4 · JetBrains Mono (Google Fonts)
- **Content:** Astro Content Layer API — Markdown + YAML with Zod validation
- **Deployment:** GitHub Actions → GitHub Pages
