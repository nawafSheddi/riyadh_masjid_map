# Code Patterns - Frontend React/TypeScript

> Correct and incorrect patterns for React/TypeScript projects with design system
> **Version**: 1.0.0 | **Last Updated**: 2025-11-21

## Design Token Patterns

### Color Tokens

✅ **CORRECT: Semantic color tokens**
```typescript
// Using design system colors
className="bg-primary text-secondary"
className="border-accent bg-surface"
className="text-status-live bg-status-live-bg"

// Status colors with semantic names
className="bg-status-success"  // For live/active states
className="bg-status-warning"  // For soon/pending states
className="bg-status-error"    // For ended/error states
className="bg-status-info"     // For informational states

// Opacity with 8-digit hex
className="bg-[#10B98130]"     // 30% opacity green
className="bg-[#FF6B3525]"     // 25% opacity orange
className="bg-[#EF444420]"     // 20% opacity red
```

❌ **INCORRECT: Hardcoded colors**
```typescript
// Hardcoded Tailwind utilities
className="bg-red-500 text-blue-600"
className="border-green-400"
className="bg-gray-200"

// Hardcoded hex without opacity
className="bg-[#FF6B35]"        // 6-digit hex
style={{ color: '#10B981' }}   // Inline styles

// Broken opacity patterns
className="bg-status-live bg-opacity-20"  // Won't work!
className="bg-status-live/20"            // Won't work!
className="text-accent/50"               // Won't work!
```

### Icon Tokens

✅ **CORRECT: Icon token system**
```typescript
import { icons } from '@/design-tokens/icons';

// Navigation icons
<icons.navigation.menu className="w-6 h-6" />
<icons.navigation.chevronDown className="w-4 h-4" />
<icons.navigation.arrowLeft className="w-5 h-5" />

// Action icons
<icons.action.check className="w-5 h-5 text-status-success" />
<icons.action.close className="w-4 h-4" />
<icons.action.share className="w-5 h-5" />

// Security icons
<icons.security.lock className="w-5 h-5" />
<icons.security.shield className="w-6 h-6" />

// Content icons
<icons.content.gift className="w-6 h-6 text-accent" />
<icons.content.users className="w-5 h-5" />
```

❌ **INCORRECT: Direct lucide imports**
```typescript
// Direct imports (blocked by ESLint)
import { Lock, Menu, Users, Gift } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import * as Icons from 'lucide-react';

// Using lucide components directly
<Lock size={24} />
<Menu className="w-6 h-6" />
<Users size={20} />
```

### Spacing Patterns

✅ **CORRECT: Consistent spacing with tokens**
```typescript
// Document token mapping
className="p-4"        // padding: spacing.md (16px)
className="gap-3"      // gap: spacing.sm (12px)
className="mt-8"       // margin-top: spacing.xl (32px)

// Component-specific spacing
className="w-12 h-12"  // Avatar: spacing.component.avatar.lg
className="px-4 py-2"  // Button: spacing.component.button.md

// With inline documentation
<div className="p-6">  {/* spacing.component.card.padding */}
```

❌ **INCORRECT: Magic spacing values**
```typescript
// Arbitrary values without documentation
className="w-[47px] h-[47px]"
className="gap-[13px]"
className="p-[18px]"

// Inconsistent spacing
className="mt-3.5"  // Not in spacing scale
className="p-7"     // Not a standard token
```

## Component Patterns

### Component Structure

✅ **CORRECT: Well-structured component**
```typescript
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { icons } from '@/design-tokens/icons';
import { useLanguage } from '@/contexts/LanguageContext';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        outline: 'border border-input bg-background',
      },
      size: {
        sm: 'h-9 px-3',
        default: 'h-10 px-4 py-2',
        lg: 'h-11 px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  leftIcon?: keyof typeof icons.action;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, leftIcon, children, disabled, ...props }, ref) => {
    const { t } = useLanguage();
    const Icon = leftIcon ? icons.action[leftIcon] : null;

    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {Icon && <Icon className="mr-2 h-4 w-4" />}
        {isLoading ? t('common.loading') : children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
```

❌ **INCORRECT: Poor component structure**
```typescript
// Missing types
function Button(props) {
  return <button>{props.label}</button>;
}

// Direct icon imports
import { Lock } from 'lucide-react';

// Hardcoded text
<button>Submit</button>

// No variant system
<button className="bg-blue-500 text-white">Click</button>

// Missing defensive checks
const time = date.getTime(); // Crashes if date is undefined
```

### Variant Usage

✅ **CORRECT: Valid component variants**
```typescript
// Badge variants
<Badge variant="success">Live</Badge>
<Badge variant="warning">Soon</Badge>
<Badge variant="error">Ended</Badge>
<Badge variant="info">Info</Badge>
<Badge variant="orange">Featured</Badge>

// Button variants
<Button variant="default">Submit</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="ghost">Learn More</Button>
<Button variant="outline">View Details</Button>

// Button sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon"><icons.action.plus /></Button>

// Typography variants
<Typography variant="h1">Main Title</Typography>
<Typography variant="body">Paragraph text</Typography>
<Typography variant="caption">Small text</Typography>
```

