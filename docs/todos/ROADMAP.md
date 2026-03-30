# Templisite Roadmap

High-level phases for turning this 11ty boilerplate into a production-ready, deployable static site.

## Phase 1: Identity & Configuration

Replace all placeholder values with real project identity. (COMPLETED)

- [x] `src/_data/site.yml` — set real site title, description, URL, author, email, social links
- [x] `src/_data/site.yml` — set correct `logo` and `seo.image` paths (or remove if not ready)
- [x] `.eleventy.js` — update sitemap `hostname` to match `site.yml` URL
- [x] `package.json` — set real `name`, `author`, `description`
- [x] `src/static/favicon.ico` — replace with real favicon (or generate one)
- [x] `src/static/robots.txt` — review and update sitemap URL if needed
- [x] Decide target domain and confirm DNS/hosting plan

## Phase 2: Content & Design

Replace sample content with real pages; establish visual identity beyond default Bootstrap.

- [ ] Rewrite `src/content/index.md` — real homepage copy, hero section, CTAs
- [ ] Rewrite `src/content/about.md` — real about content
- [ ] Rewrite `src/content/services.md` — real services or remove if not applicable
- [ ] Rewrite `src/content/contact.md` — real contact info, consider adding a form
- [ ] `src/_data/navigation.yml` — adjust nav items to match final page set
- [ ] `src/assets/css/main.css` — establish color palette, typography, spacing beyond Bootstrap defaults
- [ ] `src/_includes/partials/header.njk` — finalize navbar branding (logo vs text)
- [ ] `src/_includes/partials/footer.njk` — finalize footer content and social links
- [ ] Add any real images and use the `{% image %}` shortcode for optimization

## Phase 3: Feature Review & Cleanup

Audit built-in features — keep what's needed, remove what isn't.

- [ ] AJAX polling (`polling.js`) — decide if this feature is needed for the target site
  - If yes: configure real endpoints in `src/api/`, update `polling_interval` in `site.yml`
  - If no: remove `polling.js`, `src/api/` directory, and conditional in `base.njk`
- [ ] `main.js` — review `initializeScrollToTop()` (currently a stub), either implement or remove
- [ ] `main.js` — review `showNotification()` — keep only if polling or other features use it
- [ ] `src/api/status.json` and `metadata.json` — update with real data or remove
- [ ] `src/api/.htaccess` — review if needed (S3 deploy uses headers directly, not .htaccess)
- [ ] SEO partial (`seo.njk`) — verify OG/Twitter meta tags render correctly with real values

## Phase 4: Build & Deploy Pipeline

Verify the build works end-to-end and set up deployment.

- [ ] Run `npm run build` locally and verify `dist/` output is correct
- [ ] Run `npm run dev` and verify hot reload works
- [ ] Set up AWS credentials (env vars or profile) for S3 deployment
- [ ] Create S3 bucket with static website hosting enabled
- [ ] Run `npm run deploy:s3` and verify deployment
- [ ] Set up CloudFront (or equivalent CDN) in front of S3 if needed
- [ ] Configure custom domain DNS to point to S3/CloudFront
- [ ] Verify `no-cache` headers on `api/` files work correctly in production

## Phase 5: Production Hardening

Final checks before considering the site "live."

- [ ] Test all pages on mobile, tablet, desktop viewports
- [ ] Run Lighthouse audit (performance, accessibility, SEO, best practices)
- [ ] Verify sitemap.xml is generated and accurate
- [ ] Verify robots.txt is correct
- [ ] Verify canonical URLs resolve properly
- [ ] Add 404 page if not already handled
- [ ] Consider adding CI/CD (GitHub Actions or similar) for automated deploys
- [ ] Remove or update any remaining "example" or "sample" text in templates/JS
