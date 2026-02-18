/**
 * HomePage
 *
 * Full-screen interactive map with region filters and masjid selection.
 */

import { useState } from 'react'
import { MasjidMap, BottomSheet, RegionFilterBar, SettingsSheet } from '@/components/organisms'
import { PageHead } from '@/components/seo'
import { useMasjidStore } from '@/stores/useMasjidStore'
import { Settings } from '@/design-tokens'
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from '@/lib/seo'

export default function HomePage() {
  const { masjids, selectedMasjid, activeRegions, selectMasjid, toggleRegion } =
    useMasjidStore()
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  return (
    <div className="h-screen w-screen relative overflow-hidden bg-night-deepest">
      <PageHead
        title={SITE_NAME}
        description={SITE_DESCRIPTION}
        canonicalUrl={`${SITE_URL}/`}
      />

      {/* SEO: visually-hidden heading for crawlers */}
      <h1 className="sr-only">خريطة مساجد الرياض - دليل القراء والمساجد</h1>

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

      {/* Settings button */}
      <button
        onClick={() => setIsSettingsOpen(true)}
        className="absolute bottom-4 left-4 z-10 w-10 h-10 rounded-full bg-night-medium border border-border-subtle flex items-center justify-center hover:bg-night-soft transition-colors"
        title="الإعدادات"
        aria-label="الإعدادات"
      >
        <Settings className="w-4 h-4 text-text-secondary" />
      </button>

      {/* Settings bottom sheet */}
      <SettingsSheet
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  )
}
