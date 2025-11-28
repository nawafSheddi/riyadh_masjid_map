# RTL Validation Checklist

## Quick Pre-Flight Check

Before marking any React component complete, validate ALL items:

### Container Elements
- [ ] All `<div className="flex ...">` have `dir="rtl"`
- [ ] All `<div className="grid ...">` have `dir="rtl"`
- [ ] All `<form>` elements have `dir="rtl"`
- [ ] All `<nav>` elements have `dir="rtl"`
- [ ] All `<header>` and `<footer>` have `dir="rtl"`

### Text Elements
- [ ] All `<Typography>` components have `className="text-right"`
- [ ] All `<label>` elements have `className="text-right"`
- [ ] All `<p>`, `<h1>`-`<h6>`, `<span>` with text have `className="text-right"`
- [ ] All text inside buttons is properly aligned

### Form Controls
- [ ] All `<input>` elements have BOTH `dir="rtl"` AND `className="text-right"`
- [ ] All `<textarea>` elements have BOTH `dir="rtl"` AND `className="text-right"`
- [ ] All `<select>` elements have `dir="rtl"`
- [ ] Placeholder text displays correctly from right

### Positioning
- [ ] Absolute positioned elements use `right-*` as primary position
- [ ] Close/delete buttons positioned with `left-*` (opposite of LTR)
- [ ] Status badges positioned with `right-*`
- [ ] No usage of `ml-auto` (use `mr-auto` instead)

### Icons and Media
- [ ] Icons flow correctly with text (no manual rotation)
- [ ] Images don't need special RTL treatment
- [ ] Chevron icons point correct direction (ChevronLeft for expand)

### Special Cases
- [ ] Nested flex/grid containers each have their own `dir="rtl"`
- [ ] Mixed language content handled properly (English numbers stay LTR)
- [ ] Modal and popover content has RTL applied
- [ ] Tooltip content aligns correctly

## Time Investment
- **Time to complete checklist**: 2-3 minutes
- **Time saved debugging**: 20-40 minutes
- **ROI**: 10x

## Common Gotchas
1. **Parent `dir="rtl"` doesn't cascade to flex/grid children** - Apply to each container
2. **`text-right` doesn't reverse flex** - Need both `dir="rtl"` and `text-right`
3. **Icons auto-position** - Don't manually transform icons
4. **Numbers stay Western** - Use `toLocaleString('en-US')` not `('ar-SA')`

## Browser Testing
- [ ] Chrome/Edge: RTL renders correctly
- [ ] Safari: RTL renders correctly
- [ ] Firefox: RTL renders correctly
- [ ] Mobile browsers: RTL renders correctly

## Validation Command

Run this grep to find potential RTL issues:
```bash
# Find flex/grid without dir="rtl"
grep -n "className.*flex\|className.*grid" component.tsx | grep -v "dir="

# Find Typography without text-right
grep -n "<Typography" component.tsx | grep -v "text-right"
```