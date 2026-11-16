# Logo inventory

Where every sponsor logo in `static/sponsors/` came from, what has been changed
in it, and how it was checked against the organisation's own artwork
(November 2026).

## How logos are stored

```
static/sponsors/                  ← the logos the WEBSITE shows, one <tier>/<id>.svg per sponsor
static/sponsors-original-unused/  ← the organisation's ORIGINAL logo (same tier folders), only
                                    where the website shows an adapted version; not used by the site
```

- `logo:` in a sponsor's YAML file points to the logo the website shows. The
  site is dark, so this is often a **dark-background version** (e.g. dark
  lettering turned white).
- `logoOriginal:` points to the organisation's **original** (light-background)
  logo in `static/sponsors-original-unused/`, when `logo` is an adapted
  version. The website doesn't use it. To show the original instead, swap the
  two paths.
- Every file starts with a comment saying where it came from and, for adapted
  versions, what changed. Adapted versions change **colours only**.

**For design work:** use `static/sponsors-original-unused/…` on light
backgrounds and the website version on dark ones. Where a logo has no file in
`sponsors-original-unused/`, the website file is already the original.

## Changes applied to every logo

| Change | Effect on the artwork |
|---|---|
| `viewBox` cropped tight to the visible artwork | None: only the frame moved. Any clear-space margin the original file had is gone, so add the organisation's required clear-space back in layouts. |
| `width`/`height` attributes removed | None: the size is set by whatever displays the file. |
| Pure vector (no embedded PNG/JPEG) | Files that wrapped a raster were rebuilt; see "Rebuilt as vector" below. |

The website also sizes logos to a similar visual area (`src/lib/logoSize.ts`).
That changes size only.

---

## Logos with an original and an adapted website version

