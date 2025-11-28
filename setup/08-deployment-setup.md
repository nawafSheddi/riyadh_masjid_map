# 08 - Deployment Setup

> **Deploy your application to production**
>
> Estimated Time: 30 minutes

## Overview

Deploying your React + Vite application to production requires proper environment configuration, build optimization, and choosing the right hosting platform. This guide covers:

1. **Environment variables** - Secure configuration management
2. **Cloudflare Pages** - Recommended platform (free tier, global CDN)
3. **Alternative platforms** - Vercel, Netlify, AWS, Railway
4. **Build configuration** - Production optimization
5. **CI/CD pipeline** - Automated deployments
6. **Custom domains** - DNS and SSL setup
7. **Cache management** - Ensuring users get latest updates

## Why Proper Deployment Matters?

- ✅ **Global CDN**: Fast content delivery worldwide
- ✅ **Automatic HTTPS**: SSL certificates managed for you
- ✅ **Git-based deployments**: Push to deploy automatically
- ✅ **Preview deployments**: Test PRs before merging
- ✅ **Easy rollbacks**: Instant revert to previous versions
- ✅ **Zero downtime**: Seamless updates
- ✅ **Environment isolation**: Separate staging and production

## Prerequisites

- Project built successfully (`npm run build` works)
- Git repository initialized (see [02-initial-project-setup.md](02-initial-project-setup.md))
- GitHub/GitLab account for Git integration
- Domain name (optional, platforms provide free subdomains)

## What You'll Learn

1. How to manage environment variables securely
2. How to deploy to Cloudflare Pages (recommended)
3. How to set up alternative platforms
4. How to configure build settings for production
5. How to set up custom domains
6. How to implement CI/CD pipelines
7. How to purge cache after deployments

---

## Step 1: Environment Variable Management

Environment variables contain configuration that changes between environments (dev, staging, production).

### Create .env.example

Create `.env.example` in your project root (safe to commit to Git):

```env
# API Configuration
VITE_API_URL=https://api.yourdomain.com
VITE_WEBSOCKET_URL=wss://api.yourdomain.com/ws

# Third-Party Services
VITE_SNAPCHAT_CLIENT_ID=your-snapchat-client-id
VITE_ANALYTICS_ID=your-analytics-id

# Application
VITE_APP_VERSION=1.0.0
VITE_APP_ENV=production

# Feature Flags (optional)
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_DEBUG_MODE=false

# Localization (optional)
VITE_DEFAULT_LANGUAGE=en
VITE_SUPPORTED_LANGUAGES=en,ar
```

### Environment-Specific Files

**Never commit actual `.env` files to Git!**

```bash
# Development (.env.development) - local only
VITE_API_URL=http://localhost:8000
VITE_WEBSOCKET_URL=ws://localhost:8000/ws
VITE_ENABLE_DEBUG_MODE=true

# Staging (.env.staging) - configure in platform
VITE_API_URL=https://api-staging.yourdomain.com
VITE_WEBSOCKET_URL=wss://api-staging.yourdomain.com/ws
VITE_ENABLE_DEBUG_MODE=true

# Production (.env.production) - configure in platform
VITE_API_URL=https://api.yourdomain.com
VITE_WEBSOCKET_URL=wss://api.yourdomain.com/ws
VITE_ENABLE_DEBUG_MODE=false
```

### Update .gitignore

Ensure `.env*` files are ignored (except `.env.example`):

```gitignore
# Environment variables
.env
.env.local
.env.development
.env.staging
.env.production
.env.*.local

# But keep the example
!.env.example
```

### Vite Environment Variable Rules

**Important Vite-specific rules**:

1. **Prefix required**: All env vars must start with `VITE_`
2. **Build-time only**: Embedded during build, not runtime
3. **Client-side exposed**: All `VITE_*` vars are public in browser
4. **No secrets**: Never put API keys, database credentials, or secrets in `VITE_*` vars

