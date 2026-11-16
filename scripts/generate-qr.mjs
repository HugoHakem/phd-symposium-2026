import QRCode from 'qrcode';
import sharp from 'sharp';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const TARGET_URL = 'https://phdsymposium.embl-community.io/';
const OUT_DIR    = join(root, 'static', 'qrcode');
const PNG_SIZES  = [256, 512, 1024, 2048];

// ── QR base SVG ──────────────────────────────────────────────────────────────
const raw = await QRCode.toString(TARGET_URL, {
  type: 'svg',
  errorCorrectionLevel: 'H',
  margin: 2,
  color: { dark: '#141414', light: '#ffffff' },
});

const [, W, H] = raw.match(/viewBox="0 0 (\d+(?:\.\d+)?) (\d+(?:\.\d+)?)"/).map(Number);

const badge   = W * 0.22;
const padding = badge * 0.14;
const logo    = badge - padding * 2;
const bx      = (W - badge) / 2;
const by      = (H - badge) / 2;

// QR + black badge rect only (no embedded logo — handled separately per size)
const svgQR = raw.replace('</svg>', `
  <rect x="${bx.toFixed(2)}" y="${by.toFixed(2)}" width="${badge.toFixed(2)}" height="${badge.toFixed(2)}" fill="#141414"/>
</svg>`);

// Monochrome white logo (magenta + cyan → white)
const logoSvgMono = readFileSync(join(root, 'static', 'brand', 'logo.svg'), 'utf8')
  .replace(/rgb\(218,73,218\)/g, 'white')
  .replace(/rgb\(77,234,234\)/g, 'white');

mkdirSync(OUT_DIR, { recursive: true });

// ── SVG output (embed logo via base64 — fine at vector resolution) ────────────
const logoB64  = Buffer.from(logoSvgMono).toString('base64');
const svgFinal = svgQR.replace('</svg>', `
  <image href="data:image/svg+xml;base64,${logoB64}" x="${(bx + padding).toFixed(2)}" y="${(by + padding).toFixed(2)}" width="${logo.toFixed(2)}" height="${logo.toFixed(2)}"/>
</svg>`);
writeFileSync(join(OUT_DIR, 'qr-code.svg'), svgFinal, 'utf8');
console.log('✓ qrcode/qr-code.svg');

// ── PNG outputs (composite independently at full resolution) ──────────────────
for (const size of PNG_SIZES) {
  const scale  = size / W;              // pixels per SVG unit
  const logoPx = Math.round(logo * scale);
  const lx     = Math.round((bx + padding) * scale);
  const ly     = Math.round((by + padding) * scale);

  // 1. QR + black badge at full target size
  const qrBuf = await sharp(Buffer.from(svgQR))
    .resize(size, size)
    .png()
    .toBuffer();

  // 2. Logo rendered independently at badge pixel size (sharp-native, crisp)
  const logoBuf = await sharp(Buffer.from(logoSvgMono))
    .resize(logoPx, logoPx, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  // 3. Composite logo onto QR
  await sharp(qrBuf)
    .composite([{ input: logoBuf, left: lx, top: ly }])
    .toFile(join(OUT_DIR, `qr-code-${size}.png`));

  console.log(`✓ qrcode/qr-code-${size}.png`);
}