❌ **INCORRECT: Invalid variants**
```typescript
// Badge - wrong variant names
<Badge variant="live">      // Should be "success"
<Badge variant="pending">   // Should be "warning"
<Badge variant="new">       // Should be "error"

// Button - non-existent variants
<Button variant="primary">  // Doesn't exist, use "default"
<Button variant="danger">   // Doesn't exist
<Button size="md">         // Doesn't exist, use "default"
<Button size="medium">     // Doesn't exist

// Avatar - exceeds max size
<Avatar size="2xl" />      // Max is "xl"
<Avatar size="xxl" />      // Max is "xl"
```

## React Patterns

### Hooks Usage

✅ **CORRECT: Proper hooks usage**
```typescript
function Component() {
  // Hooks at top
  const [state, setState] = useState<string>('');
  const { t } = useLanguage();
  const router = useRouter();

  // Async in useEffect wrapper
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const data = await api.getData();
        if (isMounted) {
          setState(data);
        }
      } catch (error) {
        if (isMounted) {
          console.error(error);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Complete dependency arrays
  const memoizedValue = useMemo(() => {
    return expensiveComputation(state);
  }, [state]); // All dependencies listed

  return <div>{memoizedValue}</div>;
}
```

❌ **INCORRECT: Hook violations**
```typescript
function Component() {
  // Conditional hooks (React rule violation!)
  if (condition) {
    const [state, setState] = useState('');
  }

  // Async directly in useEffect
  useEffect(async () => {
    const data = await fetch('/api');
    setData(data);
  }, []);

  // Missing dependencies
  useEffect(() => {
    doSomething(value);
  }, []); // 'value' missing from deps

  // No cleanup for subscriptions
  useEffect(() => {
    const timer = setInterval(() => {}, 1000);
    // Missing: return () => clearInterval(timer);
  }, []);
}
```

### TypeScript Patterns

✅ **CORRECT: Proper TypeScript usage**
```typescript
// Component props interface
interface CardProps {
  title: string;
  description?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

// Event handler types
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  // handle click
};

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setValue(e.target.value);
};

// Generic types
const [items, setItems] = useState<Item[]>([]);
const ref = useRef<HTMLDivElement>(null);

// Return types
const computeValue = (x: number, y: number): number => {
  return x + y;
};

// Union types for variants
type ButtonVariant = 'default' | 'secondary' | 'ghost' | 'outline';
```

❌ **INCORRECT: Poor TypeScript usage**
```typescript
// No types
function Component(props) {
  return <div>{props.title}</div>;
}

// Using 'any'
const handleClick = (e: any) => {
  console.log(e);
};

// Missing generic types
const [items, setItems] = useState([]);
const ref = useRef();

// No return type
const compute = (x, y) => x + y;

// Non-null assertions without validation
const name = user!.profile!.name; // Dangerous!
```

## Localization Patterns

### Translation Keys

✅ **CORRECT: Proper localization**
```typescript
import { useLanguage } from '@/contexts/LanguageContext';

function Component() {
  const { t } = useLanguage();

  return (
    <div>
      <h1>{t('giveaway.title')}</h1>
      <p>{t('giveaway.description')}</p>
      <Button>{t('common.buttons.submit')}</Button>

      {/* Dynamic values */}
      <span>{t('giveaway.participants', { count: 100 })}</span>

      {/* Conditional text */}
      <Badge>
        {isLive ? t('status.live') : t('status.ended')}
      </Badge>
    </div>
  );
}

// In LanguageContext.tsx
const translations = {
  ar: {
    'giveaway.title': 'السحب',
    'giveaway.description': 'اشترك الآن للفوز',
    'common.buttons.submit': 'إرسال',
    'status.live': 'مباشر',
    'status.ended': 'انتهى',
  },
  en: {
    'giveaway.title': 'Giveaway',
    'giveaway.description': 'Enter now to win',
    'common.buttons.submit': 'Submit',
    'status.live': 'Live',
    'status.ended': 'Ended',
  },
};
```

❌ **INCORRECT: Hardcoded text**
```typescript
// Hardcoded text
<h1>Giveaway</h1>
<Button>Submit</Button>
<span>Loading...</span>

// Wrong translation hook
import { useTranslation } from 'react-i18next'; // Not active!
const { t } = useTranslation();

// Missing translations
<div>{t('undefined.key')}</div> // Key doesn't exist

// Mixed hardcoded and translated
<div>
  {t('welcome')} User! {/* "User!" is hardcoded */}
</div>
```

## RTL Layout Patterns

### Proper RTL Implementation