| Logo | Original (`static/sponsors-original-unused/…`) | Website version differs by |
|---|---|---|
| Adelphi Genetics Forum | `sponsors/adelphi-genetics-forum.svg`: traced, see below | Navy lettering `#204093` → `#555da8` (a tint from its own ring gradient) |
| Biology Open | `prizes/biology-open.svg`: black wordmark, full-strength fan, as on the official banner (white banner background left out) | Fan dimmed to 50%, wordmark white |
| FEBS Letters | `prizes/febs-letters.svg`: "Letters" black `#231f20`, as on the official cover (exact shade unverified; no official SVG found) | "Letters" near-white `#fcfcfc` |
| Frontiers in Molecular Biosciences | `prizes/frontiers.svg`: wordmark in official grey `#5a5a5c` (Frontiers press kit); same grey assumed for the journal line | Wordmark white, as in Frontiers' official white logo |
| EMBO | `support/embo.svg`: official black version (EMBO logo package) | Identical to EMBO's official white version |
| EMBL | `support/embl.svg`: EMBL Visual Framework logo, identical to embl.org's live header | Black lettering → white (EMBL allows this colour version on dark backgrounds next to other coloured logos) |
| EMBL Alumni | `support/embl-alumni.svg`: colours of the supplied TIFF (`#1b1919`, `#62a754`, `#ce2331`) | Lettering white; dots in the current EMBL palette `#009f4c` / `#da0f21`. Note: the logo on EMBL's own Alumni page uses yet other colours (`#91B84B` / `#BE1623`); worth confirming with the Alumni office. |
| 10x Genomics | `cpp/…/10x-genomics.svg`: current logo (horizontal) from 10xgenomics.com, lettering in brand navy `#153057` | Official white-lettering version from the 10x website |
| BD | `cpp/…/bd.svg`: official SVG from bd.com (orange `#FF6E00`, blue `#044ED7`) | Same artwork and colours. In BD's file the white disc under the orange is slightly larger than, and off-centre from, the orange circle, which shows as a thin white rim on dark backgrounds. The website version trims the white star to the orange circle. Identical to the original on white. |
| Boehringer Ingelheim | `cpp/…/boehringer-ingelheim.svg`: 2023 logo in Dark Green `#08312A` (Wikimedia Commons; their site blocks downloads) | 2023 logo in Accent Green `#00E47C` |
| Evident | `cpp/…/evident.svg`: official (black + blue `#005CB9` V) | Evident's own all-white logo |
| Illumina | `cpp/…/illumina.svg`: official SVG (orange `#F9A31E`, grey `#666666`) | Grey wordmark white |
| Leica Microsystems | `cpp/…/leica.svg`: identical to the official SVG | "MICROSYSTEMS" white; red script kept |
| New England Biolabs | `cpp/…/neb.svg`: official global logo from neb.com (no flag; the flag is only on NEB UK's variant) | Same artwork as NEB's official reversed logo |
| NetApp | `cpp/…/netapp.svg`: matches the official logo | Wordmark white; blue mark kept |
| Sanofi | `cpp/…/sanofi.svg`: 2022 logo, matches official | Wordmark white; purple dots kept |
| Twist Bioscience | `cpp/…/twist-bioscience.svg`: official SVG (green `#0B835A` dots) | Twist's own dark-background logo |

## Logos with only one version

**The website version is the original** (works on dark backgrounds):

| Logo | Status |
|---|---|
| eppendorf | Official SVG (blue `#0035AD`) |
| GSK | Letterforms from gsk.com's SVG; **orange gradient is an approximation** matched to gsk.com's own gradient logo image (no official vector of the gradient exists publicly) |
| Nikon | Matches official |
| Roche | Official SVG from roche.com (blue `#0B41CD`) |
| Thermo Fisher Scientific | Official current logo (white lettering in a red `#E71316` box) |
| Merck (KGaA) | Correct Merck KGaA logo, recoloured from blue to cyan `#2DBECD`. Merck uses several brand colours for its wordmark on merckgroup.com (magenta `#EB3C96` in the header, purple `#503291` and cyan `#2DBECD` in the footer); no public rule says which is required |
| Daiichi Sankyo | Matches visually (only PNGs found, so exact colours unchecked) |
| Promega | Matches official |
| CDD Vault | Still CDD's current logo (3D icon, "Complexity Simplified"); see "Rebuilt as vector" |

**No original available ⚠** (the website file is a dark-background version):

| Logo | Notes |
|---|---|
| bpp | The supplied "BETTER PEPTIDES PLATFORM" lockup (white). The organisation is **Badische Peptide & Proteine (BPP) GmbH**, Mannheim; "Better Peptides Platform" is its production technology. That lockup wasn't found in any official source. Their company logo (brand blue about `#114D83`) exists if needed; waiting on the organisers. |
| Vizgen | Vizgen only publishes white-lettering versions; nothing for light backgrounds |

---

## Rebuilt as vector

These were raster images (or SVGs wrapping a raster). They were rebuilt as
vector and checked against the original. They match closely but are not the
organisation's own vector artwork.

| Logo | How it was made |
|---|---|
| Adelphi Genetics Forum | Traced from `AGF LOGO_COLOUR WEB.png` (the only version on adelphigenetics.org; no official vector exists). Lettering colour exact; each ring piece filled with its original top-to-bottom gradient. |
| EMBL Alumni | "EMBL" letterforms from EMBL's official vector logo; dots measured from `EMBL_Alumni_logo_final1.tif`; "ALUMNI" traced from it. |
| GSK | Letterforms from GSK's own flat SVG; gradient approximated (see above). |
| CDD Vault | The icon's 3D effects (shadow, rim, bevel) were embedded PNGs; rebuilt as vector gradients and masks. The rest is the original vector artwork. |
| Biology Open | The official banner's fan is a raster; redrawn as vector sectors with the sampled colours. |

## Symposium brand files (`static/brand/`)

| File | Notes |
|---|---|
| `logo.svg`, `gear1.svg`, `gear2.svg`, `gear3.svg`, `gear-all.svg` | The symposium's own artwork |
| `embl-white.svg` | **Derived** from EMBL's official vector logo: everything white, with the red dot as a white outline ring. For dark backgrounds: nav, footer and booklet covers. |
