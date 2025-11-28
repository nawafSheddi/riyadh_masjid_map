# Troubleshooting Guide

> **Reference**: Solutions to common problems and debugging strategies
> **Purpose**: Quick fixes and systematic debugging approaches
> **Estimated Reading**: 20-25 minutes

---

## 📋 Overview

This guide provides **systematic solutions** to common problems you may encounter during:

- Initial setup
- Development
- Building for production
- Deployment
- Runtime errors

**Format**: Problem → Diagnosis → Solution

---

## 🔴 White Screen Errors

### Problem: Blank white screen, no errors in terminal

**Symptoms**:
- Browser shows empty white screen
- React app doesn't render
- Terminal shows no errors
- Build succeeds but app doesn't load

---

### Diagnosis Steps

**Step 1**: Open browser console (F12)

```bash
# Look for errors in Console tab
# Common errors:
# - "Cannot read property 'X' of undefined"
# - "X is not a function"
# - "Failed to compile"
```

**Step 2**: Check Network tab

```bash
# Look for failed requests
# - 404 errors for JavaScript files
# - CORS errors
# - Failed API calls
```

---

### Solution 1: Missing Translation Keys

**Most Common Cause**: Missing or incorrect translation keys

**Error in Console**:
```
Cannot read property 'feature' of undefined
or
TypeError: translations.ar is undefined
```

**Fix**:
```typescript
// ❌ Wrong - Missing translation key
const { t } = useLanguage()
t('nonexistent.key') // Throws error

// ✅ Fix - Add key to LanguageContext
// src/contexts/LanguageContext.tsx
const translations = {
  ar: {
    nonexistent: {
      key: 'النص المترجم',
    },
  },
  en: {
    nonexistent: {
      key: 'Translated text',
    },
  },
}
```

**Verification**:
```bash
# Search for missing translation pattern
grep -r "t('.*')" src/ --include="*.tsx" | grep -v "translations"
```

---

### Solution 2: Wrong Hook Usage

**Cause**: Using wrong translation hook

**Error in Console**:
```
useTranslation is not a function
or
t is not defined
```

**Fix**:
```typescript
// ❌ Wrong - Using react-i18next (not installed)
import { useTranslation } from 'react-i18next'

// ✅ Correct - Using LanguageContext
import { useLanguage } from '@/contexts/LanguageContext'

function Component() {
  const { t } = useLanguage() // Correct hook
  return <div>{t('key')}</div>
}
```

---

### Solution 3: Undefined Props

**Cause**: Component receives undefined prop

**Error in Console**:
```
Cannot read property 'map' of undefined
or
Cannot read property 'name' of undefined
```

**Fix**:
```typescript
// ❌ Fragile - Assumes data exists
function UserList({ users }: { users: User[] }) {
  return users.map(user => <div>{user.name}</div>)
  // Crashes if users is undefined
}

// ✅ Defensive - Handles undefined
function UserList({ users }: { users?: User[] }) {
  if (!users || users.length === 0) {
    return <div>No users found</div>
  }

  return users.map(user => <div>{user.name}</div>)
}
```

---

### Solution 4: Import Errors

**Cause**: Incorrect import paths

**Error in Console**:
```
Module not found: Can't resolve '@/components/Button'
or
Failed to resolve import
```

**Fix**:
```typescript
// ❌ Wrong - Incorrect path alias
import { Button } from '@components/ui/button'

// ✅ Correct - Use configured alias
import { Button } from '@/components/ui/button'

// Verify path alias in tsconfig.json
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

---

##  TypeScript Build Errors

### Problem: Build fails with TypeScript errors

**Symptoms**:
- `npm run build` fails
- Red TypeScript errors in IDE
- Type checking fails

---

### Solution 1: Type Mismatch

**Error**:
```
Type 'string | undefined' is not assignable to type 'string'
```

**Fix**:
```typescript
// ❌ Type error
interface Props {
  name: string
}

function Component({ name }: Props) {
  const userName = user?.name // string | undefined
  return <div>{name}</div>
}

// ✅ Fix 1 - Optional prop
interface Props {
  name?: string // Allow undefined
}

// ✅ Fix 2 - Provide default
interface Props {
  name: string
}

function Component({ name }: Props) {
  const userName = user?.name ?? 'Guest' // Always string
  return <div>{userName}</div>
}

// ✅ Fix 3 - Type guard
if (user?.name) {
  const userName: string = user.name // Type narrowed
}
```

---

### Solution 2: Missing Type Definitions

**Error**:
```
Could not find a declaration file for module 'module-name'
```

**Fix**:
```bash
# Install type definitions
npm install -D @types/module-name

