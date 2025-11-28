# Pre-Commit Review Checklist - Frontend React/TypeScript

> Comprehensive checklist for reviewing staged changes in React/TypeScript projects
> **Version**: 1.0.0 | **Last Updated**: 2025-11-21

## Phase 1: Staged Changes Analysis (5%)

### 1.1 File Organization
- [ ] Component files in correct directories:
  - [ ] `src/pages/` - Route components only
  - [ ] `src/components/organisms/` - Complex compositions
  - [ ] `src/components/molecules/` - Mid-level components
  - [ ] `src/components/atoms/` or `ui/` - Basic design system components
- [ ] Hook files in `src/hooks/`
- [ ] Context files in `src/contexts/`
- [ ] Utility functions in `src/utils/`
- [ ] Constants in `src/constants/`
- [ ] Design tokens in `src/design-tokens/`

### 1.2 Suspicious Files Check
- [ ] No `node_modules/` files staged
- [ ] No `dist/` or build output staged
- [ ] No `.env` files staged (use `.env.example` instead)
- [ ] No `.DS_Store` or system files
- [ ] No `package-lock.json` unless package.json also changed
- [ ] No `.eslintcache` or cache files

### 1.3 Related Files Detection
- [ ] New component has corresponding test file (`.test.tsx`)
- [ ] New component has story file if applicable (`.stories.tsx`)
- [ ] Modified component → test file also staged
- [ ] Design token changes → CLAUDE.md documentation updated
- [ ] New page → routing configuration updated
- [ ] New feature → kanban.md task created

## Phase 2: Design System Compliance (20%) - CRITICAL

### 2.1 Color Token Compliance
- [ ] **NO hardcoded hex colors** except 8-digit for opacity
  ```typescript
  ❌ className="bg-[#FF6B35]"      // 6-digit hex
  ✅ className="bg-[#FF6B3530]"    // 8-digit hex (with opacity)
  ✅ className="bg-accent"         // Semantic token
  ```
- [ ] **NO Tailwind color utilities** (except in design-tokens/)
  ```typescript
  ❌ className="bg-red-500 text-blue-600"
  ✅ className="bg-status-error text-primary"
  ```
- [ ] **NO inline style colors** without documentation
  ```typescript
  ❌ style={{ color: '#10B981' }}
  ✅ style={{ backgroundColor: 'rgba(16, 185, 129, 0.3)' }} // With comment
  ```

### 2.2 Icon Token Usage
- [ ] **NO direct lucide-react imports**
  ```typescript
  ❌ import { Lock, Menu, ChevronDown } from 'lucide-react'
  ✅ import { icons } from '@/design-tokens/icons'
  ```
- [ ] All icons use token system
  ```typescript
  ✅ <icons.security.lock className="w-5 h-5" />
  ✅ <icons.navigation.menu className="w-6 h-6" />
  ```
- [ ] Icon categories used correctly:
  - [ ] `icons.navigation` - Menu, arrows, home, settings
  - [ ] `icons.action` - Check, add, edit, delete, share
  - [ ] `icons.status` - Clock, calendar, alert, warning
  - [ ] `icons.security` - Lock, unlock, eye, shield
  - [ ] `icons.content` - Gift, heart, star, user, users
  - [ ] `icons.media` - Camera, image, play, pause
  - [ ] `icons.communication` - Phone, mail, message

### 2.3 Spacing & Sizing Tokens
- [ ] Large spacing values documented
  ```typescript
  ✅ w-12 h-12  // spacing.component.avatar.lg (48px)
  ✅ gap-8      // spacing.section.gap (32px)
  ```
- [ ] Consistent spacing patterns used
- [ ] No arbitrary values without justification

### 2.4 Opacity with Design Tokens
- [ ] **NO opacity utilities with semantic colors**
  ```typescript
  ❌ className="bg-status-live bg-opacity-20"
  ❌ className="bg-status-live/20"
  ✅ className="bg-[#10B98130]"  // 30% opacity via hex
  ```
- [ ] Opacity color reference used:
  - Live/Success: `#10B981` → `bg-[#10B98130]`
  - Soon/Warning: `#F59E0B` → `bg-[#F59E0B30]`
  - New/Error: `#EF4444` → `bg-[#EF444430]`
  - Accent: `#FF6B35` → `bg-[#FF6B3525]`

## Phase 3: Code Quality (25%)