```typescript
// ✅ Good - Public configuration
VITE_API_URL=https://api.yourdomain.com
VITE_APP_VERSION=1.0.0

// ❌ Bad - Secrets exposed to browser
VITE_DATABASE_PASSWORD=secret123
VITE_API_SECRET_KEY=sk-12345
```

### Accessing Environment Variables

```typescript
// In your code
const apiUrl = import.meta.env.VITE_API_URL;
const appVersion = import.meta.env.VITE_APP_VERSION;
const isDev = import.meta.env.DEV; // Built-in: true in development
const isProd = import.meta.env.PROD; // Built-in: true in production
```

---

## Step 2: Deploy to Cloudflare Pages (Recommended)

Cloudflare Pages offers excellent performance, generous free tier, and global CDN.

### Why Cloudflare Pages?

- ✅ **Free tier**: Unlimited sites, unlimited bandwidth
- ✅ **Global CDN**: 300+ data centers worldwide
- ✅ **Fast builds**: 1-2 minutes typical build time
- ✅ **Preview deployments**: Automatic for every PR
- ✅ **DDoS protection**: Built-in security
- ✅ **Analytics**: Free web analytics included
- ✅ **Functions**: Serverless functions if needed (advanced)

### Prerequisites

1. **GitHub account** with your repository
2. **Cloudflare account** (free): https://dash.cloudflare.com/sign-up

### Deployment Steps

#### 1. Push Code to GitHub

```bash
# Initialize Git (if not already done)
git init
git add .
git commit -m "Initial commit"

# Create GitHub repo and push
git remote add origin https://github.com/yourusername/your-repo.git
git branch -M main
git push -u origin main
```

#### 2. Connect to Cloudflare Pages

1. Go to https://dash.cloudflare.com/
2. Navigate to **Workers & Pages** → **Create application** → **Pages**
3. Click **Connect to Git**
4. Authorize Cloudflare to access your GitHub
5. Select your repository

#### 3. Configure Build Settings

**Framework preset**: Vite (or select "None" and configure manually)

**Build configuration**:
```yaml
Build command:        npm run build
Build output directory: dist
Root directory:       / (leave blank unless monorepo)
```

**Environment variables** (click "Add variable"):
```
VITE_API_URL=https://api.yourdomain.com
VITE_WEBSOCKET_URL=wss://api.yourdomain.com/ws
VITE_SNAPCHAT_CLIENT_ID=your-client-id
VITE_APP_VERSION=1.0.0
```

**Node version** (optional, set if needed):
```
NODE_VERSION=20
```

#### 4. Deploy

1. Click **Save and Deploy**
2. Wait 1-2 minutes for build to complete
3. Your site will be live at: `https://your-project.pages.dev`

### Configure Custom Domain

#### Add Custom Domain

1. In Cloudflare Pages dashboard, go to **Custom domains**
2. Click **Set up a custom domain**
3. Enter your domain: `yourdomain.com`
4. Cloudflare will provide DNS records to add

#### DNS Configuration

**If domain is on Cloudflare**:
- DNS records are added automatically
- SSL certificate issued automatically (< 5 minutes)

**If domain is elsewhere**:
1. Add CNAME record:
   ```
   Type:  CNAME
   Name:  @ (or www)
   Value: your-project.pages.dev
   ```
2. Wait for DNS propagation (5 minutes - 48 hours)
3. SSL certificate issued automatically

### Environment-Specific Deployments

**Production** (main branch):
```yaml
Branch:      main
Environment: Production
URL:         yourdomain.com
```

**Staging** (staging branch):
```yaml
Branch:      staging
Environment: Preview
URL:         staging.your-project.pages.dev
```

**Pull Request Previews** (automatic):
```yaml
Branch:      any PR
Environment: Preview
URL:         <commit-hash>.your-project.pages.dev
```

### Build Configuration File (Optional)

Create `wrangler.toml` for advanced configuration:

```toml
name = "your-project"
compatibility_date = "2025-01-01"

[site]
bucket = "./dist"

[[env]]
name = "production"
vars = { ENVIRONMENT = "production" }

[[env]]
name = "staging"
vars = { ENVIRONMENT = "staging" }
```

