# Tech Stack Alternatives - Decision Guide

> **Reference**: Compare alternative technologies and frameworks
> **Purpose**: Help you make informed decisions for your specific needs
> **Estimated Reading**: 15-20 minutes

---

## 📋 Overview

This guide provides **objective comparisons** of alternative technologies to those recommended in the main setup guides. Use this to:

- Understand why specific technologies were chosen
- Evaluate alternatives for your use case
- Make informed migration decisions
- Learn trade-offs between options

**Note**: This template uses **Vite + React + Tailwind + Zustand**, but these comparisons help you understand when alternatives might be better.

---

## 🔧 Build Tools & Bundlers

### Recommended: **Vite**

### Comparison Matrix

| Feature | Vite | Next.js | Create React App |
|---------|------|---------|------------------|
| **Dev Server Speed** | ⚡ Instant (ESM) | 🟡 Fast | 🔴 Slow (webpack) |
| **Build Speed** | ⚡ Very Fast | 🟡 Moderate | 🔴 Slow |
| **HMR Performance** | ⚡ Instant | 🟢 Fast | 🟡 Moderate |
| **Bundle Size** | ⚡ Optimized | 🟢 Good | 🟡 Larger |
| **Configuration** | ✅ Simple | 🟡 Complex | ✅ Zero-config |
| **SSR/SSG** | ❌ Manual | ✅ Built-in | ❌ Not supported |
| **Learning Curve** | ✅ Easy | 🔴 Steep | ✅ Easy |
| **Production Ready** | ✅ Yes | ✅ Yes | ⚠️ Deprecated |
| **File-based Routing** | ❌ Manual | ✅ Built-in | ❌ Manual |
| **API Routes** | ❌ No | ✅ Built-in | ❌ No |
| **Best For** | SPAs, Fast dev | Full-stack apps | Legacy projects |

---

### Vite

**When to Use**:
- ✅ Single-page applications (SPAs)
- ✅ Client-side rendering
- ✅ Need fastest development experience
- ✅ Want simple configuration
- ✅ Building component libraries

**Pros**:
- ⚡ Lightning-fast dev server (no bundling)
- 🔥 Instant hot module replacement (HMR)
- 📦 Rollup-based production builds (optimized)
- 🎯 Simple configuration
- 🔌 Rich plugin ecosystem
- 📱 Built-in TypeScript support
- 🌐 Modern browser focus

**Cons**:
- ❌ No built-in SSR/SSG
- ❌ Manual routing setup
- ❌ No API routes
- ❌ Requires separate backend

**Code Example**:
```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
})
```

---

### Next.js

**When to Use**:
- ✅ Need server-side rendering (SSR)
- ✅ Static site generation (SSG)
- ✅ SEO is critical
- ✅ Full-stack application (API + frontend)
- ✅ File-based routing desired
- ✅ Image optimization needed

**Pros**:
- 🚀 Built-in SSR and SSG
- 📁 File-based routing
- 🌐 API routes (backend in same repo)
- 🖼️ Image optimization
- 📊 Analytics and monitoring
- 🎯 Production-proven at scale
- 🔍 Excellent SEO support

**Cons**:
- 🐌 Slower dev server than Vite
- 📚 Steeper learning curve
- 🔧 More complex configuration
- 💰 Vendor lock-in (Vercel optimizations)
- 📦 Larger bundle sizes

**Code Example**:
```typescript
// next.config.js
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['example.com'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.example.com/:path*',
      },
    ]
  },
}
```

---

### Create React App (CRA)

**Status**: ⚠️ **Not recommended for new projects** (maintenance mode)

**When to Use**:
- 🔧 Maintaining legacy projects only
- 📚 Following older tutorials

**Pros**:
- ✅ Zero configuration
- 📖 Extensive documentation
- 🎓 Great for learning

**Cons**:
- 🔴 **Deprecated** by React team
- 🐌 Slow build times
- 🐌 Slow dev server
- 📦 Large bundle sizes
- 🔧 Hard to configure (eject required)
- ⏰ Outdated tooling

