# Sample Review Output Templates - Frontend React/TypeScript

> Visual formatting guide for pre-commit review reports
> **Version**: 2.0.0 | **Last Updated**: 2025-11-21

## Report Structure Hierarchy

```
1. Status Line (Single line with emoji indicator)
   ↓
2. Critical Issues Box (If any - with borders)
   ↓
3. Warnings Section (If any - with double emojis)
   ↓
4. Summary Section (Concise key points)
   ↓
5. Verdict (Clear action statement)
```

## Status Line Formats

### 🚨🚨🚨 Security Risk
```
Status: 🚨🚨🚨 SECURITY RISK - DO NOT COMMIT
```

### ❌❌❌ Critical Blocking
```
Status: ❌❌❌ CANNOT COMMIT - Critical Issues Found
```

### ⚠️⚠️ Warnings
```
Status: ⚠️⚠️ NEEDS ATTENTION - 3 Issues Found
```

### ✅ Success
```
Status: ✅ READY TO COMMIT
```

## Critical Issue Templates

### Design System Violation (Most Common)
```
Status: ❌❌❌ CANNOT COMMIT - Design System Violations

╔═══════════════════════════════════════════════════════════╗
║  ❌❌❌ DESIGN SYSTEM VIOLATIONS - BLOCKING ❌❌❌         ║
╚═══════════════════════════════════════════════════════════╝

❌❌❌ HARDCODED COLORS DETECTED
   Severity: CRITICAL - BLOCKING

   Files: src/components/ui/Badge.tsx:45-47

   Found:
   Line 45: className="bg-green-500"
   Line 46: className="text-red-600"
   Line 47: style={{ color: '#FF6B35' }}

   REQUIRED FIX:
   Line 45: className="bg-status-success"
   Line 46: className="text-status-error"
   Line 47: className="bg-accent" or bg-[#FF6B3530] for opacity

   Reference: design-tokens/colors.ts

❌❌❌ DIRECT ICON IMPORTS
   Severity: CRITICAL - BLOCKING

   Files: src/pages/Dashboard.tsx:12-15

   Found: import { Lock, Menu, Users } from 'lucide-react'

   REQUIRED FIX:
   import { icons } from '@/design-tokens/icons'
   Use: icons.security.lock, icons.navigation.menu, icons.content.users

ACTIONS REQUIRED:
1. Replace ALL hardcoded colors with semantic tokens
2. Replace ALL lucide imports with icon tokens
3. Run: npm run lint && npm run build

CANNOT commit until fixed.
```

### Localization Missing (Critical)
```
Status: ❌❌❌ CANNOT COMMIT - Localization Required

╔═══════════════════════════════════════════════════════════╗
║    ❌❌❌ LOCALIZATION MISSING - BLOCKING ❌❌❌           ║
╚═══════════════════════════════════════════════════════════╝

❌❌❌ HARDCODED TEXT IN UI
   Severity: CRITICAL - Project requires 100% localization

   Files with hardcoded text:
   • src/pages/Profile.tsx (5 instances)
   • src/components/Header.tsx (3 instances)

   Examples:
   Line 34: <h1>My Profile</h1>
   Line 45: <Button>Save Changes</Button>
   Line 67: <span>Loading...</span>

   REQUIRED FIX:
   1. Import: import { useLanguage } from '@/contexts/LanguageContext'
   2. Use: const { t } = useLanguage()
   3. Replace: <h1>{t('profile.title')}</h1>

❌❌❌ TRANSLATION KEYS NOT DEFINED

   Keys used but missing from LanguageContext:
   • 'profile.title'
   • 'profile.actions.save'
   • 'common.loading'

   REQUIRED ACTION:
   Add to src/contexts/LanguageContext.tsx:

   ar: {
     'profile.title': 'ملفي الشخصي',
     'profile.actions.save': 'حفظ التغييرات',
     'common.loading': 'جاري التحميل...',
   },
   en: {
     'profile.title': 'My Profile',
     'profile.actions.save': 'Save Changes',
     'common.loading': 'Loading...',
   }

Project policy: NO hardcoded text allowed.
```

### Security Issue (Highest Priority)
```
Status: 🚨🚨🚨 SECURITY RISK - DO NOT COMMIT

╔═══════════════════════════════════════════════════════════╗
║   🚨🚨🚨 SECURITY ALERT - IMMEDIATE ACTION 🚨🚨🚨        ║
╚═══════════════════════════════════════════════════════════╝

🚨🚨🚨 SENSITIVE FILES STAGED
   DANGER: Environment secrets exposed

   Files that MUST NOT be committed:
   • .env (contains API keys)
   • .env.local (contains secrets)
   • credentials.json

   IMMEDIATE ACTION REQUIRED:
   git restore --staged .env .env.local credentials.json
   git rm --cached .env  # If already tracked
   echo ".env" >> .gitignore

🚨🚨🚨 HARDCODED API KEY DETECTED
   File: src/config/api.ts:23

   Found: const API_KEY = 'sk_live_abc123...'

   CRITICAL: Remove immediately!
   Use environment variable: process.env.VITE_API_KEY

DO NOT commit until ALL security issues resolved.
Leaked secrets require immediate key rotation.
```

## Warning Templates

