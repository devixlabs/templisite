# Templisite

A modern, fast, and feature-rich 11ty static site boilerplate designed for production efficiency.

## Core Mandates
- **Identity First**: All project identity must be defined in `src/_data/site.yml` and synchronized across `package.json`, `.eleventy.js` (sitemap), and `src/static/robots.txt`.
- **Live Data**: Use `src/api/` for runtime JSON files. These are served with `no-cache` headers (via `scripts/deploy-s3.js`) to support real-time AJAX polling in `src/assets/js/polling.js`.
- **Image Optimization**: Always use the `{% image %}` shortcode for content images to ensure responsive WebP/JPEG generation.
- **Surgical Consistency**: Maintain the separation of concerns between `content/` (Markdown), `_includes/` (Templates), and `_data/` (Configuration).
- **AI Task Tracking**: All roadmap planning and active task lists MUST be tracked in the `docs/todos/` directory (e.g., `docs/todos/ROADMAP.md` and `docs/todos/TODO.md`). This ensures parity and shared context with other AI agents (like Claude).

## Project Status: 🟢 Active (Phase 1)
The project is currently in **Phase 1: Identity & Configuration**. The focus is on replacing all placeholder values (`your-domain.com`, `Your Name`) with real project identity before moving to content and design.

### Key Roadmap Phases
1. **Identity & Configuration**: (Current) Branding, metadata, and core config.
2. **Content & Design**: Real copy, layout refinements, and asset integration.
3. **Feature Review & Cleanup**: Polling system fine-tuning and unused code removal.
4. **Build & Deploy Pipeline**: CI/CD automation and AWS environment hardening.
5. **Production Hardening**: Security headers, performance profiling, and SEO audit.

## Architecture & Conventions
- **SSG**: 11ty (Eleventy) v2 with Nunjucks templates.
- **Styling**: Bootstrap 5 (CDN) + custom overrides in `src/assets/css/main.css`.
- **Scripts**: `polling.js` provides a `PollingManager` class for easy AJAX updates from the `/api/` directory.
- **Deployment**: AWS S3 deployment script handles standard assets (cached) vs. API endpoints (uncached) automatically.

## Quick Start for Developers
1. `npm install`
2. `npm run dev` (Hot-reloading at localhost:8080)
3. Check `docs/todos/TODO.md` for immediate next steps in Phase 2.

## Identified Improvements
- [ ] **Asset Relocation**: Move root `logo.png` and `og-image.png` to a new `src/assets/images/` directory.
- [ ] **Configuration Sync**: Ensure `site.url` in `site.yml` matches `hostname` in `.eleventy.js`.
- [ ] **Metadata**: Update `package.json` to reflect the specific project name instead of `static-site-boilerplate`.
- [ ] **Deployment**: Add support for CloudFront invalidation in the deployment script if used.