### 3.1 Formatting & Linting
- [ ] `npm run format` passes (Prettier)
- [ ] `npm run lint` shows 0 errors (ESLint)
- [ ] `npm run typecheck` passes (TypeScript)
- [ ] `npm run build` succeeds

### 3.2 React Best Practices
- [ ] **Hooks at component top**
  ```typescript
  ✅ const [state, setState] = useState()
  ✅ const { t } = useLanguage()
  ✅ useEffect(() => {}, [deps])
  ```
- [ ] **Complete dependency arrays**
  ```typescript
  ❌ useEffect(() => {}, [])      // Missing deps
  ✅ useEffect(() => {}, [id, name])  // All deps
  ```
- [ ] **No async directly in useEffect**
  ```typescript
  ❌ useEffect(async () => { await fetch() }, [])
  ✅ useEffect(() => {
       const fetchData = async () => { await fetch() }
       fetchData()
     }, [])
  ```
- [ ] **Cleanup functions for subscriptions**
  ```typescript
  ✅ useEffect(() => {
       const timer = setInterval(...)
       return () => clearInterval(timer)  // Cleanup
     }, [])
  ```

### 3.3 TypeScript Coverage
- [ ] **All components have prop interfaces**
  ```typescript
  ✅ interface ButtonProps { label: string; onClick?: () => void }
  ✅ const Button: React.FC<ButtonProps> = ({ label, onClick }) => {}
  ```
- [ ] **Event handlers typed**
  ```typescript
  ✅ const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {}
  ✅ const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {}
  ```
- [ ] **Return types specified for complex functions**
- [ ] **No `any` types without justification**
- [ ] **Generic types properly specified**

### 3.4 Clean Code Standards
- [ ] No `console.log` statements
- [ ] No `debugger` statements
- [ ] No commented-out code
- [ ] No `TODO` without `TASK-XXX` reference
- [ ] No unused imports
- [ ] No unused variables (or suppressed with reason)

## Phase 4: Component Architecture (20%)

### 4.1 Component Hierarchy
- [ ] **Import hierarchy respected**:
  ```
  Pages → Organisms → Molecules → Atoms → Tokens
  ```
- [ ] No circular dependencies
- [ ] No cross-tier imports (atoms importing organisms)

### 4.2 Component Variant Validation
- [ ] **Badge variants**: `default | success | warning | error | info | orange`
  ```typescript
  ❌ <Badge variant="live">     // Should be "success"
  ✅ <Badge variant="success">
  ```
- [ ] **Button variants**: `default | secondary | ghost | outline`
  ```typescript
  ❌ <Button variant="primary">  // Doesn't exist
  ✅ <Button variant="default">
  ```
- [ ] **Button sizes**: `sm | default | lg | icon`
  ```typescript
  ❌ <Button size="md">          // Doesn't exist
  ✅ <Button size="default">
  ```
- [ ] **Avatar sizes**: `sm | default | lg | xl`
  ```typescript
  ❌ <Avatar size="2xl">         // Max is xl
  ✅ <Avatar size="xl">
  ```
- [ ] **Typography variants**: `h1-h6 | body | body-small | caption | label`

### 4.3 Localization Compliance
- [ ] **ALL text uses translation keys**
  ```typescript
  ❌ <Button>Submit</Button>
  ✅ <Button>{t('common.buttons.submit')}</Button>
  ```
- [ ] **Using correct translation hook**
  ```typescript
  ❌ import { useTranslation } from 'react-i18next'  // Not active
  ✅ import { useLanguage } from '@/contexts/LanguageContext'
  ```
- [ ] **Translation keys follow hierarchy**
  ```typescript
  ✅ t('giveaway.participate.button')
  ✅ t('auth.signIn.title')
  ✅ t('common.loading')
  ```

### 4.4 RTL Layout Compliance
- [ ] **Flex/Grid containers have `dir="rtl"`**
  ```typescript
  ✅ <div className="flex items-center gap-3" dir="rtl">
  ✅ <div className="grid grid-cols-2" dir="rtl">
  ```
- [ ] **All text elements have `text-right`**
  ```typescript
  ✅ <Typography className="text-right">
  ✅ <span className="text-right">
  ```
- [ ] **Both `dir="rtl"` AND `text-right` used together**
  ```typescript
  ❌ Only text-right without dir="rtl" on container
  ❌ Only dir="rtl" without text-right on text
  ✅ Both used appropriately
  ```

### 4.5 Defensive Programming
- [ ] **Optional props validated**
  ```typescript
  ✅ if (!date) return <span>--:--</span>
  ✅ const value = props.value ?? defaultValue
  ```
