# RTL Anti-Patterns and Fixes

## Common Mistakes to Avoid

### 1. Missing `dir="rtl"` on Container

**❌ WRONG**
```tsx
<div className="flex items-center gap-3">
  <Typography className="text-right">{title}</Typography>
  <Badge>جديد</Badge>
</div>
```
**Problem**: Flex items flow left-to-right, badge appears on wrong side

**✅ CORRECT**
```tsx
<div className="flex items-center gap-3" dir="rtl">
  <Typography className="text-right">{title}</Typography>
  <Badge>جديد</Badge>
</div>
```

### 2. Missing `text-right` on Text Elements

**❌ WRONG**
```tsx
<div dir="rtl">
  <Typography>{title}</Typography>
  <Typography>{description}</Typography>
</div>
```
**Problem**: Text aligns to the left despite RTL container

**✅ CORRECT**
```tsx
<div dir="rtl">
  <Typography className="text-right">{title}</Typography>
  <Typography className="text-right">{description}</Typography>
</div>
```

### 3. Incomplete Input Field RTL

**❌ WRONG**
```tsx
<input className="text-right" placeholder="أدخل النص" />
```
**Problem**: Text cursor starts from left, placeholder misaligned

**✅ CORRECT**
```tsx
<input dir="rtl" className="text-right" placeholder="أدخل النص" />
```

### 4. Hardcoded Directional Margins

**❌ WRONG**
```tsx
<button className="ml-auto">إرسال</button>
```
**Problem**: Button stays on left in RTL context

**✅ CORRECT**
```tsx
<button className="mr-auto">إرسال</button>
// Or use logical properties
<button className="ms-auto">إرسال</button>
```

### 5. Wrong Absolute Positioning

**❌ WRONG**
```tsx
<div className="relative">
  <button className="absolute top-2 left-2">×</button>
</div>
```
**Problem**: Close button appears on left in RTL (should be right)

**✅ CORRECT**
```tsx
<div className="relative">
  <button className="absolute top-2 right-2">×</button>
</div>
```

### 6. Nested Containers Without `dir`

**❌ WRONG**
```tsx
<div dir="rtl">
  <div className="flex">
    <span className="text-right">Label</span>
    <span className="text-right">Value</span>
  </div>
</div>
```
**Problem**: Inner flex doesn't inherit RTL direction

**✅ CORRECT**
```tsx
<div dir="rtl">
  <div className="flex" dir="rtl">
    <span className="text-right">Label</span>
    <span className="text-right">Value</span>
  </div>
</div>
```

### 7. Icon Styling Interference

**❌ WRONG**
```tsx
<div dir="rtl">
  <Icon className="transform rotate-180" />
</div>
```
**Problem**: Manually flipping icons can break their meaning

**✅ CORRECT**
```tsx
<div dir="rtl">
  <Icon /> {/* Let parent flex handle positioning */}
</div>
```

### 8. Mixed Direction Content

**❌ WRONG**
```tsx
<div className="flex" dir="rtl">
  <span className="text-left">English</span>
  <span className="text-right">عربي</span>
</div>
```
**Problem**: Inconsistent text alignment

**✅ CORRECT**
```tsx
<div className="flex" dir="rtl">
  <span className="text-right" dir="ltr">English</span>
  <span className="text-right">عربي</span>
</div>
```