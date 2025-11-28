# Design Token System Reference

> **Reference**: Complete design token catalog and usage guide
> **Purpose**: Maintain consistency and enable systematic customization
> **Estimated Reading**: 15-20 minutes

---

## 📋 Overview

This is the **complete reference** for all design tokens in the system. Use this to:

- Look up specific token values
- Understand token organization
- Extend the token system
- Validate token usage
- Customize for your project

**Note**: This references the specific tokens from the Saudi Celebrity Giveaway Platform. Adapt values to match your design system while keeping the structure.

---

## 🎨 Color Tokens

### Core Theme Colors (90-95% Usage)

These form the foundation of your color system and should be used for most UI elements.

#### Background Tokens

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `bg-background` | `#FFFFFF` | `#000000` | Primary background color |
| `bg-background-cardDark` | `#1C1C1E` | `#1C1C1E` | Card backgrounds in dark mode |

**CSS Custom Property**:
```css
var(--color-background)
var(--color-background-card-dark)
```

**Tailwind Classes**:
```tsx
<div className="bg-background">Main background</div>
<div className="bg-background-cardDark">Dark card</div>
```

---

#### Foreground (Text) Tokens

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `text-foreground` | `#000000` | `#FFFFFF` | Primary text color |
| `text-foreground-muted` | `#9CA3AF` | `#9CA3AF` | Secondary/muted text |
| `text-foreground-mutedDark` | `#6B7280` | `#6B7280` | Tertiary/very muted text |
| `text-placeholder` | `rgba(0,0,0,0.6)` | `rgba(255,255,255,0.6)` | Placeholder text |

**Usage Examples**:
```tsx
// Primary text - ALWAYS use this for headings and body text
<h1 className="text-foreground">Main Title</h1>
<p className="text-foreground">Body content</p>

// Secondary text
<p className="text-foreground-muted">Subtitle or helper text</p>

// Placeholder
<input placeholder="Enter text" className="placeholder:text-placeholder" />
```

---

### Accent Colors (5-10% Usage Maximum)

**Critical Rule**: Orange accent should ONLY be used sparingly for emphasis.

| Token | Value | Usage |
|-------|-------|-------|
| `bg-accent` | `#FF6B35` | Accent backgrounds (buttons, badges) |
| `text-accent` | `#FF6B35` | Accent text (CTAs, links) |
| `bg-accent-dark` | `#E55A2B` | Accent for light backgrounds |
| `text-accent-dark` | `#E55A2B` | Darker accent text |

**When to Use Orange** ✅:
- Primary CTA button text
- Active navigation item text
- Winner announcements
- Success confirmations
- Key status indicators
- Important link text
- Interactive icons (max 1 per screen)
- Progress indicators
- Price/value highlights

**When NOT to Use Orange** ❌:
- Button backgrounds (use `bg-foreground` instead)
- Large area backgrounds
- Main text content (use `text-foreground`)
- Card backgrounds
- Navigation backgrounds
- Input field backgrounds
- Body text in light mode

**Examples**:
```tsx
// ✅ Good - Accent text for CTA
<button className="bg-foreground text-accent">
  Click Me
</button>

// ✅ Good - Active navigation
<a className="text-accent font-medium">
  Active Link
</a>

// ❌ Bad - Orange background
<button className="bg-accent text-white">
  Don't do this
</button>

// ❌ Bad - Orange body text
<p className="text-accent">
  Don't do this either
</p>
```

---

### Semantic Colors

| Token | Value | Usage |
|-------|-------|-------|
| `text-success` / `bg-success` | `#10B981` | Success messages, confirmations |
| `text-warning` / `bg-warning` | `#F59E0B` | Warnings, cautions |
| `text-error` / `bg-error` | `#EF4444` | Errors, destructive actions |
| `text-info` / `bg-info` | `#3B82F6` | Informational messages |

**Usage**:
```tsx
// Success message
<div className="text-success">✓ Profile updated successfully</div>

// Error message
<div className="text-error">✗ Invalid phone number</div>

// Warning badge
<span className="bg-warning text-white rounded px-2 py-1">
  Pending
</span>
```

