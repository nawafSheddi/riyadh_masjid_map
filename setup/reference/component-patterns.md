# Component Patterns Reference

> **Reference**: Common patterns for building React components
> **Purpose**: Consistent, maintainable, and scalable component architecture
> **Estimated Reading**: 20-25 minutes

---

## 📋 Overview

This guide provides **battle-tested patterns** for building React components with:

- Class Variance Authority (CVA) for variants
- Design token integration
- TypeScript best practices
- Accessibility (a11y) patterns
- RTL (Right-to-Left) support
- Performance optimization

**Note**: All examples use patterns from the Saudi Celebrity Giveaway Platform.

---

## 🎨 Component Variance Authority (CVA)

### What is CVA?

CVA provides **type-safe** component variants without conditional logic spaghetti.

**Benefits**:
- ✅ Type-safe variants
- ✅ Composable styles
- ✅ No string concatenation
- ✅ IntelliSense support
- ✅ Consistent API

---

### Basic Pattern

**File**: `src/components/ui/button.tsx`

```typescript
import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

// ===== STEP 1: Define Variants =====
const buttonVariants = cva(
  // Base styles (always applied)
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50',
  {
    // Variant definitions
    variants: {
      variant: {
        default: 'bg-foreground text-accent hover:bg-foreground/90',
        secondary: 'bg-transparent border border-border text-foreground hover:bg-foreground/5',
        ghost: 'hover:bg-accent/10 text-foreground',
        outline: 'border border-border bg-transparent hover:bg-accent hover:text-white',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-12 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    // Default values
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

// ===== STEP 2: Define Props Interface =====
interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  // Additional custom props
  asChild?: boolean
}

// ===== STEP 3: Component Implementation =====
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'
```

---

### Usage Examples

```tsx
// Default variant and size
<Button>Click Me</Button>

// Secondary variant, large size
<Button variant="secondary" size="lg">
  Large Secondary Button
</Button>

// Icon button
<Button variant="ghost" size="icon">
  <IconHome />
</Button>

// Custom className override
<Button className="w-full">
  Full Width Button
</Button>

// Disabled state
<Button disabled>
  Disabled Button
</Button>
```

---

### Advanced: Compound Variants

**Pattern**: Different styles based on variant combinations

```typescript
const buttonVariants = cva('base-styles', {
  variants: {
    variant: {
      default: 'bg-foreground text-accent',
      destructive: 'bg-error text-white',
    },
    size: {
      default: 'h-10 px-4',
      sm: 'h-8 px-3',
    },
    fullWidth: {
      true: 'w-full',
      false: 'w-auto',
    },
  },
  // Compound variants: styles for specific combinations
  compoundVariants: [
    {
      variant: 'destructive',
      size: 'sm',
      className: 'text-xs font-bold', // Extra bold for small destructive buttons
    },
  ],
  defaultVariants: {
    variant: 'default',
    size: 'default',
    fullWidth: false,
  },
})
```

---

## 🎯 Design Token Integration

### Color Tokens

**Anti-Pattern ❌**:
```tsx
// Hardcoded colors
<div className="bg-gray-900 text-white border-gray-700">
```

**Best Practice ✅**:
```tsx
// Semantic tokens
<div className="bg-background text-foreground border-border">
```

---

### Complete Token Integration Example

**File**: `src/components/ui/card.tsx`

```typescript
import { HTMLAttributes, forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const cardVariants = cva(
  // Base: All design tokens
  'rounded-lg border border-border bg-background p-6 shadow-sm',
  {
    variants: {
      variant: {
        default: 'bg-background',
        elevated: 'bg-background shadow-md',
        outlined: 'border-2 border-border',
      },
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
    },
  }
)

interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, padding }), className)}
        {...props}
      />
    )
  }
)

Card.displayName = 'Card'
```

---

### Token Reference Quick Guide

| Category | Token | Usage |
|----------|-------|-------|
| **Background** | `bg-background` | Main background |
| | `bg-background-cardDark` | Card in dark mode |
| **Text** | `text-foreground` | Primary text |
| | `text-foreground-muted` | Secondary text |
| | `text-placeholder` | Placeholder text |
| **Accent** | `bg-accent` | Primary accent |
| | `text-accent` | Accent text |
| **Status** | `bg-status-live` | Live status |
| | `text-success` | Success message |
| | `text-error` | Error message |
| **Border** | `border-border` | Standard border |

**Full reference**: [design-token-system.md](./design-token-system.md)

---

## ♿ Accessibility Patterns

### Keyboard Navigation

**Pattern**: Ensure all interactive elements are keyboard accessible