✅ **CORRECT: Complete RTL support**
```typescript
// Container with dir="rtl" + text with text-right
<div className="flex items-center gap-3" dir="rtl">
  <Typography variant="h4" className="text-right font-bold">
    {challenge.title}
  </Typography>
  <Badge variant="success">مباشر</Badge>
</div>

// Column layout with RTL
<div className="flex flex-col gap-4" dir="rtl">
  <div className="flex items-center justify-between">
    <Typography className="text-right">{label}</Typography>
    <Typography className="text-right font-bold">{value}</Typography>
  </div>
</div>

// Grid with RTL
<div className="grid grid-cols-2 gap-4" dir="rtl">
  <Card>
    <Typography className="text-right">{content}</Typography>
  </Card>
</div>

// Form with RTL
<form className="flex flex-col gap-4" dir="rtl">
  <Input
    placeholder={t('form.email')}
    className="text-right"
    dir="rtl"
  />
</form>
```

❌ **INCORRECT: Incomplete RTL**
```typescript
// Missing dir="rtl" on container
<div className="flex items-center gap-3">
  <Typography className="text-right">{title}</Typography>
</div>

// Missing text-right on text elements
<div dir="rtl">
  <Typography>{title}</Typography> {/* Not right-aligned */}
</div>

// Only one of the two required attributes
<div className="flex flex-col">
  <span className="text-right">{text}</span> {/* Container needs dir="rtl" */}
</div>
```

## State Management Patterns

### Zustand Store

✅ **CORRECT: Proper Zustand usage**
```typescript
// Store definition
interface StoreState {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
}

const useStore = create<StoreState>((set) => ({
  user: null,
  isLoading: false,
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
}));

// Using in component
function Component() {
  const { user, setUser } = useStore();

  // Selective subscription
  const isLoading = useStore((state) => state.isLoading);

  return <div>{user?.name}</div>;
}
```

❌ **INCORRECT: Poor state management**
```typescript
// Untyped store
const useStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

// Using entire store (causes unnecessary re-renders)
function Component() {
  const store = useStore(); // Subscribes to all changes!
  return <div>{store.user?.name}</div>;
}
```

## Performance Patterns

### Optimization Patterns

✅ **CORRECT: Performance optimizations**
```typescript
// Memoized component
const ExpensiveComponent = React.memo(({ data }) => {
  return <ComplexVisualization data={data} />;
});

// Memoized values
const memoizedValue = useMemo(() => {
  return expensiveComputation(data);
}, [data]);

// Memoized callbacks
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);

// Lazy loading
const HeavyComponent = lazy(() => import('./HeavyComponent'));

// Image optimization
<img
  src={imageUrl}
  alt={alt}
  loading="lazy"
  decoding="async"
/>
```

❌ **INCORRECT: Performance issues**
```typescript
// Inline function recreation on every render
<Button onClick={() => handleClick(id)}>Click</Button>

// Expensive computation in render
function Component({ data }) {
  const result = expensiveComputation(data); // Runs every render!
  return <div>{result}</div>;
}

// Missing memo for pure components
function PureComponent({ value }) {
  return <div>{value}</div>; // Re-renders unnecessarily
}
```

## Constants & Magic Numbers

### Proper Constants Usage

✅ **CORRECT: Named constants**
```typescript
// constants/validation.ts
export const PHONE_VALIDATION = {
  MIN_LENGTH: 9,
  MAX_LENGTH: 9,
  PATTERN: /^[0-9]{9}$/,
  PREFIX: '05',
} as const;

// constants/ui.ts
export const COUNTDOWN = {
  URGENT_THRESHOLD: 3600000,  // 1 hour in ms
  WARNING_THRESHOLD: 1800000, // 30 minutes in ms
  UPDATE_INTERVAL: 1000,      // 1 second
} as const;

// constants/limits.ts
export const GIVEAWAY_LIMITS = {
  MIN_PARTICIPANTS: 1,
  MAX_PARTICIPANTS: 10000,
  MAX_WINNERS: 100,
  MAX_PRIZE_AMOUNT: 100000,
} as const;

// Usage
if (phoneNumber.length > PHONE_VALIDATION.MAX_LENGTH) {
  setError(t('validation.phone.tooLong'));
}

if (timeRemaining < COUNTDOWN.URGENT_THRESHOLD) {
  setUrgent(true);
}
```

❌ **INCORRECT: Magic numbers**
```typescript
// Magic numbers without meaning
if (phone.length > 9) { }
if (countdown < 3600000) { }
if (participants > 100) { }

// Hardcoded limits
const MAX = 50; // What is this max for?

// Repeated values
if (value > 1000) { }
// ... elsewhere
if (otherValue > 1000) { } // Same limit, not connected
```

---

**Patterns Version**: 1.0.0
**Last Updated**: 2025-11-21
**Reference**: Use these patterns during code review