# Deployment

The site is deployed automatically to **GitHub Pages** via GitHub Actions
whenever a commit is pushed to the `main` branch.

Live URL: `https://HugoHakem.github.io/phd-symposium-2026/`

---

## How it works

The workflow at `.github/workflows/deploy.yml` runs two jobs on every push to `main`:

1. **build** — Checks out the repo, installs pnpm dependencies, runs `astro build`,
   and uploads the `dist/` output as an artifact.
2. **deploy** — Takes that artifact and deploys it to the `github-pages` environment.

No manual action is needed. Push to `main` → site updates in ~2 minutes.

---

## First-time GitHub Pages setup

If deploying to a new repository:

1. Go to **Settings → Pages** in the GitHub repository.
2. Under **Source**, select **GitHub Actions**.
3. Push a commit to `main` to trigger the first deployment.

---

## Local development

```bash
# Install dependencies (once)
pnpm install

# Start dev server with hot reload
pnpm dev
# → http://localhost:4321/phd-symposium-2026/

# Production build (outputs to dist/)
pnpm build

# Preview the production build locally
pnpm preview
```

---

## Astro configuration

`astro.config.mjs` contains two deployment-relevant settings:

```js
export default defineConfig({
  site: 'https://HugoHakem.github.io',   // canonical origin
  base: '/phd-symposium-2026/',           // sub-path for GitHub Pages
  …
});
```

The `base` setting prefixes all internal links and asset URLs automatically.
If you move the site to a custom domain (e.g., `symposium.embl.de`), set
`site` to the new domain and remove the `base` option.

---

## Custom domain (optional)

1. Purchase or obtain a domain name.
2. In your DNS provider, create a `CNAME` record pointing to `HugoHakem.github.io`.
3. In **Settings → Pages → Custom domain**, enter the domain.
4. Update `astro.config.mjs`:
   ```js
   site: 'https://your-domain.example.com',
   // remove the base option
   ```
5. Create a `public/CNAME` file containing just the domain name:
   ```
   your-domain.example.com
   ```
