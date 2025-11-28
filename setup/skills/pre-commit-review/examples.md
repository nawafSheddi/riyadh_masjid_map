# Pre-Commit Review Examples - Frontend React/TypeScript

> Real-world examples of pre-commit review scenarios and their reports
> **Version**: 1.0.0 | **Last Updated**: 2025-11-21

## Example 1: Design System Violations

### Staged Changes
```
M src/components/ui/GiveawayCard.tsx
M src/components/ui/StatusBadge.tsx
A src/pages/Dashboard.tsx
```

### Issues Found
1. Hardcoded colors in GiveawayCard.tsx
2. Direct lucide-react import in Dashboard.tsx
3. Wrong Badge variant in StatusBadge.tsx

### Review Report
```
Status: ❌❌❌ CANNOT COMMIT - Critical Issues Found

╔═══════════════════════════════════════════════════════════╗
║  ❌❌❌ DESIGN SYSTEM VIOLATIONS - BLOCKING ❌❌❌         ║
╚═══════════════════════════════════════════════════════════╝

❌❌❌ HARDCODED COLORS DETECTED
   Files: src/components/ui/GiveawayCard.tsx:45-47

   Found:
   Line 45: className="bg-green-500 text-white"
   Line 47: style={{ backgroundColor: '#FF6B35' }}

   REQUIRED FIX:
   Line 45: className="bg-status-success text-primary-foreground"
   Line 47: className="bg-accent" (or bg-[#FF6B3530] for opacity)

❌❌❌ DIRECT ICON IMPORTS
   Files: src/pages/Dashboard.tsx:12

   Found: import { Menu, Users, Gift } from 'lucide-react'

   REQUIRED FIX:
   import { icons } from '@/design-tokens/icons'
   Use: icons.navigation.menu, icons.content.users, icons.content.gift

❌❌❌ INVALID COMPONENT VARIANT
   Files: src/components/ui/StatusBadge.tsx:89

   Found: <Badge variant="live">

   REQUIRED FIX:
   <Badge variant="success">  // "live" is not a valid variant

ACTIONS REQUIRED:
1. Replace hardcoded colors with design tokens
2. Use icon token system instead of lucide-react
3. Fix Badge variant to use valid options

Run after fixing:
npm run lint && npm run build
```

## Example 2: Missing Localization

### Staged Changes
```
A src/pages/ParticipantProfile.tsx
A src/components/organisms/ProfileHeader.tsx
M src/components/ui/Button.tsx
```

### Issues Found
1. Hardcoded text in multiple components
2. Wrong translation hook used
3. Missing translation keys

### Review Report
```
Status: ❌❌❌ CANNOT COMMIT - Critical Issues Found

╔═══════════════════════════════════════════════════════════╗
║  ❌❌❌ LOCALIZATION VIOLATIONS - BLOCKING ❌❌❌          ║
╚═══════════════════════════════════════════════════════════╝

❌❌❌ HARDCODED TEXT DETECTED
   Files: src/pages/ParticipantProfile.tsx:34-45

   Found:
   Line 34: <h1>My Profile</h1>
   Line 37: <Button>Save Changes</Button>
   Line 45: <span>Loading...</span>

   REQUIRED FIX:
   Line 34: <h1>{t('profile.title')}</h1>
   Line 37: <Button>{t('profile.actions.save')}</Button>
   Line 45: <span>{t('common.loading')}</span>

❌❌❌ WRONG TRANSLATION HOOK
   Files: src/components/organisms/ProfileHeader.tsx:8

   Found: import { useTranslation } from 'react-i18next'

   REQUIRED FIX:
   import { useLanguage } from '@/contexts/LanguageContext'
   const { t } = useLanguage()

❌❌❌ MISSING TRANSLATION KEYS
   Keys used but not defined:
   • 'profile.title'
   • 'profile.actions.save'
   • 'profile.stats.totalWins'

   REQUIRED ACTION:
   Add to src/contexts/LanguageContext.tsx:

   ar: {
     'profile.title': 'ملفي الشخصي',
     'profile.actions.save': 'حفظ التغييرات',
     'profile.stats.totalWins': 'إجمالي الفوز',
   },
   en: {
     'profile.title': 'My Profile',
     'profile.actions.save': 'Save Changes',
     'profile.stats.totalWins': 'Total Wins',
   }
```