# If @types not available, create declaration
# src/types/module-name.d.ts
declare module 'module-name' {
  export function someFunction(): void
}
```

---

### Solution 3: Implicit Any

**Error**:
```
Parameter 'item' implicitly has an 'any' type
```

**Fix**:
```typescript
// ❌ Implicit any
function handleClick(item) {
  console.log(item.name)
}

// ✅ Explicit type
function handleClick(item: User) {
  console.log(item.name)
}

// ✅ Generic type
function handleClick<T extends { name: string }>(item: T) {
  console.log(item.name)
}
```

---

### Solution 4: Enum/Object Type Errors

**Error**:
```
Element implicitly has an 'any' type because expression of type 'string' can't be used to index type
```

**Fix**:
```typescript
// ❌ String indexing
const statusColors = {
  live: 'green',
  ended: 'gray',
}

const color = statusColors[status] // Error if status is string

// ✅ Fix 1 - Type assertion
const color = statusColors[status as keyof typeof statusColors]

// ✅ Fix 2 - Record type
const statusColors: Record<'live' | 'ended', string> = {
  live: 'green',
  ended: 'gray',
}

// ✅ Fix 3 - Const assertion
const statusColors = {
  live: 'green',
  ended: 'gray',
} as const

type Status = keyof typeof statusColors
const color = statusColors[status as Status]
```

---

## 🐳 Docker Issues

### Problem: Docker container won't start

**Symptoms**:
- `docker-compose up` fails
- Container exits immediately
- "Cannot find module" errors

---

### Solution 1: Node Modules Not Found

**Error**:
```
Error: Cannot find module 'react'
```

**Cause**: node_modules not installed in container

**Fix**:
```dockerfile
# Dockerfile - Ensure dependencies are installed
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy app files
COPY . .

# Build
RUN npm run build
```

**Verify**:
```bash
# Rebuild from scratch
docker-compose build --no-cache
docker-compose up
```

---

### Solution 2: Port Already in Use

**Error**:
```
Error: bind: address already in use
or
Port 5173 is already in use
```

**Fix**:
```bash
# Find process using port
lsof -i :5173

# Kill process
kill -9 <PID>

# Or use different port
# docker-compose.yml
ports:
  - "5174:5173"  # Host:Container
```

---

### Solution 3: File Permission Errors

**Error**:
```
EACCES: permission denied
or
Cannot write to /app/node_modules
```

**Fix**:
```dockerfile
# Use non-root user
FROM node:20-alpine

# Create app user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Set ownership
WORKDIR /app
COPY --chown=nodejs:nodejs . .

# Switch to non-root user
USER nodejs
```

---

### Solution 4: Hot Reload Not Working

**Problem**: Changes not reflected in dev container

**Fix**:
```yaml
# docker-compose.yml
services:
  frontend:
    volumes:
      - ./src:/app/src  # Mount source files
      - ./public:/app/public
      - /app/node_modules  # Don't override node_modules

    environment:
      - CHOKIDAR_USEPOLLING=true  # Enable polling for file changes
```

---

## ⚠️ Design Token Violations

### Problem: ESLint errors about design tokens

**Symptoms**:
- ESLint warnings/errors in IDE
- Build warnings
- `npm run lint` fails

---

### Solution 1: Direct Icon Imports

**Error**:
```
Import icons from '@/design-tokens/icons' instead of 'lucide-react'
```

**Fix**:
```typescript
// ❌ Direct import
import { Home } from 'lucide-react'

// ✅ Token import
import { HomeIcon } from '@/design-tokens/icons'

function Component() {
  return <HomeIcon className="w-5 h-5" />
}
```

---

### Solution 2: Hardcoded Colors

**Error**:
```
Avoid hardcoded colors. Use semantic tokens instead.
```

**Fix**:
```tsx
// ❌ Hardcoded color
<div className="bg-gray-900 text-blue-500">

// ✅ Semantic token
<div className="bg-background text-accent">

// ❌ Hardcoded border
<div className="border-gray-300">

// ✅ Token border
<div className="border-border">
```

---

### Solution 3: Magic Numbers

**Error**: No ESLint error, but code smell

**Fix**:
```tsx
// ❌ Magic number
<div className="min-h-[44px] min-w-[44px]">

// ✅ Use spacing token
<div className="min-h-touch min-w-touch">

// ❌ Hardcoded padding
<div className="p-[24px]">

