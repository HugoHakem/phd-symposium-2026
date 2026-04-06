# Contributing to the EMBL PhD Symposium 2026 Website

Thank you for helping build the 28th EMBL PhD Symposium site.
This document covers both **content updates** (speakers, schedule, sponsors) and
**code contributions** (components, styling, bug fixes).

---

## Table of Contents

- [Who contributes what](#who-contributes-what)
- [Content updates (no coding required)](#content-updates-no-coding-required)
- [Code contributions](#code-contributions)
- [Development setup](#development-setup)
- [Branch & commit conventions](#branch--commit-conventions)
- [Opening issues](#opening-issues)
- [Opening pull requests](#opening-pull-requests)

---

## Who contributes what

| Role | Typical tasks |
|------|---------------|
| Symposium organiser | Add/edit speakers, update the schedule, add sponsors, fix copy |
| Web developer | Fix bugs, improve components, add features, maintain CI |

---

## Content updates (no coding required)

All site content lives in `src/content/`. You only need to edit text files —
no knowledge of Astro or Tailwind is needed.

| What | File(s) |
|------|---------|
| Add / edit a speaker | `src/content/speakers/<slug>.md` — copy an existing file as a template |
| Edit the schedule | `src/content/schedule/day-{1,2,3}.yaml` |
| Add / edit a sponsor | `src/content/sponsors/<slug>.yaml` |
| Key dates list | `src/pages/index.astro` → search `Mark Your Calendar` |
| Countdown target | `src/components/HeroSection.astro` → search `targetDate` |
| Venue / Travel / FAQ | `src/pages/about.astro` |

See [docs/content-guide.md](docs/content-guide.md) for field-by-field instructions
and required/optional frontmatter fields.

For content-only PRs, a short description of what changed is all you need.

---

## Code contributions

### Prerequisites

- Node >= 22
- [pnpm](https://pnpm.io) (`npm install -g pnpm` or the [official installer](https://pnpm.io/installation))

### Development setup

```bash
# 1. Fork and clone
git clone https://github.com/<your-fork>/phd-symposium-2026.git
cd phd-symposium-2026

# 2. Install dependencies
pnpm install

# 3. Start the dev server
pnpm dev
# → http://localhost:4321/phd-symposium-2026/
```

### Available commands

| Command | Action |
|---------|--------|
| `pnpm dev` | Start dev server with hot reload |
| `pnpm build` | Production build to `dist/` |
| `pnpm preview` | Serve the production build locally |

### Key conventions

**Base path** — every internal link and public asset must use `import.meta.env.BASE_URL`:

```astro
<a href={`${import.meta.env.BASE_URL}program`}>Program</a>
<img src={`${import.meta.env.BASE_URL}gear1.svg`} />
```

Never use bare absolute paths (`/program`, `/gear1.svg`) — they break on GitHub Pages.

**Content Layer API** — use `entry.id`, not `entry.slug`. Config lives in
`src/content.config.ts` (not `src/content/config.ts`).

**Tailwind** — custom colour tokens are defined in `src/styles/global.css` under `@theme`.
See [docs/design-system.md](docs/design-system.md) for the full token reference.

---

## Branch & commit conventions

```
main          production branch — deployed automatically on push
feat/<topic>  new feature
fix/<topic>   bug fix
content/<topic> content-only update (speakers, schedule, etc.)
chore/<topic> tooling, CI, dependencies
```

Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add sponsor carousel
fix: mobile nav menu z-index on non-home pages
content: add Day 2 keynote speaker profile
chore: update Astro to 6.x
```

---

## Opening issues

Use the provided issue templates:

- **Bug report** — something is broken or displaying incorrectly
- **Content update** — request to add or change speakers, schedule, sponsors, or copy
- **Feature request** — new functionality or design improvement

---

## Opening pull requests

1. Open an issue first for non-trivial changes so the approach can be agreed on.
2. Branch off `main`, make your changes, then open a PR against `main`.
3. Fill in the PR template — describe what changed and how to verify it.
4. Deployments happen automatically; a preview is not provided, so test with
   `pnpm build && pnpm preview` locally before requesting review.

PRs that change visual output should include a short description of the affected
pages/components and (where possible) a screenshot or screen recording.
