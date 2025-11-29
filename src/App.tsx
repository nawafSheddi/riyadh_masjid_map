import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { lazy, Suspense } from 'react'

// Lazy load design system page (dev-only)
const DesignSystemPage = import.meta.env.DEV
  ? lazy(() => import('./pages/DesignSystemPage'))
  : null

function HomePage() {
  return (
    <div className="min-h-screen bg-night-deepest text-text-primary" dir="rtl">
      <header className="p-4 border-b border-border-subtle">
        <h1 className="text-2xl font-bold text-center text-gold">خريطة مساجد الرياض</h1>
      </header>
      <main className="p-4">
        <p className="text-center text-text-secondary">
          جاري تحميل الخريطة...
        </p>

        {/* Dev-only link to design system */}
        {import.meta.env.DEV && (
          <div className="mt-8 text-center">
            <Link
              to="/design-system"
              className="inline-block px-4 py-2 bg-gold text-night-deepest rounded-lg hover:bg-gold-bright transition-colors"
            >
              عرض نظام التصميم
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-night-deepest flex items-center justify-center">
      <div className="text-gold text-lg">جاري التحميل...</div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Design system route - only available in development */}
        {import.meta.env.DEV && DesignSystemPage && (
          <Route
            path="/design-system"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <DesignSystemPage />
              </Suspense>
            }
          />
        )}
      </Routes>
    </BrowserRouter>
  )
}

export default App
