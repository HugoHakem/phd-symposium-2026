# Design System

The site's visual language is defined by a small set of CSS custom properties and
Tailwind utilities. This document is a reference for anyone extending or adjusting
the design.

---

## Typefaces

| Role | Font | Weight | Usage |
|------|------|--------|-------|
| Display / Headings | [Syne](https://fonts.google.com/specimen/Syne) | 400–800 | All `<h1>`–`<h6>`, nav, labels, buttons |
| Body | [Source Serif 4](https://fonts.google.com/specimen/Source+Serif+4) | 300, 400, 600 | Paragraphs, bios, card descriptions |
| Monospace | [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) | 400–600 | Labels, tags, times, countdown |

All three are loaded via Google Fonts in `src/layouts/BaseLayout.astro`.

CSS utility classes: `font-display`, `font-body`, `font-mono`.

---

## Colour Palette

Defined in `src/styles/global.css` inside the `@theme` block.

### Greens (primary brand)

| Token | Hex | Tailwind class | Usage |
|-------|-----|----------------|-------|
| `green-950` | `#0a2419` | `bg-green-950` | Darkest — footer bar |
| `green-900` | `#0D3321` | `bg-green-900` | Hero, nav scrolled, page banners |
| `green-800` | `#1A5C36` | `bg-green-800` | Primary green — talk badges, sponsor card hover |
| `green-700` | `#2D7A4F` | `text-green-700` | Links inside content |
| `green-600` | `#3D9965` | — | Intermediate accent |
| `green-500` | `#52B788` | `text-green-500` | Footer logo, border hovers |
| `green-100` | `#D8F3DC` | `bg-green-100` | Light backgrounds |
| `green-50`  | `#F0FBF4` | `bg-green-50`  | Very light tints |

### Reds (accent / call-to-action)

| Token | Hex | Tailwind class | Usage |
|-------|-----|----------------|-------|
| `red-900` | `#6B0000` | — | — |
| `red-800` | `#8B0000` | — | — |
| `red-700` | `#A50E0E` | — | — |
| `red-600` | `#C1121F` | `bg-red-600` | Primary CTA buttons, keynote badge |
| `red-500` | `#E63946` | `text-red-500` | Decorative label elements |
| `red-100` | `#FFE5E7` | `bg-red-100` | Light red tints |
| `red-50`  | `#FFF5F5` | `bg-red-50`  | Highlight backgrounds |

### Neutrals

| Token | Hex | Tailwind class | Usage |
|-------|-----|----------------|-------|
| `cream` | `#F4F0E6` | `bg-cream` | Alternate section backgrounds |
| `warm` | `#E8E4DC` | `bg-warm` | Borders, dividers |
| `parchment` | `#FAF8F3` | `bg-parchment` | Main page background |
| `ink` | `#141414` | `text-ink` | Primary text |
| `muted` | `#5A5857` | `text-muted` | Secondary text |
| `border` | `#D6D2CA` | `border-border` | Hairline borders |

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

### `.text-outline-white` / `.text-outline-green`
Renders text as an outline (transparent fill, coloured stroke). Used for the large
"28" background number in the Hero.

```html
<span class="text-outline-white text-[20rem]">28</span>
```

### `.gear-spin-slow` / `.gear-spin-reverse`
CSS keyframe animation for rotating gear SVGs. Slow is 60 s/revolution clockwise;
reverse is 45 s/revolution counter-clockwise.

```html
<img src="/gear1.svg" class="gear-spin-slow" />
<img src="/gear2.svg" class="gear-spin-reverse" />
```

### `.fade-up`
Animates an element from `opacity: 0; translateY(24px)` to its natural position.
Use with inline `animation-delay` for staggered reveals.

```html
<h1 class="fade-up" style="animation-delay: 0.2s;">…</h1>
```

---

## Session Badge Classes

Applied to `<span class="session-badge ...">` elements in the schedule and speaker cards.

| Class | Colour |
|-------|--------|
| `.badge-keynote` | Red |
| `.badge-talk` | Dark green |
| `.badge-workshop` | Blue |
| `.badge-panel` | Orange |
| `.badge-poster` | Teal |
| `.badge-social` | Amber |
| `.badge-ceremony` | Purple |
| `.badge-break` / `.badge-lunch` | Grey (muted) |

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
