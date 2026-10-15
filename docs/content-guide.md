# Content Update Guide

This guide explains how to update the site's content — speakers, schedule, and sponsors — without touching any component or page code.

---

## Adding or Editing a Speaker

### File location
`src/content/speakers/<speaker-slug>.md`

The filename (without `.md`) is used as the URL anchor on the Speakers page
and as the `speakerSlug` reference in the schedule. Use lowercase letters, numbers,
and hyphens only (e.g., `john-smith.md`).

### File format

```markdown
---
name: "Dr. John Smith"
role: "Professor of Genomics"
institution: "University of Cambridge"
country: "United Kingdom"
topic: "High-throughput single-cell profiling of immune cells"
day: 2
sessionType: "talk"
keynote: true                         # optional — omit or set false for non-keynote speakers
image: "speakers/john-smith.jpg"      # optional — omit for initials placeholder, no leading slash
website: "https://smithlab.cam.ac.uk" # optional
twitter: "johnsmithlab"               # optional, handle without @
---

Write the speaker's biography here in plain Markdown. This text will be
rendered as HTML on the Speakers page below the speaker card.

You can use **bold**, _italic_, and paragraph breaks. Keep it to 2–3 paragraphs.
```

### Required fields

| Field | Type | Values |
|-------|------|--------|
| `name` | string | Full name including title (Dr., Prof., etc.) |
| `role` | string | Job title |
| `institution` | string | Affiliation |
| `country` | string | Country of institution |
| `topic` | string | Title of the talk (displayed on cards and schedule) |
| `day` | number | `1`, `2`, or `3` |
| `sessionType` | enum | `talk`, `workshop-lead`, `panel` |
| `keynote` | boolean | optional — `true` shows a "Keynote" badge on the card, bio panel, and matching schedule session |

`sessionType` and `keynote` are independent: `keynote` is a flag layered on
top of a normal `sessionType`, not a session type of its own. Most keynote
speakers still use `sessionType: "talk"`.

### Adding a speaker photo

1. Place the image in `static/speakers/` (create the folder if it does not exist).
   Recommended: JPEG or PNG, 400×400 px or larger, square crop.
2. Set the `image` field to `speakers/filename.jpg` — no leading slash. It's
   resolved against `import.meta.env.BASE_URL` at build time.

If no `image` is set, the site displays a styled initials placeholder.

---

## Updating the Schedule

### File location
`src/content/schedule/day-1.yaml`, `day-2.yaml`, `day-3.yaml`

### File format

```yaml
day: 1
date: "2026-12-02"
title: "High-throughput methodologies"
color: "var(--color-day-1)"
sessions:
  - time: "09:15"
    title: "Welcome Address"
    type: ceremony
    location: "EMBL ATC Auditorium"

  - time: "09:30"
    title: "Keynote Talk"
    type: talk
    keynote: true
    speaker: "Dr. Anika Müller"
    speakerSlug: "anika-muller"
    abstract: "Optional one-paragraph abstract shown under the session title."
    location: "EMBL ATC Auditorium"

  - time: "10:30"
    title: "Coffee Break"
    type: break
    location: "ATC Foyer"
```

`color` should reference one of the day accent variables defined in
`src/styles/global.css` (`var(--color-day-1)`, `var(--color-day-2)`,
`var(--color-day-3)`) rather than a raw hex value, so it stays in sync with
the rest of the theme.

### Session types and their badge colour

| `type` value | Badge colour | Use for |
|--------------|-------------|---------|
| `talk` | Aqua/teal | Invited talks (add `keynote: true` for keynote talks) |
| `workshop` | Blue | Hands-on workshops |
| `panel` | Orange | Panel discussions |
| `poster` | Green | Poster sessions |
| `social` | Yellow/amber | Dinners, receptions |
| `ceremony` | Violet | Opening, closing, awards |
| `break` | Grey (neutral, not part of the colour-coded set) | Coffee breaks |
| `lunch` | Grey (neutral, not part of the colour-coded set) | Lunch breaks |

There is no `keynote` session `type`. To mark a session as a keynote, use
`type: talk` (or whichever type actually applies) plus `keynote: true` — this
adds a red/magenta "Keynote" badge alongside the normal type badge, on both
the programme page and the matching speaker's bio.

The badge colours are chosen as a set (spaced hues, checked for colourblind-safe
separation and text contrast against the site's dark surfaces) and defined in
`src/styles/global.css` under `.badge-*`. If you add a new session `type`,
extend the zod enum in `src/content.config.ts`, add a matching `.badge-<type>`
rule in `global.css`, and add it to the legend array in `src/pages/program.astro` —
picking a new colour by eye risks re-introducing a collision with an existing
badge; re-run the palette validator from the `dataviz` skill if you do.

### Linking a session to a speaker

Set `speakerSlug` to the exact filename (without `.md`) of the speaker's content file.
This creates a clickable link from the schedule to the speaker's bio on the Speakers page.

```yaml
speaker: "Dr. Anika Müller"    # display name (shown as text)
speakerSlug: "anika-muller"    # links to /speakers#anika-muller
```

Omit `speakerSlug` (keep only `speaker`) for a TBA or name-only placeholder —
it will render as plain text instead of a link, same as an unannounced speaker.

---

## Adding or Editing a Sponsor

### File location
`src/content/sponsors/<sponsor-slug>.yaml`

### File format

```yaml
name: "Organisation Name"
tier: "cpp"
subTier: "corporate_partner"    # required when tier is "cpp"; omit otherwise
website: "https://www.example.com"
description: "One or two sentences describing the organisation shown on the sponsors section."
logo: "sponsors/org-logo.svg"    # optional, no leading slash
```

### Sponsor tiers

| `tier` | Meaning |
|--------|---------|
| `sponsor` | Direct financial sponsor of the symposium |
| `supporter` | Sponsors a specific item (company talk, poster prize…) — `description` is shown as a short caption under the logo |
| `grant` | Grant-funding body |
| `cpp` | EMBL Corporate Partnership Programme member — requires `subTier` |

### `subTier` (only when `tier: "cpp"`)

| `subTier` | Meaning |
|-----------|---------|
| `founder_partner` | Founding-level corporate partner |
| `corporate_partner` | Standard corporate partner |
| `associate_partner` | Associate-level partner |

---

## Updating the Key Dates

Key dates are hardcoded in `src/pages/index.astro` inside the "Mark your calendar" section
(search for `Mark your`). Edit the date strings there directly.

## Updating the Countdown Timer

The target date is set in `src/components/HeroSection.astro` in the `<script>` block:

```ts
const targetDate = new Date('2026-12-02T09:00:00+01:00');
```

Change the date string to match the actual opening time. The format is ISO 8601
with UTC offset (`+01:00` for CET, `+02:00` for CEST).

## Updating Venue and Travel Info

Edit `src/pages/about.astro` directly. The venue address, travel options, and
accommodation list are all in clearly labelled sections of that file.