**Migration Path**: CRA → Vite
```bash
# 1. Remove CRA
npm uninstall react-scripts

# 2. Install Vite
npm install -D vite @vitejs/plugin-react

# 3. Update index.html and scripts
# 4. Follow guide 03 for Vite setup
```

---

### Decision Tree

```
Need SSR/SSG or file-based routing?
├─ Yes → Use Next.js
│   └─ Building full-stack app with API?
│       ├─ Yes → Next.js (perfect fit)
│       └─ No → Consider Vite + separate backend
│
└─ No → Need fastest dev experience?
    ├─ Yes → Use Vite (recommended)
    └─ No → Legacy project?
        ├─ Yes → Keep CRA, plan migration
        └─ No → Use Vite
```

---

## 🎨 Styling Solutions

### Recommended: **Tailwind CSS**

### Comparison Matrix

| Feature | Tailwind CSS | CSS-in-JS (styled-components) | Vanilla CSS/SCSS |
|---------|-------------|-------------------------------|------------------|
| **Setup Complexity** | 🟡 Moderate | 🔴 Complex | ✅ Simple |
| **Learning Curve** | 🟡 Moderate | 🔴 Steep | ✅ Easy |
| **Performance** | ⚡ Excellent | 🔴 Runtime overhead | ⚡ Excellent |
| **Bundle Size** | ⚡ Tiny (purged) | 🔴 Large | ⚡ Small |
| **Type Safety** | ❌ No | ✅ Yes | ❌ No |
| **Theme Switching** | ✅ CSS vars | ✅ JS context | 🟡 Manual |
| **Developer Experience** | ✅ Great | ✅ Great | 🟡 Good |
| **Reusability** | ✅ Utility classes | ✅ Components | 🟡 Manual |
| **Maintenance** | ✅ Easy | 🟡 Moderate | 🔴 Hard |
| **Best For** | Rapid development | Component libraries | Simple sites |

---

### Tailwind CSS

**When to Use**:
- ✅ Rapid prototyping
- ✅ Design system with tokens
- ✅ Team consistency
- ✅ Performance-critical apps
- ✅ Don't need runtime theming

**Pros**:
- ⚡ Tiny production bundles (purged CSS)
- 🎨 Consistent design system
- 🚀 Rapid development
- 📱 Mobile-first approach
- 🔌 Rich plugin ecosystem
- 🎯 No naming conventions needed
- 🌐 Dark mode built-in

**Cons**:
- 📝 Verbose HTML classes
- 🎓 Learning curve for utility-first
- ❌ No built-in type safety
- 🔧 Requires build step

**Code Example**:
```tsx
// Using Tailwind with design tokens
<button className="
  px-4 py-2
  bg-accent text-white
  rounded-md
  hover:bg-accent-dark
  transition-colors
  min-h-touch
">
  Click Me
</button>
```

---

### CSS-in-JS (styled-components, Emotion)

**When to Use**:
- ✅ Need runtime theming
- ✅ Building component library
- ✅ Want type-safe styles
- ✅ Dynamic styling based on props
- ✅ Scoped styles critical

**Pros**:
- ✅ Type-safe styling (TypeScript)
- 🎯 Scoped styles (no conflicts)
- 🎨 Dynamic styling
- 🔄 Runtime theme switching
- 📦 Component-based
- 🎭 Server-side rendering support

**Cons**:
- 📦 Large bundle size (runtime)
- 🐌 Runtime performance overhead
- 🔴 More complex setup
- 💾 Increased JavaScript payload
- 🎓 Steeper learning curve

**Code Example**:
```typescript
// styled-components
import styled from 'styled-components'

const Button = styled.button<{ variant: 'primary' | 'secondary' }>`
  padding: 0.5rem 1rem;
  background: ${props => props.variant === 'primary'
    ? props.theme.colors.accent
    : 'transparent'};
  color: ${props => props.theme.colors.foreground};
  border-radius: 0.5rem;

  &:hover {
    opacity: 0.9;
  }
`
```

---

### Vanilla CSS/SCSS

