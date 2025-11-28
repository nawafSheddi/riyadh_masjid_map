# 05 - Development Tooling

> **Set up linting, type checking, and code quality tools**
>
> Estimated Time: 20 minutes

## Overview

This guide sets up development tooling to enforce code quality, catch errors early, and maintain consistency across your team. We'll configure ESLint with custom rules, TypeScript strict mode, and optional formatting tools.

## Prerequisites

✅ Completed [04-design-system-setup.md](04-design-system-setup.md)
✅ TypeScript installed
✅ ESLint installed
✅ Design tokens created

---

## Step 1: Configure ESLint with Custom Rules

ESLint catches code quality issues and enforces your design system.

### Create `eslint.config.js`

```javascript
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist', 'node_modules', 'build', '*.config.js'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // ========================================================================
      // CUSTOM RULES: Design Token Enforcement
      // ========================================================================

      // Prevent hardcoded Tailwind colors
      'no-restricted-syntax': [
        'error',
        {
          selector: 'Literal[value=/bg-(red|blue|green|yellow|purple|pink|gray|orange|indigo|violet|fuchsia|rose|sky|cyan|teal|emerald|lime|amber)-[0-9]/]',
          message: 'Use semantic color tokens from design-tokens/colors instead of hardcoded Tailwind colors.\nExample: Use "bg-primary" instead of "bg-blue-500"',
        },
        {
          selector: 'Literal[value=/text-(red|blue|green|yellow|purple|pink|gray|orange|indigo|violet|fuchsia|rose|sky|cyan|teal|emerald|lime|amber)-[0-9]/]',
          message: 'Use semantic color tokens from design-tokens/colors instead of hardcoded Tailwind colors.\nExample: Use "text-accent" instead of "text-orange-500"',
        },
        {
          selector: 'Literal[value=/border-(red|blue|green|yellow|purple|pink|gray|orange|indigo|violet|fuchsia|rose|sky|cyan|teal|emerald|lime|amber)-[0-9]/]',
          message: 'Use semantic color tokens from design-tokens/colors instead of hardcoded Tailwind colors.\nExample: Use "border-primary" instead of "border-blue-500"',
        },
      ],
    },
  }
)
```

### Add Design Token Import Restrictions (Optional)

If you're using a centralized icon system, prevent direct icon library imports:

Create `.eslintrc.json` for additional rules:

```json
{
  "rules": {
    "no-restricted-imports": [
      "error",
      {
        "paths": [
          {
            "name": "lucide-react",
            "message": "Import icons from @/design-tokens/icons instead of lucide-react directly"
          }
        ]
      }
    ]
  },
  "overrides": [
    {
      "files": ["src/design-tokens/icons.ts", "src/components/ui/icon.tsx"],
      "rules": {
        "no-restricted-imports": "off"
      }
    }
  ]
}
```

---

## Step 2: Configure TypeScript Strict Mode

Strict TypeScript catches bugs before they happen.

### Your `tsconfig.json` Should Have:

```json
{
  "compilerOptions": {
    "target": "ES2020",
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

    /* Linting - STRICT MODE */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitReturns": true,
    "noUncheckedIndexedAccess": true,

    /* Path aliases */
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

**Key Strict Options**:
- `strict: true` - Enables all strict type checking
- `noUnusedLocals` - Error on unused variables
- `noUnusedParameters` - Error on unused function parameters
- `noImplicitReturns` - All code paths must return value
- `noUncheckedIndexedAccess` - Arrays/objects return T | undefined

---

## Step 3: Add npm Scripts for Quality Checks

Update `package.json` scripts:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",

    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --ext ts,tsx --fix",
    "typecheck": "tsc --noEmit",
    "check": "npm run typecheck && npm run lint"
  }
}
```

**Script Explanations**:
- `lint` - Run ESLint, fail if warnings found
- `lint:fix` - Auto-fix ESLint issues
- `typecheck` - TypeScript check without building
- `check` - Run both TypeScript and ESLint

---

## Step 4: Configure VS Code (Recommended)

### Create `.vscode/settings.json`

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  "files.associations": {
    "*.css": "tailwindcss"
  },
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cn\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
```

**What This Does**:
- Auto-format on save
- Auto-fix ESLint issues on save
- Use workspace TypeScript version
- Tailwind IntelliSense in `cva()` and `cn()`

### Create `.vscode/extensions.json`

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-azuretools.vscode-docker",
    "eamodio.gitlens"
  ]
}
```

---

## Step 5: Set Up Prettier (Optional)

Prettier formats code consistently. **Only add if you want auto-formatting.**

### Install Prettier

```bash
npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier
```

### Create `.prettierrc`

```json
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

### Create `.prettierignore`

```
node_modules
dist
build
.next
coverage
*.min.js
package-lock.json
pnpm-lock.yaml
```

### Update ESLint Config

Add Prettier to ESLint:

```javascript
// eslint.config.js
import prettier from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'