## Example 3: RTL Layout Issues

### Staged Changes
```
M src/pages/GiveawayDetails.tsx
M src/components/organisms/ParticipantList.tsx
```

### Issues Found
1. Missing dir="rtl" on flex containers
2. Missing text-right on Typography components

### Review Report
```
Status: ⚠️⚠️ NEEDS ATTENTION - RTL Layout Issues

╔═══════════════════════════════════════════════════════════╗
║        ⚠️⚠️ RTL LAYOUT ISSUES - FIX NEEDED ⚠️⚠️         ║
╚═══════════════════════════════════════════════════════════╝

⚠️⚠️ MISSING RTL ATTRIBUTES
   Files: src/pages/GiveawayDetails.tsx:78-95

   Missing dir="rtl":
   Line 78: <div className="flex items-center gap-3">
   Line 85: <div className="flex flex-col gap-2">
   Line 92: <div className="grid grid-cols-2 gap-4">

   Missing text-right:
   Line 80: <Typography variant="h4">{title}</Typography>
   Line 87: <Typography variant="body">{description}</Typography>

   QUICK FIX:
   Add dir="rtl" to all flex/grid containers
   Add className="text-right" to all Typography components

   Example:
   <div className="flex items-center gap-3" dir="rtl">
     <Typography variant="h4" className="text-right">{title}</Typography>
   </div>

⚠️⚠️ INCOMPLETE RTL PATTERN
   Files: src/components/organisms/ParticipantList.tsx:45

   Found: text-right without parent dir="rtl"

   REQUIRED:
   Both dir="rtl" on container AND text-right on text elements

RECOMMENDATION:
Review RTL guidelines in CLAUDE.md
Ensure both attributes are used together for proper RTL support
```

## Example 4: TypeScript Issues

### Staged Changes
```
M src/hooks/useGiveaway.ts
A src/components/ui/CountdownDisplay.tsx
M src/utils/formatters.ts
```

### Issues Found
1. Missing type annotations
2. Using 'any' type
3. Missing return types

### Review Report
```
Status: ⚠️⚠️ NEEDS ATTENTION - TypeScript Issues

╔═══════════════════════════════════════════════════════════╗
║      ⚠️⚠️ TYPESCRIPT ISSUES - RECOMMENDED FIXES ⚠️⚠️     ║
╚═══════════════════════════════════════════════════════════╝

⚠️⚠️ MISSING TYPE ANNOTATIONS
   Files: src/components/ui/CountdownDisplay.tsx:23-35

   Found:
   Line 23: function CountdownDisplay(props) {
   Line 28: const handleTimeout = (e) => {

   RECOMMENDED FIX:
   Line 23: function CountdownDisplay(props: CountdownProps) {
   Line 28: const handleTimeout = (e: React.MouseEvent) => {

⚠️⚠️ USING 'ANY' TYPE
   Files: src/hooks/useGiveaway.ts:45

   Found: const processData = (data: any) => {

   RECOMMENDED:
   Define proper type: interface GiveawayData { ... }
   Use: const processData = (data: GiveawayData) => {

⚠️⚠️ MISSING RETURN TYPES
   Files: src/utils/formatters.ts:12-18

   Functions missing return types:
   • formatCurrency (line 12)
   • formatDate (line 15)
   • formatPhoneNumber (line 18)

   RECOMMENDED:
   const formatCurrency = (amount: number): string => {
   const formatDate = (date: Date): string => {

RUN TYPECHECK:
npm run typecheck
```

## Example 5: Component Architecture Violations

### Staged Changes
```
M src/pages/Dashboard.tsx
M src/components/organisms/StatsCard.tsx
M src/components/molecules/BadgeGroup.tsx
```

### Issues Found
1. Page importing from atoms directly
2. Business logic in presentation component
3. Direct database-like operations in component