**When to Use**:
- ✅ Simple projects
- ✅ No build step desired
- ✅ Team familiar with CSS
- ✅ Maximum performance

**Pros**:
- ✅ No dependencies
- ⚡ Zero runtime overhead
- 🎓 Easy learning curve
- 🔧 Simple setup
- 📏 Full CSS control

**Cons**:
- 🔧 Manual organization needed
- ❌ No scoping (global styles)
- 🐛 Naming convention critical (BEM, etc.)
- 🔄 Manual theme switching
- 📦 Can grow large without purging

**Code Example**:
```scss
// Using BEM methodology
.button {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: opacity 0.2s;

  &--primary {
    background: var(--color-accent);
    color: white;
  }

  &--secondary {
    background: transparent;
    border: 1px solid var(--color-border);
  }

  &:hover {
    opacity: 0.9;
  }
}
```

---

### Decision Tree

```
Need runtime theming (user-configurable colors)?
├─ Yes → CSS-in-JS
│   └─ Building component library?
│       ├─ Yes → styled-components
│       └─ No → Consider Tailwind + CSS vars
│
└─ No → Need rapid development?
    ├─ Yes → Tailwind CSS (recommended)
    │   └─ Use CSS custom properties for themes
    └─ No → Simple project?
        ├─ Yes → Vanilla CSS/SCSS
        └─ No → Tailwind CSS
```

---

## 🗂️ State Management

### Recommended: **Zustand**

### Comparison Matrix

| Feature | Zustand | Redux Toolkit | Context API | Jotai |
|---------|---------|---------------|-------------|-------|
| **Setup Complexity** | ✅ Minimal | 🟡 Moderate | ✅ Simple | ✅ Simple |
| **Boilerplate** | ✅ Minimal | 🔴 Verbose | ✅ Minimal | ✅ Minimal |
| **Learning Curve** | ✅ Easy | 🔴 Steep | ✅ Easy | 🟡 Moderate |
| **Performance** | ⚡ Excellent | ⚡ Excellent | 🔴 Re-renders | ⚡ Excellent |
| **DevTools** | 🟡 Basic | ✅ Excellent | ❌ None | 🟡 Basic |
| **TypeScript** | ✅ Great | ✅ Excellent | 🟡 Manual | ✅ Great |
| **Bundle Size** | ⚡ 1.2KB | 🔴 11KB | ⚡ 0KB (built-in) | ⚡ 3KB |
| **Async Support** | ✅ Built-in | ✅ Thunks/Saga | 🟡 Manual | ✅ Built-in |
| **Best For** | Small-medium apps | Large apps | Simple state | Atomic state |

---

### Zustand

**When to Use**:
- ✅ Small to medium applications
- ✅ Want minimal boilerplate
- ✅ Need simple global state
- ✅ Performance-critical
- ✅ Easy learning curve desired

**Pros**:
- ⚡ Tiny bundle (1.2KB)
- 🎯 Minimal boilerplate
- 🚀 Easy to learn
- ⚡ No providers needed
- 🎨 Flexible patterns
- 🔧 Simple async handling
- 📦 Built-in persist middleware

**Cons**:
- 🔧 Less opinionated
- 🛠️ Basic DevTools
- 📚 Smaller ecosystem than Redux
- 🎓 Fewer learning resources

**Code Example**:
```typescript
// stores/useAuthStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,

      login: async (email, password) => {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
        })
        const data = await response.json()
        set({ user: data.user, token: data.token })
      },

      logout: () => set({ user: null, token: null }),
    }),
    { name: 'auth-storage' }
  )
)

// Usage in component
function ProfileButton() {
  const user = useAuthStore(state => state.user)
  const logout = useAuthStore(state => state.logout)

  return <button onClick={logout}>{user?.name}</button>
}
```

---

### Redux Toolkit

**When to Use**:
- ✅ Large-scale applications
- ✅ Complex state logic
- ✅ Need time-travel debugging
- ✅ Team familiar with Redux
- ✅ Strict patterns required

