import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { MasjidMap, BottomSheet, RegionFilterBar } from '@/components/organisms'
import { useMasjidStore } from '@/stores/useMasjidStore'
import { Settings } from '@/design-tokens'

// Lazy load design system page (dev-only)
const DesignSystemPage = import.meta.env.DEV
  ? lazy(() => import('./pages/DesignSystemPage'))
  : null

function HomePage() {
  const { masjids, selectedMasjid, activeRegions, selectMasjid, toggleRegion } =
    useMasjidStore()

  return (
    <div className="h-screen w-screen relative overflow-hidden bg-night-deepest">
      {/* Full-screen map */}
      <MasjidMap
        masjids={masjids}
        selectedMasjid={selectedMasjid}
        activeRegions={activeRegions}
        onMasjidSelect={selectMasjid}
        className="absolute inset-0"
      />

      {/* Region filters overlaid at top */}
      <RegionFilterBar
        activeRegions={activeRegions}
        onToggleRegion={toggleRegion}
        className="absolute top-4 right-4 left-4 z-10"
      />

      {/* Bottom sheet for selected masjid */}
      <BottomSheet
        masjid={selectedMasjid}
        isOpen={selectedMasjid !== null}
        onClose={() => selectMasjid(null)}
      />

      {/* Dev-only design system link */}
      {import.meta.env.DEV && (
        <Link
          to="/design-system"
          className="absolute bottom-4 left-4 z-10 w-10 h-10 rounded-full bg-night-medium border border-border-subtle flex items-center justify-center hover:bg-night-soft transition-colors"
          title="نظام التصميم"
        >
          <Settings className="w-4 h-4 text-text-secondary" />
        </Link>
      )}
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