```typescript
// src/components/ui/dialog.tsx
import { useEffect, useRef } from 'react'

export function Dialog({ isOpen, onClose, children }: DialogProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  // Focus trap
  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus()
    }
  }, [isOpen])

  // Escape key handler
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div className="bg-background rounded-lg p-6 max-w-md w-full">
        {children}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          aria-label="Close dialog"
        >
          ×
        </button>
      </div>
    </div>
  )
}
```

---

### ARIA Attributes

**Pattern**: Proper ARIA labels and roles

```typescript
// src/components/ui/input.tsx
import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  helperText?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, id, ...props }, ref) => {
    const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, '-')}`
    const errorId = `${inputId}-error`
    const helperId = `${inputId}-helper`

    return (
      <div className="space-y-2">
        {/* Label with proper association */}
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-foreground"
        >
          {label}
        </label>

        {/* Input with ARIA attributes */}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={!!error}
          aria-describedby={
            error ? errorId : helperText ? helperId : undefined
          }
          className="w-full px-3 py-2 border border-border rounded-md"
          {...props}
        />

        {/* Helper text */}
        {helperText && !error && (
          <p id={helperId} className="text-sm text-foreground-muted">
            {helperText}
          </p>
        )}

        {/* Error message */}
        {error && (
          <p id={errorId} className="text-sm text-error" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  }
)
```

---

### Screen Reader Support

**Pattern**: Visually hidden labels for icons

```typescript
// src/components/ui/icon-button.tsx
export function IconButton({ icon: Icon, label, ...props }: IconButtonProps) {
  return (
    <button
      aria-label={label}
      className="p-2 rounded-md hover:bg-accent/10"
      {...props}
    >
      {/* Visible icon */}
      <Icon className="w-5 h-5" />

      {/* Screen reader only text */}
      <span className="sr-only">{label}</span>
    </button>
  )
}

// Usage
<IconButton icon={HomeIcon} label="Go to home page" onClick={goHome} />
```

---

## 🌍 RTL (Right-to-Left) Support

### Container Pattern

**Pattern**: Always set `dir` and text alignment for RTL

```typescript
// src/components/layouts/Container.tsx
export function Container({ children, className }: ContainerProps) {
  return (
    <div
      dir="rtl"
      className={cn(
        'container mx-auto px-4 text-right', // text-right for RTL
        className
      )}
    >
      {children}
    </div>
  )
}
```

---

### Flex Direction Pattern

**Anti-Pattern ❌**:
```tsx
// Fixed direction (breaks in RTL)
<div className="flex">
  <div>Right side</div>
  <div>Left side</div>
</div>
```

**Best Practice ✅**:
```tsx
// Automatic RTL reversal
<div className="flex flex-row-reverse" dir="rtl">
  <div>Start (appears right in RTL)</div>
  <div>End (appears left in RTL)</div>
</div>
```

---

### Icon Placement Pattern

```typescript
// src/components/ui/button-with-icon.tsx
interface ButtonWithIconProps {
  icon: React.ComponentType<{ className?: string }>
  iconPosition?: 'start' | 'end'
  children: React.ReactNode
}

export function ButtonWithIcon({
  icon: Icon,
  iconPosition = 'start',
  children,
}: ButtonWithIconProps) {
  return (
    <button
      dir="rtl"
      className="flex items-center gap-2 px-4 py-2 rounded-md bg-accent text-white"
    >
      {/* Conditional rendering based on position */}
      {iconPosition === 'start' && <Icon className="w-5 h-5" />}
      <span className="text-right">{children}</span>
      {iconPosition === 'end' && <Icon className="w-5 h-5" />}
    </button>
  )
}

// Usage
<ButtonWithIcon icon={ArrowIcon} iconPosition="end">
  التالي {/* "Next" in Arabic */}
</ButtonWithIcon>
```

---

### Complete RTL Component

**File**: `src/components/organisms/ProfileCard.tsx`

```typescript
import { Card } from '@/components/ui/card'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

export function ProfileCard({ user }: ProfileCardProps) {
  return (
    <Card
      dir="rtl"
      className="flex flex-col items-start text-right"
    >
      {/* Header with avatar and name */}
      <div className="flex items-center gap-4 w-full">
        <Avatar src={user.avatar} alt={user.name} />
        <div className="flex-1 text-right">
          <h3 className="text-lg font-bold text-foreground">
            {user.name}
          </h3>
          <p className="text-sm text-foreground-muted">
            {user.username}
          </p>
        </div>
        <Badge variant="success">نشط</Badge>
      </div>

      {/* Bio */}
      <p className="mt-4 text-right text-foreground">
        {user.bio}
      </p>

      {/* Stats row */}
      <div className="flex gap-6 mt-4 w-full justify-end">
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">
            {user.followers}
          </div>
          <div className="text-sm text-foreground-muted">متابعين</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">
            {user.following}
          </div>
          <div className="text-sm text-foreground-muted">يتابع</div>
        </div>
      </div>
    </Card>
  )
}
```

---

## 🔄 Compound Components

### Pattern: Related Components Working Together

**Example**: Tabs component

```typescript
// src/components/ui/tabs.tsx
import { createContext, useContext, useState } from 'react'

// ===== Context =====
interface TabsContextType {
  activeTab: string
  setActiveTab: (value: string) => void
}

const TabsContext = createContext<TabsContextType | undefined>(undefined)

const useTabs = () => {
  const context = useContext(TabsContext)
  if (!context) throw new Error('Tab components must be used within Tabs')
  return context
}

// ===== Root Component =====
interface TabsProps {
  defaultValue: string
  children: React.ReactNode
}

export function Tabs({ defaultValue, children }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue)

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="w-full">{children}</div>
    </TabsContext.Provider>
  )
}

