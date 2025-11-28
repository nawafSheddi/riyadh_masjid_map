---
name: design-token-enforcer
description: Enforces design token compliance in React components, preventing hardcoded values and ensuring consistent use of semantic colors, spacing, typography, and icons. This skill should be used when creating or reviewing React components to validate they follow design system patterns and don't use anti-patterns like direct Tailwind colors or magic numbers.
---

# Design Token Enforcer

## Overview

This skill enforces strict compliance with design tokens across React components, preventing hardcoded values and ensuring consistent use of the design system. It validates components against anti-patterns and provides correct implementation patterns.

## When to Use This Skill

Activate this skill when:
- Creating new React components
- Reviewing components for design system compliance
- Refactoring components to use design tokens
- Debugging styling inconsistencies
- Setting up new projects with design systems
- Performing design system audits

## Core Compliance Rules

### Anti-Patterns to NEVER Use

#### ❌ Direct Lucide-React Imports
```typescript
// WRONG - Direct import
import { Lock } from 'lucide-react';

// CORRECT - Token import
import { icons } from '@/design-tokens/icons';
<icons.security.lock className="h-5 w-5" />
```

#### ❌ Hardcoded Tailwind Colors
```typescript
// WRONG - Hardcoded colors
className="bg-green-500"
className="text-red-600"
className="border-blue-400"

// CORRECT - Semantic colors
className="bg-status-live"
className="text-error"
className="border-primary"
```

#### ❌ Inline Style Colors
```typescript
// WRONG - Inline styles
style={{ color: '#FF6B00' }}
style={{ backgroundColor: 'rgb(255, 107, 0)' }}

// CORRECT - Use className with tokens
className="text-accent"
className="bg-accent"
```

#### ❌ Magic Numbers
```typescript
// WRONG - Magic numbers
const threshold = 3600000;
const maxItems = 10;
const phoneLength = 9;

// CORRECT - Named constants
import { COUNTDOWN, UI_LIMITS, PHONE_VALIDATION } from '@/constants';
const threshold = COUNTDOWN.URGENT_THRESHOLD;
const maxItems = UI_LIMITS.MAX_DISPLAY_ITEMS;
const phoneLength = PHONE_VALIDATION.MAX_LENGTH;
```

#### ❌ Opacity Utilities with CSS Variables
```typescript
// WRONG - Won't work with CSS variable colors
className="bg-status-live bg-opacity-20"
className="bg-status-live/20"

// CORRECT - 8-digit hex with alpha
className="bg-[#10B98130]" // 30% opacity
```

### Required Patterns

#### ✅ Icon Token System
Icons must be imported from the centralized token system:
```typescript
import { icons } from '@/design-tokens/icons';

// Categories available:
icons.navigation  // Menu, arrows, chevrons, home
icons.action      // Check, add, edit, delete, share
icons.status      // Clock, calendar, alert, warning
icons.security    // Lock, unlock, eye, shield
icons.content     // Gift, heart, star, user
icons.media       // Camera, image, play, pause
icons.communication // Phone, mail, message
```

#### ✅ Semantic Color System
Use semantic color tokens that map to your theme:
```typescript
// Status colors
bg-status-live    // Success/active state
bg-status-soon    // Warning state
bg-status-new     // Error/new state

// Theme colors
bg-primary        // Primary brand color
bg-secondary      // Secondary brand color
bg-accent         // Accent color (often orange)
text-accent       // Accent text color

// UI colors
bg-background     // Page background
bg-foreground     // Card/component background
text-muted        // Muted text
border-default    // Default border
```

#### ✅ Spacing Token Documentation
Document Tailwind classes with their token mappings:
```typescript
// Good - Documents token relationship
const sizeClasses = {
  sm: 'px-3 py-2',  // 12px, 8px (spacing.component.input.sm)
  md: 'px-4 py-3',  // 16px, 12px (spacing.component.input.md)
  lg: 'px-6 py-4',  // 24px, 16px (spacing.component.input.lg)
}
```

## Validation Workflow

### Step 1: Pre-Implementation Check

Before coding, verify:
1. Design tokens are imported
2. Constants file exists for any thresholds
3. Icon token system is available
4. Color palette is defined in tokens

### Step 2: During Implementation

For each styled element:
1. **Colors**: Use semantic tokens, not Tailwind utilities
2. **Icons**: Import from token system, not lucide-react
3. **Spacing**: Use consistent spacing scale
4. **Typography**: Use typography variants
5. **Numbers**: Extract to constants

### Step 3: Post-Implementation Audit

Run this checklist:
- [ ] No direct lucide-react imports
- [ ] No hardcoded color classes (bg-red-500, etc.)
- [ ] No inline style colors
- [ ] No magic numbers
- [ ] All icons from token system
- [ ] Opacity handled with hex values
- [ ] Constants extracted and named
- [ ] Token mappings documented

## Token Reference Tables

### Color Token to Hex Mapping
```
Live (success):  #10B981 → bg-[#10B98130] (30% opacity)
Soon (warning):  #F59E0B → bg-[#F59E0B30] (30% opacity)
New (error):     #EF4444 → bg-[#EF444430] (30% opacity)
Accent (orange): #FF6B35 → bg-[#FF6B3525] (25% opacity)
```

### Component Variant Reference
| Component | Valid Variants | Invalid Variants |
|-----------|---------------|-----------------|
| Badge | `default\|success\|warning\|error\|info\|orange` | `live`, `soon` |
| Button | `default\|secondary\|ghost\|outline` | `primary` |
| Typography | `h1-h6\|body\|body-small\|caption\|label` | Custom strings |

## Validation Scripts

See `scripts/validate-tokens.sh` for automated detection of anti-patterns.

## Quick Fixes

### Converting Hardcoded Colors
```bash
# Find all hardcoded Tailwind colors
grep -r "bg-\(red\|blue\|green\|yellow\|purple\|pink\|gray\)-[0-9]" src/

# Find all text colors
grep -r "text-\(red\|blue\|green\|yellow\|purple\|pink\|gray\)-[0-9]" src/
```

### Finding Direct Icon Imports
```bash
# Find lucide-react imports
grep -r "from 'lucide-react'" src/
```

### Detecting Magic Numbers
```bash
# Find potential magic numbers
grep -r "[^a-zA-Z][0-9]\{4,\}[^0-9]" src/ --include="*.tsx" --include="*.ts"
```

## Integration with Other Skills

- Use after `react-component-template-generator` to validate generated components
- Apply before `pre-implementation-validator` final checks
- Combine with `react-rtl-layout-validator` for complete validation

## Resources

### references/
- `token-mappings.md` - Complete token to value mappings
- `anti-patterns.md` - Detailed anti-pattern examples
- `migration-guide.md` - Converting existing code to tokens

### scripts/
- `validate-tokens.sh` - Automated validation script