# 03 - Tech Stack Configuration

> **Install dependencies and configure build tools**
>
> Estimated Time: 30 minutes

## Overview

This guide covers installing all necessary packages and configuring the core build tools: Vite, TypeScript, Tailwind CSS, and PostCSS.

## Prerequisites

✅ Completed [02-initial-project-setup.md](02-initial-project-setup.md)
✅ `package.json` exists
✅ Project folder structure created

---

## Tech Stack Decision Point

**IMPORTANT**: Before proceeding, decide on your tech stack.

### Option A: Use Recommended Stack (Faster)

This template's recommended stack:
- React 18 + TypeScript 5
- Vite 7 (build tool)
- Tailwind CSS 3 (styling)
- Zustand 5 (state management)
- React Router 7 (routing)

**→ Continue with this guide** (Steps 1-6 below)

### Option B: Explore Alternatives

See [reference/tech-stack-alternatives.md](reference/tech-stack-alternatives.md) for:
- Build tools: Vite vs Next.js vs Create React App
- Styling: Tailwind vs CSS-in-JS vs styled-components
- State management: Zustand vs Redux vs Context API
- Routing: React Router vs TanStack Router

**→ Review alternatives, then return here** to install your chosen stack.

---

## Step 1: Install Core Dependencies

### Install Production Dependencies

```bash
npm install react@^19.1.1 react-dom@^19.1.1
```

**Why these versions**:
- React 19: Latest with improved concurrent features
- Matched react-dom version required

---

## Step 2: Install Build Tools & TypeScript

### Install Development Dependencies

```bash
npm install --save-dev \
  vite@^7.1.6 \
  @vitejs/plugin-react@^5.0.3 \
  typescript@^5.9.2 \
  @types/react@^19.1.13 \
  @types/react-dom@^19.1.9
```

**Package Breakdown**:
- `vite`: Lightning-fast build tool with HMR
- `@vitejs/plugin-react`: React plugin for Vite (Fast Refresh)
- `typescript`: TypeScript compiler
- `@types/react`: TypeScript definitions for React
- `@types/react-dom`: TypeScript definitions for ReactDOM

### Create Vite Configuration

Copy from `templates/vite.config.ts.template` or create:

```bash
cat > vite.config.ts << 'EOF'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
      },
    },
  },
})
EOF
```

### Create TypeScript Configuration

Copy from `templates/tsconfig.json.template` or create:

```bash
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,

    /* Path aliases */
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
EOF
```

### Create Node TypeScript Configuration

```bash
cat > tsconfig.node.json << 'EOF'
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
EOF
```

---

## Step 3: Install & Configure Tailwind CSS

### Install Tailwind Dependencies

```bash
npm install --save-dev \
  tailwindcss@^3.4.17 \
  postcss@^8.5.6 \
  autoprefixer@^10.4.21
```

### Initialize Tailwind Configuration

```bash
npx tailwindcss init -p
```

This creates:
- `tailwind.config.js` - Tailwind configuration
- `postcss.config.js` - PostCSS configuration

### Configure Tailwind

Copy from `templates/tailwind.config.js.template` or update `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        accent: {
          DEFAULT: "#FF6B35",
          dark: "#E55A2B"
        },
      },
      fontFamily: {
        sans: ['Cairo', 'sans-serif'],
      },
      borderRadius: {
        lg: '12px',
        md: '8px',
        sm: '4px',
      },
      minHeight: {
        'touch': '44px',
        'touch-lg': '48px',
      },
      minWidth: {
        'touch': '44px',
        'touch-lg': '48px',
      },
    },
  },
  plugins: [],
}
```

### Verify PostCSS Configuration

Ensure `postcss.config.js` contains:

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

---

## Step 4: Install Utility Libraries

### Install Class Utilities

```bash
npm install \
  class-variance-authority@^0.7.1 \
  clsx@^2.1.1 \
  tailwind-merge@^3.3.1
```

**Package Purposes**:
- `class-variance-authority` (CVA): Type-safe component variants
- `clsx`: Conditional class names
- `tailwind-merge`: Merge Tailwind classes without conflicts

### Create Utility Helper

```bash
mkdir -p src/lib
cat > src/lib/utils.ts << 'EOF'
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
EOF
```

---

## Step 5: Install State Management & Routing

### Install Zustand (State Management)

```bash
npm install zustand@^5.0.8
```

### Install React Router (Routing)

```bash
npm install react-router-dom@^7.9.1
```

---

## Step 6: Install Additional UI Dependencies

### Install Icon Library

```bash
npm install lucide-react@^0.544.0
```

### Install UI Component Dependencies

```bash
npm install @radix-ui/react-switch@^1.2.6
```

**Note**: Additional Radix UI components can be added as needed for your design system.

---

## Step 7: Install Localization (Optional)