// ===== Tab List =====
export function TabsList({ children }: { children: React.ReactNode }) {
  return (
    <div
      dir="rtl"
      className="flex gap-2 border-b border-border"
      role="tablist"
    >
      {children}
    </div>
  )
}

// ===== Tab Trigger =====
interface TabsTriggerProps {
  value: string
  children: React.ReactNode
}

export function TabsTrigger({ value, children }: TabsTriggerProps) {
  const { activeTab, setActiveTab } = useTabs()
  const isActive = activeTab === value

  return (
    <button
      role="tab"
      aria-selected={isActive}
      onClick={() => setActiveTab(value)}
      className={cn(
        'px-4 py-2 text-sm font-medium transition-colors',
        isActive
          ? 'border-b-2 border-accent text-accent'
          : 'text-foreground-muted hover:text-foreground'
      )}
    >
      {children}
    </button>
  )
}

// ===== Tab Content =====
interface TabsContentProps {
  value: string
  children: React.ReactNode
}

export function TabsContent({ value, children }: TabsContentProps) {
  const { activeTab } = useTabs()

  if (activeTab !== value) return null

  return (
    <div role="tabpanel" className="mt-4">
      {children}
    </div>
  )
}
```

---

### Usage

```tsx
<Tabs defaultValue="profile">
  <TabsList>
    <TabsTrigger value="profile">الملف الشخصي</TabsTrigger>
    <TabsTrigger value="settings">الإعدادات</TabsTrigger>
    <TabsTrigger value="activity">النشاط</TabsTrigger>
  </TabsList>

  <TabsContent value="profile">
    <ProfileSection />
  </TabsContent>

  <TabsContent value="settings">
    <SettingsSection />
  </TabsContent>

  <TabsContent value="activity">
    <ActivitySection />
  </TabsContent>
</Tabs>
```

---

## ⚡ Performance Optimization

### Memoization Pattern

```typescript
import { memo } from 'react'

// ===== Expensive Component =====
interface ListItemProps {
  item: Item
  onSelect: (id: string) => void
}

// Only re-render when item or onSelect changes
export const ListItem = memo(
  ({ item, onSelect }: ListItemProps) => {
    return (
      <div
        className="p-4 hover:bg-accent/10 cursor-pointer"
        onClick={() => onSelect(item.id)}
      >
        <h4 className="font-bold text-foreground">{item.title}</h4>
        <p className="text-sm text-foreground-muted">{item.description}</p>
      </div>
    )
  },
  // Custom comparison function
  (prevProps, nextProps) => {
    return (
      prevProps.item.id === nextProps.item.id &&
      prevProps.item.title === nextProps.item.title &&
      prevProps.onSelect === nextProps.onSelect
    )
  }
)
```

---

### useCallback Pattern

```typescript
import { useCallback, useState } from 'react'