### Code Quality Warnings (Auto-fixable)
```
Status: ⚠️⚠️ NEEDS ATTENTION - Code Quality Issues

╔═══════════════════════════════════════════════════════════╗
║      ⚠️⚠️ CODE QUALITY - RECOMMENDED FIXES ⚠️⚠️         ║
╚═══════════════════════════════════════════════════════════╝

⚠️⚠️ CODE FORMATTING (Auto-fixable)
   Files need formatting: 4 files

   QUICK FIX (10 seconds):
   npm run format
   git add -u

⚠️⚠️ LINTING ISSUES (Partially auto-fixable)
   ESLint warnings: 12

   QUICK FIX:
   npm run lint --fix

   Remaining issues (manual fix):
   • Unused variable 'oldValue' at Settings.tsx:45
   • Missing dependency in useEffect at Dashboard.tsx:89

⚠️⚠️ TYPE COVERAGE
   TypeScript issues: 3

   • Missing type for 'handleClick' parameter
   • Using 'any' type at utils/api.ts:34
   • Missing return type for 'calculateTotal'

   RUN: npm run typecheck for details

Recommendation: Fix before committing for clean codebase.
```

### RTL Layout Warnings
```
Status: ⚠️⚠️ NEEDS ATTENTION - RTL Layout Issues

╔═══════════════════════════════════════════════════════════╗
║        ⚠️⚠️ RTL LAYOUT - INCOMPLETE SETUP ⚠️⚠️          ║
╚═══════════════════════════════════════════════════════════╝

⚠️⚠️ MISSING RTL ATTRIBUTES
   Pattern: Need BOTH dir="rtl" AND text-right

   Files: src/pages/GiveawayDetails.tsx

   Missing dir="rtl" on containers:
   Line 78: <div className="flex items-center gap-3">
   Line 92: <div className="grid grid-cols-2">

   Missing text-right on text:
   Line 80: <Typography variant="h4">{title}</Typography>
   Line 95: <span>{description}</span>

   CORRECT PATTERN:
   <div className="flex items-center gap-3" dir="rtl">
     <Typography className="text-right">{title}</Typography>
   </div>

⚠️⚠️ INCOMPLETE PATTERN
   Found: Only text-right without container dir="rtl"
   This won't properly reverse layout direction!

   Fix: Add dir="rtl" to parent flex/grid containers

Arabic text requires complete RTL support.
```

### Performance Warnings
```
Status: ⚠️⚠️ NEEDS ATTENTION - Performance Concerns

╔═══════════════════════════════════════════════════════════╗
║     ⚠️⚠️ PERFORMANCE - OPTIMIZATION SUGGESTED ⚠️⚠️       ║
╚═══════════════════════════════════════════════════════════╝

⚠️⚠️ MISSING OPTIMIZATION
   Component re-renders: src/components/ExpensiveList.tsx

   SUGGESTION:
   Wrap with React.memo():
   export default React.memo(ExpensiveList)

⚠️⚠️ EXPENSIVE COMPUTATION IN RENDER
   File: src/pages/Analytics.tsx:67

   Found: const sorted = data.sort(...) // Runs every render

   FIX:
   const sorted = useMemo(() => data.sort(...), [data])

⚠️⚠️ LARGE BUNDLE IMPORT
   Importing entire library: import * as Icons from 'lucide-react'

   FIX: Import only needed icons from design-tokens/icons

Consider performance impact before committing.
```

## Success Templates

### Clean Commit - All Passed
```
Status: ✅ READY TO COMMIT

📋 Staged Changes: 5 files (2 components, 2 tests, 1 doc)
✅ All 7 phases passed (6.2s)

Key Validations:
• Design System: ✅ All tokens used correctly
• Localization: ✅ 100% coverage
• RTL Layout: ✅ Properly configured
• TypeScript: ✅ Full type coverage
• Testing: ✅ Tests included and passing
• Performance: ✅ Optimized
• Task: ✅ TASK-048 documented

Ready for: git commit -m "feat: Add profile settings (TASK-048)"
```

### Minor Warnings But Acceptable
```
Status: ✅ READY TO COMMIT (with minor warnings)

📋 Staged Changes: 3 files
✅ Critical checks passed
⚠️ 2 minor warnings (non-blocking)

Minor issues (can fix in next commit):
• 2 TODO comments without task reference
• 1 console.log in development code

These don't block commit but should be addressed.

Proceed with commit.
```

## Quick Reference Severity

| Emoji | Severity | Action Required | Can Commit? |
|-------|----------|-----------------|-------------|
| 🚨🚨🚨 | SECURITY | Immediate fix | ❌ NO |
| ❌❌❌ | CRITICAL | Must fix | ❌ NO |
| ⚠️⚠️ | WARNING | Should fix | ⚠️ DISCOURAGED |
| ℹ️ | INFO | Consider | ✅ YES |
| ✅ | PASS | None | ✅ YES |

## Formatting Rules

### Box Borders (Critical Only)
```
╔═══════════════════════════════════════════════════════════╗
║                    CENTERED TITLE                          ║
╚═══════════════════════════════════════════════════════════╝
```

### Section Headers
```
❌❌❌ CRITICAL ISSUE NAME
⚠️⚠️ WARNING NAME
ℹ️ INFO NAME
✅ SUCCESS ITEM
```

### Indentation
```
Main Issue
   Detail: Additional information

   Found:
   Line X: problematic code

   REQUIRED FIX:
   Line X: corrected code
```

### Action Keywords (Bold/Caps)
- `REQUIRED ACTION:`
- `REQUIRED FIX:`
- `QUICK FIX:`
- `IMMEDIATE ACTION REQUIRED:`
- `CANNOT commit until fixed`
- `Recommendation:`

## Length Guidelines

| Report Type | Target Lines | Max Lines |
|-------------|--------------|-----------|
| Success | 5-10 | 15 |
| Warning | 15-30 | 40 |
| Critical | 20-40 | 60 |
| Security | 15-30 | 45 |

**Goal**: User sees issue severity in first 3 lines.

---

**Output Version**: 2.0.0
**Last Updated**: 2025-11-21
**Purpose**: Consistent, scannable review reports