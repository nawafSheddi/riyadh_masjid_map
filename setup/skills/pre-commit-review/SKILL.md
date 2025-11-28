# Pre-Commit Review Skill - Frontend React/TypeScript

> **Version**: 1.0.0 | **Created**: 2025-11-21
> **Purpose**: Automated code review for React/TypeScript projects with design system compliance

## Overview

The pre-commit review skill validates staged git changes against frontend best practices, design system compliance, and project standards before committing. Optimized for React projects using TypeScript, Tailwind CSS, and design tokens.

## Usage

```bash
# Manual review
/skills pre-commit-review

# Quick review (skip tests)
/skills pre-commit-review --quick

# With auto-fix
/skills pre-commit-review --fix
```

## 7-Phase Review Process

### Phase 1: Staged Changes Analysis (5%)

**Purpose**: Understand what's being committed

```bash
# List staged files
git diff --staged --name-status

# Categorize files
- pages/         → Page components
- organisms/     → Complex components
- molecules/     → Mid-level components
- atoms/         → Design system components
- hooks/         → Custom React hooks
- contexts/      → React contexts
- design-tokens/ → Theme configuration
- constants/     → Application constants
```

**Detection**:
- ❌ Reject: node_modules, dist, .env files
- ⚠️ Warn: Missing tests for new components
- ⚠️ Warn: Unstaged related files (tests, docs)

### Phase 2: Design System Compliance (20%) - CRITICAL

**Purpose**: Ensure design tokens are used correctly

**Check 1: Color Token Compliance**
```typescript
// ❌ WRONG - Hardcoded colors
className="bg-red-500 text-blue-600"
className="bg-[#FF6B35]"  // Without 8-digit for opacity
style={{ color: '#10B981' }}

// ✅ CORRECT - Semantic tokens
className="bg-status-live text-accent"
className="bg-[#10B98130]"  // 8-digit hex for opacity
className="border-error"
```

**Check 2: Icon Token Usage**
```typescript
// ❌ WRONG - Direct lucide import
import { Lock, Users } from 'lucide-react'

// ✅ CORRECT - Icon tokens
import { icons } from '@/design-tokens/icons'
<icons.security.lock className="w-5 h-5" />
```

**Check 3: Spacing Consistency**
```typescript
// ❌ WRONG - Magic numbers
w-48 h-48  // Without documentation

// ✅ CORRECT - With token reference
w-12 h-12  // spacing.component.avatar.lg (48px)
```

**Check 4: No Hardcoded Opacity with Tokens**
```typescript
// ❌ WRONG - Opacity utilities don't work
className="bg-status-live bg-opacity-20"
className="bg-status-live/20"

// ✅ CORRECT - 8-digit hex
className="bg-[#10B98130]"  // 30% opacity
```

**Documentation Required**:
If design-tokens/ files changed:
- ✅ Update CLAUDE.md Design Tokens section
- ✅ Update "Last Updated" date
- ✅ Document new tokens with examples

### Phase 3: Code Quality Review (25%)

**Formatting & Linting**:
```bash
# Auto-fixable
npm run format          # Prettier
npm run lint --fix      # ESLint auto-fix

# Must pass
npm run lint            # 0 errors required
npm run typecheck       # TypeScript validation
npm run build           # Build succeeds
```

**React-Specific Standards**:

✅ **Hooks Rules**
- All hooks at top of component
- Dependency arrays complete
- No async directly in useEffect
- Cleanup functions for subscriptions

✅ **Component Standards**
- Props interfaces defined
- Default props handled
- Memoization where needed
- Error boundaries for critical components

✅ **TypeScript Coverage**
```typescript
// ❌ WRONG
function Component(props) { }
const handleClick = (e) => { }

// ✅ CORRECT
interface ComponentProps { }
function Component({ prop }: ComponentProps) { }
const handleClick = (e: React.MouseEvent) => { }
```

✅ **No Debug Code**
- No console.log statements
- No debugger statements
- No commented-out code
- No TODO without TASK-XXX reference

### Phase 4: Component Architecture (20%)

**Component Organization**:

```
Pages (Route components)
  ↓ imports
Organisms (Complex compositions)
  ↓ imports
Molecules (Mid-level components)
  ↓ imports
Atoms (Design system basics)
  ↓ imports ONLY
Design Tokens & Constants
```

**Validation Rules**:

✅ **Component Variants**
```typescript
// Validate against actual component definitions
Badge:      default | success | warning | error | info | orange
Button:     default | secondary | ghost | outline
Typography: h1-h6 | body | body-small | caption | label
Avatar:     sm | default | lg | xl (NOT 2xl)
```

✅ **Prop Validation**
```typescript
// ❌ WRONG - No defensive checks
const time = date.getTime()  // Crashes if undefined

// ✅ CORRECT - Defensive programming
if (!date) return <span>--:--</span>
const time = date.getTime()
```

✅ **Localization Enforcement**
```typescript
// ❌ WRONG - Hardcoded text
<Button>Submit</Button>

// ✅ CORRECT - Translation keys
import { useLanguage } from '@/contexts/LanguageContext'
const { t } = useLanguage()
<Button>{t('common.buttons.submit')}</Button>
```

✅ **RTL Layout Compliance**
```typescript
// ❌ WRONG - Missing RTL attributes
<div className="flex items-center gap-3">
  <Typography className="text-right">{title}</Typography>
</div>

// ✅ CORRECT - Both dir and text-right
<div className="flex items-center gap-3" dir="rtl">
  <Typography className="text-right">{title}</Typography>
</div>
```

### Phase 5: Documentation Alignment (15%)

**CLAUDE.md Synchronization**:

If components changed:
- ✅ Component Library section updated
- ✅ New variants documented
- ✅ Usage examples provided

If translation keys added:
- ✅ Keys exist in LanguageContext.tsx
- ✅ Both 'ar' and 'en' objects have keys
- ✅ Key naming follows hierarchy pattern

If constants added:
- ✅ Documented in constants/ files
- ✅ Comments explain business meaning
- ✅ No magic numbers remain

**Validation**:
```bash
# Extract all t() calls
git diff --staged | grep -oE "t\('[^']+'\)" | sort -u

# Verify in LanguageContext
grep "translation.key" src/contexts/LanguageContext.tsx
```

### Phase 6: Testing Coverage (10%)

**Test Requirements**:

✅ New components have test files
```
src/components/ui/Button.tsx
src/components/ui/Button.test.tsx  ← Required
```

✅ Tests pass
```bash
npm test
npm test -- --coverage  # Coverage maintained
```

✅ Test Quality Checks
- Tests are isolated (no dependencies)
- Mock external dependencies
- Test error states
- Test loading states
- Test edge cases

### Phase 7: Final Verification (5%)

**Security Checks**:
- ❌ No API keys in code
- ❌ No .env files staged
- ❌ No hardcoded URLs (use environment variables)
- ❌ No sensitive data in constants

**Performance Checks**:
- ✅ No unnecessary re-renders (memo where needed)
- ✅ Images optimized/lazy loaded
- ✅ Code splitting for large components
- ✅ Bundle size reasonable

**Task Management**:
- ✅ Large features have TASK-XXX in kanban.md
- ✅ Commit message references task
- ✅ Task documentation complete

## Detection Rules Reference

### Rule 1: Design Token Compliance
```bash
# Find hardcoded colors
git diff --staged | grep -E "bg-red-|text-blue-|border-green-"
git diff --staged | grep -E "bg-\[#|text-\[#" | grep -v "[0-9A-F]{8}"
```

### Rule 2: Icon Token Enforcement
```bash
# Find direct lucide imports
git diff --staged | grep "from 'lucide-react'"
```

### Rule 3: Component Variant Validation
```bash
# Extract variant usage
git diff --staged | grep -oE 'variant="[^"]*"' | sort -u
```

### Rule 4: Translation Key Validation
```bash
# Find all t() calls
git diff --staged | grep -oE "t\('[^']+'\)" | sort -u

# Check if defined
grep "key.name" src/contexts/LanguageContext.tsx
```

### Rule 5: RTL Layout Compliance
```bash
# Find flex/grid without dir="rtl"
git diff --staged | grep 'className=".*flex' | grep -v 'dir="rtl"'

# Find Typography without text-right
git diff --staged | grep '<Typography' | grep -v 'text-right'
```

### Rule 6: Constants Extraction
```bash
# Find magic numbers
git diff --staged | grep -E "[^0-9][0-9]{4,}[^0-9]" | grep -v test
```

### Rule 7: Localization Enforcement
```bash
# Find hardcoded text in JSX
git diff --staged | grep -E ">[A-Z][a-z]+<" | grep -v "{\w*t\("
```

## Report Format