function List({ items }: { items: Item[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  // Memoize callback to prevent child re-renders
  const handleSelect = useCallback((id: string) => {
    setSelectedId(id)
  }, []) // Empty deps: function never changes

  return (
    <div>
      {items.map(item => (
        <ListItem
          key={item.id}
          item={item}
          onSelect={handleSelect} // Same reference every render
        />
      ))}
    </div>
  )
}
```

---

### Lazy Loading Pattern

```typescript
import { lazy, Suspense } from 'react'

// Lazy load heavy components
const HeavyChart = lazy(() => import('./HeavyChart'))
const LargeTable = lazy(() => import('./LargeTable'))

export function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>

      {/* Show loading state while loading */}
      <Suspense fallback={<ChartSkeleton />}>
        <HeavyChart />
      </Suspense>

      <Suspense fallback={<TableSkeleton />}>
        <LargeTable />
      </Suspense>
    </div>
  )
}
```

---

## 🎭 Conditional Rendering Patterns

### Early Return Pattern

**Anti-Pattern ❌**:
```tsx
function UserProfile({ user }: { user: User | null }) {
  return (
    <div>
      {user ? (
        <div>
          <h1>{user.name}</h1>
          {/* 50 more lines */}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}
```

**Best Practice ✅**:
```tsx
function UserProfile({ user }: { user: User | null }) {
  // Early return for loading state
  if (!user) {
    return <LoadingSkeleton />
  }

  // Main render (flat structure)
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.bio}</p>
      {/* Clear, flat component structure */}
    </div>
  )
}
```

---

### Null Coalescing Pattern

```tsx
function Badge({ count }: { count?: number }) {
  // Show nothing if count is 0 or undefined
  if (!count) return null

  return (
    <span className="bg-error text-white rounded-full px-2 py-1 text-xs">
      {count}
    </span>
  )
}
```

---

## 📝 Form Patterns

### Controlled Input with Validation

```typescript
import { useState } from 'react'
import { Input } from '@/components/ui/input'

export function PhoneNumberInput() {
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '') // Remove non-digits

    // Validation
    if (value.length > 9) {
      setError('Phone number must be 9 digits')
      return
    }

    setPhone(value)
    setError('')
  }

  return (
    <Input
      label="Phone Number"
      value={phone}
      onChange={handleChange}
      error={error}
      placeholder="5XXXXXXXX"
      maxLength={9}
    />
  )
}
```

---

## 🎨 Complete Example: Activity Card

**File**: `src/components/organisms/ActivityCard.tsx`

```typescript
import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { formatDistanceToNow } from 'date-fns'
import { ar } from 'date-fns/locale'

// ===== CVA Variants =====
const activityCardVariants = cva('', {
  variants: {
    status: {
      live: 'border-l-4 border-status-live',
      ended: 'border-l-4 border-status-ended',
      soon: 'border-l-4 border-status-soon',
    },
  },
})

// ===== Props Interface =====
interface ActivityCardProps extends VariantProps<typeof activityCardVariants> {
  title: string
  description: string
  host: {
    name: string
    avatar: string
  }
  participantCount: number
  createdAt: Date
  status: 'live' | 'ended' | 'soon'
  onJoin?: () => void
}

// ===== Component =====
export const ActivityCard = forwardRef<HTMLDivElement, ActivityCardProps>(
  ({ title, description, host, participantCount, createdAt, status, onJoin }, ref) => {
    // Early return if no data
    if (!title || !host) return null

    // Status badge configuration
    const statusConfig = {
      live: { label: 'جاري الآن', variant: 'success' as const },
      ended: { label: 'انتهى', variant: 'default' as const },
      soon: { label: 'قريباً', variant: 'warning' as const },
    }

    const currentStatus = statusConfig[status]

    return (
      <Card
        ref={ref}
        dir="rtl"
        className={activityCardVariants({ status })}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar src={host.avatar} alt={host.name} />
            <div className="text-right">
              <h4 className="font-bold text-foreground">{host.name}</h4>
              <p className="text-sm text-foreground-muted">
                {formatDistanceToNow(createdAt, {
                  addSuffix: true,
                  locale: ar,
                })}
              </p>
            </div>
          </div>

          <Badge variant={currentStatus.variant}>
            {currentStatus.label}
          </Badge>
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold text-right mb-2 text-foreground">
          {title}
        </h3>
        <p className="text-right text-foreground-muted mb-4">
          {description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-foreground-muted">
            {participantCount} مشارك
          </div>

          {status === 'live' && onJoin && (
            <button
              onClick={onJoin}
              className="px-4 py-2 bg-accent text-white rounded-md hover:bg-accent-dark transition-colors"
              aria-label={`Join ${title}`}
            >
              انضم الآن
            </button>
          )}
        </div>
      </Card>
    )
  }
)

ActivityCard.displayName = 'ActivityCard'
```

---

## ✅ Pattern Checklist

When creating a new component, ensure:

**Structure**:
- [ ] Uses CVA for variants (if applicable)
- [ ] Extends correct HTML attributes
- [ ] Uses `forwardRef` for ref support
- [ ] Has TypeScript types/interfaces

**Design Tokens**:
- [ ] No hardcoded colors (use semantic tokens)
- [ ] No magic numbers (use spacing tokens)
- [ ] Uses design system icons

**Accessibility**:
- [ ] Proper ARIA attributes
- [ ] Keyboard navigation support
- [ ] Screen reader friendly
- [ ] Focus visible states

**RTL Support**:
- [ ] `dir="rtl"` on container
- [ ] `text-right` for text content
- [ ] Flex direction considered
- [ ] Icon placement correct

**Performance**:
- [ ] Memoized if expensive
- [ ] useCallback for callbacks
- [ ] Early returns for loading states
- [ ] Lazy loaded if heavy

---

**Last Updated**: 2025-11-28
**Next**: [Design Token System Reference](./design-token-system.md)