---

## Step 3: Alternative Deployment Platforms

### Vercel

**Pros**: Excellent DX, Next.js integration, edge functions
**Cons**: Bandwidth limits on free tier

**Deployment steps**:
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow prompts to configure
```

**Build settings** (vercel.json):
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

### Netlify

**Pros**: Great form handling, serverless functions, split testing
**Cons**: Build minutes limited on free tier

**Deployment steps**:
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod

# Or use Git integration (similar to Cloudflare Pages)
```

**Build settings** (netlify.toml):
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### AWS Amplify

**Pros**: Full AWS integration, powerful backend features
**Cons**: More complex, steeper learning curve

**Build settings** (amplify.yml):
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

### Railway

**Pros**: Easy Docker deployment, databases included
**Cons**: More expensive for static sites (better for full-stack)

**Railway.toml**:
```toml
[build]
builder = "nixpacks"
buildCommand = "npm run build"

[deploy]
startCommand = "npx serve -s dist -l 3000"
```

---

## Step 4: Build Optimization for Production

### Vite Production Build

Your `vite.config.ts` should include production optimizations:

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  // Production optimizations
  build: {
    // Output directory
    outDir: 'dist',

    // Generate sourcemaps for debugging (optional)
    sourcemap: false, // Set to true for debugging production

    // Minification
    minify: 'esbuild', // Fast minification

    // Chunk size warnings
    chunkSizeWarningLimit: 1000,

    // Code splitting
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks for better caching
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['lucide-react', 'class-variance-authority', 'clsx'],
        },
      },
    },

    // Asset inlining threshold (bytes)
    assetsInlineLimit: 4096, // 4kb
  },

  // Preview server configuration
  preview: {
    port: 3000,
    strictPort: true,
  },
});
```

### Build Size Analysis

```bash
# Install bundle analyzer
npm install --save-dev rollup-plugin-visualizer

# Update vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true, gzipSize: true }),
  ],
});

# Build and analyze
npm run build

# Opens stats.html with bundle visualization
```

### Performance Checklist

- [x] Code splitting configured
- [x] Vendor chunks separated
- [x] Images optimized (WebP, AVIF)
- [x] Lazy loading for routes
- [x] Tree shaking enabled (automatic with Vite)
- [x] Minification enabled
- [x] Gzip/Brotli compression (automatic on platforms)

---

## Step 5: CI/CD Pipeline Setup

### GitHub Actions for Cloudflare Pages

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches:
      - main
      - staging
  pull_request:

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      deployments: write

    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test
        continue-on-error: true # Remove if tests must pass

      - name: Run linter
        run: npm run lint

      - name: Type check
        run: npm run typecheck

      - name: Build
        run: npm run build
        env:
          VITE_API_URL: ${{ secrets.VITE_API_URL }}
          VITE_WEBSOCKET_URL: ${{ secrets.VITE_WEBSOCKET_URL }}
          VITE_APP_VERSION: ${{ github.sha }}

      - name: Deploy to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: your-project-name
          directory: dist
          gitHubToken: ${{ secrets.GITHUB_TOKEN }}
```

### GitHub Secrets Configuration

1. Go to your GitHub repo → **Settings** → **Secrets and variables** → **Actions**
2. Add the following secrets:

```
CLOUDFLARE_API_TOKEN     - Get from Cloudflare dashboard
CLOUDFLARE_ACCOUNT_ID    - Your Cloudflare account ID
VITE_API_URL             - Your production API URL
VITE_WEBSOCKET_URL       - Your WebSocket URL
```

### Pre-Deployment Checks

Add quality gates to prevent broken deployments:

```yaml
# Add before deploy step
- name: Build size check
  run: |
    SIZE=$(du -sh dist | cut -f1)
    echo "Build size: $SIZE"
    # Fail if build > 10MB (adjust as needed)
    if [ $(du -s dist | cut -f1) -gt 10240 ]; then
      echo "Build too large!"
      exit 1
    fi

- name: Security audit
  run: npm audit --audit-level=high
```

