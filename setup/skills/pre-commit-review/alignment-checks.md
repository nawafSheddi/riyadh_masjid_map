# Documentation Alignment Checks - Frontend React/TypeScript

> How to validate documentation matches implementation
> **Version**: 1.0.0 | **Last Updated**: 2025-11-21

## Overview

This document describes how to detect and validate alignment between:
1. Code implementation
2. CLAUDE.md documentation
3. LanguageContext translations
4. Design token definitions
5. Component variant definitions

## Critical Alignment Points

### 1. Design Token Alignment

#### What to Check
- New colors added to `design-tokens/colors.ts`
- New icons added to `design-tokens/icons.ts`
- New spacing values in `design-tokens/spacing.ts`
- Typography changes in `design-tokens/typography.ts`

#### Where to Document
- CLAUDE.md → "Design Token Compliance Rules" section
- CLAUDE.md → "Icon Token System" section
- Update examples with new tokens

#### Extraction Method
```bash
# Extract color tokens from code
grep -r "bg-status-\|text-accent\|border-" src/

# Extract from documentation
grep "bg-status-\|text-accent" CLAUDE.md

# Compare for mismatches
```

#### Validation
```typescript
// In design-tokens/colors.ts
export const colors = {
  status: {
    live: '#10B981',    // Green
    soon: '#F59E0B',    // Yellow
    new: '#EF4444',     // Red
  },
  accent: '#FF6B35',    // Orange
}

// In CLAUDE.md - must match exactly
Live (success):  #10B981 → bg-[#10B98130] (30%)
Soon (warning):  #F59E0B → bg-[#F59E0B30] (30%)
New (error):     #EF4444 → bg-[#EF444430] (30%)
Accent (orange): #FF6B35 → bg-[#FF6B3525] (25%)
```

### 2. Component Variant Alignment

#### What to Check
Component files define valid variants in their type definitions

#### Where to Document
- CLAUDE.md → "Component Variant Quick Reference" section
- Each component's valid variants must be listed

#### Extraction Method
```bash
# Extract Badge variants from component
grep "variant.*:" src/components/ui/Badge.tsx | grep -oE '"[^"]*"'

# Extract Button variants
grep "variant.*:" src/components/ui/Button.tsx | grep -oE '"[^"]*"'

# Extract from CLAUDE.md
grep "Badge.*:" CLAUDE.md
grep "Button.*:" CLAUDE.md
```

#### Validation Example
```typescript
// In src/components/ui/Badge.tsx
const badgeVariants = cva("...", {
  variants: {
    variant: {
      default: "...",
      success: "...",
      warning: "...",
      error: "...",
      info: "...",
      orange: "...",
    }
  }
})

// In CLAUDE.md - must list ALL variants
**Badge**: `default | success | warning | error | info | orange`

// Common mistake to catch:
❌ Documentation says: "Badge: default | live | pending"
✅ Should be: "Badge: default | success | warning | error | info | orange"
```

### 3. Translation Key Alignment

#### What to Check
All t() calls in components have corresponding keys in LanguageContext

#### Where to Document
Keys must exist in both 'ar' and 'en' objects in LanguageContext.tsx

#### Extraction Method
```bash
# Extract all t() calls from staged files
git diff --staged | grep -oE "t\('[^']+'\)" | sed "s/t('//g" | sed "s/')//g" | sort -u > used_keys.txt

# Extract keys from LanguageContext
grep -oE "'[^']+': '[^']+'" src/contexts/LanguageContext.tsx | grep -oE "^'[^']+'" | sed "s/'//g" | sort -u > defined_keys.txt

# Find missing keys
comm -23 used_keys.txt defined_keys.txt
```

#### Validation Example
```typescript
// In component
<Button>{t('profile.actions.save')}</Button>
<span>{t('common.loading')}</span>

// In LanguageContext.tsx - BOTH ar and en required
const translations = {
  ar: {
    'profile.actions.save': 'حفظ التغييرات',  // ✅ Defined
    'common.loading': 'جاري التحميل...',       // ✅ Defined
  },
  en: {
    'profile.actions.save': 'Save Changes',     // ✅ Defined
    'common.loading': 'Loading...',             // ✅ Defined
  }
}

// Missing key detection:
t('profile.title')  // ❌ Used but not defined - CRITICAL
```

