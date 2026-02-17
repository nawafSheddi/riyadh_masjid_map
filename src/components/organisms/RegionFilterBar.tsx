/**
 * RegionFilterBar Organism
 *
 * Horizontal row of FilterPills for toggling region visibility on the map.
 */

import { cn } from '@/lib/utils'
import { FilterPill } from '@/components/ui'
import { REGION_LABELS, MARKER_CONFIG } from '@/constants/map'
import type { Region } from '@/types'

interface RegionFilterBarProps {
  activeRegions: Region[]
  onToggleRegion: (region: Region) => void
  className?: string
}

const REGIONS = Object.keys(REGION_LABELS) as Region[]

export function RegionFilterBar({
  activeRegions,
  onToggleRegion,
  className,
}: RegionFilterBarProps) {
  return (
    <div className={cn('flex gap-2', className)} dir="rtl">
      {REGIONS.map((region) => (
        <FilterPill
          key={region}
          selected={activeRegions.includes(region)}
          onClick={() => onToggleRegion(region)}
        >
          <span
            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: MARKER_CONFIG.COLORS[region] }}
          />
          {REGION_LABELS[region]}
        </FilterPill>
      ))}
    </div>
  )
}