export default tseslint.config(
  // ... existing config
  prettierConfig,  // Disables ESLint rules that conflict with Prettier
  {
    plugins: {
      prettier,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  }
)
```

---

## Step 6: Add Git Hooks with Husky (Optional)

Prevent bad code from being committed.

### Install Husky

```bash
npm install --save-dev husky lint-staged
npx husky init
```

### Configure Pre-Commit Hook

Create `.husky/pre-commit`:

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
```

### Configure Lint-Staged

Add to `package.json`:

```json
{
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md}": [
      "prettier --write"
    ]
  }
}
```

**What This Does**:
- Runs ESLint on staged TypeScript files
- Runs Prettier on staged files
- Blocks commit if errors found

---

## Step 7: Validation Workflow

### Before Every Commit

```bash
# 1. Type check
npm run typecheck

# 2. Lint check
npm run lint

# 3. Or run both
npm run check
```

### During Development

**VS Code will show:**
- Red squiggly lines for TypeScript errors
- Yellow squiggly lines for ESLint warnings
- Auto-fix on save (if configured)

**Terminal output:**
```bash
npm run lint

✖ 3 problems (2 errors, 1 warning)
  2 errors and 0 warnings potentially fixable with the `--fix` option.

src/components/Button.tsx
  10:15  error  Use semantic color tokens instead of hardcoded Tailwind colors  no-restricted-syntax
  15:20  error  'onClick' is defined but never used  @typescript-eslint/no-unused-vars
  25:10  warning  Component should be wrapped in React.memo  react/no-memo
```

---

## Step 8: Create Validation Scripts

### Create `scripts/validate-tokens.sh`

This script detects design token violations:

```bash
#!/bin/bash

echo "🔍 Validating design tokens..."

# Find hardcoded Tailwind colors
echo "Checking for hardcoded colors..."
HARDCODED_COLORS=$(grep -rn --include="*.tsx" --include="*.ts" -E "(bg|text|border)-(red|blue|green|yellow|orange|purple|pink|gray|indigo|violet|fuchsia|rose)-[0-9]" src/ || true)

if [ -n "$HARDCODED_COLORS" ]; then
  echo "❌ Found hardcoded Tailwind colors:"
  echo "$HARDCODED_COLORS"
  exit 1
fi

# Find direct lucide-react imports (if using icon system)
echo "Checking for direct icon imports..."
DIRECT_IMPORTS=$(grep -rn --include="*.tsx" --include="*.ts" "from 'lucide-react'" src/ --exclude="src/design-tokens/icons.ts" --exclude="src/components/ui/icon.tsx" || true)

if [ -n "$DIRECT_IMPORTS" ]; then
  echo "❌ Found direct lucide-react imports:"
  echo "$DIRECT_IMPORTS"
  echo "Import from @/design-tokens/icons instead"
  exit 1
fi

echo "✅ Design token validation passed!"
```

Make executable:

```bash
chmod +x scripts/validate-tokens.sh
```

Add to `package.json`:

```json
{
  "scripts": {
    "validate:tokens": "./scripts/validate-tokens.sh"
  }
}
```

---

## Step 9: Pre-Commit Checklist

Before committing code, verify:

```bash
# ✓ TypeScript compiles
npm run typecheck

# ✓ ESLint passes
npm run lint

# ✓ Design tokens validated
npm run validate:tokens

# ✓ (Optional) Prettier formatted
npm run format:check

# ✓ All checks pass
npm run check
```

---

## Common ESLint Errors & Fixes

### Error: Hardcoded Tailwind Color

```
Use semantic color tokens instead of hardcoded Tailwind colors
Example: Use "bg-primary" instead of "bg-blue-500"
```

**Fix**:
```tsx
// ❌ Before
<div className="bg-blue-500 text-white">

// ✅ After
<div className="bg-primary text-white">
```

### Error: Direct Icon Import

```
Import icons from @/design-tokens/icons instead of lucide-react directly
```

**Fix**:
```tsx
// ❌ Before
import { User } from 'lucide-react'

// ✅ After
import { icons } from '@/design-tokens/icons'
const UserIcon = icons.content.user
```

### Error: Unused Variable

```
'handleClick' is defined but never used
```

**Fix**:
```tsx
// ❌ Before
const handleClick = () => console.log('click')

// ✅ After - Remove if unused, or prefix with _
const _handleClick = () => console.log('click')
```

### Error: Implicit Any

```
Parameter 'event' implicitly has an 'any' type
```

**Fix**:
```tsx
// ❌ Before
const handleChange = (event) => { ... }

// ✅ After
const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => { ... }
```

---

## Quality Control Levels

### Level 1: Editor (Real-time)
- VS Code shows errors as you type
- Auto-fix on save
- Immediate feedback

### Level 2: Command Line (Manual)
- Run `npm run check` before commits
- Catches issues before push

### Level 3: Git Hooks (Automated)
- Husky runs checks on commit
- Blocks commit if errors found
- Ensures clean history

### Level 4: CI/CD (Deployment)
- GitHub Actions / GitLab CI runs checks
- Blocks merge if checks fail
- Final quality gate

---

## Troubleshooting

### ESLint Not Working

```bash
# Clear ESLint cache
rm -rf node_modules/.cache

# Reinstall dependencies
npm install

# Restart VS Code
```

### TypeScript Errors Not Showing

```bash
# Ensure TypeScript is installed locally
npm install --save-dev typescript

# Check tsconfig.json exists
cat tsconfig.json

# Restart TypeScript server in VS Code
# Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"
```

### Git Hooks Not Running

```bash
# Reinstall Husky
rm -rf .husky
npx husky init

# Make hook executable
chmod +x .husky/pre-commit
```

---

## Success Metrics

Your tooling is working when:
- ✅ ESLint catches hardcoded colors automatically
- ✅ TypeScript errors show in editor
- ✅ Code auto-formats on save
- ✅ Git hooks block bad commits
- ✅ `npm run check` passes before every commit

---

## Next Steps

You now have:
- ✅ ESLint with design token enforcement
- ✅ TypeScript strict mode
- ✅ Quality check scripts
- ✅ VS Code integration
- ✅ Optional Prettier formatting
- ✅ Optional Git hooks

**→ Proceed to**: [06-docker-configuration.md](06-docker-configuration.md) to containerize your application.

---

**Key Takeaway**: Tooling catches mistakes automatically. The earlier you catch design token violations, the easier they are to fix. Configure once, benefit forever.
