# 06 - Docker Configuration

> **Containerize your application for consistent development and production environments**
>
> Estimated Time: 45 minutes

## Overview

Docker provides isolated, reproducible environments that eliminate "works on my machine" issues. This guide sets up:

1. **Multi-stage production Dockerfile** - Optimized for deployment
2. **Development Dockerfile** - With hot-reload support
3. **Docker Compose** - Orchestration for dev and production testing
4. **Nginx configuration** - Production web server with SPA routing
5. **Security best practices** - Non-root user, minimal attack surface

## Why Docker?

- ✅ **Consistency**: Same environment on all machines (dev, staging, prod)
- ✅ **Isolation**: Dependencies contained, no conflicts with system packages
- ✅ **Portability**: Works on any platform (macOS, Linux, Windows)
- ✅ **Security**: Non-root execution, minimal base images
- ✅ **Efficiency**: Multi-stage builds keep production images small
- ✅ **Team collaboration**: Everyone uses identical setup

## Prerequisites

- Docker Desktop installed (see [01-prerequisites.md](01-prerequisites.md))
- Project initialized with Vite (see [02-initial-project-setup.md](02-initial-project-setup.md))
- Environment variables defined (see [03-tech-stack-configuration.md](03-tech-stack-configuration.md))

## What You'll Learn

1. How multi-stage Docker builds work
2. How to configure development vs production environments
3. How to set up nginx for SPAs
4. How to implement Docker security best practices
5. How to use Docker Compose for local development

---

## Step 1: Create Production Dockerfile

Create `Dockerfile` in your project root:

```dockerfile
# =============================================================================
# Stage 1: Build Stage
# =============================================================================
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies (production + dev for build)
RUN npm ci

# Copy source code
COPY . .

# Build arguments for environment variables (required at build time for Vite)
ARG VITE_API_URL
ARG VITE_WEBSOCKET_URL
ARG VITE_SNAPCHAT_CLIENT_ID
ARG VITE_APP_VERSION

# Set environment variables for build
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_WEBSOCKET_URL=$VITE_WEBSOCKET_URL
ENV VITE_SNAPCHAT_CLIENT_ID=$VITE_SNAPCHAT_CLIENT_ID
ENV VITE_APP_VERSION=$VITE_APP_VERSION

# Build the application
RUN npm run build

# =============================================================================
# Stage 2: Production Stage
# =============================================================================
FROM nginx:stable-alpine AS production

# Create non-root user for security
RUN addgroup -g 1001 -S nginx-app && \
    adduser -S -D -H -u 1001 -h /var/cache/nginx \
    -s /sbin/nologin -G nginx-app -g nginx-app nginx-app

# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Fix permissions for non-root user
RUN chown -R nginx-app:nginx-app /usr/share/nginx/html && \
    chown -R nginx-app:nginx-app /var/cache/nginx && \
    chown -R nginx-app:nginx-app /var/log/nginx && \
    chown -R nginx-app:nginx-app /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R nginx-app:nginx-app /var/run/nginx.pid

# Switch to non-root user
USER nginx-app

# Expose non-privileged port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8080/health || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
```

### Key Concepts Explained

**Multi-Stage Build**:
- Stage 1 (`build`): Installs dependencies and builds your app
- Stage 2 (`production`): Only copies the built files (no source code or dev dependencies)
- Result: Smaller, more secure production image

**Build Arguments vs Environment Variables**:
- `ARG`: Values passed during `docker build` (Vite needs these at build time)
- `ENV`: Runtime environment variables
- For Vite apps, API URLs must be ARGs because they're embedded during build

**Security Practices**:
- Non-root user (`nginx-app`) prevents privilege escalation
- Minimal base image (`alpine`) reduces attack surface
- Non-privileged port (8080) doesn't require root
- Health check enables container orchestration to detect failures

---

## Step 2: Create Development Dockerfile

Create `Dockerfile.dev` in your project root:

```dockerfile
# =============================================================================
# Development Dockerfile
# =============================================================================
# This Dockerfile is optimized for development with hot-reload support.
# It mounts source code as volumes for instant file changes without rebuilding.
# =============================================================================

FROM node:20-alpine

# Install git for better development experience
RUN apk add --no-cache git

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install ALL dependencies (including devDependencies)
RUN npm install

# Copy source code
# Note: docker-compose will mount volumes for hot-reload
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Start dev server with --host flag (allows external access from Docker host)
CMD ["npm", "run", "dev", "--", "--host"]
```

### Development vs Production

