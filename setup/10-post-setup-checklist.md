# 10 - Post-Setup Checklist

> **Verify your complete setup and launch your first feature**
>
> Estimated Time: 20 minutes

## Table of Contents

1. [Phase-by-Phase Verification](#phase-by-phase-verification)
2. [Common Issues & Solutions](#common-issues--solutions)
3. [Performance Benchmarks](#performance-benchmarks)
4. [Security Checklist](#security-checklist)
5. [First Feature Guide](#first-feature-guide)
6. [What's Next](#whats-next)

---

## Phase-by-Phase Verification

Work through each phase in order. **Do not skip ahead** - each phase builds on the previous.

### ✅ Phase 1: Prerequisites (Guide 01)

**Verify installations**:

```bash
# Node.js version check
node --version
# Expected: v20.x.x or higher

# npm version check
npm --version
# Expected: 10.x.x or higher

# Git version check
git --version
# Expected: 2.x.x or higher

# Docker version check (if using Docker)
docker --version
# Expected: 24.x.x or higher

docker-compose --version
# Expected: 2.x.x or higher
```

**✓ Checklist**:
- [ ] Node.js 20+ installed
- [ ] npm 10+ installed
- [ ] Git 2+ installed
- [ ] Code editor (VS Code recommended)
- [ ] Docker installed (if containerizing)

**❌ Common Issues**:

| Issue | Solution |
|-------|----------|
| Node version too old | Use nvm: `nvm install 20 && nvm use 20` |
| npm not found | Comes with Node.js, reinstall Node |
| Docker permission denied | Add user to docker group (Linux) or restart Docker Desktop |

---

### ✅ Phase 2: Initial Project Setup (Guide 02)

**Verify project structure**:

```bash
# Check directory structure
ls -la

# Expected output:
# package.json
# tsconfig.json
# vite.config.ts
# index.html
# src/
# public/
```

**Verify dependencies installed**:

```bash
# Check node_modules exists
ls node_modules | head -5

# Check package versions
npm list react react-dom vite
```

**✓ Checklist**:
- [ ] Project initialized with Vite
- [ ] `package.json` exists with correct dependencies
- [ ] `node_modules/` folder exists
- [ ] `src/` folder created
- [ ] TypeScript configured

**❌ Common Issues**:

| Issue | Solution |
|-------|----------|
| `npm install` fails | Delete `node_modules` and `package-lock.json`, run `npm install` again |
| Port 5173 already in use | Kill process: `lsof -ti:5173 \| xargs kill -9` (Mac/Linux) |
| TypeScript errors on install | Check Node version, ensure using 20+ |

---

### ✅ Phase 3: Tech Stack Configuration (Guide 03)

**Verify dev server runs**:

```bash
# Start development server
npm run dev

# Expected output:
# VITE v5.x.x  ready in XXX ms
# ➜  Local:   http://localhost:5173/
# ➜  Network: use --host to expose
```

**Visit http://localhost:5173/** in browser:
- [ ] Page loads without errors
- [ ] No console errors (F12 → Console)
- [ ] Hot reload works (edit a file, see change)

**Verify build works**:

```bash
# Production build
npm run build

# Expected output:
# vite v5.x.x building for production...
# ✓ XXX modules transformed.
# dist/index.html                  X.XX kB
# dist/assets/index-XXXXX.js     XXX.XX kB │ gzip: XX.XX kB
```

**Check build output**:
```bash
ls dist/
# Expected: index.html, assets/ folder
```

**✓ Checklist**:
- [ ] Dev server starts successfully
- [ ] App renders in browser
- [ ] Hot reload works
- [ ] Build completes without errors
- [ ] `dist/` folder created with assets

**❌ Common Issues**:

| Issue | Solution |
|-------|----------|
| "Cannot find module" errors | Run `npm install` again |
| Build fails with TS errors | Run `npm run typecheck` to see all errors |
| White screen in browser | Check browser console (F12) for errors |
| CSS not loading | Ensure Tailwind configured in `main.tsx` |

---

### ✅ Phase 4: Design System Setup (Guide 04)

**Verify design tokens exist**:

```bash
# Check design tokens structure
ls src/design-tokens/

# Expected files:
# colors.ts
# typography.ts
# spacing.ts
# icons.ts
```

**Verify component library**:

```bash
# Check UI components
ls src/components/ui/ | wc -l
# Expected: 10+ component files

# Check if Button component exists
cat src/components/ui/button.tsx | head -5
```

**Test a component** (create temporary test file):

```typescript
// src/test-button.tsx
import { Button } from '@/components/ui/button'

export default function TestButton() {
  return (
    <div className="p-8">
      <Button variant="default">Test Button</Button>
    </div>
  )
}
```

Import in App.tsx and verify it renders.

**✓ Checklist**:
- [ ] Design tokens defined (`colors.ts`, `typography.ts`, `spacing.ts`, `icons.ts`)
- [ ] UI components folder exists
- [ ] Button component works
- [ ] Tailwind CSS applied correctly
- [ ] CVA (Class Variance Authority) configured

**❌ Common Issues**:

| Issue | Solution |
|-------|----------|
| Button has no styles | Check Tailwind import in `main.tsx` |
| `@/` imports don't work | Verify `tsconfig.json` paths and `vite.config.ts` alias |
| Colors not showing | Ensure `tailwind.config.js` extends theme correctly |

---

### ✅ Phase 5: Development Tooling (Guide 05)

**Verify linting works**:

```bash
# Run ESLint
npm run lint

# Expected: No errors (or list of fixable issues)
```

**Verify TypeScript checking**:

```bash
# Type check
npm run typecheck

# Expected: No errors
# Found 0 errors. Watching for file changes.
```

**Verify formatting**:

```bash
# Format code
npm run format

# Check if formatting works
# Files should be formatted consistently
```

**✓ Checklist**:
- [ ] ESLint configured and runs
- [ ] TypeScript type checking works
- [ ] Prettier formatting works
- [ ] VS Code extensions recommended (if using VS Code)
- [ ] No linting errors in fresh project

**❌ Common Issues**:

| Issue | Solution |
|-------|----------|
| ESLint not finding files | Check `eslint.config.js` file patterns |
| TypeScript errors in node_modules | Add to `tsconfig.json` exclude |
| Prettier conflicts with ESLint | Ensure `eslint-config-prettier` installed |

---

### ✅ Phase 6: Docker Configuration (Guide 06)

**Skip this phase if not using Docker**

**Verify Docker build**:

```bash
# Build production image
docker build -t myapp:test .

# Expected: Build completes successfully
# Successfully tagged myapp:test
```

**Verify dev container**:

```bash
# Start development container
docker-compose up dev

# Expected: Container starts, dev server runs on port 5173
```

**Visit http://localhost:5173/**:
- [ ] App loads in browser
- [ ] Hot reload works in container
- [ ] No permission errors

**Test production container**:

```bash
# Start production container
docker-compose up prod-test --profile production

# Visit http://localhost:8080/
```

**✓ Checklist**:
- [ ] Dockerfile builds successfully
- [ ] Development container runs with hot-reload
- [ ] Production container serves optimized build
- [ ] nginx serves SPA correctly (routes work)
- [ ] Health check endpoint responds (`/health`)

**❌ Common Issues**:

| Issue | Solution |
|-------|----------|
| Permission denied errors | Ensure non-root user configured in Dockerfile |
| Port already in use | Change port in `docker-compose.yml` |
| Build fails in container | Check `.dockerignore` doesn't exclude needed files |
| Assets not loading | Verify nginx configuration serves `/assets/` correctly |

---

### ✅ Phase 7: Claude Code Integration (Guide 07)

**Verify CLAUDE.md exists**:

```bash
# Check CLAUDE.md
cat CLAUDE.md | head -20

# Should show project context and instructions
```

**Verify skills installed**:

```bash
# Check skills folder
ls .claude/skills/

# Expected skills:
# design-token-enforcer/
# react-rtl-layout-validator/
# react-translation-manager/
# markdown-task-manager/
# (and others)
```

**Verify kanban.md**:

```bash
# Check kanban board exists
cat kanban.md | head -10

# Expected: Kanban structure with columns
```

**Test Claude Code** (if installed):

```bash
# Start Claude Code session
# Verify it loads CLAUDE.md context
# Try activating a skill
```

**✓ Checklist**:
- [ ] CLAUDE.md customized for your project
- [ ] Skills copied to `.claude/skills/`
- [ ] kanban.md created for task tracking
- [ ] archive.md exists for completed tasks
- [ ] Skills activate without errors

**❌ Common Issues**:

| Issue | Solution |
|-------|----------|
| Skills not found | Verify folder is `.claude/skills/` (note the dot) |
| CLAUDE.md not loaded | Ensure file is in project root |
| Skill activation errors | Check SKILL.md format and required files |

---

### ✅ Phase 8: Deployment Setup (Guide 08)

**Verify environment variables**:

```bash
# Check .env.example exists
cat .env.example

# Expected: VITE_* variables with examples
```

**Create local .env**:

```bash
cp .env.example .env
# Edit .env with your values
```

**Verify build with env vars**:

```bash
# Build with environment variables
npm run build

# Check if variables are embedded
cat dist/assets/index-*.js | grep -o "VITE_API_URL" | head -1
# Should find the variable
```

**✓ Checklist**:
- [ ] `.env.example` exists with all variables
- [ ] Local `.env` created (not committed)
- [ ] Environment variables use `VITE_` prefix
- [ ] Build embeds environment variables
- [ ] Deployment platform configured (Cloudflare Pages/Vercel/etc.)

**❌ Common Issues**:

| Issue | Solution |
|-------|----------|
| Env vars not available | Ensure they start with `VITE_` |
| Secrets exposed | Never use `VITE_` prefix for secrets |
| Build fails with env errors | Check all required vars are set |

---

### ✅ Phase 9: Project Conventions (Guide 09)

**Verify file naming conventions**:

```bash
# Check component file names
ls src/components/ui/

# Should see mix of:
# - PascalCase.tsx (multi-word components)
# - kebab-case.tsx (single-word/design system)
```

**Verify Git workflow**:

```bash
# Check current branch
git branch

# Should show: main or master

# Check recent commits follow format
git log --oneline -5

# Should see: type: description format
```

**✓ Checklist**:
- [ ] File naming follows conventions
- [ ] Atomic design structure in place
- [ ] Git branches follow naming pattern
- [ ] Commits use conventional format
- [ ] PR template created (optional)

---

## Common Issues & Solutions

### 🔴 Critical Issues

#### White Screen (Nothing Renders)

**Symptoms**: Browser shows blank page, console has errors

**Debug Protocol**:
1. Open browser DevTools (F12)
2. Check Console tab for errors
3. Common causes:
   - Missing translation keys → Add to `LanguageContext`
   - Wrong import path → Check `@/` alias configuration
   - Component crash → Check component props

**Quick Fix**:
```bash
# Clear cache and rebuild
rm -rf node_modules dist .vite
npm install
npm run dev
```

#### Build Fails

**Symptoms**: `npm run build` exits with errors

**Debug Protocol**:
```bash
# 1. Check TypeScript errors
npm run typecheck

# 2. Check linting errors
npm run lint

# 3. Try clean build
rm -rf dist node_modules
npm install
npm run build
```

#### Docker Won't Start

**Symptoms**: `docker-compose up` fails

**Debug Protocol**:
```bash
# Check Docker is running
docker ps

# Check logs
docker-compose logs

# Rebuild containers
docker-compose down
docker-compose build --no-cache
docker-compose up
```

### 🟡 Common Warnings

#### Dependency Warnings

```bash
# Update dependencies
npm update

# Audit for security issues
npm audit
npm audit fix
```

#### Large Bundle Size

```bash
# Analyze bundle
npm run build -- --mode production

# Check dist/assets/ file sizes
# Main bundle should be <500KB gzipped
```

---

## Performance Benchmarks

Expected performance metrics for a properly configured project:

### Development

| Metric | Expected | If Slower |
|--------|----------|-----------|
| **Cold start** | 2-5 seconds | Check vite cache, restart dev server |
| **Hot reload** | <200ms | Reduce component complexity |
| **TypeScript check** | 1-3 seconds | Enable incremental builds |

### Production Build

| Metric | Expected | If Slower |
|--------|----------|-----------|
| **Build time** | 10-30 seconds | Check for large dependencies |
| **Bundle size** | 200-500 KB (gzipped) | Use code splitting |
| **Initial load** | <3 seconds | Optimize images, lazy load |

### Build Output Analysis

```bash
npm run build

# Check output:
# dist/index.html                  ~5 KB
# dist/assets/index-[hash].js      200-500 KB (gzipped: 80-150 KB)
# dist/assets/index-[hash].css     20-50 KB (gzipped: 5-10 KB)
```

**If bundle is too large (>500 KB gzipped)**:

```bash
# Analyze bundle composition
npm install -D rollup-plugin-visualizer

# Add to vite.config.ts:
import { visualizer } from 'rollup-plugin-visualizer'

plugins: [
  react(),
  visualizer({ open: true })
]

npm run build
# Opens interactive bundle analyzer
```

---

## Security Checklist

**Before deploying to production**:

### Environment Variables
- [ ] No secrets in `.env` files committed to Git
- [ ] `.env` in `.gitignore`
- [ ] All `VITE_*` variables are safe to expose (public configuration only)
- [ ] Production secrets stored in deployment platform (Cloudflare/Vercel/etc.)

### Dependencies
```bash
# Check for known vulnerabilities
npm audit

# Fix automatically (if possible)
npm audit fix

# Review high/critical issues
npm audit --audit-level=high
```

### Build Security
- [ ] No console.log with sensitive data in production
- [ ] Source maps disabled in production (or upload to error tracking)
- [ ] Content Security Policy headers configured (in nginx/deployment)

### Docker Security (if applicable)
- [ ] Running as non-root user
- [ ] Minimal base image (alpine)
- [ ] No secrets in Dockerfile or docker-compose.yml
- [ ] .dockerignore excludes sensitive files

---

## First Feature Guide

**Congratulations!** 🎉 Your project is fully set up. Here's how to build your first feature:

### Step 1: Create a Task

```bash
# Open kanban.md and add task
# Example:

### TASK-001 | Build landing page hero section

**Priority**: 🔴 Critical | **Category**: Frontend | **Assigned**: @you
**Created**: 2025-11-28 | **Started**: 2025-11-28

Build the hero section for the landing page with:
- Heading and subheading
- CTA button
- Background image
- Responsive design

**Subtasks**:
- [ ] Design hero layout
- [ ] Create Hero component
- [ ] Add background image
- [ ] Implement CTA button
- [ ] Test responsive design
```

### Step 2: Create a Branch

```bash
git checkout -b feature/TASK-001-landing-hero
```

### Step 3: Build the Component

```typescript
// src/components/organisms/Hero.tsx
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

export const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center">
      <div className="container max-w-4xl text-center">
        <Typography variant="h1" className="mb-4">
          Welcome to Your App
        </Typography>
        <Typography variant="body" className="mb-8">
          Build amazing experiences with our platform
        </Typography>
        <Button variant="default" size="lg">
          Get Started
        </Button>
      </div>
    </section>
  )
}
```

### Step 4: Add to a Page

```typescript
// src/pages/home/index.tsx
import { Hero } from '@/components/organisms/Hero'

export default function HomePage() {
  return (
    <div>
      <Hero />
      {/* More sections */}
    </div>
  )
}
```

### Step 5: Test

```bash
# Start dev server
npm run dev

# Visit http://localhost:5173/

# Check:
# - Component renders correctly
# - Responsive design works
# - No console errors
# - Follows design system
```

### Step 6: Pre-Commit Review

```bash
# Run all checks
npm run typecheck  # TypeScript
npm run lint       # ESLint
npm run format     # Prettier
npm run build      # Production build test

# Validate design system compliance
# - No hardcoded colors
# - Uses design tokens
# - Follows component patterns
```

### Step 7: Commit

```bash
git add .
git commit -m "feat: add landing page hero section (TASK-001)

- Create Hero organism component
- Implement responsive layout
- Add CTA button
- Test on mobile and desktop

TASK-001"
```

### Step 8: Push and Deploy

```bash
# Push to remote
git push -u origin feature/TASK-001-landing-hero

# Create pull request
# (via GitHub/GitLab UI)

# After review and merge, deploy to production
```

---

## What's Next

### Immediate Next Steps

1. **Build Core Features**
   - Create main pages (home, about, contact, etc.)
   - Implement authentication (if needed)
   - Set up API integration
   - Add error boundaries

2. **Enhance Design System**
   - Add more UI components as needed
   - Create page templates
   - Build complex organisms
   - Document component usage

3. **Add Advanced Features**
   - State management (if complex state needed)
   - Form validation library
   - Animation library (Framer Motion)
   - Testing (Vitest + React Testing Library)

4. **Optimize Performance**
   - Implement code splitting
   - Add lazy loading for routes
   - Optimize images (use WebP)
   - Add service worker (PWA)

5. **Set Up Monitoring**
   - Error tracking (Sentry)
   - Analytics (Google Analytics, Plausible)
   - Performance monitoring (Web Vitals)
   - User feedback system

### Recommended Learning Path

**Week 1**: Core Pages
- Build main navigation
- Create 3-5 key pages
- Implement routing
- Add basic SEO

**Week 2**: Features & Integration
- Connect to backend API
- Add authentication
- Implement core user flows
- Test edge cases

**Week 3**: Polish & Optimization
- Refine design system
- Optimize performance
- Add loading states
- Improve error handling

**Week 4**: Testing & Deployment
- Add unit tests
- End-to-end testing
- Deploy to staging
- Production deployment

---

## Final Verification Checklist

**Before considering setup complete**:

### Development Environment
- [ ] Node.js 20+ installed and working
- [ ] npm packages installed successfully
- [ ] Dev server starts without errors
- [ ] Hot reload works correctly
- [ ] TypeScript compilation succeeds

### Build & Production
- [ ] Production build completes successfully
- [ ] Build output is optimized (<500KB gzipped)
- [ ] No build warnings or errors
- [ ] Environment variables work correctly

### Design System
- [ ] Design tokens defined and accessible
- [ ] UI components library set up
- [ ] Tailwind CSS working correctly
- [ ] Component variants (CVA) configured

### Development Tools
- [ ] ESLint configured and running
- [ ] Prettier formatting works
- [ ] TypeScript strict mode enabled
- [ ] VS Code extensions recommended

### Docker (if applicable)
- [ ] Development container runs
- [ ] Production container builds
- [ ] nginx serves app correctly
- [ ] Hot reload works in container

### Claude Code Integration
- [ ] CLAUDE.md customized
- [ ] Skills installed and working
- [ ] Task management set up (kanban.md)
- [ ] AI assistance accessible

### Deployment
- [ ] Deployment platform connected
- [ ] Environment variables configured
- [ ] Build pipeline working
- [ ] Production URL accessible

### Security & Performance
- [ ] No vulnerabilities in dependencies
- [ ] No secrets in committed code
- [ ] Performance benchmarks met
- [ ] Security best practices followed

---

## Troubleshooting Resources

### Documentation
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### Community Support
- [Vite Discord](https://chat.vitejs.dev/)
- [React Discord](https://discord.gg/react)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/vite+react)

### Project Documentation
- Guides 01-09 for specific phase troubleshooting
- CLAUDE.md for project-specific context
- kanban.md for tracking issues and tasks

---

## Success Criteria

**You've successfully completed setup when**:

✅ All verification checks pass
✅ Sample component renders correctly
✅ Build completes in <30 seconds
✅ No TypeScript or linting errors
✅ Docker containers run (if configured)
✅ Ready to build first feature

---

## 🎉 Congratulations!

You've successfully set up a **production-ready frontend project** with:

- ⚡ **Lightning-fast development** with Vite + React
- 🎨 **Complete design system** with Tailwind + shadcn/ui
- 🔧 **Professional tooling** (TypeScript, ESLint, Prettier)
- 🐳 **Docker containerization** for consistent environments
- 🤖 **AI-assisted development** with Claude Code + Skills
- 🚀 **Deployment-ready** configuration

**Now go build something amazing!** 💪

---

**Prev**: [09-project-conventions.md](09-project-conventions.md) | **Back to**: [README.md](README.md)