// ✅ Use spacing scale
<div className="p-6">  {/* 24px */}
```

---

## 🌍 Translation Key Errors

### Problem: Missing or incorrect translation keys

**Symptoms**:
- White screen
- "[object Object]" displayed
- Untranslated text shown

---

### Solution 1: Key Not Found

**Error**: White screen or "[object Object]"

**Diagnosis**:
```bash
# Search for the problematic component
grep -r "t('.*')" src/components/
```

**Fix**:
```typescript
// src/contexts/LanguageContext.tsx
const translations = {
  ar: {
    feature: {
      section: {
        element: 'النص العربي',
      },
    },
  },
  en: {
    feature: {
      section: {
        element: 'English text',
      },
    },
  },
}

// Usage
const { t } = useLanguage()
t('feature.section.element')
```

---

### Solution 2: Inconsistent Keys Between Languages

**Problem**: Key exists in Arabic but not English (or vice versa)

**Fix**:
```typescript
// ❌ Inconsistent
const translations = {
  ar: {
    dashboard: {
      title: 'لوحة التحكم',
      subtitle: 'نظرة عامة',
    },
  },
  en: {
    dashboard: {
      title: 'Dashboard',
      // Missing subtitle!
    },
  },
}

// ✅ Consistent
const translations = {
  ar: {
    dashboard: {
      title: 'لوحة التحكم',
      subtitle: 'نظرة عامة',
    },
  },
  en: {
    dashboard: {
      title: 'Dashboard',
      subtitle: 'Overview',  // Added
    },
  },
}
```

**Validation Script**:
```bash
# scripts/validate-translations.js
const ar = require('../src/i18n/ar.json')
const en = require('../src/i18n/en.json')

function getKeys(obj, prefix = '') {
  const keys = []
  for (const key in obj) {
    if (typeof obj[key] === 'object') {
      keys.push(...getKeys(obj[key], `${prefix}${key}.`))
    } else {
      keys.push(`${prefix}${key}`)
    }
  }
  return keys
}

const arKeys = getKeys(ar).sort()
const enKeys = getKeys(en).sort()

const missingInEn = arKeys.filter(k => !enKeys.includes(k))
const missingInAr = enKeys.filter(k => !arKeys.includes(k))

if (missingInEn.length) console.error('Missing in EN:', missingInEn)
if (missingInAr.length) console.error('Missing in AR:', missingInAr)
```

---

## 🚀 Deployment Issues

### Problem: Build works locally but fails in CI/CD

**Symptoms**:
- Local `npm run build` succeeds
- CI/CD pipeline fails
- Different behavior in production

---

### Solution 1: Environment Variables Not Set

**Error**:
```
TypeError: Cannot read property 'VITE_API_URL' of undefined
```

**Fix**:
```bash
# .env.production
VITE_API_URL=https://api.production.com
VITE_WEBSOCKET_URL=wss://api.production.com/ws

# Verify in CI/CD (GitHub Actions example)
# .github/workflows/deploy.yml
env:
  VITE_API_URL: ${{ secrets.VITE_API_URL }}
  VITE_WEBSOCKET_URL: ${{ secrets.VITE_WEBSOCKET_URL }}
```

---

### Solution 2: Node Version Mismatch

**Error**:
```
Error: Unsupported engine
or
SyntaxError: Unexpected token
```

**Fix**:
```json
// package.json
{
  "engines": {
    "node": ">=20.0.0",
    "npm": ">=10.0.0"
  }
}
```

```yaml
# .github/workflows/deploy.yml
- uses: actions/setup-node@v4
  with:
    node-version: '20'
```

---

### Solution 3: Missing Build Files

**Error**:
```
404 Not Found for JavaScript files
or
Failed to load resource
```

**Cause**: Build output directory incorrect

**Fix**:
```bash
# Verify build output
npm run build
ls -la dist/

# Should contain:
# - index.html
# - assets/*.js
# - assets/*.css
```

```javascript
// vite.config.ts - Ensure correct output
export default defineConfig({
  build: {
    outDir: 'dist',  // Must match deployment config
  },
})
```

---

### Solution 4: CORS Errors in Production

**Error in Browser Console**:
```
Access to fetch at 'https://api.domain.com' has been blocked by CORS policy
```

**Fix**:
```typescript
// Backend - Add CORS headers
app.use(cors({
  origin: [
    'https://yourdomain.com',
    'https://www.yourdomain.com',
  ],
  credentials: true,
}))
```

---

## ⚡ Performance Issues

### Problem: Slow page load or rendering

**Symptoms**:
- Long Time to Interactive (TTI)
- Laggy interactions
- High bundle size

---

### Solution 1: Large Bundle Size

**Diagnosis**:
```bash
# Analyze bundle
npm run build
# Check dist/assets/*.js sizes
```

**Fix 1 - Code Splitting**:
```typescript
// Lazy load routes
import { lazy, Suspense } from 'react'