---

### Status Colors

Application-specific colors for giveaway states.

| Token | Value | Status | Usage |
|-------|-------|--------|-------|
| `bg-status-live` | `#10B981` | Live | Active giveaway |
| `bg-status-new` | `#EF4444` | New | Just launched |
| `bg-status-soon` | `#F59E0B` | Soon | Coming soon |
| `bg-status-ended` | `#6B7280` | Ended | Finished |
| `bg-status-inactive` | `#9CA3AF` | Inactive | Paused |

**Usage**:
```tsx
<Badge className="bg-status-live text-white">
  Live Now
</Badge>

<div className="border-l-4 border-status-soon">
  Coming soon content
</div>
```

---

### Neutral System Colors

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `border-border` | `rgba(0,0,0,0.1)` | `rgba(255,255,255,0.1)` | Standard borders |
| `bg-disabled` | `rgba(0,0,0,0.4)` | `rgba(255,255,255,0.4)` | Disabled elements |

**Usage**:
```tsx
// Standard border
<div className="border border-border rounded-md">
  Card with border
</div>

// Disabled button
<button disabled className="opacity-50 cursor-not-allowed">
  Disabled
</button>
```

---

### Color File Structure

**File**: `src/design-tokens/colors.ts`

```typescript
export const colors = {
  background: {
    light: '#FFFFFF',
    dark: '#000000',
    cardDark: '#1C1C1E',
  },
  foreground: {
    light: '#000000',
    dark: '#FFFFFF',
    muted: '#9CA3AF',
    mutedDark: '#6B7280',
  },
  accent: {
    orange: '#FF6B35',
    orangeHover: '#E55A2B',
    orangeDark: '#E55A2B',
    orangeDarkHover: '#CC4A22',
  },
  semantic: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },
  status: {
    live: '#10B981',
    new: '#EF4444',
    soon: '#F59E0B',
    ended: '#6B7280',
    inactive: '#9CA3AF',
  },
  neutral: {
    border: {
      light: 'rgba(0, 0, 0, 0.1)',
      dark: 'rgba(255, 255, 255, 0.1)',
    },
    disabled: {
      light: 'rgba(0, 0, 0, 0.4)',
      dark: 'rgba(255, 255, 255, 0.4)',
    },
    placeholder: {
      light: 'rgba(0, 0, 0, 0.6)',
      dark: 'rgba(255, 255, 255, 0.6)',
    },
  },
} as const

// CSS Custom Properties
export const cssVariables = {
  light: {
    '--color-background': colors.background.light,
    '--color-foreground': colors.foreground.light,
    '--color-accent': colors.accent.orange,
    // ... all other tokens
  },
  dark: {
    '--color-background': colors.background.dark,
    '--color-foreground': colors.foreground.dark,
    '--color-accent': colors.accent.orange,
    // ... all other tokens
  },
}
```

---

## ✍️ Typography Tokens

### Font Family

| Token | Value | Usage |
|-------|-------|-------|
| `font-cairo` | `'Cairo', sans-serif` | Primary font (Arabic + Latin) |
| `font-sans` | `'Cairo', sans-serif` | System sans-serif |

**Usage**:
```tsx
<div className="font-cairo">
  Arabic and English text
</div>
```

---

### Font Weights

| Token | Value | Usage |
|-------|-------|-------|
| `font-light` | 300 | Light text (rarely used) |
| `font-normal` | 400 | Body text (default) |
| `font-medium` | 500 | Semi-emphasis |
| `font-semibold` | 600 | Headings (H2, H3) |
| `font-bold` | 700 | Strong emphasis, H1 |

---

### Font Sizes

#### Headings (Always Black/White, Never Orange)

| Token | Size | Usage |
|-------|------|-------|
| `text-h1` | 32px (2rem) | Page titles |
| `text-h2` | 28px (1.75rem) | Section titles |
| `text-h3` | 24px (1.5rem) | Subsection titles |
| `text-h4` | 20px (1.25rem) | Card titles |
| `text-h5` | 18px (1.125rem) | Small headings |
| `text-h6` | 16px (1rem) | Tiny headings |

