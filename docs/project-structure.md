# Project Structure

This document describes every directory and file in the project and explains its role.

## Top-level layout

```
phd-symposium-2026/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions CI/CD → GitHub Pages
├── docs/                       # This documentation folder
├── public/                     # Static assets served as-is (no processing)
│   ├── gear1.svg               # Gear illustration (used in Nav, Hero, Footer)
│   ├── gear2.svg               # Gear illustration (used in Speakers, Footer)
│   ├── gear3.svg               # Gear illustration (used in accent positions)
│   └── gear-all.svg            # Combined gear composition (Hero, 404)
├── src/
│   ├── content/                # All editable site content (Markdown + YAML)
│   ├── components/             # Reusable Astro UI components
│   ├── layouts/                # Page wrapper templates
│   ├── pages/                  # One file = one URL route
│   └── styles/
│       └── global.css          # Global styles, Tailwind theme, utilities
├── astro.config.mjs            # Astro + Tailwind configuration
├── src/content.config.ts       # Content Collection schemas (data validation)
├── package.json
├── pnpm-lock.yaml
└── tsconfig.json
```

---

## `src/content/` — Editable Content

This is where **all site data lives**. You never need to touch a component or page
file to update speakers, the schedule, or sponsors. See [Content Guide](./content-guide.md)
for step-by-step update instructions.

### `src/content.config.ts`
Defines the **schema** (required fields and their types) for each content collection.
Astro validates every content file against this schema at build time — if a required
field is missing or has the wrong type, the build will fail with a clear error message.

### `src/content/speakers/`
One `.md` file per invited speaker. Frontmatter holds structured data; the body is
the speaker's biography rendered as HTML on the Speakers page.

```
speakers/
├── anika-muller.md        # Day 1 keynote
├── james-okafor.md        # Day 1 talk
├── li-wei.md              # Day 1 talk
├── elena-vasquez.md       # Day 2 keynote
├── marcus-brenner.md      # Day 2 talk
├── priya-sharma.md        # Day 2 talk
├── oliver-schmidt.md      # Day 3 keynote
├── amara-diallo.md        # Day 3 talk
└── sarah-lindberg.md      # Day 3 talk
```

The filename (without `.md`) becomes the URL anchor on the Speakers page
(e.g., `anika-muller.md` → `/speakers#anika-muller`).

### `src/content/schedule/`
One `.yaml` file per symposium day. Contains all sessions for that day as a structured
list. The schedule is displayed in order of the `time` field.

```
schedule/
├── day-1.yaml    # Thursday, November 5
├── day-2.yaml    # Friday, November 6
└── day-3.yaml    # Saturday, November 7
```

### `src/content/sponsors/`
One `.yaml` file per sponsoring organisation. Files are grouped visually on the site
by their `tier` field (`platinum`, `gold`, `silver`, `bronze`, `media`).

```
sponsors/
├── embl.yaml          # Platinum
├── max-planck.yaml    # Gold
├── wellcome.yaml      # Gold
├── zeiss.yaml         # Silver
├── roche.yaml         # Silver
└── bayer.yaml         # Bronze
```

---

## `src/components/` — UI Components

| File | Purpose |
|------|---------|
| `Nav.astro` | Fixed top navigation bar. Becomes opaque on scroll. Includes mobile hamburger menu. Active page link is highlighted automatically via `Astro.url.pathname`. |
| `HeroSection.astro` | Full-viewport hero on the homepage. Includes live JavaScript countdown timer, animated gear background, and CTA buttons. |
| `SpeakerCard.astro` | Reusable card for a single speaker. Displays avatar (or initials placeholder), session type badge, name, role/institution, and talk topic. Props: `slug`, `name`, `role`, `institution`, `country`, `topic`, `sessionType`, `day`, `image?`. |
| `ScheduleDay.astro` | Renders a full day's program. Receives the parsed YAML data and outputs a colour-coded session list. The time column is right-aligned for visual scanning. |
| `SponsorsSection.astro` | Groups sponsors by tier and renders them in appropriately-sized grids (platinum = 1 col, gold = 2+ col, etc.). Includes a "become a sponsor" CTA. |
| `Footer.astro` | Site footer with logo, nav columns, contact links, and a red accent bar. Contains decorative gear backgrounds. |

---

## `src/layouts/`

### `BaseLayout.astro`
Wraps every page. Handles:
- `<head>` with SEO meta tags (title, description, Open Graph)
- Google Fonts (`<link>` tags for Syne, Source Serif 4, JetBrains Mono)
- Global CSS import
- `<Nav>` at the top, `<Footer>` at the bottom
- A `<slot />` for each page's unique content

Props: `title?`, `description?`, `image?` (all optional, with sensible defaults).

---

## `src/pages/` — Routes

| File | URL | Description |
|------|-----|-------------|
| `index.astro` | `/` | Homepage: Hero, About section, Day cards, Keynote speakers, Key dates, Venue teaser, Sponsors |
| `program.astro` | `/program` | Full 3-day schedule, session legend, and registration callout |
| `speakers.astro` | `/speakers` | Speaker cards grouped by day + full bio panels |
| `about.astro` | `/about` | Symposium history, venue info, travel, accommodation, FAQ, Code of Conduct |
| `404.astro` | `/404` | Themed not-found page |

---

## `src/styles/global.css`

Imports Tailwind CSS and defines the project's design system:

- **`@theme` block** — Custom colour tokens that generate Tailwind utility classes:
  `green-800` (`#1A5C36`), `red-600` (`#C1121F`), `cream`, `parchment`, `ink`, `muted`, etc.
- **`@layer base`** — Default `font-family`, `background-color`, `color`, and `::selection` styles.
- **`@layer utilities`** — Custom one-off utility classes:
  - `.label-tag` — Small-caps monospace labels
  - `.clip-diagonal-down / -up / -both` — `clip-path` helpers for diagonal section breaks
  - `.text-outline-white / -green` — Webkit text stroke for outlined headlines
  - `.gear-spin-slow / .gear-spin-reverse` — CSS animation utilities for gear rotation
  - `.fade-up` — CSS animation for staggered entry reveals
- **`@layer components`** — Session type badge colours (`.badge-keynote`, `.badge-talk`, etc.) and sponsor tier label colours.