const Dashboard = lazy(() => import('./pages/Dashboard'))
const Profile = lazy(() => import('./pages/Profile'))

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Suspense>
  )
}
```

**Fix 2 - Tree Shaking**:
```typescript
// ❌ Import entire library
import _ from 'lodash'
_.debounce(fn, 300)

// ✅ Import specific function
import debounce from 'lodash/debounce'
debounce(fn, 300)
```

---

### Solution 2: Unnecessary Re-renders

**Diagnosis**:
```typescript
// React DevTools Profiler
// Look for components rendering frequently
```

**Fix**:
```typescript
import { memo, useCallback } from 'react'

// Memoize expensive component
const ExpensiveComponent = memo(({ data }: Props) => {
  return <div>{/* Expensive render */}</div>
})

// Memoize callbacks
function Parent() {
  const [count, setCount] = useState(0)

  // ❌ New function every render
  const handleClick = () => setCount(c => c + 1)

  // ✅ Memoized function
  const handleClickMemo = useCallback(
    () => setCount(c => c + 1),
    []
  )

  return <ExpensiveComponent onClick={handleClickMemo} />
}
```

---

### Solution 3: Large Images

**Diagnosis**:
```bash
# Check image sizes
du -sh public/images/*
```

**Fix**:
```tsx
// Use WebP format
<img src="/images/hero.webp" alt="Hero" />

// Lazy load images
<img loading="lazy" src="/images/photo.jpg" alt="Photo" />

// Optimize with build tool
// vite.config.ts
import imagemin from 'vite-plugin-imagemin'

export default defineConfig({
  plugins: [
    imagemin({
      gifsicle: { optimizationLevel: 7 },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 80 },
      pngquant: { quality: [0.8, 0.9] },
      svgo: { plugins: [{ name: 'removeViewBox' }] },
      webp: { quality: 75 },
    }),
  ],
})
```

---

## 🔍 Debugging Strategies

### Systematic Debugging Process

**Step 1**: Reproduce the issue consistently

```bash
# Note:
# - Exact steps to reproduce
# - Browser and version
# - Network conditions
# - User state (logged in/out)
```

**Step 2**: Isolate the problem

```bash
# Binary search approach:
# 1. Comment out half the code
# 2. If error persists, problem is in other half
# 3. Repeat until found
```

**Step 3**: Check browser console

```bash
# Open DevTools (F12)
# - Console: JavaScript errors
# - Network: Failed requests
# - Elements: DOM structure
# - React DevTools: Component tree
```

**Step 4**: Add strategic console logs

```typescript
function Component({ data }: Props) {
  console.log('Component render:', data)

  useEffect(() => {
    console.log('Effect ran:', data)
  }, [data])

  return <div>...</div>
}
```

**Step 5**: Use debugger statements

```typescript
function handleSubmit(data: FormData) {
  debugger // Pauses execution here
  // Inspect variables in browser debugger
  const result = processData(data)
  return result
}
```

---

### Common Debugging Commands

```bash
# Clear all caches
rm -rf node_modules dist .vite
npm install
npm run dev

# Type check
npm run typecheck

# Lint check
npm run lint

# Build for production
npm run build

# Test production build locally
npm run preview

# Check environment variables
echo $VITE_API_URL

# Docker rebuild
docker-compose down
docker-compose build --no-cache
docker-compose up
```

---

## 📞 Getting Additional Help

### Before Asking for Help

Collect this information:

1. **Exact error message** (copy full text)
2. **Steps to reproduce**
3. **Expected vs actual behavior**
4. **Environment**: OS, Node version, browser
5. **Code snippet** (minimal reproducible example)
6. **What you've tried**

---

### Useful Resources

**Documentation**:
- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [TypeScript Docs](https://www.typescriptlang.org/docs)
- [Tailwind Docs](https://tailwindcss.com/docs)

**Community**:
- Stack Overflow (tag: reactjs, vite, typescript)
- React Discord
- GitHub Issues for specific libraries

---

## ✅ Prevention Checklist

**Before Committing**:
- [ ] `npm run typecheck` passes
- [ ] `npm run lint` passes
- [ ] `npm run build` succeeds
- [ ] All tests pass
- [ ] Checked browser console for errors
- [ ] Tested in production build (`npm run preview`)

**Before Deploying**:
- [ ] Environment variables set
- [ ] Build succeeds in CI/CD
- [ ] Tested with production API
- [ ] Checked bundle size
- [ ] Verified all pages load
- [ ] Tested on mobile devices

---

**Last Updated**: 2025-11-28
**Previous**: [Design Token System](./design-token-system.md)