| Aspect | Development | Production |
|--------|-------------|------------|
| Base Image | `node:20-alpine` | Multi-stage with `nginx:stable-alpine` |
| Dependencies | All (including dev) | None (static files only) |
| Source Code | Mounted as volume (hot-reload) | Copied once during build |
| Port | 5173 (Vite dev server) | 8080 (nginx) |
| Security | Relaxed (local only) | Hardened (non-root user) |
| Size | ~500MB | ~25MB |

---

## Step 3: Configure Nginx for SPA Routing

Create `nginx.conf` in your project root:

```nginx
server {
    listen 8080;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/json
        application/javascript
        application/xml+rss
        application/atom+xml
        image/svg+xml;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Health check endpoint
    location /health {
        access_log off;
        return 200 '{"status":"UP","timestamp":"$date_gmt"}';
        add_header Content-Type application/json;
    }

    # No cache for index.html (ensures users always get latest version)
    location = /index.html {
        expires -1;
        add_header Cache-Control "no-store, no-cache, must-revalidate";
    }

    # Long cache for hashed assets (Vite generates hash-based filenames)
    location ~* ^/assets/.*\.[a-f0-9]{8,}\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # Medium cache for other assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1h;
        add_header Cache-Control "public";
    }

    # SPA routing - serve index.html for all routes
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Deny access to hidden files
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }
}
```

### Nginx Configuration Explained

**SPA Routing** (`try_files $uri $uri/ /index.html`):
- When user visits `/dashboard`, nginx serves `index.html`
- React Router then handles client-side routing
- Without this, direct URL access returns 404

**Cache Strategy**:
- `index.html`: No cache (always fetch latest)
- Hashed assets (`main.a8b3c9d2.js`): 1 year cache (immutable)
- Other assets: 1 hour cache

**Security Headers**:
- `X-Frame-Options`: Prevents clickjacking
- `X-Content-Type-Options`: Prevents MIME sniffing
- `X-XSS-Protection`: Enables browser XSS filter
- `Referrer-Policy`: Controls referrer information

**Health Check Endpoint**:
- `/health` returns JSON `{"status":"UP"}`
- Used by Docker, Kubernetes, load balancers

---

## Step 4: Create Docker Compose Configuration

Create `docker-compose.yml` in your project root:

```yaml
# =============================================================================
# Docker Compose for Local Development
# =============================================================================
# Simplified version optimized for solo developer workflow
#
# Usage:
#   Start dev:    docker-compose up dev
#   Stop dev:     docker-compose down
#   Or use npm:   npm run dev:docker
# =============================================================================

version: '3.8'

services:
  # ==========================================================================
  # Development Service - Your Daily Driver
  # ==========================================================================
  dev:
    build:
      context: .
      dockerfile: Dockerfile.dev
    container_name: {{PROJECT_NAME}}-dev

    # Port mapping - change if 5173 is already in use on your machine
    ports:
      - "5173:5173"

    # Environment variables for development
    environment:
      - NODE_ENV=development
      - VITE_API_URL=${VITE_API_URL:-http://localhost:8000}
      - VITE_WEBSOCKET_URL=${VITE_WEBSOCKET_URL:-ws://localhost:8000/ws}
      - VITE_SNAPCHAT_CLIENT_ID=${VITE_SNAPCHAT_CLIENT_ID:-dev-client-id}
      - VITE_APP_VERSION=${VITE_APP_VERSION:-dev}

    # Volume mounts for hot-reload
    volumes:
      # Mount entire project (except what's in .dockerignore)
      - .:/app:delegated

      # Prevent node_modules from being overwritten by host
      - /app/node_modules

      # Prevent dist from being overwritten
      - /app/dist

    # Command to start Vite dev server
    command: npm run dev -- --host

    # Auto-restart if it crashes
    restart: unless-stopped

    # Simple health check
    healthcheck:
      test: ["CMD", "wget", "--no-verbose", "--tries=1", "--spider", "http://localhost:5173"]
      interval: 30s
      timeout: 10s
      retries: 3

  # ==========================================================================
  # Production Test Service (Optional - for testing production build locally)
  # ==========================================================================
  prod-test:
    build:
      context: .
      dockerfile: Dockerfile
      args:
        # Use your actual production API URL for testing
        - VITE_API_URL=${VITE_API_URL:-https://api.yourdomain.com}
        - VITE_WEBSOCKET_URL=${VITE_WEBSOCKET_URL:-wss://api.yourdomain.com/ws}
        - VITE_SNAPCHAT_CLIENT_ID=${VITE_SNAPCHAT_CLIENT_ID:-prod-client-id}
        - VITE_APP_VERSION=${VITE_APP_VERSION:-1.0.0}
      target: production

    container_name: {{PROJECT_NAME}}-prod-test

    # Use port 8080 for production test (nginx)
    ports:
      - "8080:8080"

    # Only run when explicitly called
    profiles:
      - production

    # Simple restart policy
    restart: unless-stopped

    # Health check for nginx
    healthcheck:
      test: ["CMD", "wget", "--no-verbose", "--tries=1", "--spider", "http://localhost:8080/health"]
      interval: 30s
      timeout: 3s
      retries: 3

# =============================================================================
# Notes:
# =============================================================================
#
# 1. DAILY WORKFLOW:
#    Morning:  npm run dev:docker
#    Evening:  docker-compose down (or Ctrl+C if running in foreground)
#
# 2. ADDING PACKAGES:
#    docker-compose run --rm dev npm add axios
#
# 3. TESTING PRODUCTION BUILD:
#    docker-compose --profile production up prod-test
#    Then visit: http://localhost:8080
#
# 4. TROUBLESHOOTING:
#    - Port in use: Change "5173:5173" to "5174:5173" or any free port
#    - Slow on Mac: The :delegated flag is already set for performance
#    - Clean start: docker-compose down -v && docker system prune -f
#
# =============================================================================
```