### Review Report
```
Status: ❌❌❌ CANNOT COMMIT - Architecture Violations

╔═══════════════════════════════════════════════════════════╗
║  ❌❌❌ ARCHITECTURE VIOLATIONS - BLOCKING ❌❌❌          ║
╚═══════════════════════════════════════════════════════════╝

❌❌❌ IMPORT HIERARCHY VIOLATION
   Files: src/pages/Dashboard.tsx:15

   Found: Page importing directly from atoms
   import { Button } from '@/components/ui/Button'

   CORRECT PATTERN:
   Pages → Organisms → Molecules → Atoms

   REQUIRED FIX:
   Create an organism component that uses the Button
   Or import from a molecule that wraps the Button

❌❌❌ BUSINESS LOGIC IN PRESENTATION COMPONENT
   Files: src/components/organisms/StatsCard.tsx:45-67

   Found: Complex calculations and data processing

   REQUIRED FIX:
   1. Move logic to custom hook: useStatsCalculation()
   2. Or move to utility function: calculateStats()
   3. Keep component focused on presentation only

❌❌❌ WRONG VARIANT USAGE
   Files: src/components/molecules/BadgeGroup.tsx:34

   Found multiple invalid variants:
   • <Badge variant="primary">  // Should be "default"
   • <Button size="md">         // Should be "default"
   • <Avatar size="2xl">        // Max is "xl"

   REQUIRED FIX:
   Check component definitions for valid variants
   Badge: default | success | warning | error | info | orange
   Button size: sm | default | lg | icon
   Avatar size: sm | default | lg | xl
```

## Example 6: Performance Issues

### Staged Changes
```
M src/pages/GiveawayList.tsx
M src/components/organisms/InfiniteScroll.tsx
```

### Issues Found
1. Missing React.memo for pure components
2. Expensive computation in render
3. Missing cleanup in useEffect

### Review Report
```
Status: ⚠️⚠️ NEEDS ATTENTION - Performance Issues

╔═══════════════════════════════════════════════════════════╗
║     ⚠️⚠️ PERFORMANCE ISSUES - OPTIMIZATION NEEDED ⚠️⚠️    ║
╚═══════════════════════════════════════════════════════════╝

⚠️⚠️ MISSING MEMOIZATION
   Files: src/components/organisms/InfiniteScroll.tsx

   Component re-renders unnecessarily

   RECOMMENDED FIX:
   export default React.memo(InfiniteScroll)

⚠️⚠️ EXPENSIVE COMPUTATION IN RENDER
   Files: src/pages/GiveawayList.tsx:67-72

   Found:
   const sortedItems = items.sort((a, b) => {...}) // Runs every render!

   RECOMMENDED FIX:
   const sortedItems = useMemo(() => {
     return items.sort((a, b) => {...})
   }, [items])

⚠️⚠️ MISSING CLEANUP IN useEffect
   Files: src/pages/GiveawayList.tsx:89-95

   Found: Timer without cleanup
   useEffect(() => {
     const timer = setInterval(() => {...}, 1000)
     // Missing cleanup!
   }, [])

   REQUIRED FIX:
   useEffect(() => {
     const timer = setInterval(() => {...}, 1000)
     return () => clearInterval(timer)  // Add cleanup
   }, [])

PERFORMANCE CHECK:
1. Review React DevTools Profiler
2. Check bundle size impact
3. Consider code splitting for heavy components
```

## Example 7: Async/Await Pattern Issues

### Staged Changes
```
M src/hooks/useApi.ts
M src/pages/GiveawayCreate.tsx
```

### Issues Found
1. Async directly in useEffect
2. No error handling
3. No loading state management

### Review Report
```
Status: ❌❌❌ CANNOT COMMIT - Async Pattern Issues

╔═══════════════════════════════════════════════════════════╗
║    ❌❌❌ ASYNC PATTERN VIOLATIONS - BLOCKING ❌❌❌        ║
╚═══════════════════════════════════════════════════════════╝

❌❌❌ ASYNC IN useEffect
   Files: src/pages/GiveawayCreate.tsx:34-38

   Found:
   useEffect(async () => {
     const data = await fetchData()
     setData(data)
   }, [])

   REQUIRED FIX:
   useEffect(() => {
     const loadData = async () => {
       try {
         const data = await fetchData()
         setData(data)
       } catch (error) {
         setError(error)
       }
     }
     loadData()
   }, [])

❌❌❌ NO ABORT CONTROLLER
   Files: src/hooks/useApi.ts:23-45

   Missing cleanup for ongoing requests

   REQUIRED FIX:
   useEffect(() => {
     const controller = new AbortController()

     fetch(url, { signal: controller.signal })
       .then(...)
       .catch(error => {
         if (error.name !== 'AbortError') {
           setError(error)
         }
       })

     return () => controller.abort()
   }, [url])

❌❌❌ NO ERROR BOUNDARIES
   Async errors could crash the app

   RECOMMENDATION:
   Wrap async components in error boundaries
   Add proper error handling at every level
```