**Pros**:
- 🛠️ Excellent DevTools
- 📚 Mature ecosystem
- 🎯 Well-defined patterns
- 📖 Extensive documentation
- 🔄 Time-travel debugging
- 🏢 Industry standard
- 🎓 Many learning resources

**Cons**:
- 📦 Large bundle (11KB)
- 📝 More boilerplate
- 🎓 Steeper learning curve
- 🔧 More complex setup
- 🐌 Provider overhead

**Code Example**:
```typescript
// features/auth/authSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: LoginCredentials) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
    return response.json()
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null, status: 'idle' },
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.token = action.payload.token
        state.status = 'succeeded'
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
```

---

### Context API

**When to Use**:
- ✅ Simple global state (theme, language)
- ✅ No external dependencies desired
- ✅ Small applications
- ✅ Learning React basics

**Pros**:
- ✅ Built into React (0KB)
- 🎓 Easy to understand
- 🔧 No setup required
- 📚 Official React pattern

**Cons**:
- 🔴 Performance issues (re-renders)
- 🔧 Manual optimization needed
- 📝 Verbose for complex state
- ❌ No DevTools
- 🔴 Provider nesting hell

**Code Example**:
```typescript
// contexts/AuthContext.tsx
import { createContext, useContext, useState } from 'react'

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = async (email: string, password: string) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
    const data = await response.json()
    setUser(data.user)
  }

  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
```

---

### Jotai

**When to Use**:
- ✅ Atomic state pattern preferred
- ✅ Bottom-up state management
- ✅ React Suspense integration
- ✅ TypeScript-first approach

**Pros**:
- ⚡ Small bundle (3KB)
- 🎯 Atomic approach
- ⚡ No providers needed
- 🔄 React Suspense support
- ✅ TypeScript-first
- ⚡ Excellent performance

**Cons**:
- 🎓 Different mental model
- 📚 Smaller community
- 🔧 Less tooling
- 📖 Fewer examples

**Code Example**:
```typescript
// atoms/authAtom.ts
import { atom } from 'jotai'

export const userAtom = atom<User | null>(null)
export const tokenAtom = atom<string | null>(null)

export const loginAtom = atom(
  null,
  async (get, set, { email, password }: LoginCredentials) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
    const data = await response.json()
    set(userAtom, data.user)
    set(tokenAtom, data.token)
  }
)

// Usage
function ProfileButton() {
  const [user] = useAtom(userAtom)
  const [, login] = useAtom(loginAtom)

  return <button>{user?.name}</button>
}
```

---

### Decision Tree

```
Application size?
├─ Large (>50 components) → Redux Toolkit
│   └─ Team familiar with Redux?
│       ├─ Yes → Redux Toolkit
│       └─ No → Consider Zustand
│
├─ Medium (20-50 components) → Zustand (recommended)
│   └─ Need DevTools?
│       ├─ Critical → Redux Toolkit
│       └─ Nice to have → Zustand
│
└─ Small (<20 components) → Context API or Zustand
    └─ State complexity?
        ├─ Simple (theme, language) → Context API
        └─ Complex → Zustand
```

---

## 🧭 Routing

### Recommended: **React Router**

### Comparison Matrix

| Feature | React Router | TanStack Router | Wouter |
|---------|--------------|-----------------|--------|
| **Setup Complexity** | ✅ Simple | 🟡 Moderate | ✅ Very Simple |
| **Type Safety** | 🟡 Manual | ✅ Built-in | ❌ Minimal |
| **Bundle Size** | 🔴 11KB | 🟡 8KB | ⚡ 1.5KB |
| **Data Loading** | 🟡 Manual | ✅ Built-in | ❌ Manual |
| **Nested Routes** | ✅ Yes | ✅ Yes | 🟡 Limited |
| **Code Splitting** | ✅ Easy | ✅ Easy | ✅ Easy |
| **DevTools** | ❌ No | ✅ Yes | ❌ No |
| **Learning Curve** | ✅ Easy | 🔴 Moderate | ✅ Very Easy |
| **Best For** | General use | Type-safe apps | Tiny apps |

---

### React Router (v6)

