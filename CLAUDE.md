# Templisite

11ty v2 static site boilerplate with Nunjucks, Bootstrap 5, AJAX polling, and S3 deployment.

## Commands

A `Makefile` is available to simplify npm scripts:
- `make dev` — Start dev server with hot reload
- `make build` — Build to `dist/`
- `make build-prod` — Production build (NODE_ENV=production)
- `make clean` — Remove `dist/`
- `make deploy` — Build prod + deploy to S3 (requires AWS env vars)

*(Underlying `npm run ...` commands are still fully supported)*

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
│   ├── images/      # logo.png, og-image.png
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
- Sitemap hostname in `.eleventy.js` must match `site.yml` URL

## Deployment

Requires env vars: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `S3_BUCKET`, `AWS_REGION`

## Project Status

- Phase 1 (Identity & Configuration) is **completed**. Real domain (`templisite.devixlabs.com`), authorship, and identity are set.
- Phase 2 (Content & Design) is the next upcoming phase; see `TODO.md`.
- `docs/todos/ROADMAP.md` has the 5-phase plan; `TODO_N.md` files track atomic work items (e.g. `TODO_2.md` will be created next).
- `docs/decisions/` contains architectural/hosting decisions (see `hosting.md`).

---

## AI Interaction Log

- **[2026-03-30] Gemini:** 
  - Updated `Commands` to reflect the newly created `Makefile`.
  - Added `assets/images/` to the `Architecture` tree.
  - Removed `Gotchas` section (Makefile added, placeholder domains resolved, author field fixed).
  - Updated `Key Patterns` to remove note about placeholders.
  - Updated `Project Status` to indicate Phase 1 completion, deletion of `TODO_1.md`, and that Phase 2 is up next.
