# Static Site Boilerplate

A reusable boilerplate for creating static websites with 11ty, Bootstrap, and AJAX polling capabilities.

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
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build:prod
   ```

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

Edit `src/_data/site.yml` to customize your website:

```yaml
title: "Your Website Title"
description: "Your website description"
url: "https://your-domain.com"
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

1. Set environment variables:
   ```bash
   export AWS_ACCESS_KEY_ID="your-access-key"
   export AWS_SECRET_ACCESS_KEY="your-secret-key"
   export S3_BUCKET="your-bucket-name"
   export AWS_REGION="us-east-1"
   ```

2. Deploy:
   ```bash
   npm run deploy:s3
   ```

### Static Hosting

After running `npm run build:prod`, upload the `dist/` folder to any static hosting service.

## Development

- **Add new pages:** Create `.md` files in `src/content/`
- **Modify layout:** Edit templates in `src/_includes/`
- **Update styles:** Edit `src/assets/css/main.css`
- **Add functionality:** Edit `src/assets/js/main.js`

## License

MIT License - feel free to use for any project!