**When to Use**:
- ✅ Standard routing needs
- ✅ Nested routes required
- ✅ Industry-standard desired
- ✅ Large ecosystem needed

**Pros**:
- 🏢 Industry standard
- 📚 Extensive documentation
- 🔌 Rich ecosystem
- 🎯 Nested routes
- 📦 Code splitting support
- 🎓 Many learning resources

**Cons**:
- 📦 Larger bundle (11KB)
- 🔧 More features than needed
- ❌ No built-in type safety
- ❌ No DevTools

**Code Example**:
```typescript
// App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/users/:id" element={<UserProfile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
```

---

### TanStack Router

**When to Use**:
- ✅ Need full type safety
- ✅ Data loading patterns
- ✅ Search param validation
- ✅ Advanced routing needs

**Pros**:
- ✅ Full TypeScript support
- 🔒 Type-safe params
- 📦 Built-in data loading
- 🛠️ Excellent DevTools
- ⚡ Modern architecture
- 🔍 Search param validation

**Cons**:
- 🎓 Steeper learning curve
- 📚 Smaller community
- 🔧 More complex setup
- 📖 Less documentation

---

### Wouter

**When to Use**:
- ✅ Tiny bundle size critical
- ✅ Simple routing only
- ✅ No advanced features needed

**Pros**:
- ⚡ Tiny (1.5KB)
- 🎯 Simple API
- ⚡ Fast
- ✅ Hook-based

**Cons**:
- 🔧 Limited features
- 📚 Small ecosystem
- ❌ No type safety
- 🔧 Manual data loading

---

## 📊 Migration Guides

### CRA to Vite

**Time**: ~2 hours

**Steps**:
1. Install Vite and plugins
2. Move `public/index.html` to root
3. Update import paths
4. Configure vite.config.ts
5. Update package.json scripts
6. Test and fix issues

**Detailed guide**: See [03-tech-stack-configuration.md](../03-tech-stack-configuration.md)

---

### Redux to Zustand

**Time**: ~4-8 hours depending on app size

**Steps**:
1. Install Zustand
2. Create equivalent stores
3. Replace Redux patterns
4. Update component hooks
5. Remove Redux dependencies
6. Test thoroughly

**Pattern Mapping**:
```typescript
// Redux → Zustand
useSelector(state => state.auth.user) → useAuthStore(state => state.user)
dispatch(login()) → useAuthStore.getState().login()
```

---

### Tailwind to CSS-in-JS

**Time**: ~8-16 hours depending on app size
**Recommendation**: Generally not recommended (performance regression)

---

## 🎯 Recommendations Summary

### For Most Projects (SPA)
- **Build**: Vite ✅
- **Styling**: Tailwind CSS ✅
- **State**: Zustand ✅
- **Routing**: React Router ✅

### For Full-Stack with SEO
- **Build**: Next.js ✅
- **Styling**: Tailwind CSS ✅
- **State**: Zustand or Redux Toolkit
- **Routing**: Next.js (built-in) ✅

### For Component Libraries
- **Build**: Vite ✅
- **Styling**: CSS-in-JS (styled-components) ✅
- **State**: None (let consumers decide)
- **Routing**: N/A

### For Maximum Performance
- **Build**: Vite ✅
- **Styling**: Tailwind CSS ✅
- **State**: Zustand ✅
- **Routing**: Wouter ✅

---

## ❓ FAQ

**Q: Can I use Next.js with this template?**
A: Yes, but you'll need to adapt the guides. Next.js has its own conventions for routing, API routes, and configuration.

**Q: Should I migrate from CRA to Vite?**
A: Yes, especially for new features. The performance improvement is significant. Plan 2-4 hours for migration.

**Q: Is Redux still relevant in 2024?**
A: Yes, for large applications with complex state. But Zustand is often sufficient and simpler.

**Q: Can I use both Tailwind and CSS-in-JS?**
A: Technically yes, but not recommended. Choose one approach for consistency.

---

**Last Updated**: 2025-11-28
**Next**: [Component Patterns Reference](./component-patterns.md)