### Docker Compose Explained

**Services**:
- `dev`: Daily development with hot-reload
- `prod-test`: Local testing of production build (optional)

**Volumes**:
- `.:/app:delegated`: Mounts your local code into container
- `/app/node_modules`: Named volume prevents host overwriting container's node_modules
- `:delegated`: Performance optimization for macOS (relaxes consistency guarantees)

**Profiles**:
- `prod-test` service uses `profiles: [production]`
- Only starts when explicitly requested: `docker-compose --profile production up prod-test`
- Prevents accidental production builds during normal dev work

**Environment Variables**:
- `${VITE_API_URL:-http://localhost:8000}`: Use env var if set, otherwise default
- Allows `.env` file overrides without editing docker-compose.yml

---

## Step 5: Create .dockerignore File

Create `.dockerignore` in your project root:

```
# =============================================================================
# Docker Build Context Exclusions
# =============================================================================
# Files/directories listed here are NOT sent to Docker daemon during build
# This speeds up builds and prevents sensitive data leaks
# =============================================================================

# -----------------------------------------------------------------------------
# DEPENDENCIES (will be installed fresh in container)
# -----------------------------------------------------------------------------
node_modules/
.npm/
.pnpm-store/
.yarn/

# -----------------------------------------------------------------------------
# BUILD OUTPUTS (will be generated during build)
# -----------------------------------------------------------------------------
dist/
dist-ssr/
build/
.cache/

# -----------------------------------------------------------------------------
# VERSION CONTROL
# -----------------------------------------------------------------------------
.git/
.gitignore
.gitattributes

# -----------------------------------------------------------------------------
# ENVIRONMENT & SECRETS (CRITICAL - prevent leaks!)
# -----------------------------------------------------------------------------
.env
.env.*
!.env.example      # Keep the example file
*.pem
*.key
*.cert
*.crt
secrets/

# -----------------------------------------------------------------------------
# DOCKER FILES (prevent recursion)
# -----------------------------------------------------------------------------
Dockerfile*
docker-compose*.yml
.dockerignore

# -----------------------------------------------------------------------------
# DOCUMENTATION (not needed for build)
# -----------------------------------------------------------------------------
*.md
docs/
LICENSE

# -----------------------------------------------------------------------------
# IDE & EDITOR FILES
# -----------------------------------------------------------------------------
.vscode/
.idea/
*.swp
*.swo
*~

# -----------------------------------------------------------------------------
# CI/CD & AUTOMATION
# -----------------------------------------------------------------------------
.github/
.gitlab-ci.yml

# -----------------------------------------------------------------------------
# LOGS & DEBUG FILES
# -----------------------------------------------------------------------------
*.log
logs/
npm-debug.log*

# -----------------------------------------------------------------------------
# TESTING & COVERAGE
# -----------------------------------------------------------------------------
coverage/
.nyc_output/
test-results/

# -----------------------------------------------------------------------------
# PROJECT MANAGEMENT & DOCUMENTATION
# -----------------------------------------------------------------------------
.claude/
kanban.md
archive.md

# -----------------------------------------------------------------------------
# OS-SPECIFIC FILES
# -----------------------------------------------------------------------------
# macOS
.DS_Store
._*

# Windows
Thumbs.db
Desktop.ini

# Linux
.directory
```

### Why .dockerignore Matters