**Critical Rule**: Headings MUST use `text-foreground`, NEVER `text-accent`.

**Usage**:
```tsx
// ✅ Correct
<h1 className="text-2xl font-bold text-foreground">
  Page Title
</h1>

// ❌ Wrong
<h1 className="text-2xl font-bold text-accent">
  Never use orange for headings
</h1>
```

---

#### Body Text (Always Black/White, Never Orange)

| Token | Size | Usage |
|-------|------|-------|
| `text-lg` | 18px (1.125rem) | Large body text |
| `text-base` | 16px (1rem) | Default body text |
| `text-sm` | 14px (0.875rem) | Small text |
| `text-xs` | 12px (0.75rem) | Extra small text |

**Usage**:
```tsx
<p className="text-base text-foreground">
  Default paragraph text
</p>

<p className="text-sm text-foreground-muted">
  Secondary information
</p>
```

---

#### Accent Text (When Orange is Appropriate)

| Token | Size | Weight | Usage |
|-------|------|--------|-------|
| `text-base font-medium` | 16px | 500 | CTA text |
| `text-sm font-medium` | 14px | 500 | Highlight text |
| `text-xs font-semibold` | 12px | 600 | Status text |

**Usage**:
```tsx
// ✅ Orange for CTA
<button className="bg-foreground">
  <span className="text-accent font-medium">Click Me</span>
</button>

// ✅ Orange for active link
<a className="text-sm font-medium text-accent">
  Active Navigation
</a>
```

---

### Line Heights

| Token | Value | Usage |
|-------|-------|-------|
| `leading-tight` | 1.2 | Headings |
| `leading-normal` | 1.4 | Captions, small text |
| `leading-relaxed` | 1.5 | Body text, paragraphs |

---

### Typography File Structure

**File**: `src/design-tokens/typography.ts`

```typescript
export const typography = {
  fontFamily: {
    primary: ['Cairo', 'sans-serif'],
  },

  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  fontSize: {
    h1: '2rem',
    h2: '1.75rem',
    h3: '1.5rem',
    h4: '1.25rem',
    h5: '1.125rem',
    h6: '1rem',
    large: '1.125rem',
    base: '1rem',
    small: '0.875rem',
    xsmall: '0.75rem',
  },

  lineHeight: {
    headings: 1.2,
    body: 1.5,
    captions: 1.4,
  },
} as const
```

---

## 📏 Spacing Tokens

### Base Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| `xs` | 4px | Tiny gaps |
| `sm` | 8px | Small spacing |
| `md` | 16px | Default spacing |
| `lg` | 24px | Large spacing |
| `xl` | 32px | Extra large |
| `2xl` | 40px | Section spacing |
| `3xl` | 48px | Major sections |
| `4xl` | 64px | Large sections |
| `5xl` | 80px | Hero sections |
| `6xl` | 96px | Maximum spacing |

**Usage**:
```tsx
// Padding
<div className="p-4">  {/* 16px */}
<div className="p-6">  {/* 24px */}
<div className="p-8">  {/* 32px */}

// Margin
<div className="mb-4">  {/* margin-bottom: 16px */}
<div className="mt-6">  {/* margin-top: 24px */}

// Gap (flexbox/grid)
<div className="flex gap-4">  {/* 16px gap */}
<div className="grid gap-6">  {/* 24px gap */}
```

---

### Component-Specific Spacing

#### Button Padding

| Size | Padding | Usage |
|------|---------|-------|
| Small | `8px 12px` | Compact buttons |
| Medium | `12px 24px` | Default buttons |
| Large | `16px 32px` | Prominent buttons |

**Usage**:
```tsx
<button className="px-3 py-2 text-sm">Small</button>
<button className="px-6 py-3">Medium</button>
<button className="px-8 py-4 text-lg">Large</button>
```

---

#### Card Padding

| Size | Padding | Usage |
|------|---------|-------|
| Small | `16px` | Compact cards |
| Medium | `24px` | Default cards |
| Large | `32px` | Spacious cards |