- [ ] **No non-null assertions with external data**
  ```typescript
  ❌ user.profile!.name  // Could crash
  ✅ user.profile?.name ?? 'Guest'
  ```
- [ ] **Loading/Error/Empty states handled**

## Phase 5: Documentation Alignment (15%)

### 5.1 CLAUDE.md Synchronization
- [ ] **Component Library section updated** for new components
- [ ] **Design Tokens documented** if modified
- [ ] **Component variants listed** with examples
- [ ] **"Last Updated" date** current
- [ ] **Version number** incremented if major changes

### 5.2 Translation Key Validation
- [ ] All new keys exist in `LanguageContext.tsx`
- [ ] Keys defined in both `ar` and `en` objects
- [ ] Arabic translations are actual Arabic (not placeholders)
- [ ] Key naming consistent with existing patterns

### 5.3 Constants Documentation
- [ ] Magic numbers extracted to `src/constants/`
  ```typescript
  ✅ const PHONE_VALIDATION = { MAX_LENGTH: 9 }
  ✅ const COUNTDOWN = { URGENT_THRESHOLD: 3600000 } // 1 hour
  ```
- [ ] Business meaning documented
- [ ] Units specified in comments

### 5.4 Task Management
- [ ] Large features have TASK-XXX in kanban.md
- [ ] Task moved to "In Progress" when started
- [ ] Subtasks checked off progressively
- [ ] Notes section documents decisions

## Phase 6: Testing Coverage (10%)

### 6.1 Test File Requirements
- [ ] New components have `.test.tsx` files
- [ ] Test files follow naming convention
  ```
  Component.tsx → Component.test.tsx
  useCustomHook.ts → useCustomHook.test.ts
  ```

### 6.2 Test Execution
- [ ] `npm test` passes
- [ ] No skipped tests without justification
- [ ] Coverage maintained or improved
  ```bash
  npm test -- --coverage
  ```

### 6.3 Test Quality
- [ ] Tests are isolated (no external dependencies)
- [ ] External services mocked
- [ ] Error states tested
- [ ] Loading states tested
- [ ] Edge cases covered
- [ ] Accessibility tested (if applicable)

## Phase 7: Final Verification (5%)

### 7.1 Security
- [ ] No API keys or secrets in code
- [ ] No hardcoded URLs (use env variables)
- [ ] No sensitive data in constants
- [ ] No authentication bypasses

### 7.2 Performance
- [ ] Images lazy loaded where appropriate
- [ ] Heavy components code-split
- [ ] Unnecessary re-renders prevented (React.memo)
- [ ] Large lists virtualized if needed

### 7.3 Build & Deploy
- [ ] Build succeeds: `npm run build`
- [ ] No build warnings that block deploy
- [ ] Bundle size reasonable
- [ ] Service worker updated if PWA changes

### 7.4 Commit Readiness
- [ ] All review items addressed
- [ ] Commit message prepared with TASK-XXX
- [ ] Related files all staged together
- [ ] No merge conflicts

## Quick Fix Commands

```bash
# Auto-fix most issues
npm run format
npm run lint --fix
git add -u

# Type checking
npm run typecheck

# Run tests
npm test

# Build check
npm run build

# Check for hardcoded colors
git diff --staged | grep -E "bg-red-|text-blue-|border-green-"

# Check for direct icon imports
git diff --staged | grep "from 'lucide-react'"

# Find missing translations
git diff --staged | grep -oE "t\('[^']+'\)" | sort -u

# Check RTL compliance
git diff --staged | grep 'className=".*flex' | grep -v 'dir="rtl"'
```

## Common Issues & Solutions

| Issue | Detection | Solution |
|-------|-----------|----------|
| Hardcoded colors | `className="bg-red-500"` | Use `bg-status-error` |
| Direct icon import | `from 'lucide-react'` | Use `@/design-tokens/icons` |
| Missing translation | `<Button>Text</Button>` | Add `{t('key')}` |
| Wrong variant | `variant="primary"` | Check component file |
| Missing RTL | No `dir="rtl"` | Add to flex/grid containers |
| Opacity issue | `bg-status-live/20` | Use `bg-[#10B98130]` |
| Magic number | `if (count > 50)` | Extract to constants |
| Missing test | No `.test.tsx` | Create test file |

---

**Checklist Version**: 1.0.0
**Last Updated**: 2025-11-21
**Use**: Run through this checklist for every commit