### 4. Icon Token Alignment

#### What to Check
All icons imported from design-tokens/icons.ts exist

#### Where to Document
- design-tokens/icons.ts exports
- CLAUDE.md → "Icon Token System" section

#### Extraction Method
```bash
# Extract icon usage
git diff --staged | grep -oE "icons\.[a-z]+\.[a-zA-Z]+" | sort -u

# Extract available icons
grep "export.*{" src/design-tokens/icons.ts

# Validate all used icons are exported
```

#### Validation Example
```typescript
// In design-tokens/icons.ts
export const icons = {
  navigation: {
    menu: Menu,
    chevronDown: ChevronDown,
    arrowLeft: ArrowLeft,
  },
  security: {
    lock: Lock,
    unlock: Unlock,
    shield: Shield,
  },
  // ... more categories
}

// In component - must use valid paths
<icons.navigation.menu />     // ✅ Valid
<icons.security.lock />        // ✅ Valid
<icons.invalid.path />         // ❌ Invalid - doesn't exist
```

### 5. Constants Alignment

#### What to Check
Magic numbers replaced with named constants

#### Where to Document
- src/constants/*.ts files
- CLAUDE.md → "Constants and Magic Numbers" section

#### Extraction Method
```bash
# Find potential magic numbers
git diff --staged | grep -E "[^0-9][0-9]{3,}[^0-9]" | grep -v test

# Check if constants are defined
ls src/constants/

# Verify constants are imported and used
git diff --staged | grep "import.*constants"
```

#### Validation Example
```typescript
// In src/constants/validation.ts
export const PHONE_VALIDATION = {
  MAX_LENGTH: 9,
  MIN_LENGTH: 9,
  PATTERN: /^[0-9]{9}$/,
} as const

// In component - should use constant
if (phone.length > PHONE_VALIDATION.MAX_LENGTH) { }  // ✅
if (phone.length > 9) { }  // ❌ Magic number

// In CLAUDE.md - should document
**Constants File Organization:**
- `src/constants/validation.ts` - Form validation rules, regex patterns
```

## Detection Algorithms

### Algorithm 1: Design Token Change Detection
```javascript
function detectDesignTokenChanges() {
  const changes = {
    colors: false,
    icons: false,
    spacing: false,
    typography: false,
  };

  // Check if design-tokens files modified
  const stagedFiles = getStagedFiles();

  changes.colors = stagedFiles.includes('design-tokens/colors.ts');
  changes.icons = stagedFiles.includes('design-tokens/icons.ts');
  changes.spacing = stagedFiles.includes('design-tokens/spacing.ts');
  changes.typography = stagedFiles.includes('design-tokens/typography.ts');

  // If any changed, check CLAUDE.md updated
  if (Object.values(changes).some(v => v)) {
    const claudeMdChanged = stagedFiles.includes('CLAUDE.md');

    if (!claudeMdChanged) {
      return {
        error: 'Design tokens changed but CLAUDE.md not updated',
        changed: changes,
      };
    }
  }

  return { success: true };
}
```

### Algorithm 2: Translation Key Validation
```javascript
function validateTranslationKeys() {
  const missingKeys = [];

  // Extract all t() calls
  const usedKeys = extractTranslationCalls(stagedFiles);

  // Load LanguageContext
  const contextKeys = loadLanguageContextKeys();

  // Check each key exists in both ar and en
  for (const key of usedKeys) {
    if (!contextKeys.ar[key]) {
      missingKeys.push({ key, language: 'ar' });
    }
    if (!contextKeys.en[key]) {
      missingKeys.push({ key, language: 'en' });
    }
  }

  return missingKeys;
}
```

### Algorithm 3: Component Variant Validation
```javascript
function validateComponentVariants() {
  const invalidVariants = [];

  // Map of component to valid variants
  const validVariants = {
    Badge: ['default', 'success', 'warning', 'error', 'info', 'orange'],
    Button: {
      variant: ['default', 'secondary', 'ghost', 'outline'],
      size: ['sm', 'default', 'lg', 'icon'],
    },
    Avatar: {
      size: ['sm', 'default', 'lg', 'xl'],
    },
    Typography: {
      variant: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body', 'body-small', 'caption', 'label'],
    },
  };

  // Extract variant usage from staged files
  const usages = extractVariantUsage(stagedFiles);

  // Validate each usage
  for (const usage of usages) {
    const { component, prop, value } = usage;

    if (validVariants[component]) {
      const valid = typeof validVariants[component] === 'array'
        ? validVariants[component]
        : validVariants[component][prop];

      if (!valid?.includes(value)) {
        invalidVariants.push({
          component,
          prop,
          value,
          valid: valid?.join(' | '),
        });
      }
    }
  }

  return invalidVariants;
}
```

### Algorithm 4: RTL Compliance Check
```javascript
function checkRTLCompliance() {
  const issues = [];

  // Check for flex/grid without dir="rtl"
  const flexWithoutDir = findPattern(
    stagedFiles,
    /className="[^"]*flex[^"]*"(?!.*dir="rtl")/
  );

  if (flexWithoutDir.length > 0) {
    issues.push({
      type: 'missing-dir-rtl',
      locations: flexWithoutDir,
    });
  }

  // Check for Typography without text-right
  const typographyWithoutAlign = findPattern(
    stagedFiles,
    /<Typography(?!.*text-right)/
  );

  if (typographyWithoutAlign.length > 0) {
    issues.push({
      type: 'missing-text-right',
      locations: typographyWithoutAlign,
    });
  }

  return issues;
}
```

## Reporting Misalignments

### Critical Misalignment Report Format
```
❌❌❌ DOCUMENTATION-IMPLEMENTATION MISALIGNMENT
   Severity: CRITICAL - BLOCKING

   TYPE: Component Variant Mismatch

   In Code: src/components/ui/Badge.tsx
   Defines: variant = "success | warning | error"

   In Documentation: CLAUDE.md:234
   States: variant = "live | pending | ended"

   MISMATCH:
   → Documentation uses status names
   → Code uses semantic names

   REQUIRED FIX:
   Update CLAUDE.md line 234:
   FROM: Badge variants: live | pending | ended
   TO: Badge variants: success | warning | error
```

### Translation Key Misalignment
```
❌❌❌ MISSING TRANSLATION KEYS
   Severity: CRITICAL - BLOCKING

   Keys used but not defined:
   • 'dashboard.stats.new' (used 3 times)
   • 'common.buttons.export' (used 1 time)

   REQUIRED ACTION:
   Add to LanguageContext.tsx:

   ar: {
     'dashboard.stats.new': 'جديد',
     'common.buttons.export': 'تصدير',
   },
   en: {
     'dashboard.stats.new': 'New',
     'common.buttons.export': 'Export',
   }
```

## Quick Validation Commands

```bash
# Check design token alignment
diff <(grep -oE "#[0-9A-F]{6}" design-tokens/colors.ts | sort) \
     <(grep -oE "#[0-9A-F]{6}" CLAUDE.md | sort)

# Check translation keys
grep -oE "t\('[^']+'\)" src/**/*.tsx | sed "s/.*t('//;s/').*//" | sort -u > used.txt
grep -oE "'[^']+': " src/contexts/LanguageContext.tsx | sed "s/.*'//;s/': .*//" | sort -u > defined.txt
comm -23 used.txt defined.txt  # Shows missing keys

# Check component variants
grep "variant=" src/**/*.tsx | grep -oE 'variant="[^"]*"' | sort | uniq -c

# Check RTL patterns
grep "className.*flex" src/**/*.tsx | grep -v "dir=\"rtl\"" | wc -l

# Check for hardcoded colors
grep -E "bg-red-|text-blue-|border-green-" src/**/*.tsx | wc -l
```

---

**Alignment Version**: 1.0.0
**Last Updated**: 2025-11-21
**Purpose**: Ensure documentation matches implementation exactly