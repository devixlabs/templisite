# Templisite

A modern, fast, and feature-rich 11ty static site boilerplate designed for production efficiency, complete with Bootstrap 5 and AJAX polling capabilities.

## Features

- ✅ **11ty Static Site Generator** - Fast, flexible, and simple
- ✅ **Bootstrap 5** - Responsive design framework
- ✅ **SEO Optimized** - Meta tags, sitemap, and structured data
- ✅ **Image Optimization** - Automatic image processing and optimization
- ✅ **AJAX Polling** - Built-in short-polling for real-time updates
- ✅ **No-Cache API** - Proper cache control for dynamic data
- ✅ **AWS S3 Deployment** - One-command deployment to S3
- ✅ **Hot Reload** - Development server with live reload

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   make dev
   ```

3. **Build for production:**
   ```bash
   make build-prod
   ```

## Available Commands

We use a `Makefile` to simplify common operations:

- `make dev` — Start the development server with live reload.
- `make build` — Build the static site to the `dist/` folder.
- `make build-prod` — Build the site for production (applies `NODE_ENV=production`).
- `make clean` — Remove the `dist/` directory.
- `make deploy` — Build the production site and deploy to S3.
- `make help` — Show all available commands.

## Project Structure

```
src/
├── _data/           # YAML/JSON data files (build-time)
├── _includes/       # Reusable templates and layouts
├── content/         # Markdown pages
├── assets/          # CSS, JS, and images
├── api/             # Runtime JSON files (uncached)
└── static/          # Static files (favicon, robots.txt)
```

## Configuration

Edit `src/_data/site.yml` to customize your website's identity, metadata, and features:

```yaml
title: "Templisite"
description: "A modern, fast, and feature-rich 11ty static site boilerplate."
url: "https://templisite.devixlabs.com"
# ... more options
```

## AJAX Polling

The boilerplate includes a polling system for real-time updates:

```javascript
// Add polling endpoint
polling.addEndpoint('mydata', '/api/mydata.json', function(data) {
    console.log('Data updated:', data);
});

// Start polling
polling.startPolling('mydata');
```

## Deployment

### AWS S3 Deployment

1. Set environment variables (e.g., via `.envrc`):
   ```bash
   export AWS_ACCESS_KEY_ID="your-access-key"
   export AWS_SECRET_ACCESS_KEY="your-secret-key"
   export S3_BUCKET="your-bucket-name"
   export AWS_REGION="us-east-1"
   ```

2. Deploy using Make:
   ```bash
   make deploy
   ```

### Static Hosting

After running `make build-prod`, upload the `dist/` folder to any static hosting service.

## Development

- **Add new pages:** Create `.md` files in `src/content/`
- **Modify layout:** Edit templates in `src/_includes/`
- **Update styles:** Edit `src/assets/css/main.css`
- **Add functionality:** Edit `src/assets/js/main.js`

## License

MIT License - feel free to use for any project!
