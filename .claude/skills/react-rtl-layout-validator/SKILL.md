---
name: react-rtl-layout-validator
description: Validates and enforces proper RTL (Right-to-Left) layout patterns in React components with Tailwind CSS. This skill should be used when creating or reviewing any React component that displays Arabic text or needs RTL support. It provides validation checklists, common patterns, anti-patterns, and real-world examples to ensure proper RTL implementation.
---

# React RTL Layout Validator

## Overview

This skill provides comprehensive validation and enforcement for Right-to-Left (RTL) layouts in React applications using Tailwind CSS. It ensures proper Arabic text display and layout direction consistency.

## When to Use This Skill

Activate this skill when:
- Creating new React components with Arabic text
- Reviewing existing components for RTL compliance
- Debugging RTL layout issues or misalignments
- Converting LTR components to RTL
- Implementing forms or inputs in Arabic
- Working with flex/grid layouts in RTL context

## Core RTL Principle

**🚨 MANDATORY: The `dir="rtl"` + `text-right` Pattern**

In React/TypeScript with Tailwind CSS, proper RTL requires BOTH:
1. `dir="rtl"` on container elements (flex/grid parents)
2. `text-right` on typography/text elements

Neither alone is sufficient:
- `text-right` alone only aligns text but doesn't reverse flex/grid direction
- `dir="rtl"` alone reverses direction but doesn't align text properly

## Validation Workflow

### Step 1: Pre-Implementation Planning

Before writing any component, plan the RTL structure:

1. Identify all container elements (flex/grid)
2. Mark where `dir="rtl"` is needed
3. Identify all text elements
4. Mark where `text-right` is needed
5. Consider icon/badge positioning

### Step 2: Implementation Validation

During implementation, validate each element:

```tsx
// ✅ CORRECT Pattern
<div className="flex items-center gap-3" dir="rtl">
  <Typography variant="h4" className="text-right font-bold">
    {title}
  </Typography>
  <Badge variant="success">مباشر</Badge>
</div>

// ❌ WRONG - Missing dir="rtl"
<div className="flex items-center gap-3">
  <Typography className="text-right">{title}</Typography>
</div>

// ❌ WRONG - Missing text-right
<div dir="rtl">
  <Typography>{title}</Typography>
</div>
```

### Step 3: Component-Specific Patterns

Apply these patterns based on component type:

#### Form Components
```tsx
<div className="flex flex-col gap-2" dir="rtl">
  <label className="text-right">{label}</label>
  <input
    dir="rtl"
    className="text-right"
    placeholder={placeholder}
  />
</div>
```

#### Card Layouts
```tsx
<div className="card" dir="rtl">
  <div className="flex items-center gap-3">
    <Avatar />
    <div className="flex-1">
      <Typography className="text-right">{name}</Typography>
      <Typography className="text-right text-sm">{role}</Typography>
    </div>
  </div>
</div>
```

#### Stats Display
```tsx
<div className="flex flex-col" dir="rtl">
  <Typography variant="caption" className="text-right">
    {label}
  </Typography>
  <Typography variant="h3" className="text-right">
    {value}
  </Typography>
</div>
```

### Step 4: Post-Implementation Checklist

Run through this checklist before marking any component complete:

- [ ] All flex containers have `dir="rtl"`
- [ ] All grid containers have `dir="rtl"`
- [ ] All Typography components have `text-right`
- [ ] All labels have `text-right`
- [ ] All input fields have both `dir="rtl"` and `text-right`
- [ ] Icons positioned correctly (usually auto-handled by parent flex)
- [ ] Badges/pills positioned next to text, not separated
- [ ] Absolute positioning uses `right-*` as primary, `left-*` as secondary
- [ ] No hardcoded margins that assume LTR (`ml-auto` → `mr-auto`)

## Quick Reference Table

| Element Type | `dir="rtl"` | `text-right` | Notes |
|--------------|-------------|--------------|--------|
| Flex container | ✅ Required | ❌ Not needed | Reverses flex direction |
| Grid container | ✅ Required | ❌ Not needed | Affects grid flow |
| Typography/Text | ⚠️ Optional | ✅ Required | Can inherit dir or set explicitly |
| Input fields | ✅ Required | ✅ Required | Both needed for proper alignment |
| Buttons | ⚠️ Case-by-case | ⚠️ Case-by-case | Depends on content |
| Icons | ❌ Not needed | ❌ Not needed | Positioned via parent flex |

## Positioning Guidelines

### Absolute Positioning in RTL
- Primary position: Use `right-*` classes
- Secondary position: Use `left-*` classes
- Example: Delete button top-left (`top-2 left-2`), Status badge top-right (`top-2 right-2`)

### Flexbox Alignment
- Use `justify-end` for right alignment of flex children
- Margins: Be aware that `ml-2` becomes `mr-2` in RTL context with `dir` attribute

### Icon Placement
- Icons automatically position correctly when parent has `dir="rtl"`
- Don't add additional RTL styling to icons themselves

## Common Anti-Patterns to Avoid

See `references/anti-patterns.md` for detailed examples of what NOT to do.

## Real-World Examples

See `references/examples.md` for production code examples from the codebase.

## Troubleshooting

If RTL layout appears broken:

1. **Check container hierarchy** - Ensure `dir="rtl"` is on the right parent
2. **Verify text alignment** - Add missing `text-right` classes
3. **Inspect flex direction** - Flex items should flow right-to-left
4. **Test with DevTools** - Toggle `dir` attribute to see the difference
5. **Check for hardcoded positions** - Replace with RTL-aware classes

## Integration with Other Skills

- Use alongside `design-token-enforcer` for consistent styling
- Combine with `react-component-template-generator` for RTL-ready templates
- Apply before `pre-implementation-validator` final checks

## Resources

### references/

The `references/` directory contains detailed documentation:
- `anti-patterns.md` - Common RTL mistakes and how to fix them
- `examples.md` - Real-world examples from the codebase
- `checklist.md` - Quick validation checklist