**Build Speed**:
- Excluding `node_modules/` saves ~200MB+ from being sent to Docker daemon
- Excluding `.git/` saves hundreds of MB for large repos
- Faster builds = better developer experience

**Security**:
- Prevents `.env` files from being baked into images
- Prevents SSH keys/certificates from leaking
- Production images should contain ONLY what's needed to run

**Best Practice**:
- Start restrictive, relax if needed (opposite of .gitignore philosophy)
- Always exclude secrets, credentials, private keys

---

## Step 6: Add Docker Scripts to package.json

Update your `package.json` to include Docker helper scripts:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",

    "dev:docker": "docker-compose up dev",
    "dev:stop": "docker-compose down",
    "dev:restart": "docker-compose down && docker-compose up dev",

    "prod:test": "docker-compose --profile production up prod-test",
    "prod:stop": "docker-compose down",

    "docker:add": "docker-compose run --rm dev npm add",
    "docker:install": "docker-compose run --rm dev npm install",
    "docker:lint": "docker-compose run --rm dev npm run lint",
    "docker:typecheck": "docker-compose run --rm dev tsc --noEmit",
    "docker:build": "docker-compose run --rm dev npm run build",
    "docker:clean": "docker-compose down -v && docker system prune -f"
  }
}
```

### Script Explanations

| Script | Purpose | Usage Example |
|--------|---------|---------------|
| `dev:docker` | Start dev environment | `npm run dev:docker` |
| `dev:stop` | Stop dev environment | `npm run dev:stop` |
| `dev:restart` | Restart after config changes | `npm run dev:restart` |
| `prod:test` | Test production build locally | `npm run prod:test` |
| `docker:add` | Install new package | `npm run docker:add axios` |
| `docker:install` | Reinstall all packages | `npm run docker:install` |
| `docker:clean` | Remove all containers/volumes | `npm run docker:clean` |

---

## Step 7: Verify Docker Setup

### Test Development Environment

```bash
# Start dev server in Docker
npm run dev:docker

# Visit http://localhost:5173
# Make a change to a component - should hot-reload
```

### Test Production Build

```bash
# Build and run production container
npm run prod:test

# Visit http://localhost:8080
# Test:
# - Homepage loads
# - Client-side routing works (navigate between pages)
# - Direct URL access works (refresh on /dashboard)
# - Health check: curl http://localhost:8080/health
```

### Test Package Installation

```bash
# Install a new package through Docker
npm run docker:add axios

# Verify it was added
docker-compose run --rm dev npm list axios
```

---

## Common Docker Workflows

### Daily Development

```bash
# Morning - Start dev environment
npm run dev:docker

# Work normally - changes auto-reload
# Edit files, see changes instantly

# Evening - Stop environment
npm run dev:stop
```

### Adding Dependencies

```bash
# Install new package
npm run docker:add package-name

# Restart to pick up changes
npm run dev:restart
```

### Testing Production Build

```bash
# Build production image
npm run prod:test

# Test in browser at http://localhost:8080

# Stop when done
npm run prod:stop
```

### Troubleshooting

```bash
# Clean everything and start fresh
npm run docker:clean
npm run dev:docker

# View container logs
docker-compose logs -f dev

# Shell into running container
docker-compose exec dev sh

# Rebuild from scratch (ignore cache)
docker-compose build --no-cache dev
```

---

## Security Best Practices

### 1. Non-Root User
```dockerfile
# ✅ Good - Run as non-root
USER nginx-app

# ❌ Bad - Running as root
# (No USER statement)
```

### 2. Minimal Base Images
```dockerfile
# ✅ Good - Alpine (small, fewer vulnerabilities)
FROM node:20-alpine

# ❌ Bad - Full image (larger attack surface)
FROM node:20
```

### 3. Multi-Stage Builds
```dockerfile
# ✅ Good - Final image only has runtime files
COPY --from=build /app/dist /usr/share/nginx/html

# ❌ Bad - Shipping source code and dev dependencies
COPY . .
```

### 4. Environment Variables
```dockerfile
# ✅ Good - Build args for Vite
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# ❌ Bad - Hardcoded secrets
ENV API_KEY=sk-123456789
```

### 5. .dockerignore
```
# ✅ Good - Exclude secrets
.env
*.pem
secrets/

# ❌ Bad - Missing .dockerignore
# (Accidentally includes secrets)
```

---

## Performance Optimization

### Build Cache Optimization

```dockerfile
# ✅ Good - Copy package files first (cache layer if unchanged)
COPY package.json package-lock.json ./
RUN npm ci
COPY . .

