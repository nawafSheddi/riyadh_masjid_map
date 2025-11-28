---
name: react-translation-manager
description: Manages translation keys and localization workflow for React applications with dual translation systems. This skill should be used when adding new UI text, creating components with translatable content, or debugging white screen errors related to missing translation keys. It provides step-by-step workflows for adding translations correctly and preventing common localization errors.
---

# React Translation Manager

## Overview

This skill manages the complex translation workflow for React applications that use dual translation systems (LanguageContext and react-i18next). It ensures translation keys are added correctly and helps prevent white screen errors from missing translations.

## When to Use This Skill

Activate this skill when:
- Adding new UI components with text
- Creating translation keys for new features
- Debugging "t is not a function" errors
- Fixing white screen errors from missing translations
- Converting hardcoded text to translatable keys
- Setting up localization in new components

## Critical Context: Dual Translation Systems

**⚠️ IMPORTANT**: This codebase has TWO translation systems:

1. **LanguageContext** (ACTIVE - Currently Working)
   - Location: `src/contexts/LanguageContext.tsx`
   - Status: **THIS IS WHAT ACTUALLY WORKS**
   - Import: `import { useLanguage } from '@/contexts/LanguageContext'`

2. **react-i18next** (Infrastructure Only - NOT Connected)
   - Location: `src/i18n/locales/ar/*.json`
   - Status: Future-ready but NOT wired to components
   - Import: ❌ DO NOT USE

## Translation Workflow

### Step 1: Design the Translation Key

Follow hierarchical naming pattern:
```typescript
Pattern: [feature].[section].[element].[variant]

✅ GOOD Examples:
'influencer.home.greeting'
'influencer.home.stats.totalGifted'
'giveaway.form.title.label'
'auth.signIn.button.text'

❌ BAD Examples:
'greeting'           // Too generic
'total'             // No context
'buttonText'        // No feature namespace
```

### Step 2: Add to LanguageContext

**CRITICAL**: Add to BOTH language objects or the page will crash!

```typescript
// File: src/contexts/LanguageContext.tsx

const translations = {
  ar: {
    // Your new key - Arabic text
    'feature.section.element': 'النص العربي',
  },
  en: {
    // Same key - English text
    'feature.section.element': 'English text',
  }
}
```

### Step 3: Use in Component

```typescript
// ✅ CORRECT - Use LanguageContext
import { useLanguage } from '@/contexts/LanguageContext';

export function MyComponent() {
  const { t } = useLanguage();

  return (
    <div>
      <h1>{t('feature.section.element')}</h1>
    </div>
  );
}

// ❌ WRONG - Don't use react-i18next
import { useTranslation } from 'react-i18next'; // DON'T USE THIS
```

### Step 4: Pre-Flight Checklist

Before testing your component:

- [ ] Key added to `ar` object in LanguageContext
- [ ] Key added to `en` object in LanguageContext
- [ ] Key uses full dot-notation path
- [ ] Component imports `useLanguage` (NOT `useTranslation`)
- [ ] No TypeScript errors on `t()` function calls

## Common Errors and Fixes

### White Screen with "t is not defined"

**Cause**: Wrong translation hook used

```typescript
// ❌ WRONG
import { useTranslation } from 'react-i18next';
const { t } = useTranslation();  // Returns undefined

// ✅ FIX
import { useLanguage } from '@/contexts/LanguageContext';
const { t } = useLanguage();
```

### White Screen with "Cannot read property of undefined"

**Cause**: Translation key missing from one language

```typescript
// ❌ WRONG - Only added to Arabic
const translations = {
  ar: { 'my.key': 'نص' },
  en: { /* missing 'my.key' */ }
}

// ✅ FIX - Add to both
const translations = {
  ar: { 'my.key': 'نص' },
  en: { 'my.key': 'text' }
}
```

### Component Shows Translation Key Instead of Text

**Cause**: Key doesn't exist in LanguageContext

```typescript
// Component shows: "feature.missing.key"

// ✅ FIX
// Add the key to LanguageContext.tsx:
ar: { 'feature.missing.key': 'النص المطلوب' }
en: { 'feature.missing.key': 'Required text' }
```

## Translation Key Categories

Organize keys by feature and purpose:

```typescript
// Authentication
'auth.signIn.title'
'auth.signIn.button'
'auth.signIn.error.invalid'

// Giveaway
'giveaway.create.title'
'giveaway.status.live'
'giveaway.status.ended'

// Dashboard
'dashboard.stats.participants'
'dashboard.stats.winners'
'dashboard.welcome.message'

// Common UI
'common.button.submit'
'common.button.cancel'
'common.loading.text'

// Validation
'validation.required'
'validation.phone.invalid'
'validation.email.format'

// Errors
'errors.network.title'
'errors.network.retry'
'errors.auth.unauthorized'
```

## Quick Debug Commands

```bash
# Find components using wrong hook
grep -r "useTranslation" src/ --include="*.tsx"

# Find all translation key usages
grep -r "t(['\"]" src/ --include="*.tsx"

# Check if key exists in LanguageContext
grep "your.key.here" src/contexts/LanguageContext.tsx
```

## Migration Checklist

When converting a component to use translations:

1. [ ] Identify all hardcoded text
2. [ ] Design translation keys following naming convention
3. [ ] Add keys to both `ar` and `en` in LanguageContext
4. [ ] Replace hardcoded text with `t()` calls
5. [ ] Import `useLanguage` hook
6. [ ] Test component doesn't white screen
7. [ ] Verify text displays in current language

## Best Practices

### DO:
- Always add keys to BOTH languages
- Use descriptive, hierarchical keys
- Group related translations
- Test immediately after adding keys
- Keep keys lowercase with dots

### DON'T:
- Don't use react-i18next hooks
- Don't forget either language
- Don't use generic key names
- Don't mix translation systems
- Don't use special characters in keys

## Integration Notes

- Currently Arabic-only for MVP (but keep English keys)
- No language toggle in UI (infrastructure ready for future)
- Western numerals only (1234 not ١٢٣٤)
- RTL layout is fixed (no LTR switching)

## Resources

### references/
- `troubleshooting.md` - Common error solutions
- `key-naming.md` - Translation key conventions
- `migration-guide.md` - Converting components to i18n