**Usage**:
```tsx
<div className="p-4 rounded-lg border">Small card</div>
<div className="p-6 rounded-lg border">Medium card</div>
<div className="p-8 rounded-lg border">Large card</div>
```

---

#### Touch Targets (Mobile-First)

**Critical for Mobile**: All interactive elements must meet minimum touch target sizes.

| Token | Size | Usage |
|-------|------|-------|
| `touch-minimum` | 44px | iOS minimum touch target |
| `touch-comfortable` | 48px | Comfortable touch size |
| `touch-large` | 56px | Large touch targets |

**Usage**:
```tsx
// Minimum touch target (44px)
<button className="min-h-touch min-w-touch">
  Icon Button
</button>

// Comfortable touch target (48px)
<button className="min-h-[48px] min-w-[48px]">
  Comfortable Button
</button>
```

---

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `rounded-sm` | 4px | Badges, small elements |
| `rounded-md` | 8px | Buttons, inputs |
| `rounded-lg` | 12px | Cards, modals |
| `rounded-xl` | 16px | Large cards |
| `rounded-2xl` | 24px | Hero sections |
| `rounded-full` | 9999px | Pills, avatars |

**Usage**:
```tsx
<div className="rounded-sm">Badge</div>
<button className="rounded-md">Button</button>
<div className="rounded-lg">Card</div>
<img className="rounded-full">Avatar</img>
```

---

### Spacing File Structure

**File**: `src/design-tokens/spacing.ts`

```typescript
export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '40px',
  '3xl': '48px',
  '4xl': '64px',

  component: {
    button: {
      sm: '8px 12px',
      md: '12px 24px',
      lg: '16px 32px',
    },
    card: {
      sm: '16px',
      md: '24px',
      lg: '32px',
    },
  },

  touch: {
    minimum: '44px',
    comfortable: '48px',
    large: '56px',
  },

  radius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    '2xl': '24px',
    full: '9999px',
  },
} as const
```

---

## 🎯 Icon Tokens

### Icon System

**File**: `src/design-tokens/icons.ts`

All icons MUST be imported from the central icon token file, NOT directly from `lucide-react`.

**Why**: Centralized icons allow:
- Consistent icon usage across the app
- Easy icon replacement (change once, updates everywhere)
- ESLint enforcement of token usage

---

### Icon Categories

```typescript
// Navigation Icons
export { Home as HomeIcon } from 'lucide-react'
export { User as UserIcon } from 'lucide-react'
export { Settings as SettingsIcon } from 'lucide-react'

// Action Icons
export { Plus as PlusIcon } from 'lucide-react'
export { Trash2 as DeleteIcon } from 'lucide-react'
export { Edit2 as EditIcon } from 'lucide-react'
export { X as CloseIcon } from 'lucide-react'

// Status Icons
export { CheckCircle as SuccessIcon } from 'lucide-react'
export { AlertCircle as WarningIcon } from 'lucide-react'
export { XCircle as ErrorIcon } from 'lucide-react'
export { Info as InfoIcon } from 'lucide-react'

// Social Icons
export { Instagram as InstagramIcon } from 'lucide-react'
export { Twitter as TwitterIcon } from 'lucide-react'
export { MessageCircle as SnapchatIcon } from 'lucide-react'
```

---

### Icon Usage

**Anti-Pattern ❌**:
```tsx
// Direct import from lucide-react
import { Home } from 'lucide-react'

function Component() {
  return <Home className="w-5 h-5" />
}
```

**Best Practice ✅**:
```tsx
// Import from design tokens
import { HomeIcon } from '@/design-tokens/icons'

function Component() {
  return <HomeIcon className="w-5 h-5 text-foreground" />
}
```

---

### Icon Sizes

| Size | Tailwind Class | Pixels | Usage |
|------|---------------|--------|-------|
| XS | `w-3 h-3` | 12px | Inline icons |
| SM | `w-4 h-4` | 16px | Small buttons |
| MD | `w-5 h-5` | 20px | Default size |
| LG | `w-6 h-6` | 24px | Large buttons |
| XL | `w-8 h-8` | 32px | Feature icons |