---

## Step 6: Cache Management

### Cache Purging Strategy

After deployment, ensure users get the latest version.

#### Cloudflare Cache Purge

**Automatic** (Cloudflare Pages):
- Cache purged automatically on deployment
- No manual action needed

**Manual purge** (if using Cloudflare for DNS only):
```bash
# Install Cloudflare CLI
npm install -g wrangler

# Purge cache
wrangler pages deployment tail
```

#### Cache-Control Headers

Cloudflare Pages sets optimal headers automatically:

```
# For hashed assets (main.a8b3c9d2.js)
Cache-Control: public, max-age=31536000, immutable

# For index.html
Cache-Control: no-cache, must-revalidate
```

**Custom headers** (if needed), create `_headers` in `public/`:

```
# public/_headers
/assets/*
  Cache-Control: public, max-age=31536000, immutable

/*.js
  Cache-Control: public, max-age=3600

/*.css
  Cache-Control: public, max-age=3600

/index.html
  Cache-Control: no-cache, must-revalidate
```

### Service Worker Cache (Optional)

For PWA or offline support, add service worker:

```bash
# Install Vite PWA plugin
npm install --save-dev vite-plugin-pwa

# Update vite.config.ts
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        cleanupOutdatedCaches: true,
      },
    }),
  ],
});
```

---

## Step 7: Monitoring and Analytics

### Cloudflare Web Analytics (Free)

1. Go to Cloudflare dashboard → **Analytics** → **Web Analytics**
2. Add your site
3. Copy the analytics script
4. Add to `index.html`:

```html
<!-- Cloudflare Web Analytics -->
<script defer src='https://static.cloudflareinsights.com/beacon.min.js'
        data-cf-beacon='{"token": "your-token"}'></script>
```

### Error Monitoring (Optional)

**Sentry** for production error tracking:

```bash
# Install Sentry
npm install @sentry/react @sentry/vite-plugin

# Initialize in main.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.VITE_APP_ENV,
  enabled: import.meta.env.PROD,
});
```

### Performance Monitoring

**Web Vitals** tracking:

```typescript
// src/lib/analytics.ts
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric: any) {
  // Send to your analytics endpoint
  console.log(metric);
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

---

## Step 8: Deployment Workflow

### Daily Deployment Process

```bash
# 1. Ensure all changes are committed
git status

# 2. Run pre-deployment checks locally
npm run typecheck
npm run lint
npm run build

# 3. Push to GitHub
git push origin main

# 4. Monitor deployment
# - Check GitHub Actions for build status
# - Verify deployment in Cloudflare Pages dashboard

# 5. Test production site
# - Visit your production URL
# - Test critical user flows
# - Check browser console for errors

# 6. Purge CDN cache if needed (usually automatic)
```

### Rollback Procedure

**Cloudflare Pages**:
1. Go to **Deployments** tab
2. Find previous successful deployment
3. Click **⋮** → **Rollback to this deployment**
4. Confirm rollback (instant)

**Git-based rollback**:
```bash
# Revert to previous commit
git revert HEAD
git push origin main

