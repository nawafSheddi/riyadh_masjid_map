# Pre-Commit Review Skill for React/TypeScript Projects

> Automated code review for frontend projects with design system compliance
> **Version**: 1.0.0 | **Compatible with**: React 18+, TypeScript 5+, Tailwind CSS

## Quick Start

### Installation

1. **Skill is already installed** at `.claude/skills/pre-commit-review/`

2. **Manual review** (recommended for first-time use):
   ```bash
   /skills pre-commit-review
   ```

3. **Git hook setup** (optional - for automatic reviews):
   ```bash
   # Create git hook
   cat > .git/hooks/pre-commit << 'EOF'
   #!/bin/bash

   echo "🔍 Running pre-commit checks..."

   # Quick checks that block commit
   CRITICAL_ISSUES=0

   # Check for .env files
   if git diff --staged --name-only | grep -E "^\.env|credentials\.json|\.env\.local" > /dev/null; then
       echo "❌ CRITICAL: Sensitive files staged (.env, credentials)"
       echo "   Run: git restore --staged .env*"
       CRITICAL_ISSUES=1
   fi

   # Check for hardcoded colors (design system violation)
   if git diff --staged | grep -E "bg-red-[0-9]|text-blue-[0-9]|border-green-[0-9]" > /dev/null; then
       echo "❌ CRITICAL: Hardcoded colors detected (use design tokens)"
       CRITICAL_ISSUES=1
   fi

   # Check for direct lucide imports
   if git diff --staged | grep "from 'lucide-react'" > /dev/null; then
       echo "❌ CRITICAL: Direct lucide-react imports (use @/design-tokens/icons)"
       CRITICAL_ISSUES=1
   fi

   # Check for missing localization
   if git diff --staged | grep -E "<(Button|Typography|h[1-6]|span|div)>[A-Z][a-z]+" > /dev/null; then
       echo "⚠️  WARNING: Possible hardcoded text (should use t())"
   fi

   # If critical issues, block commit
   if [ $CRITICAL_ISSUES -eq 1 ]; then
       echo ""
       echo "❌ COMMIT BLOCKED - Critical issues found"
       echo "   Run: /skills pre-commit-review for detailed report"
       echo "   Or: git commit --no-verify to bypass (not recommended)"
       exit 1
   fi

   # For non-critical, suggest review
   FILE_COUNT=$(git diff --staged --name-only | wc -l)
   if [ $FILE_COUNT -gt 3 ]; then
       echo ""
       echo "⚠️  Consider running: /skills pre-commit-review"
       echo "   ($FILE_COUNT files staged)"
       echo "   Proceeding in 3 seconds... (Ctrl+C to cancel)"
       sleep 3
   fi

   echo "✅ Pre-commit checks passed"
   exit 0
   EOF

   # Make executable
   chmod +x .git/hooks/pre-commit
   ```

## What It Checks

### 🎨 Design System Compliance (CRITICAL)
- ❌ **No hardcoded colors** - Must use semantic tokens
- ❌ **No direct icon imports** - Must use icon token system
- ❌ **No opacity utilities with tokens** - Use 8-digit hex
- ✅ Validates all design token usage

### 🌍 Localization (CRITICAL)
- ❌ **No hardcoded text** - Everything must use t()
- ❌ **Translation keys must exist** in LanguageContext
- ❌ **Wrong translation hook** - Use useLanguage not useTranslation
- ✅ Ensures 100% localization coverage

### 📐 RTL Layout (REQUIRED)
- ⚠️ **Both attributes needed** - dir="rtl" + text-right
- ⚠️ **Flex/grid containers** need dir="rtl"
- ⚠️ **Text elements** need text-right class
- ✅ Validates complete RTL support

### 🏗️ Architecture
- ✅ Component hierarchy (pages → organisms → molecules → atoms)
- ✅ Valid component variants (Badge, Button, etc.)
- ✅ TypeScript type coverage
- ✅ React hooks best practices

### 📚 Documentation
- ✅ CLAUDE.md synchronized with changes
- ✅ Task management (kanban.md) updated
- ✅ Constants documented
- ✅ Component examples provided

## Usage Examples

### Basic Review
```bash
# Review all staged changes
/skills pre-commit-review

# Quick review (skip tests)
/skills pre-commit-review --quick

# With auto-fix
/skills pre-commit-review --fix
```

### Common Scenarios

#### Scenario 1: New Component
```bash
# Stage your files
git add src/components/ui/NewComponent.tsx
git add src/components/ui/NewComponent.test.tsx

# Run review
/skills pre-commit-review

# Will check:
# - Design token usage
# - Localization coverage
# - RTL configuration
# - TypeScript types
# - Test file exists
```

#### Scenario 2: Design Token Changes
```bash
# If you modified design tokens
git add src/design-tokens/colors.ts
git add CLAUDE.md  # Must update documentation!

# Review will verify alignment
/skills pre-commit-review
```