# ❌ Bad - Copy everything first (invalidates cache on any file change)
COPY . .
RUN npm ci
```

### Volume Performance (macOS)

```yaml
volumes:
  # ✅ Good - Delegated consistency for better performance
  - .:/app:delegated

  # ❌ Slow - Default consistency (slower on macOS)
  - .:/app
```

### Image Size Optimization

```dockerfile
# ✅ Good - Multi-stage build
FROM node:20-alpine AS build
# ... build steps ...
FROM nginx:stable-alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html

# Result: ~25MB final image

# ❌ Bad - Single stage
FROM node:20
# ... build and serve in one stage ...
# Result: ~500MB+ image
```

---

## Environment-Specific Builds

### Development
```bash
# Local development
docker-compose up dev
```

### Staging
```bash
# Build with staging API
docker build \
  --build-arg VITE_API_URL=https://api-staging.yourdomain.com \
  --build-arg VITE_WEBSOCKET_URL=wss://api-staging.yourdomain.com/ws \
  -t myapp:staging .
```

### Production
```bash
# Build with production API
docker build \
  --build-arg VITE_API_URL=https://api.yourdomain.com \
  --build-arg VITE_WEBSOCKET_URL=wss://api.yourdomain.com/ws \
  --build-arg VITE_APP_VERSION=$(git rev-parse --short HEAD) \
  -t myapp:latest .
```

---

## Troubleshooting Guide

### Problem: Port Already in Use

**Error**: `Bind for 0.0.0.0:5173 failed: port is already allocated`

**Solution**:
```yaml
# Change port in docker-compose.yml
ports:
  - "5174:5173"  # Use 5174 on host, 5173 in container
```

### Problem: Changes Not Reflecting

**Cause**: Volume mount not working

**Solution**:
```bash
# Restart with fresh volumes
npm run docker:clean
npm run dev:docker
```

### Problem: Build Fails with "Cannot find module"

**Cause**: node_modules mismatch

**Solution**:
```bash
# Rebuild container
docker-compose build --no-cache dev
npm run dev:docker
```

### Problem: Slow Performance on macOS

**Solution**: Already using `:delegated`, but can also try:
```yaml
volumes:
  - .:/app:cached  # Even faster, but less consistency
```

### Problem: Health Check Failing

**Check logs**:
```bash
docker-compose logs dev
docker inspect --format='{{json .State.Health}}' container-name
```

---

## Advanced: Docker in CI/CD

### GitHub Actions Example

```yaml
name: Build Docker Image

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Build production image
        run: |
          docker build \
            --build-arg VITE_API_URL=${{ secrets.VITE_API_URL }} \
            --build-arg VITE_WEBSOCKET_URL=${{ secrets.VITE_WEBSOCKET_URL }} \
            --build-arg VITE_SNAPCHAT_CLIENT_ID=${{ secrets.VITE_SNAPCHAT_CLIENT_ID }} \
            -t myapp:${{ github.sha }} .

      - name: Run security scan
        run: |
          docker run --rm aquasec/trivy image myapp:${{ github.sha }}
```

---

## Next Steps

After completing Docker setup:

1. **Test both environments**: Dev and production
2. **Customize nginx.conf**: Add your security headers, CSP policies
3. **Set up CI/CD**: Automate Docker builds (see [08-deployment-setup.md](08-deployment-setup.md))
4. **Security scanning**: Use `trivy` or `snyk` to scan images
5. **Monitoring**: Add logging and monitoring for production containers

---

## Quick Reference

### Essential Commands

```bash
# Development
npm run dev:docker           # Start dev environment
npm run dev:stop             # Stop dev environment
npm run dev:restart          # Restart dev environment

# Production Testing
npm run prod:test            # Test production build
npm run prod:stop            # Stop production test

# Package Management
npm run docker:add axios     # Install package
npm run docker:install       # Reinstall all packages

# Maintenance
npm run docker:clean         # Clean everything
docker-compose logs -f dev   # View logs
docker-compose exec dev sh   # Shell into container
```

### File Checklist

- [x] `Dockerfile` - Production multi-stage build
- [x] `Dockerfile.dev` - Development with hot-reload
- [x] `docker-compose.yml` - Orchestration
- [x] `nginx.conf` - Web server config
- [x] `.dockerignore` - Build context exclusions
- [x] `package.json` - Docker scripts

---

**Congratulations!** Your application is now fully containerized. You can develop in Docker with hot-reload, test production builds locally, and deploy with confidence knowing your environments are identical.

**Next**: [07-claude-code-integration.md](07-claude-code-integration.md)
