# Design System

The site's visual language is defined by a small set of CSS custom properties and
Tailwind utilities. This document is a reference for anyone extending or adjusting
the design.

---

## Typefaces

| Role | Font | Weight | Usage |
|------|------|--------|-------|
| Display / Headings | [Sora](https://fonts.google.com/specimen/Sora) | 400–800 | All `<h1>`–`<h6>`, nav, labels, buttons |
| Body | [Spectral](https://fonts.google.com/specimen/Spectral) | 400, 600, 700 (+ italics) | Paragraphs, bios, card descriptions |
| Monospace | [Space Mono](https://fonts.google.com/specimen/Space+Mono) | 400, 700 | Labels, tags, times, countdown |

All three are loaded via Google Fonts in `src/layouts/BaseLayout.astro`.

CSS utility classes: `font-display`, `font-body`, `font-mono`.

---

## Colour Palette

Defined in `src/styles/global.css` inside the `@theme` block. The site is
**dark-mode-first**: `parchment`/`cream`/`warm` are near-black surfaces and
`ink` is near-white text, despite the light-sounding names — this is a legacy
naming holdover from an earlier light-theme version of the site.

### Cyan/teal ramp (primary brand)

| Token | Hex | Tailwind class | Usage |
|-------|-----|----------------|-------|
| `green-950` | `#020b0b` | `bg-green-950` | Darkest — footer bottom bar |
| `green-900` | `#071f1f` | `bg-green-900` | Hero, nav scrolled, page banners |
| `green-800` | `#0e3535` | `bg-green-800` | Primary dark teal |
| `green-700` | `#1a5858` | `text-green-700`, `bg-green-700` | Links, talk badge fill |
| `green-600` | `#2d8585` | — | Intermediate accent |
| `green-500` | `#5db5b5` | `text-green-500` | Primary cyan accent — footer logo, border hovers |
| `green-100` | `#d0f0f0` | `bg-green-100` | Light tints |
| `green-50`  | `#e8fafa` | `bg-green-50`  | Very light tints, badge text |

### Magenta ramp (accent / call-to-action)

| Token | Hex | Tailwind class | Usage |
|-------|-----|----------------|-------|
| `red-900` | `#350035` | — | — |
| `red-800` | `#5e005e` | — | — |
| `red-700` | `#960a96` | — | — |
| `red-600` | `#cb24cb` | `bg-red-600` | Primary CTA buttons, "Featured" badge |
| `red-500` | `#da48da` | `text-red-500` | Decorative label elements |
| `red-100` | `#f7caf7` | `bg-red-100` | Light magenta tints |
| `red-50`  | `#fdeafd` | `bg-red-50`  | Highlight backgrounds |

### Neutrals

| Token | Hex | Tailwind class | Usage |
|-------|-----|----------------|-------|
| `cream` | `#071414` | `bg-cream` | Alternate section / card backgrounds |
| `warm` | `#0d2020` | `bg-warm` | Borders, dividers, section fills |
| `parchment` | `#040d0d` | `bg-parchment` | Main page background |
| `ink` | `#ddf0f0` | `text-ink` | Primary text (near-white) |
| `muted` | `#5a9898` | `text-muted` | Secondary text |
| `border` | `#193535` | `border-border` | Hairline borders |

---

## Custom Utility Classes

Defined in `src/styles/global.css` under `@layer utilities`.

### `.label-tag`
Small-caps monospace label. Used for section prefixes like "About the Symposium".

```html
<span class="label-tag text-red-600">About the Symposium</span>
```

### `.clip-diagonal-down` / `.clip-diagonal-up` / `.clip-both-diagonal`
`clip-path` helpers that cut the section's edges diagonally. Applied to `<section>`
elements to create flowing transitions between sections.

```html
<section class="py-24 bg-cream clip-diagonal-down">…</section>
```

### `.text-outline-white` / `.text-outline-cyan` / `.text-outline-magenta`
Renders text as an outline (transparent fill, coloured stroke). Used for the large
"28" background number in the Hero.

```html
<span class="text-outline-white text-[20rem]">28</span>
```

### `.gear-spin-slow` / `.gear-spin-reverse`
CSS keyframe animation for rotating gear SVGs. Slow is 60 s/revolution clockwise;
reverse is 45 s/revolution counter-clockwise.

```html
<img src={`${import.meta.env.BASE_URL}brand/gear1.svg`} class="gear-spin-slow" />
<img src={`${import.meta.env.BASE_URL}brand/gear2.svg`} class="gear-spin-reverse" />
```

### `.fade-up`
Animates an element from `opacity: 0; translateY(24px)` to its natural position.
Use with inline `animation-delay` for staggered reveals.

```html
<h1 class="fade-up" style="animation-delay: 0.2s;">…</h1>
```

---

## Session Badge Classes

Applied to `<span class="session-badge ...">` elements in the schedule, the
programme-page legend, and speaker cards.

The 7 colour-coded badges below are a fixed, validated set — chosen and
ordered with the `dataviz` skill's palette validator so that every pair is
distinguishable under simulated colour blindness and clears WCAG text
contrast against this site's dark surfaces. **Don't reorder or recolour a
single badge in isolation** — the safety of the set depends on the exact
hues and the order they were validated in (see the comment above
`.badge-workshop` in `global.css`). Re-run the validator against the full set
if you need to add, remove, or recolour one.

| Class | Colour | Fixed order slot |
|-------|--------|-------------------|
| `.badge-workshop` | Blue | 1 |
| `.badge-poster` | Green | 2 |
| `.badge-keynote` | Magenta | 3 |
| `.badge-social` | Yellow/amber | 4 |
| `.badge-talk` | Aqua/teal | 5 |
| `.badge-panel` | Orange | 6 |
| `.badge-ceremony` | Violet | 7 |

`.badge-break` and `.badge-lunch` are intentionally excluded from the
colour-coded set — they're logistics, not sessions, and use the same neutral
grey (`--color-warm` / `--color-muted`) so they read as "not a content
session" rather than competing for a distinct hue.

`.badge-keynote` is also used standalone (not paired with a `type` badge) as
an overlay on speaker cards and bio panels when `keynote: true` is set.

---

## Section Pattern

Most content sections follow this layout pattern:

```html
<section class="py-24 lg:py-32 bg-{colour}">
  <div class="max-w-7xl mx-auto px-6 lg:px-8">

    <!-- Section header -->
    <div class="flex items-center gap-3 mb-4">
      <div class="h-px w-10 bg-red-600"></div>
      <span class="label-tag text-red-600">Section Label</span>
    </div>
    <h2 class="font-display font-800 text-ink text-4xl lg:text-5xl mb-6">
      Section Title
    </h2>

    <!-- Content -->
    …

  </div>
</section>
```

The red horizontal rule + monospace label above the heading is the consistent
visual signature across all sections.