#### Scenario 3: Adding Translations
```bash
# Stage component and translations
git add src/pages/NewPage.tsx
git add src/contexts/LanguageContext.tsx

# Review verifies all keys exist
/skills pre-commit-review
```

## Understanding Reports

### ✅ Success
```
Status: ✅ READY TO COMMIT
All checks passed. Safe to commit.
```

### ❌ Critical (Blocking)
```
Status: ❌❌❌ CANNOT COMMIT
Critical issues must be fixed before committing.
Examples: Hardcoded colors, missing translations, security issues
```

### ⚠️ Warnings (Non-blocking)
```
Status: ⚠️⚠️ NEEDS ATTENTION
Issues should be fixed but don't block commit.
Examples: Code formatting, missing tests
```

## Quick Fixes

### Fix Design System Issues
```bash
# Replace hardcoded colors
# FROM: className="bg-green-500"
# TO:   className="bg-status-success"

# Replace icon imports
# FROM: import { Lock } from 'lucide-react'
# TO:   import { icons } from '@/design-tokens/icons'
#       <icons.security.lock />
```

### Fix Localization
```bash
# Add to LanguageContext.tsx
ar: { 'key.name': 'النص العربي' }
en: { 'key.name': 'English text' }

# Use in component
import { useLanguage } from '@/contexts/LanguageContext'
const { t } = useLanguage()
<Button>{t('key.name')}</Button>
```

### Fix RTL Layout
```bash
# Add BOTH attributes
<div className="flex items-center" dir="rtl">
  <Typography className="text-right">{text}</Typography>
</div>
```

### Auto-fixable Issues
```bash
# Format code
npm run format

# Fix linting
npm run lint --fix

# Then stage changes
git add -u
```

## Configuration

### Customize Checks

Edit `.claude/skills/pre-commit-review/SKILL.md` to:
- Add project-specific rules
- Adjust severity levels
- Customize report format
- Add new detection patterns

### Disable Specific Checks

```bash
# Skip tests temporarily
/skills pre-commit-review --skip-tests

# Skip documentation check
/skills pre-commit-review --skip-docs
```

### Bypass Hook (Emergency Only)
```bash
# Commit without checks (NOT RECOMMENDED)
git commit --no-verify -m "emergency fix"
```

## Troubleshooting

### Review Takes Too Long
- Stage fewer files at once
- Use `--quick` flag for rapid review
- Ensure Docker/npm services are running

### False Positives
- Check you're using latest patterns
- Verify component variants are up-to-date
- Report issues for pattern updates

### Hook Not Running
```bash
# Check hook exists and is executable
ls -la .git/hooks/pre-commit

# Should show: -rwxr-xr-x
# If not: chmod +x .git/hooks/pre-commit
```

### Different Results Than Expected
```bash
# Clear npm cache
npm cache clean --force

# Rebuild
npm run build

# Try again
/skills pre-commit-review
```

## Team Adoption

### For New Team Members

1. **Clone repository**
2. **Install dependencies**: `npm install`
3. **Install git hook**: Run installation script above
4. **Test it**: Make a small change and try to commit
5. **Learn patterns**: Read `patterns.md` for examples

### Best Practices

1. **Run before every commit** - Catch issues early
2. **Fix all warnings** - Don't accumulate technical debt
3. **Update docs immediately** - Keep CLAUDE.md in sync
4. **Document in kanban.md** - Track all work
5. **Use semantic commit messages** - Reference TASK-XXX

### Training Resources

- `checklist.md` - Complete validation checklist
- `patterns.md` - Correct vs incorrect code patterns
- `examples.md` - Real-world scenarios
- `sample-review-output.md` - Report format guide

## Performance Impact

| Check Type | Time | Impact |
|------------|------|--------|
| File categorization | <1s | Minimal |
| Design token validation | 1-2s | Low |
| Localization check | 1-2s | Low |
| TypeScript check | 3-5s | Medium |
| Lint/Format | 2-3s | Low |
| Tests | 5-10s | High |
| **Total** | 10-15s | Acceptable |

## Success Metrics

After 1 week of use:
- 95% commits pass on first try
- 0 hardcoded colors in production
- 100% localization coverage
- 90% reduction in PR review time
- 0 design system violations

## Support

### Getting Help
- Read error messages carefully - they include fixes
- Check `examples.md` for similar scenarios
- Review `patterns.md` for correct patterns
- Ask team lead for project-specific questions

### Reporting Issues
Found a bug or false positive?
1. Document the scenario
2. Include staged files list
3. Include error message
4. Suggest fix if possible

### Contributing
To improve the skill:
1. Edit files in `.claude/skills/pre-commit-review/`
2. Test changes thoroughly
3. Update version and date
4. Document changes

---

**Version**: 1.0.0
**Last Updated**: 2025-11-21
**Maintainer**: Development Team
**License**: Project License