## Example 8: Constants and Magic Numbers

### Staged Changes
```
M src/pages/Settings.tsx
M src/utils/validators.ts
M src/components/ui/PhoneInput.tsx
```

### Issues Found
1. Magic numbers throughout code
2. Repeated values not extracted
3. No business meaning documentation

### Review Report
```
Status: ⚠️⚠️ NEEDS ATTENTION - Magic Numbers

╔═══════════════════════════════════════════════════════════╗
║      ⚠️⚠️ MAGIC NUMBERS - EXTRACT TO CONSTANTS ⚠️⚠️      ║
╚═══════════════════════════════════════════════════════════╝

⚠️⚠️ MAGIC NUMBERS DETECTED
   Files: Multiple locations

   src/pages/Settings.tsx:45
   Found: if (phone.length > 9)
   Fix: if (phone.length > PHONE_VALIDATION.MAX_LENGTH)

   src/utils/validators.ts:23
   Found: if (countdown < 3600000)
   Fix: if (countdown < COUNTDOWN.URGENT_THRESHOLD)

   src/components/ui/PhoneInput.tsx:67
   Found: maxLength={9}
   Fix: maxLength={PHONE_VALIDATION.MAX_LENGTH}

   REQUIRED ACTION:
   Create src/constants/validation.ts:

   export const PHONE_VALIDATION = {
     MIN_LENGTH: 9,
     MAX_LENGTH: 9,
     PATTERN: /^[0-9]{9}$/,
   } as const

   export const COUNTDOWN = {
     URGENT_THRESHOLD: 3600000,  // 1 hour in ms
     WARNING_THRESHOLD: 1800000, // 30 minutes
   } as const

⚠️⚠️ REPEATED VALUES
   Found same value in multiple places:
   • Value 1000 appears 5 times (likely UPDATE_INTERVAL)
   • Value 100 appears 8 times (likely MAX_ITEMS)
   • Value 50 appears 3 times (likely PAGE_SIZE)

   RECOMMENDATION:
   Extract to constants with meaningful names
```

## Example 9: All Checks Passed

### Staged Changes
```
M src/pages/Dashboard.tsx
M src/components/organisms/DashboardStats.tsx
A src/components/molecules/StatCard.tsx
A src/components/molecules/StatCard.test.tsx
M src/contexts/LanguageContext.tsx
M CLAUDE.md
M kanban.md
```

### Review Report
```
Status: ✅ READY TO COMMIT

📋 Staged Changes: 7 files
  • 1 page component modified
  • 1 organism modified
  • 1 molecule added (with test)
  • LanguageContext updated
  • Documentation synchronized
  • Task tracking updated

✅ All 7 phases passed (8.4s)

Phase Results:
✅ Phase 1: File organization correct
✅ Phase 2: Design tokens properly used
✅ Phase 3: Code quality checks passed
✅ Phase 4: Architecture patterns followed
✅ Phase 5: Documentation aligned
✅ Phase 6: Tests included and passing
✅ Phase 7: Final verification complete

Key Validations:
• Design Tokens: All colors semantic, icons from tokens
• Localization: 100% coverage, keys defined
• RTL Layout: Properly configured with dir="rtl"
• TypeScript: Full type coverage
• Testing: New component has test file
• Performance: Proper memoization used
• Task: TASK-045 documented in kanban.md

Ready for commit with message:
"feat: Add dashboard stats display (TASK-045)"
```

---

**Examples Version**: 1.0.0
**Last Updated**: 2025-11-21
**Purpose**: Reference these examples to understand review outcomes