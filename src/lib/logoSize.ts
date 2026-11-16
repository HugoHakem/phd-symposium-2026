// Sizes sponsor logos by visual area rather than by a fixed height.
//
// Logos range from square marks (Nikon, 1:1) to long wordmarks (Evident,
// ~7:1). With one shared max-height, square marks look tiny next to long
// wordmarks, and long ones collapse into thin strips. Instead each logo
// gets a width × height of roughly the same area, so they read at a similar
// visual weight; the box is then shrunk to fit the card if needed.
//
// This relies on every logo's viewBox being cropped tight to its artwork
// (padding belongs to the card, not the file) — see docs/content-guide.md.
import fs from 'node:fs';
import path from 'node:path';

const aspectCache = new Map<string, number>();

/** Width ÷ height of a logo under static/, read from its root viewBox. */
export function logoAspect(file: string): number {
  const cached = aspectCache.get(file);
  if (cached) return cached;
  const svg = fs.readFileSync(path.join(process.cwd(), 'static', file), 'utf-8');
  const root = svg.match(/<svg\b[^>]*>/)?.[0] ?? '';
  const vb = root.match(/\sviewBox=["']([^"']+)["']/)?.[1];
  if (!vb) throw new Error(`${file}: logo SVG needs a viewBox`);
  const [, , w, h] = vb.trim().split(/[\s,]+/).map(Number);
  const aspect = w / h;
  aspectCache.set(file, aspect);
  return aspect;
}

export interface LogoBoxOptions {
  /** Target area in rem² (before fitting into maxWidth/maxHeight). */
  area: number;
  maxWidth: number;  // rem
  maxHeight: number; // rem
}

/** Inline style giving the logo an equal-area box that fits within the limits. */
export function logoBoxStyle(file: string, { area, maxWidth, maxHeight }: LogoBoxOptions): string {
  const aspect = logoAspect(file);
  let h = Math.sqrt(area / aspect);
  let w = h * aspect;
  const k = Math.min(1, maxWidth / w, maxHeight / h);
  w *= k; h *= k;
  return `width:${w.toFixed(2)}rem;height:${h.toFixed(2)}rem`;
}