# Or rollback to specific commit
git reset --hard <commit-hash>
git push --force origin main # Use with caution!
```

---

## Step 9: Multi-Environment Setup

### Branch-Based Environments

```
main branch       → Production    (yourdomain.com)
staging branch    → Staging       (staging.yourdomain.com)
develop branch    → Development   (dev.yourdomain.com)
feature/* branches → PR Previews  (<hash>.pages.dev)
```

### Environment-Specific Configuration

**Cloudflare Pages**:
1. Go to **Settings** → **Environment variables**
2. Configure per environment:

```
Production environment:
  VITE_API_URL=https://api.yourdomain.com
  VITE_ENABLE_DEBUG_MODE=false

Preview environment:
  VITE_API_URL=https://api-staging.yourdomain.com
  VITE_ENABLE_DEBUG_MODE=true
```

---

## Troubleshooting

### Issue: Build Fails with "Out of Memory"

**Solution**:
```json
// package.json
{
  "scripts": {
    "build": "NODE_OPTIONS='--max-old-space-size=4096' vite build"
  }
}
```

### Issue: Environment Variables Not Working

**Check**:
1. Variables start with `VITE_`
2. Added to platform (not just local `.env`)
3. Rebuild after adding vars
4. Access via `import.meta.env.VITE_VAR_NAME`

### Issue: Routing Returns 404

**Solution**: Configure SPA redirects

**Cloudflare Pages** (`public/_redirects`):
```
/*    /index.html   200
```

**Vercel** (automatic for Vite/React)

**Netlify** (netlify.toml):
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Issue: Slow Build Times

**Optimize**:
1. Use `npm ci` instead of `npm install`
2. Enable caching in CI/CD
3. Reduce dependencies
4. Use build cache on platform

---

## Security Best Practices

### Environment Variables

- ✅ Use `.env.example` as template (committed)
- ✅ Never commit `.env` files
- ✅ Use platform secrets management
- ✅ Rotate credentials regularly
- ❌ Never put secrets in `VITE_*` vars (exposed to browser)

### HTTPS and Security Headers

**Cloudflare Pages** (automatic):
- HTTPS enforced
- Security headers added
- DDoS protection included

**Custom headers** (`public/_headers`):
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
```

### Dependency Security

```bash
# Regular audits
npm audit

# Fix vulnerabilities
npm audit fix

# Check for outdated packages
npm outdated
```

---

## Cost Optimization

### Cloudflare Pages Free Tier Limits

- ✅ Unlimited sites
- ✅ Unlimited bandwidth
- ✅ Unlimited requests
- ✅ 500 builds/month
- ✅ 1 concurrent build

**Paid tier** ($20/month):
- 5,000 builds/month
- 5 concurrent builds
- Advanced features

### Build Optimization Tips

1. **Reduce build frequency**: Don't build every commit
2. **Use caching**: Speed up builds (automatic on platforms)
3. **Optimize dependencies**: Remove unused packages
4. **Code splitting**: Smaller initial bundles

---

## Next Steps

After deployment:

1. **Set up monitoring**: Error tracking, analytics
2. **Configure alerts**: Build failures, uptime monitoring
3. **Document runbook**: Deployment procedures, rollback steps
4. **Test rollback**: Practice emergency procedures
5. **Set up staging**: Test changes before production

---

## Quick Reference

### Essential Commands

```bash
# Build and preview locally
npm run build
npm run preview

# Deploy to platforms
vercel               # Vercel
netlify deploy       # Netlify
# Cloudflare Pages: Git push (automatic)

# Check build output
ls -lh dist/
du -sh dist/
```

### Platform Comparison

| Platform | Free Tier | CDN | Build Time | Best For |
|----------|-----------|-----|------------|----------|
| **Cloudflare Pages** | Unlimited bandwidth | Global (300+ POPs) | ~1-2 min | Most projects |
| **Vercel** | 100GB bandwidth | Global | ~1 min | Next.js, Vite |
| **Netlify** | 100GB bandwidth | Global | ~1-2 min | JAMstack, forms |
| **AWS Amplify** | Pay-as-you-go | CloudFront | ~2-4 min | AWS ecosystem |

### Deployment Checklist

- [x] Environment variables configured on platform
- [x] Build succeeds locally (`npm run build`)
- [x] Tests pass (`npm test`)
- [x] Linting passes (`npm run lint`)
- [x] Type checking passes (`npm run typecheck`)
- [x] Custom domain configured (if applicable)
- [x] SSL certificate active
- [x] Analytics/monitoring set up
- [x] Error tracking configured
- [x] Rollback procedure documented

---

**Congratulations!** Your application is now deployed to production with:
- Automated Git-based deployments
- Environment variable management
- Global CDN distribution
- HTTPS encryption
- Preview deployments for pull requests
- Monitoring and analytics

**Next**: [09-project-conventions.md](09-project-conventions.md)