### ✅ Success Report
```
Status: ✅ READY TO COMMIT

📋 Staged Changes: 5 files (3 components, 2 tests)
✅ All 7 phases passed (12s)

Key validations:
• Design tokens: All compliant
• Localization: 100% coverage
• RTL layout: Properly configured
• Tests: All passing
```

### ❌ Critical Issues Report
```
Status: ❌❌❌ CANNOT COMMIT - Critical Issues Found

╔═══════════════════════════════════════════════════════════╗
║  ❌❌❌ DESIGN SYSTEM VIOLATIONS - BLOCKING ❌❌❌         ║
╚═══════════════════════════════════════════════════════════╝

❌❌❌ HARDCODED COLORS DETECTED
   Files: src/components/ui/Badge.tsx:45

   Found: className="bg-green-500"
   Fix:   className="bg-status-live"

   REQUIRED ACTION:
   Replace with semantic color tokens from design-tokens/colors.ts

❌❌❌ DIRECT ICON IMPORTS
   Files: src/components/Header.tsx:12

   Found: import { Menu } from 'lucide-react'
   Fix:   import { icons } from '@/design-tokens/icons'
          Use: <icons.navigation.menu />
```

### ⚠️ Warning Report
```
Status: ⚠️⚠️ NEEDS ATTENTION - 3 Warnings

╔═══════════════════════════════════════════════════════════╗
║        ⚠️⚠️ WARNINGS - RECOMMENDED FIXES ⚠️⚠️           ║
╚═══════════════════════════════════════════════════════════╝

⚠️⚠️ MISSING TRANSLATION KEYS
   Component: src/pages/Dashboard.tsx

   Keys not found in LanguageContext:
   • dashboard.stats.new_users
   • dashboard.actions.export

   FIX: Add to src/contexts/LanguageContext.tsx:
   ar: { 'dashboard.stats.new_users': 'مستخدمون جدد' }
   en: { 'dashboard.stats.new_users': 'New Users' }

⚠️⚠️ CODE FORMATTING
   Files need formatting: 2 files

   QUICK FIX:
   npm run format
   git add -u
```

## Customization

### Project-Specific Rules

Add custom checks in Phase 4:

```typescript
// Custom validation for your project
function validateCustomRules() {
  // Check for Zustand store patterns
  if (file.includes('store/')) {
    validateZustandPatterns()
  }

  // Check for API client patterns
  if (file.includes('api/')) {
    validateAPIPatterns()
  }

  // Check PWA requirements
  if (file.includes('service-worker')) {
    validatePWAPatterns()
  }
}
```

### Severity Levels

- 🚨🚨🚨 **SECURITY** - Blocks immediately
- ❌❌❌ **CRITICAL** - Must fix before commit
- ⚠️⚠️ **WARNING** - Should fix (auto-fixable)
- ℹ️ **INFO** - Suggestions for improvement

## Integration

### VS Code Integration
```json
{
  "vscode_task": {
    "label": "Pre-Commit Review",
    "command": "/skills pre-commit-review",
    "problemMatcher": [],
    "presentation": {
      "reveal": "always",
      "panel": "new"
    }
  }
}
```

### CI/CD Integration
```yaml
# GitHub Actions example
- name: Pre-commit Review
  run: |
    npm run lint
    npm run typecheck
    npm run test
    npm run build
```

## Quick Reference

### Must Pass Checklist
- [ ] No hardcoded colors (use semantic tokens)
- [ ] No direct lucide imports (use icon tokens)
- [ ] All text localized (no hardcoded strings)
- [ ] RTL layout properly configured
- [ ] Component variants are valid
- [ ] Translation keys exist in LanguageContext
- [ ] No console.log or debugger statements
- [ ] TypeScript types complete
- [ ] Tests exist and pass
- [ ] Build succeeds

### Common Fixes
```bash
# Auto-fix most issues
npm run format && npm run lint --fix

# Update translations
# Add keys to src/contexts/LanguageContext.tsx

# Fix colors
# Replace hardcoded with tokens from design-tokens/colors.ts

# Fix icons
# Import from @/design-tokens/icons instead of lucide-react

# Fix RTL
# Add dir="rtl" to containers and text-right to typography
```

## Success Metrics

Target after 1 week:
- 95% first-run pass rate
- 0 design system violations
- 100% localization coverage
- 90%+ test coverage
- <10 second review time

---

**Skill Version**: 1.0.0
**Last Updated**: 2025-11-21
**Maintainer**: Development Team