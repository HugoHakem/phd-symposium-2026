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
sessionType: "keynote"
image: "/speakers/john-smith.jpg"     # optional — omit for initials placeholder
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
| `sessionType` | enum | `keynote`, `talk`, `workshop-lead`, `panel` |

### Adding a speaker photo

1. Place the image in `public/speakers/` (create the folder if it does not exist).
   Recommended: JPEG, 400×400 px or larger, square crop.
2. Set the `image` field to `/speakers/filename.jpg`.

If no `image` is set, the site displays a styled initials placeholder.

---

## Updating the Schedule

### File location
`src/content/schedule/day-1.yaml`, `day-2.yaml`, `day-3.yaml`

### File format

```yaml
day: 1
date: "2026-11-05"
title: "Molecules to Systems"
theme: "Structural Biology & Single-Cell Genomics at Scale"
color: "#1A5C36"
sessions:
  - time: "09:00"
    title: "Opening Ceremony"
    type: ceremony
    location: "EMBL ATC Auditorium"

  - time: "09:30"
    title: "Keynote: Cryo-ET at atomic resolution"
    type: keynote
    speaker: "Dr. Anika Müller"
    speakerSlug: "anika-muller"
    abstract: "Optional one-paragraph abstract shown under the session title."
    location: "EMBL ATC Auditorium"

  - time: "10:30"
    title: "Coffee Break"
    type: break
    location: "ATC Foyer"
```

### Session types and their colour coding

| `type` value | Badge colour | Use for |
|--------------|-------------|---------|
| `keynote` | Red | Keynote lectures |
| `talk` | Green | Invited talks |
| `workshop` | Blue | Hands-on workshops |
| `panel` | Orange | Panel discussions |
| `poster` | Teal | Poster sessions |
| `social` | Amber | Dinners, receptions |
| `ceremony` | Purple | Opening, closing, awards |
| `break` | Grey | Coffee breaks |
| `lunch` | Grey | Lunch breaks |

### Linking a session to a speaker

Set `speakerSlug` to the exact filename (without `.md`) of the speaker's content file.
This creates a clickable link from the schedule to the speaker's bio on the Speakers page.

```yaml
speaker: "Dr. Anika Müller"    # display name (shown as text)
speakerSlug: "anika-muller"    # links to /speakers#anika-muller
```

---

## Adding or Editing a Sponsor

### File location
`src/content/sponsors/<sponsor-slug>.yaml`

### File format

```yaml
name: "Organisation Name"
tier: "gold"
website: "https://www.example.com"
description: "One or two sentences describing the organisation shown on the sponsors section."
logo: "/sponsors/org-logo.svg"    # optional
```

### Sponsor tiers

| `tier` | Display size | Description shown? |
|--------|-------------|-------------------|
| `platinum` | Full width, large | Yes (full description) |
| `gold` | Multi-column, medium | Yes (full description) |
| `silver` | Multi-column, small | No |
| `bronze` | Multi-column, smallest | No |
| `media` | Same as bronze | No |

---

## Updating the Key Dates

Key dates are hardcoded in `src/pages/index.astro` inside the "Key Dates" section
(search for `Mark Your Calendar`). Edit the date strings there directly.

## Updating the Countdown Timer

The target date is set in `src/components/HeroSection.astro` in the `<script>` block:

```ts
const targetDate = new Date('2026-11-05T09:00:00+01:00');
```

Change the date string to match the actual opening time. The format is ISO 8601
with UTC offset (`+01:00` for CET, `+02:00` for CEST).

## Updating Venue and Travel Info

Edit `src/pages/about.astro` directly. The venue address, travel options, and
accommodation list are all in clearly labelled sections of that file.
