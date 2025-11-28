# 09 - Project Conventions

> **Establish naming, organization, and workflow standards for consistency and collaboration**
>
> Estimated Time: 25 minutes

## Table of Contents

1. [File Naming Conventions](#file-naming-conventions)
2. [Folder Organization Patterns](#folder-organization-patterns)
3. [Component Organization](#component-organization)
4. [Git Workflow](#git-workflow)
5. [Commit Message Format](#commit-message-format)
6. [Code Review Checklist](#code-review-checklist)
7. [Documentation Standards](#documentation-standards)
8. [Pull Request Template](#pull-request-template)

---

## File Naming Conventions

### Component Files

**Pattern**: File names mirror component names

#### Multi-Word Components (PascalCase)
```
✅ GOOD - PascalCase for multi-word components
LanguageToggle.tsx       (matches: export default LanguageToggle)
ThemeToggle.tsx          (matches: export default ThemeToggle)
ProfileMenu.tsx          (matches: export default ProfileMenu)
OTPInput.tsx             (matches: export default OTPInput)
PhoneField.tsx           (matches: export default PhoneField)
AuthForm.tsx             (matches: export default AuthForm)
```

#### Single-Word Components (kebab-case)
```
✅ GOOD - kebab-case for single-word components
button.tsx               (matches: export const Button)
card.tsx                 (matches: export const Card)
badge.tsx                (matches: export const Badge)
avatar.tsx               (matches: export const Avatar)
modal.tsx                (matches: export const Modal)
input.tsx                (matches: export const Input)
```

#### Design System UI Components
```
✅ GOOD - kebab-case for shadcn/ui style components
countdown-timer.tsx      (matches: export const CountdownTimer)
empty-state.tsx          (matches: export const EmptyState)
status-dot.tsx           (matches: export const StatusDot)
loading-skeleton.tsx     (matches: export const LoadingSkeleton)
action-box.tsx           (matches: export const ActionBox)
```

**Rule Summary**:
- **PascalCase files**: Multi-word components with proper nouns (OTP, API, Auth)
- **kebab-case files**: Single-word or design system components
- **Component name**: Always PascalCase inside the file

### Non-Component Files

```typescript
// Configuration files (kebab-case or dot-files)
vite.config.ts
tsconfig.json
.env.example
.gitignore
.dockerignore

// Utility files (kebab-case)
src/lib/utils.ts
src/lib/api-client.ts
src/lib/date-helpers.ts

// Context files (PascalCase)
src/contexts/LanguageContext.tsx
src/contexts/ThemeContext.tsx

// Store files (kebab-case or descriptive)
src/stores/auth-store.ts
src/stores/giveaway-store.ts

// Constants (kebab-case)
src/constants/validation.ts
src/constants/ui-constants.ts
```

---

## Folder Organization Patterns

### Atomic Design Structure

This project follows **Atomic Design** principles for component organization:

```
src/
├── components/
│   ├── ui/              # Atoms - smallest building blocks
│   ├── molecules/       # Molecules - simple combinations
│   ├── organisms/       # Organisms - complex components
│   └── templates/       # Templates - page layouts
├── pages/               # Pages - full page implementations
├── design-tokens/       # Design system tokens
├── contexts/            # React contexts
├── stores/              # Zustand stores
├── constants/           # Application constants
├── i18n/                # Internationalization
│   └── locales/         # Translation files
│       ├── ar/          # Arabic translations
│       └── en/          # English translations
├── lib/                 # Utility functions
├── services/            # API and external services
└── styles/              # Global styles
```

### Component Hierarchy Explained

#### 1. **Atoms** (`src/components/ui/`)
Smallest, indivisible components. Cannot be broken down further.

**Examples**:
- `button.tsx` - Basic button component
- `input.tsx` - Form input field
- `badge.tsx` - Status badge
- `avatar.tsx` - User avatar
- `typography.tsx` - Text components

**Characteristics**:
- Single purpose
- No complex logic
- Highly reusable
- Accept simple props

#### 2. **Molecules** (`src/components/molecules/`)
Simple combinations of atoms that work together.

**Examples**:
- `influencer-ring.tsx` - Avatar + ring indicator
- Form field (input + label + error message)

**Characteristics**:
- Combine 2-3 atoms
- Single responsibility
- Still reusable
- Limited business logic

#### 3. **Organisms** (`src/components/organisms/`)
Complex components that combine molecules and atoms.

**Examples**:
- `Header.tsx` - Navigation header with logo, search, profile menu
- `AuthForm.tsx` - Complete authentication form
- `ProfileMenu.tsx` - User profile dropdown menu
- `GiveawayCard.tsx` - Complete giveaway display card
- `ChallengeCard.tsx` - Challenge item with all details

**Characteristics**:
- Combine multiple molecules/atoms
- Can have complex logic
- May connect to state/context
- Feature-specific

#### 4. **Templates** (`src/components/templates/`)
Page-level layouts defining structure (no content).

**Examples**:
- `page-layout.tsx` - Standard page wrapper
- `dashboard-layout.tsx` - Dashboard structure
- `auth-layout.tsx` - Authentication page structure

**Characteristics**:
- Define page structure
- Provide slots for content
- Consistent layout patterns
- No business logic

#### 5. **Pages** (`src/pages/`)
Full page implementations using templates + organisms.

**Examples**:
```
src/pages/
├── home/                # Home page
├── influencer/          # Influencer section
│   └── home/            # Influencer dashboard
└── participant/         # Participant section
```

**Characteristics**:
- Route-specific
- Compose templates + organisms
- Handle data fetching
- Manage page-level state

---

## Component Organization

### Component Creation Rules

#### When to Create a Component

**✅ Create a new component when**:
1. Code is used in 2+ places
2. Component exceeds ~200 lines
3. Logic is complex and self-contained
4. Component represents a distinct UI pattern

**❌ Don't create a component when**:
1. Used only once and simple (<50 lines)
2. Tightly coupled to parent logic
3. Just a styled `<div>` wrapper

#### Component File Structure

**Single Component** (Preferred):
```typescript
// src/components/ui/button.tsx
import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(/* ... */)

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  // Additional props
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return <button ref={ref} className={/*...*/} {...props} />
  }
)

Button.displayName = 'Button'
```

**Complex Component with Subcomponents**:
```
src/components/ui/modal/
├── index.ts              # Re-exports
├── modal.tsx             # Main Modal component
├── modal-header.tsx      # ModalHeader
├── modal-body.tsx        # ModalBody
└── modal-footer.tsx      # ModalFooter
```

---

## Git Workflow

### Branch Naming Strategy

**Format**: `<type>/<description>` or `<type>/<TASK-XXX>-<description>`

#### Branch Types

```bash
# Feature branches
feature/user-authentication
feature/TASK-042-docker-support

# Bug fixes
fix/login-redirect-issue
fix/TASK-038-avatar-dark-mode

# Enhancements
enhancement/optimize-image-loading
enhancement/TASK-025-pre-commit-review

# Documentation
docs/update-setup-guide
docs/TASK-024-skills-extraction

# Refactoring
refactor/extract-api-client
refactor/simplify-auth-logic

# Design system work
design/update-button-variants
design/TASK-030-rtl-fixes
```

**Examples from actual commits**:
```bash
git log --oneline -5

f6346f8 feat: add Docker support for development and production environments (TASK-042)
242ae67 feat: add Markdown Task Manager system with skill creator integration
4fd995f feat: implement complete participant settings system with phone verification
9e0696d feat: add ProfileMenu component with smooth animations and RTL support
76f5107 feat: add comprehensive design system showcase page
```

### Branch Lifecycle

```bash
# 1. Create branch from main
git checkout main
git pull origin main
git checkout -b feature/TASK-042-docker-support

# 2. Work on feature with regular commits
git add .
git commit -m "feat: add Dockerfile for production build"
git commit -m "feat: add docker-compose for dev environment"

# 3. Push to remote
git push -u origin feature/TASK-042-docker-support

# 4. Create pull request (via GitHub/GitLab/etc.)

# 5. After review and merge, delete branch
git checkout main
git pull origin main
git branch -d feature/TASK-042-docker-support
git push origin --delete feature/TASK-042-docker-support
```

---

## Commit Message Format

### Conventional Commits Standard

**Format**: `<type>(<scope>): <description>`

With optional task reference: `<type>(<scope>): <description> (TASK-XXX)`

#### Commit Types

| Type | Usage | Example |
|------|-------|---------|
| `feat` | New feature | `feat: add user authentication` |
| `fix` | Bug fix | `fix: resolve login redirect loop` |
| `docs` | Documentation only | `docs: update setup guide` |
| `style` | Code style/formatting | `style: format with prettier` |
| `refactor` | Code refactoring | `refactor: extract API client` |
| `perf` | Performance improvement | `perf: optimize image loading` |
| `test` | Add/update tests | `test: add button component tests` |
| `build` | Build system changes | `build: update vite config` |
| `ci` | CI/CD changes | `ci: add GitHub Actions workflow` |
| `chore` | Other changes | `chore: update dependencies` |

#### Scope (Optional)

Scope indicates what part of the codebase is affected:

```bash
feat(auth): add password reset flow
fix(ui): correct button disabled state
docs(setup): add Docker instructions
refactor(api): simplify error handling
```

Common scopes: `auth`, `ui`, `api`, `docker`, `design-system`, `i18n`, `rtl`

#### Task Reference Integration

**With kanban.md task tracking**:

```bash
# Format 1: Task in description
feat: add Docker support for development and production environments (TASK-042)

# Format 2: Task in scope
feat(TASK-042): add Docker support

# Format 3: Multi-line with task reference
feat: implement participant settings system

- Add phone verification with OTP
- Implement settings persistence
- Add RTL support for forms

TASK-041
```

#### Writing Good Commit Messages

**✅ GOOD Examples**:
```bash
feat: add ProfileMenu component with smooth animations and RTL support
fix: resolve avatar background in dark mode
docs: implement skills-based documentation system (v3.0)
refactor: extract translation keys to LanguageContext
perf: optimize countdown timer re-renders
```

**❌ BAD Examples**:
```bash
update code
fix bug
WIP
asdf
changes
```

#### Multi-Line Commit Messages

For complex changes, use multi-line format:

```bash
git commit -m "feat: add complete participant settings system

- Add phone number verification with OTP
- Implement settings persistence to localStorage
- Add RTL support for all form fields
- Add loading states and error handling

TASK-041"
```

Or using heredoc (recommended for long messages):

```bash
git commit -m "$(cat <<'EOF'
feat: add Docker support for development and production environments

This commit adds complete Docker containerization:
- Multi-stage Dockerfile for production builds
- Dockerfile.dev for hot-reload development
- docker-compose.yml for orchestration
- nginx configuration for SPA routing
- Security: non-root user, minimal attack surface

TASK-042

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"
```

---

## Code Review Checklist

### Pre-Commit Review (Use `pre-commit-review` skill)

**Run BEFORE committing**:

```bash
# 1. Activate the skill (if available)
# The pre-commit-review skill will check:
# - Design token compliance
# - RTL layout patterns
# - Translation completeness
# - TypeScript errors
# - Code quality

# 2. Manual pre-commit checks
npm run typecheck    # TypeScript validation
npm run lint         # ESLint validation
npm run format       # Prettier formatting
npm run build        # Production build test
```

### Design System Compliance

- [ ] **No hardcoded colors** - Use semantic tokens only
  ```bash
  # Check for violations
  grep -r "bg-\(red\|blue\|green\|yellow\|orange\)-[0-9]" src/
  ```

- [ ] **Icons from tokens** - Use `@/design-tokens/icons` only
  ```bash
  # Check for direct imports
  grep -r "from 'lucide-react'" src/ --include="*.tsx"
  ```

- [ ] **No magic numbers** - Extract to constants
  ```typescript
  // ❌ Bad
  maxLength={9}

  // ✅ Good
  import { PHONE_VALIDATION } from '@/constants/validation'
  maxLength={PHONE_VALIDATION.MAX_LENGTH}
  ```

### RTL Layout Validation

- [ ] **`dir="rtl"` on containers** - All flex/grid containers
- [ ] **`text-right` on text** - All Arabic text elements
- [ ] **Logical properties** - Use `start`/`end` instead of `left`/`right`

```bash
# Check for missing dir attributes
grep -n "className.*flex" src/ --include="*.tsx" | grep -v "dir="
```

### Translation Completeness

- [ ] **All text uses translation keys** - No hardcoded strings
- [ ] **Keys in both languages** - `ar` and `en` objects
- [ ] **Proper namespace** - `feature.section.element` pattern

```bash
# Check for wrong hook usage
grep -r "useTranslation" src/ --include="*.tsx"
# Should use: useLanguage()
```

### TypeScript Validation

- [ ] **No type errors** - Build must succeed
- [ ] **Props interface defined** - All components have typed props
- [ ] **No `any` types** - Use proper types or `unknown`

```bash
# Check for build errors
npm run build 2>&1 | grep "error TS"
```

### Performance Checks

- [ ] **Memoization where needed** - `useMemo`, `useCallback`, `memo()`
- [ ] **No unnecessary re-renders** - Check with React DevTools
- [ ] **Large lists virtualized** - Use `react-window` or similar

### Accessibility (a11y)

- [ ] **Keyboard navigation** - All interactive elements accessible
- [ ] **ARIA labels** - Screen reader support
- [ ] **Color contrast** - WCAG AA compliance (4.5:1 minimum)
- [ ] **Focus indicators** - Visible focus states

### Security

- [ ] **No secrets in code** - Use environment variables
- [ ] **Input validation** - Sanitize user input
- [ ] **XSS prevention** - Use React's built-in escaping

---

## Documentation Standards

### Code Comments

**When to comment**:
- Complex business logic
- Non-obvious workarounds
- External API integration details
- Performance optimizations

**When NOT to comment**:
- Self-explanatory code
- Obvious functionality
- Restating code in English

**✅ GOOD Comments**:
```typescript
// WORKAROUND: Vite doesn't support dynamic imports for environment variables
// Must use VITE_ prefix and access via import.meta.env
const apiUrl = import.meta.env.VITE_API_URL

// Performance: Memoize to prevent re-renders when parent updates
const sortedItems = useMemo(() =>
  items.sort((a, b) => b.priority - a.priority),
  [items]
)
```

**❌ BAD Comments**:
```typescript
// Set button to disabled
setDisabled(true)

// Return the user name
return user.name
```

### Component Documentation

**JSDoc for public components**:

```typescript
/**
 * Primary button component with multiple variants.
 *
 * @example
 * ```tsx
 * <Button variant="default" size="md">
 *   Click me
 * </Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(...)
```

### README Files

**Project structure documentation**:

```markdown
# Component Name

Brief description of what this component does.

## Usage

```tsx
import { ComponentName } from '@/components/ui/component-name'

<ComponentName variant="default" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'default' \| 'secondary' | 'default' | Visual style |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Component size |
```

### Inline Documentation (CLAUDE.md)

Keep project conventions documented in [CLAUDE.md](../CLAUDE.md) for AI assistance.

---

## Pull Request Template

### PR Title Format

Same as commit format: `<type>(<scope>): <description>`

```
feat(auth): add password reset functionality
fix(ui): resolve button disabled state in dark mode
docs: update deployment guide with Docker instructions
```

### PR Description Template

```markdown
## Summary

Brief description of what this PR does (1-3 sentences).

## Changes

- Added phone verification with OTP
- Implemented settings persistence
- Added RTL support for form fields
- Added loading states and error handling

## Type of Change

- [ ] New feature (non-breaking change)
- [ ] Bug fix (non-breaking change)
- [ ] Breaking change (fix or feature that would cause existing functionality to change)
- [ ] Documentation update
- [ ] Code refactoring
- [ ] Performance improvement

## Testing

- [ ] Tested on desktop (Chrome, Safari, Firefox)
- [ ] Tested on mobile (iOS Safari, Android Chrome)
- [ ] Tested RTL layout
- [ ] Tested dark mode
- [ ] Tested with screen reader
- [ ] Added/updated tests

## Screenshots

[Add screenshots for UI changes]

## Checklist

- [ ] Code follows project conventions
- [ ] No hardcoded colors (design tokens only)
- [ ] RTL layout validated (`dir="rtl"` + `text-right`)
- [ ] All text uses translation keys
- [ ] TypeScript build succeeds
- [ ] No console errors/warnings
- [ ] Tested in both light and dark modes
- [ ] Updated documentation (if needed)

## Related Issues

Closes #123
Relates to TASK-042

## Deployment Notes

[Any special deployment considerations]

---

🤖 Generated with [Claude Code](https://claude.com/claude-code)
```

### PR Review Process

**Reviewer Checklist**:

1. **Code Quality**
   - [ ] Follows naming conventions
   - [ ] No code duplication
   - [ ] Proper error handling
   - [ ] TypeScript types correct

2. **Design System**
   - [ ] Uses design tokens
   - [ ] Follows component patterns
   - [ ] RTL support implemented
   - [ ] Dark mode support

3. **Testing**
   - [ ] Manually tested
   - [ ] Edge cases considered
   - [ ] No regressions

4. **Documentation**
   - [ ] Code comments where needed
   - [ ] README updated (if applicable)
   - [ ] CLAUDE.md updated (if applicable)

---

## Quick Reference

### Daily Workflow

```bash
# 1. Start work
git checkout main
git pull origin main
git checkout -b feature/TASK-XXX-description

# 2. Make changes
# (code, test, repeat)

# 3. Before commit - Run checks
npm run typecheck
npm run lint
npm run build

# 4. Commit with task reference
git add .
git commit -m "feat: add feature description (TASK-XXX)"

# 5. Push and create PR
git push -u origin feature/TASK-XXX-description
# Create PR via GitHub/GitLab UI
```

### Naming Quick Reference

| Item | Convention | Example |
|------|------------|---------|
| **Multi-word component file** | PascalCase | `ProfileMenu.tsx` |
| **Single-word component file** | kebab-case | `button.tsx` |
| **Component export** | PascalCase | `export const Button` |
| **Utility file** | kebab-case | `api-client.ts` |
| **Context file** | PascalCase | `LanguageContext.tsx` |
| **Branch** | `type/description` | `feature/user-auth` |
| **Commit** | `type: description` | `feat: add auth` |
| **PR Title** | `type: description` | `feat: add auth` |

### Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Production build
npm run typecheck        # Check TypeScript
npm run lint             # Run ESLint
npm run format           # Format with Prettier

# Git
git status               # Check status
git diff                 # View changes
git log --oneline -10    # Recent commits
git branch               # List branches

# Docker
docker-compose up dev    # Start dev container
docker-compose up prod-test --profile production  # Test production build
```

---

## Next Steps

After establishing these conventions:

1. **Share with team** - Ensure all developers understand
2. **Update CLAUDE.md** - Reference these conventions
3. **Create PR template** - Add to `.github/pull_request_template.md`
4. **Set up Git hooks** - Automate checks with husky (optional)
5. **Document exceptions** - Note any project-specific variations

---

## Related Documentation

- **Design System**: [04-design-system-setup.md](04-design-system-setup.md)
- **Development Tooling**: [05-development-tooling.md](05-development-tooling.md)
- **Claude Code Integration**: [07-claude-code-integration.md](07-claude-code-integration.md)
- **Skills**: `.claude/skills/` folder

---

**Prev**: [08-deployment-setup.md](08-deployment-setup.md) | **Next**: [10-post-setup-checklist.md](10-post-setup-checklist.md)
