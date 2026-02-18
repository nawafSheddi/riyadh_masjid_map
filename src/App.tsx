import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import HomePage from '@/pages/HomePage'

// Lazy load pages for code splitting
const MasjidDetailPage = lazy(() => import('./pages/MasjidDetailPage'))
const RegionListingPage = lazy(() => import('./pages/RegionListingPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

// Lazy load design system page (dev-only)
const DesignSystemPage = import.meta.env.DEV
  ? lazy(() => import('./pages/DesignSystemPage'))
  : null

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
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/masjid/:id" element={<MasjidDetailPage />} />
          <Route path="/region/:region" element={<RegionListingPage />} />
          {/* Design system route - only available in development */}
          {import.meta.env.DEV && DesignSystemPage && (
            <Route path="/design-system" element={<DesignSystemPage />} />
          )}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
