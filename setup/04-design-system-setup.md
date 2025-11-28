# 04 - Design System Setup

> **Build your design system gradually as you design your project**
>
> Estimated Time: 1-2 hours (initial), ongoing as project grows

## Overview

This guide teaches you how to build a **design token system** from scratch, following the methodology used in successful production projects. Instead of copying an existing design system, you'll learn to create one that fits your unique design requirements and grows with your project.

## Philosophy: Design Tokens First

### What Are Design Tokens?

Design tokens are the **single source of truth** for design decisions:
- Colors → Semantic names (not hardcoded hex values)
- Typography → Font sizes, weights, line heights
- Spacing → Consistent scale for margins, padding, gaps
- Icons → Centralized icon imports
- Animations → Reusable motion patterns
- Borders → Radius and width values

### Why This Approach?

**Traditional Approach (❌ Don't do this)**:
```tsx
// Scattered hardcoded values throughout codebase
<button className="bg-orange-500 text-white px-4 py-2 rounded-lg">
  Click me
</button>
```

**Token-Based Approach (✅ Do this)**:
```tsx
// Semantic tokens defined once, used everywhere
<button className="bg-accent text-white px-button-md py-button-md rounded-button">
  Click me
</button>
```

**Benefits**:
- ✅ Change colors once, updates everywhere
- ✅ Consistency enforced automatically
- ✅ Easier to maintain and scale
- ✅ Designer-developer alignment
- ✅ Dark mode support built-in
- ✅ Prevents design drift over time

---

## Prerequisites

✅ Completed [03-tech-stack-configuration.md](03-tech-stack-configuration.md)
✅ Tailwind CSS installed and configured
✅ Project folder structure created

---

## Step 1: Define Your Design Foundations

Before writing code, answer these questions about your project's design:

### Color System Questions

1. **What's your brand color palette?**
   - Primary color (main brand color)
   - Accent color (CTAs, highlights)
   - Neutral colors (backgrounds, text, borders)

2. **Do you need dark mode?**
   - Yes → Plan for light and dark variants
   - No → Single color scheme

3. **What semantic colors do you need?**
   - Success (green-ish)
   - Warning (yellow/orange-ish)
   - Error (red-ish)
   - Info (blue-ish)

4. **Do you have status indicators?**
   - Live, Active, Inactive, Pending, etc.
   - What colors represent each status?

### Typography Questions

1. **What fonts will you use?**
   - Primary font (body text, headings)
   - Monospace font (code blocks, if needed)

2. **What's your type scale?**
   - How many heading levels? (h1-h6)
   - Body text sizes? (large, base, small, xsmall)
   - Special text? (captions, labels, accents)

3. **What's your text hierarchy?**
   - Which elements should stand out?
   - Which elements should be subtle?

### Spacing Questions

1. **What's your base spacing unit?**
   - Common choices: 4px, 8px
   - Creates mathematical rhythm

2. **What spacing scale do you need?**
   - xs, sm, md, lg, xl, 2xl, etc.
   - Component-specific spacing?

3. **Touch target sizes?**
   - Mobile-first: 44px minimum (WCAG standard)
   - Desktop: 48px comfortable

---

## Step 2: Create Design Tokens Folder Structure

```bash
mkdir -p src/design-tokens
```

You'll create these files **gradually as needed**:
- `colors.ts` - Color palette and semantic colors
- `typography.ts` - Font sizes, weights, line heights
- `spacing.ts` - Spacing scale and component spacing
- `icons.ts` - Centralized icon system (optional)
- `animations.ts` - Motion design tokens (optional)
- `borders.ts` - Border radius and width (optional)
- `index.ts` - Export all tokens

**Start with colors and typography** (most critical), add others as needed.

---

## Step 3: Build Your Color System

### Create `src/design-tokens/colors.ts`

Start with this template and customize:

```typescript
/**
 * Design Tokens: Colors
 *
 * Single source of truth for all color decisions.
 * Follow semantic naming: describe PURPOSE, not appearance.
 */

export const colors = {
  // ============================================================================
  // STEP 1: Define your raw brand colors
  // ============================================================================
  brand: {
    primary: '#000000',    // Replace with your brand color
    accent: '#FF6B35',     // Replace with your accent color
  },

  // ============================================================================
  // STEP 2: Define semantic colors (these map to usage, not appearance)
  // ============================================================================
  semantic: {
    success: '#10B981',    // Green - successful actions
    warning: '#F59E0B',    // Amber - warnings, caution
    error: '#EF4444',      // Red - errors, destructive actions
    info: '#3B82F6',       // Blue - informational messages
  },

  // ============================================================================
  // STEP 3: Define status colors (if your app has statuses)
  // ============================================================================
  status: {
    // Example: e-commerce order statuses
    // pending: '#F59E0B',
    // processing: '#3B82F6',
    // shipped: '#10B981',
    // delivered: '#10B981',
    // cancelled: '#EF4444',

    // Or: task management statuses
    // todo: '#94A3B8',
    // inProgress: '#3B82F6',
    // review: '#F59E0B',
    // done: '#10B981',
  },

  // ============================================================================
  // STEP 4: Define neutral colors with opacity (for borders, backgrounds)
  // ============================================================================
  neutral: {
    border: {
      light: 'rgba(0, 0, 0, 0.1)',    // Borders in light mode
      dark: 'rgba(255, 255, 255, 0.1)', // Borders in dark mode
    },
    disabled: {
      light: 'rgba(0, 0, 0, 0.4)',    // Disabled state in light mode
      dark: 'rgba(255, 255, 255, 0.4)', // Disabled state in dark mode
    },
  },
} as const

/**
 * Usage in components:
 *
 * ✅ Correct:
 * import { colors } from '@/design-tokens/colors'
 * style={{ color: colors.semantic.success }}
 *
 * ❌ Wrong:
 * style={{ color: '#10B981' }}  // Hardcoded color
 */
```

### Map Tokens to Tailwind CSS Variables

Update `tailwind.config.js`:

```javascript
export default {
  theme: {
    extend: {
      colors: {
        // CSS variables for theme switching
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",

        // Your brand colors
        primary: "#000000",    // Your primary brand color
        accent: {
          DEFAULT: "#FF6B35",  // Your accent color
          dark: "#E55A2B",     // Darker variant for accessibility
        },

        // Semantic colors
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444",
        info: "#3B82F6",

        // Status colors (add yours)
        // status: {
        //   live: '#10B981',
        //   soon: '#F59E0B',
        //   ended: '#94A3B8',
        // },
      },
    },
  },
}
```

### Update `src/styles/globals.css`

Add CSS custom properties for theme switching:

```css
@layer base {
  :root {
    /* Light mode (default) */
    --color-background: #ffffff;
    --color-foreground: #000000;
    --color-border: rgba(0, 0, 0, 0.1);
  }

  [data-theme="dark"] {
    /* Dark mode */
    --color-background: #000000;
    --color-foreground: #ffffff;
    --color-border: rgba(255, 255, 255, 0.1);
  }
}
```

---

## Step 4: Build Your Typography System

### Create `src/design-tokens/typography.ts`

```typescript
/**
 * Design Tokens: Typography
 *
 * Font sizes, weights, and line heights.
 */

export const typography = {
  // ============================================================================
  // STEP 1: Define your font family
  // ============================================================================
  fontFamily: {
    sans: ['Cairo', 'Inter', 'system-ui', 'sans-serif'],  // Replace with your font
    mono: ['JetBrains Mono', 'Fira Code', 'monospace'],    // Optional: code font
  },

  // ============================================================================
  // STEP 2: Define heading sizes (adjust to your design)
  // ============================================================================
  headings: {
    h1: {
      fontSize: '2rem',      // 32px
      lineHeight: '1.2',
      fontWeight: '700',      // Bold
    },
    h2: {
      fontSize: '1.75rem',   // 28px
      lineHeight: '1.2',
      fontWeight: '600',      // SemiBold
    },
    h3: {
      fontSize: '1.5rem',    // 24px
      lineHeight: '1.2',
      fontWeight: '600',
    },
    h4: {
      fontSize: '1.25rem',   // 20px
      lineHeight: '1.3',
      fontWeight: '500',      // Medium
    },
    h5: {
      fontSize: '1.125rem',  // 18px
      lineHeight: '1.3',
      fontWeight: '500',
    },
    h6: {
      fontSize: '1rem',      // 16px
      lineHeight: '1.3',
      fontWeight: '500',
    },
  },

  // ============================================================================
  // STEP 3: Define body text sizes
  // ============================================================================
  body: {
    large: {
      fontSize: '1.125rem',  // 18px
      lineHeight: '1.5',
      fontWeight: '400',      // Regular
    },
    base: {
      fontSize: '1rem',      // 16px
      lineHeight: '1.5',
      fontWeight: '400',
    },
    small: {
      fontSize: '0.875rem',  // 14px
      lineHeight: '1.5',
      fontWeight: '400',
    },
    xsmall: {
      fontSize: '0.75rem',   // 12px
      lineHeight: '1.4',
      fontWeight: '400',
    },
  },

  // ============================================================================
  // STEP 4: Define special text variants (optional)
  // ============================================================================
  special: {
    caption: {
      fontSize: '0.75rem',   // 12px
      lineHeight: '1.4',
      fontWeight: '400',
    },
    label: {
      fontSize: '0.875rem',  // 14px
      lineHeight: '1.4',
      fontWeight: '500',      // Medium for labels
    },
  },
} as const
```

### Map to Tailwind

Update `tailwind.config.js`:

```javascript
export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Cairo', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Map your typography tokens
        'h1': ['2rem', { lineHeight: '1.2', fontWeight: '700' }],
        'h2': ['1.75rem', { lineHeight: '1.2', fontWeight: '600' }],
        // ... add more as needed
      },
    },
  },
}
```

---

## Step 5: Build Your Spacing System

### Create `src/design-tokens/spacing.ts`

```typescript
/**
 * Design Tokens: Spacing
 *
 * Consistent spacing scale based on mathematical rhythm.
 */

export const spacing = {
  // ============================================================================
  // STEP 1: Define base spacing scale (8px recommended)
  // ============================================================================
  base: {
    xs: '4px',      // 0.25rem
    sm: '8px',      // 0.5rem
    md: '16px',     // 1rem (base unit)
    lg: '24px',     // 1.5rem
    xl: '32px',     // 2rem
    '2xl': '48px',  // 3rem
    '3xl': '64px',  // 4rem
    '4xl': '96px',  // 6rem
  },

  // ============================================================================
  // STEP 2: Define component-specific spacing (as you build components)
  // ============================================================================
  component: {
    button: {
      sm: { x: '12px', y: '8px' },   // px-3 py-2
      md: { x: '16px', y: '12px' },  // px-4 py-3
      lg: { x: '24px', y: '16px' },  // px-6 py-4
    },
    card: {
      padding: '24px',     // Inner padding
      gap: '16px',         // Gap between elements
    },
    input: {
      padding: '12px 16px',
    },
  },

  // ============================================================================
  // STEP 3: Define touch targets (mobile-first)
  // ============================================================================
  touch: {
    minimum: '44px',      // WCAG 2.1 minimum
    comfortable: '48px',  // Comfortable for thumbs
  },
} as const
```

### Map to Tailwind

Update `tailwind.config.js`:

```javascript
export default {
  theme: {
    extend: {
      spacing: {
        'touch': '44px',
        'touch-lg': '48px',
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
}
```

---

## Step 6: Create Constants for Business Logic

Design tokens are for **visual design**. Business logic values go in **constants**.

### Create `src/constants/ui.ts`

```typescript
/**
 * UI Constants
 *
 * Non-visual constants for UI behavior and business logic.
 */

export const UI_CONSTANTS = {
  // Notification behavior
  NOTIFICATION: {
    AUTO_DISMISS_DURATION: 5000,  // 5 seconds
    MAX_VISIBLE: 5,
    POSITION: 'top-right' as const,
  },

  // Pagination
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 20,
    PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
  },

  // Time constants
  TIME: {
    SECOND: 1000,
    MINUTE: 60 * 1000,
    HOUR: 60 * 60 * 1000,
    DAY: 24 * 60 * 60 * 1000,
  },

  // Debounce/throttle
  DEBOUNCE: {
    SEARCH: 300,      // 300ms
    RESIZE: 150,
    SCROLL: 100,
  },

  // Z-index layers
  Z_INDEX: {
    DROPDOWN: 1000,
    STICKY: 1020,
    FIXED: 1030,
    MODAL_BACKDROP: 1040,
    MODAL: 1050,
    POPOVER: 1060,
    TOOLTIP: 1070,
  },
} as const

/**
 * Usage:
 *
 * import { UI_CONSTANTS } from '@/constants/ui'
 *
 * setTimeout(() => {
 *   dismissNotification()
 * }, UI_CONSTANTS.NOTIFICATION.AUTO_DISMISS_DURATION)
 */
```

### Create `src/constants/validation.ts`

```typescript
/**
 * Validation Constants
 *
 * Validation rules, limits, and constraints.
 */

export const VALIDATION = {
  // Email
  EMAIL: {
    MAX_LENGTH: 254,
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },

  // Password
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 128,
    PATTERN: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,  // At least 1 lowercase, 1 uppercase, 1 digit
  },

  // Phone (customize for your region)
  PHONE: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 15,
  },

  // Text inputs
  TEXT: {
    SHORT_MAX_LENGTH: 100,    // Names, titles
    MEDIUM_MAX_LENGTH: 500,   // Descriptions
    LONG_MAX_LENGTH: 2000,    // Comments, messages
  },

  // File uploads
  FILE: {
    MAX_SIZE_MB: 10,
    MAX_SIZE_BYTES: 10 * 1024 * 1024,
    ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
    ALLOWED_DOCUMENT_TYPES: ['application/pdf'],
  },
} as const

/**
 * Usage:
 *
 * import { VALIDATION } from '@/constants/validation'
 *
 * if (password.length < VALIDATION.PASSWORD.MIN_LENGTH) {
 *   throw new Error('Password too short')
 * }
 */
```

---

## Step 7: Export All Tokens

### Create `src/design-tokens/index.ts`

```typescript
/**
 * Design Tokens - Central Export
 *
 * Import all tokens from here for consistency.
 */

export { colors } from './colors'
export { typography } from './typography'
export { spacing } from './spacing'
// export { icons } from './icons'  // Add when you create it
// export { animations } from './animations'  // Add when you create it
// export { borders } from './borders'  // Add when you create it

/**
 * Usage:
 *
 * import { colors, typography, spacing } from '@/design-tokens'
 */
```

---

## Step 8: Enforce Tokens with ESLint (Critical!)

Without enforcement, developers will slip back to hardcoded values. Add ESLint rules:

### Update `eslint.config.js`

Add these custom rules:

```javascript
export default [
  // ... existing config
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      // Prevent hardcoded Tailwind colors
      'no-restricted-syntax': [
        'error',
        {
          selector: 'Literal[value=/bg-(red|blue|green|yellow|purple|pink|gray|orange)-[0-9]/]',
          message: 'Use semantic color tokens instead of hardcoded Tailwind colors (e.g., bg-primary instead of bg-blue-500)',
        },
        {
          selector: 'Literal[value=/text-(red|blue|green|yellow|purple|pink|gray|orange)-[0-9]/]',
          message: 'Use semantic color tokens instead of hardcoded Tailwind colors (e.g., text-accent instead of text-orange-500)',
        },
      ],
    },
  },
]
```

---

## Step 9: Create Your First Token-Based Component

### Example: Button Component

```tsx
// src/components/ui/button.tsx
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  // Base styles (always applied)
  'inline-flex items-center justify-center rounded-md font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        // Use semantic tokens, not hardcoded colors
        default: 'bg-foreground text-accent', // Black bg, orange text (light mode)
        secondary: 'bg-transparent border border-foreground text-foreground hover:bg-foreground hover:bg-opacity-5',
        ghost: 'bg-transparent text-foreground hover:bg-foreground hover:bg-opacity-5',
        destructive: 'bg-error text-white hover:bg-error hover:opacity-90',
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        default: 'h-10 px-4 py-2',
        lg: 'h-11 px-8 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}
```

**Notice**:
- ✅ No hardcoded colors (bg-orange-500)
- ✅ Uses semantic tokens (bg-accent, text-error)
- ✅ Uses CVA for type-safe variants
- ✅ Consistent sizing with spacing tokens

---

## Step 10: Validation Workflow

Before committing any component, validate:

### Manual Checklist
- [ ] No hardcoded colors (bg-red-500, text-blue-600)
- [ ] No magic numbers (padding: 12px → use spacing tokens)
- [ ] No direct lucide-react imports (if using icon system)
- [ ] Colors are semantic (bg-primary, not bg-black)
- [ ] Spacing uses tokens or Tailwind classes
- [ ] Component has TypeScript props
- [ ] Component exported from barrel file

### Automated Validation

Use the `design-token-enforcer` skill:

```bash
# Install skill (if not already)
cp -r project-setup-template/skills/design-token-enforcer .claude/skills/

# Activate skill by mentioning it to Claude Code:
"Use design-token-enforcer skill to validate my Button component"
```

The skill will automatically detect:
- ❌ Hardcoded Tailwind colors
- ❌ Magic numbers
- ❌ Missing constants
- ❌ Direct icon imports

---

## Gradual Growth Strategy

**Don't build all tokens upfront!** Add them as needed:

### Week 1: Colors + Typography
- Define brand colors
- Set up semantic colors
- Configure typography scale
- Create first 2-3 components

### Week 2: Spacing + Constants
- Add spacing tokens as you build components
- Extract magic numbers to constants
- Create validation rules

### Week 3+: Advanced Tokens
- Icons system (if needed)
- Animations (if needed)
- Borders (if needed)
- Status-specific tokens

### Continuous Refinement
- Review components weekly
- Consolidate duplicate values
- Update token names for clarity
- Add new tokens as design evolves

---

## Design System Enforcement

### 3 Levels of Enforcement:

**Level 1: ESLint Rules** (Automatic)
- Catches hardcoded colors during development
- Fails build if violations found

**Level 2: Skill Validation** (AI-assisted)
- `design-token-enforcer` skill validates components
- Provides specific fix suggestions

**Level 3: Pre-Commit Review** (Automated)
- `pre-commit-review` skill checks design system compliance
- Blocks commits with critical violations

---

## Common Patterns

### Pattern 1: Adding a New Color

1. **Add to design tokens**:
```typescript
// src/design-tokens/colors.ts
export const colors = {
  status: {
    processing: '#3B82F6',  // New status color
  },
}
```

2. **Add to Tailwind config**:
```javascript
// tailwind.config.js
colors: {
  status: {
    processing: '#3B82F6',
  },
}
```

3. **Use in component**:
```tsx
<Badge className="bg-status-processing text-white">
  Processing
</Badge>
```

### Pattern 2: Adding Component-Specific Spacing

1. **Add to spacing tokens**:
```typescript
// src/design-tokens/spacing.ts
export const spacing = {
  component: {
    modal: {
      padding: '32px',
      gap: '24px',
    },
  },
}
```

2. **Use in component**:
```tsx
<div className="p-8 space-y-6">  {/* 32px padding, 24px gap */}
  {/* Modal content */}
</div>
```

### Pattern 3: Extracting Magic Numbers

**Before (❌)**:
```typescript
if (countdown < 3600000) {  // What is 3600000?
  showUrgentBadge()
}
```

**After (✅)**:
```typescript
import { UI_CONSTANTS } from '@/constants/ui'

if (countdown < UI_CONSTANTS.TIME.HOUR) {
  showUrgentBadge()
}
```

---

## Success Metrics

Your design system is working when:
- ✅ New components use tokens automatically
- ✅ ESLint catches hardcoded values
- ✅ Color changes update entire app
- ✅ Spacing is consistent across components
- ✅ No "magic numbers" in codebase
- ✅ Dark mode works without per-component tweaks

---

## Next Steps

You now have:
- ✅ Color token system
- ✅ Typography system
- ✅ Spacing system
- ✅ Constants for business logic
- ✅ ESLint enforcement
- ✅ First token-based component

**→ Proceed to**: [05-development-tooling.md](05-development-tooling.md) to set up complete linting and formatting.

---

**Key Takeaway**: Don't copy an existing design system. Build yours gradually, enforcing tokens from day one. Your design system should reflect YOUR design decisions, not someone else's.