If your project requires multi-language support:

```bash
npm install \
  i18next@^25.5.2 \
  react-i18next@^16.0.0
```

**Skip this step** if you only need a single language.

---

## Step 8: Update package.json Scripts

Add npm scripts to `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0"
  }
}
```

---

## Step 9: Verify Installation

### Check package.json

Your `package.json` should now look similar to this:

```json
{
  "name": "my-frontend-project",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0"
  },
  "dependencies": {
    "@radix-ui/react-switch": "^1.2.6",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "i18next": "^25.5.2",
    "lucide-react": "^0.544.0",
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    "react-i18next": "^16.0.0",
    "react-router-dom": "^7.9.1",
    "tailwind-merge": "^3.3.1",
    "zustand": "^5.0.8"
  },
  "devDependencies": {
    "@types/react": "^19.1.13",
    "@types/react-dom": "^19.1.9",
    "@vitejs/plugin-react": "^5.0.3",
    "autoprefixer": "^10.4.21",
    "postcss": "^8.5.6",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.9.2",
    "vite": "^7.1.6"
  }
}
```

### Test Development Server

```bash
# Start Vite dev server
npm run dev
```

Expected output:
```
VITE v7.1.6  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

**Visit**: http://localhost:5173/

You should see: "Welcome to Your New Project"

### Test Build

```bash
# Run TypeScript check and build
npm run build
```

Expected output:
```
vite v7.1.6 building for production...
✓ XXX modules transformed.
dist/index.html                   X.XX kB │ gzip: X.XX kB
dist/assets/index-XXXXXXXX.js   XXX.XX kB │ gzip: XX.XX kB
✓ built in XXXms
```

---

## Verification Checklist

```bash
# ✓ Dependencies installed
ls node_modules | wc -l  # Should show ~XXX packages

# ✓ Configuration files exist
ls -la *.config.*  # Should show vite.config.ts, tailwind.config.js, postcss.config.js
ls -la tsconfig*.json  # Should show tsconfig.json, tsconfig.node.json

# ✓ Utils created
cat src/lib/utils.ts  # Should show cn() function

# ✓ Dev server works
npm run dev  # Should start on port 5173

# ✓ Build works
npm run build  # Should create dist/ folder
ls dist/  # Should show index.html and assets/

# ✓ TypeScript works
npx tsc --noEmit  # Should show no errors
```

---

## Installed Package Versions

| Package | Version | Purpose |
|---------|---------|---------|
| react | 19.1.1 | UI library |
| react-dom | 19.1.1 | React DOM renderer |
| vite | 7.1.6 | Build tool |
| typescript | 5.9.2 | Type checking |
| tailwindcss | 3.4.17 | CSS framework |
| zustand | 5.0.8 | State management |
| react-router-dom | 7.9.1 | Routing |
| lucide-react | 0.544.0 | Icons |
| class-variance-authority | 0.7.1 | Component variants |

---

## Common Issues & Solutions

### Issue: "Cannot find module '@/...'"
**Solution**:
```bash
# Ensure tsconfig.json has path aliases configured
# Check baseUrl and paths settings
# Restart VS Code or your editor
```

### Issue: Vite dev server not starting
**Solution**:
```bash
# Check if port 5173 is already in use
lsof -i :5173

# Kill the process or use different port
npm run dev -- --port 3000
```

### Issue: TypeScript errors in .tsx files
**Solution**:
```bash
# Ensure @types/react is installed
npm install --save-dev @types/react @types/react-dom

# Check tsconfig.json includes "jsx": "react-jsx"
```

### Issue: Tailwind classes not working
**Solution**:
```bash
# Verify globals.css has Tailwind directives
cat src/styles/globals.css  # Should show @tailwind directives

# Ensure src/main.tsx imports globals.css
grep "globals.css" src/main.tsx

# Check tailwind.config.js content paths
cat tailwind.config.js  # Should include "./src/**/*.{js,ts,jsx,tsx}"
```

### Issue: Build fails with module errors
**Solution**:
```bash
# Clear cache and node_modules
rm -rf node_modules package-lock.json dist
npm install
npm run build
```

---

## Git Checkpoint

Commit your configuration:

```bash
git add .
git commit -m "chore: configure tech stack

- Install React, Vite, TypeScript
- Configure Tailwind CSS
- Add Zustand and React Router
- Set up utility libraries
- Configure build tools

Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Next Steps

You now have:
- ✅ All dependencies installed
- ✅ Vite configured
- ✅ TypeScript configured
- ✅ Tailwind CSS configured
- ✅ Dev server working
- ✅ Production build working

**→ Proceed to**: [04-design-system-setup.md](04-design-system-setup.md) to create your design token system.

---

**Estimated Time**: 30 minutes
**Next Step**: [04-design-system-setup.md](04-design-system-setup.md)
