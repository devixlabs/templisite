# Templisite

11ty v2 static site boilerplate with Nunjucks, Bootstrap 5, AJAX polling, and S3 deployment.

## Commands

- `npm run dev` — Start dev server with hot reload
- `npm run build` — Build to `dist/`
- `npm run build:prod` — Production build (NODE_ENV=production)
- `npm run clean` — Remove `dist/`
- `npm run deploy:s3` — Build prod + deploy to S3 (requires AWS env vars)

## Architecture

```
src/
├── _data/           # site.yml (global config), navigation.yml
├── _includes/
│   ├── layouts/     # base.njk (root layout), page.njk
│   └── partials/    # header.njk, footer.njk, seo.njk
├── content/         # Markdown pages (index, about, services, contact)
├── assets/
│   ├── css/main.css
│   └── js/main.js, polling.js
├── api/             # Runtime JSON (status.json, metadata.json) — served with no-cache headers
└── static/          # favicon.ico, robots.txt — copied as-is
```

- **Config:** `.eleventy.js` — passthrough copies, image shortcode, sitemap plugin, date filters
- **Output:** `dist/` (gitignored)
- **Templating:** Nunjucks for both HTML and Markdown

## Key Patterns

- Files in `src/api/` get `no-cache` headers during S3 deploy — used for AJAX polling endpoints
- Image shortcode (`{% image %}`) auto-generates WebP + JPEG at 4 widths (300/600/900/1200)
- `site.yml` controls global config: site title, URL, social links, polling interval
- Sitemap hostname in `.eleventy.js` must match `site.yml` URL (currently both placeholder)

## Deployment

Requires env vars: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `S3_BUCKET`, `AWS_REGION`

## Gotchas

- No Makefile — use npm scripts directly
- `site.yml` and `.eleventy.js` sitemap hostname still have placeholder values (`your-domain.com`)
- `package.json` author field is still "Your Name"
- `claude-notes.md` in root has original creation notes from Sonnet 4 (not a CLAUDE.md)