**Usage**:
```tsx
<HomeIcon className="w-5 h-5 text-foreground" />
<PlusIcon className="w-4 h-4 text-accent" />
<SuccessIcon className="w-6 h-6 text-success" />
```

---

## 🔧 Extending the Token System

### Adding New Color Tokens

**Step 1**: Add to color definition (`src/design-tokens/colors.ts`)

```typescript
export const colors = {
  // ... existing colors

  // New category
  chart: {
    primary: '#3B82F6',
    secondary: '#8B5CF6',
    tertiary: '#EC4899',
  },
} as const
```

**Step 2**: Add CSS custom properties

```typescript
export const cssVariables = {
  light: {
    // ... existing vars
    '--color-chart-primary': colors.chart.primary,
    '--color-chart-secondary': colors.chart.secondary,
  },
}
```

**Step 3**: Add Tailwind config (`tailwind.config.js`)

```javascript
theme: {
  extend: {
    colors: {
      chart: {
        primary: 'var(--color-chart-primary)',
        secondary: 'var(--color-chart-secondary)',
      },
    },
  },
}
```

**Step 4**: Use in components

```tsx
<div className="bg-chart-primary text-white">
  Chart content
</div>
```

---

### Adding New Spacing Tokens

**Step 1**: Add to spacing definition

```typescript
export const spacing = {
  // ... existing spacing

  component: {
    // ... existing components

    // New component
    modal: {
      padding: '32px',
      headerHeight: '64px',
      footerHeight: '72px',
    },
  },
}
```

**Step 2**: Use in components

```tsx
<div className="p-8">  {/* 32px */}
  <div className="h-16">Header</div>  {/* 64px */}
  <div>Content</div>
  <div className="h-[72px]">Footer</div>
</div>
```

---

## ✅ Token Validation

### ESLint Rules

**File**: `eslint.config.js`

```javascript
rules: {
  // Prevent direct lucide-react imports
  'no-restricted-imports': [
    'error',
    {
      paths: [{
        name: 'lucide-react',
        message: 'Import icons from @/design-tokens/icons instead',
      }],
    },
  ],

  // Detect hardcoded colors
  'no-restricted-syntax': [
    'warn',
    {
      selector: 'Literal[value=/bg-(red|blue|green)-(500|600)/]',
      message: 'Use semantic tokens instead of hardcoded colors',
    },
  ],
}
```

---

### Validation Script

**File**: `scripts/validate-tokens.sh`

```bash
#!/bin/bash

# Check for hardcoded colors
echo "Checking for hardcoded colors..."
if grep -r "bg-\(red\|blue\|green\)-[0-9]" src/ --include="*.tsx"; then
  echo "❌ Found hardcoded colors. Use design tokens instead."
  exit 1
fi

# Check for direct lucide-react imports
echo "Checking for direct icon imports..."
if grep -r "from 'lucide-react'" src/ --include="*.tsx" --exclude="**/design-tokens/icons.ts"; then
  echo "❌ Found direct lucide-react imports. Use @/design-tokens/icons instead."
  exit 1
fi

echo "✅ All token validations passed!"
```

**Usage**:
```bash
# Run validation
chmod +x scripts/validate-tokens.sh
./scripts/validate-tokens.sh
```

---

## 📊 Token Usage Summary

### 90/10 Rule

**90% of your UI should use**:
- `bg-background` / `text-foreground`
- `border-border`
- Standard spacing tokens

**10% should use**:
- `text-accent` / `bg-accent`
- Status colors
- Semantic colors

---

### Quick Reference

**Most Common Patterns**:
```tsx
// Card
<div className="bg-background border border-border rounded-lg p-6">

// Heading
<h1 className="text-2xl font-bold text-foreground">

// Body text
<p className="text-base text-foreground">

// CTA Button
<button className="bg-foreground text-accent px-6 py-3 rounded-md">

// Secondary Button
<button className="bg-transparent border border-border text-foreground px-6 py-3 rounded-md">

// Success message
<div className="text-success">

// Touch target
<button className="min-h-touch min-w-touch">
```

---

**Last Updated**: 2025-11-28
**Next**: [Troubleshooting Guide](./troubleshooting.md)
