# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for development
- `npm run build:prod` - Build for production (sets NODE_ENV=production)
- `npm run clean` - Remove dist/ directory
- `npm run deploy:s3` - Deploy to AWS S3 (requires environment variables)

## Architecture Overview

This is an 11ty (Eleventy) static site generator project with Bootstrap 5 and AJAX polling capabilities.

### Key Architecture Components

**11ty Configuration (.eleventy.js):**
- Input: `src/`, Output: `dist/`
- Uses Nunjucks templating engine for both HTML and Markdown
- Includes image optimization with automatic WebP conversion
- Generates sitemap automatically

**Directory Structure:**
- `src/_data/` - Build-time YAML/JSON data (site.yml contains global config)
- `src/_includes/` - Reusable templates and layouts (base.njk is main layout)
- `src/content/` - Markdown pages that become site pages
- `src/assets/` - CSS, JS, and images (copied to dist/)
- `src/api/` - Runtime JSON files with no-cache headers for AJAX polling
- `src/static/` - Static files like favicon, robots.txt

**AJAX Polling System:**
- `src/assets/js/polling.js` provides PollingManager class
- Polls API endpoints with cache-busting and no-cache headers
- Configurable intervals, automatic change detection
- Global `window.polling` instance available

**Deployment:**
- S3 deployment script with intelligent cache control
- API files get no-cache headers, static assets get 1-year cache
- Requires AWS credentials in environment variables

### Template System

Uses Nunjucks with Bootstrap 5. Base layout includes conditional polling script loading based on `site.features.polling_enabled` setting in site.yml.

### Testing the Polling System

To test AJAX polling functionality: update JSON files in `src/api/` while the development server is running. The polling system will detect changes and update the UI in real-time.

### Environment Variables for S3 Deployment

Required: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `S3_BUCKET`, `AWS_REGION`