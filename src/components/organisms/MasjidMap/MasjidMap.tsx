/**
 * MasjidMap Organism
 *
 * Interactive map displaying masjids using MapLibre GL JS with OpenFreeMap tiles.
 */

import { useRef, useEffect, useCallback } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { cn } from '@/lib/utils'
import { MAP_CONFIG, MARKER_CONFIG } from '@/constants/map'
import { Loader2, AlertCircle } from '@/design-tokens'
import { useMapLibre } from './useMapLibre'
import type { Masjid, Region, Coordinates } from '@/types'

interface MasjidMapProps {
  /** Array of masjids to display as markers */
  masjids: Masjid[]
  /** Currently selected masjid */
  selectedMasjid?: Masjid | null
  /** Active region filters (empty = show all) */
  activeRegions?: Region[]
  /** Callback when a masjid marker is clicked */
  onMasjidSelect?: (masjid: Masjid) => void
  /** Callback when map view changes */
  onMapMove?: (center: Coordinates, zoom: number) => void
  /** Additional CSS classes */
  className?: string
}

// Store markers for cleanup
const markersMap = new Map<string, maplibregl.Marker>()

/**
 * Create a custom HTML marker element for a masjid.
 * Uses an inner div for visual styling so hover transforms
 * don't conflict with MapLibre's positioning transforms on the outer element.
 */
function createMarkerElement(
  masjid: Masjid,
  isSelected: boolean
): HTMLDivElement {
  const el = document.createElement('div')
  const inner = document.createElement('div')
  const size = isSelected ? MARKER_CONFIG.SELECTED_SIZE : MARKER_CONFIG.SIZE
  const color = MARKER_CONFIG.COLORS[masjid.region]

  el.className = 'masjid-marker'
  el.style.cssText = `cursor: pointer;`

  inner.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    background-color: ${color};
    border: 3px solid white;
    border-radius: 50%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  `

  // Add hover effect on inner element
  el.addEventListener('mouseenter', () => {
    inner.style.transform = 'scale(1.15)'
    inner.style.boxShadow = `0 4px 12px rgba(0, 0, 0, 0.4), 0 0 0 4px ${color}40`
  })
  el.addEventListener('mouseleave', () => {
    if (!isSelected) {
      inner.style.transform = 'scale(1)'
      inner.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3)'
    }
  })

  // Selected state styling on inner element
  if (isSelected) {
    inner.style.transform = 'scale(1.15)'
    inner.style.boxShadow = `0 4px 12px rgba(0, 0, 0, 0.4), 0 0 0 4px ${color}40`
  }

  // Accessibility
  el.setAttribute('role', 'button')
  el.setAttribute('aria-label', `${masjid.masjidName} - ${masjid.readerName}`)
  el.setAttribute('tabindex', '0')

  el.appendChild(inner)
  return el
}

export function MasjidMap({
  masjids,
  selectedMasjid,
  activeRegions = [],
  onMasjidSelect,
  onMapMove,
  className,
}: MasjidMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMapLoad = useCallback(() => {
    // Map is ready
  }, [])

  const handleMapError = useCallback((error: Error) => {
    console.error('Map error:', error)
  }, [])

  const { map, isLoading, error, flyTo } = useMapLibre({
    containerRef,
    onMapLoad: handleMapLoad,
    onMapError: handleMapError,
  })

  // Filter masjids by active regions
  const filteredMasjids =
    activeRegions.length === 0
      ? masjids
      : masjids.filter((m) => activeRegions.includes(m.region))

  // Update markers when map, masjids, or selection changes
  useEffect(() => {
    if (!map) return

    // Clear existing markers
    markersMap.forEach((marker) => marker.remove())
    markersMap.clear()

    // Add new markers
    filteredMasjids.forEach((masjid) => {
      const isSelected = selectedMasjid?.id === masjid.id
      const el = createMarkerElement(masjid, isSelected)

      // Handle click
      el.addEventListener('click', () => {
        onMasjidSelect?.(masjid)
      })

      // Handle keyboard
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onMasjidSelect?.(masjid)
        }
      })

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([masjid.coordinates.lng, masjid.coordinates.lat])
        .addTo(map)

      markersMap.set(masjid.id, marker)
    })

    // Cleanup on unmount
    return () => {
      markersMap.forEach((marker) => marker.remove())
      markersMap.clear()
    }
  }, [map, filteredMasjids, selectedMasjid, onMasjidSelect])

  // Fly to selected masjid, or zoom back out when dismissed
  const prevSelectedRef = useRef<Masjid | null | undefined>(undefined)

  useEffect(() => {
    if (selectedMasjid) {
      flyTo(selectedMasjid.coordinates)
    } else if (prevSelectedRef.current) {
      flyTo(MAP_CONFIG.CENTER, MAP_CONFIG.INITIAL_ZOOM)
    }
    prevSelectedRef.current = selectedMasjid
  }, [selectedMasjid, flyTo])

  // Track map movement
  useEffect(() => {
    if (!map || !onMapMove) return

    const handleMove = () => {
      const center = map.getCenter()
      const zoom = map.getZoom()
      onMapMove({ lat: center.lat, lng: center.lng }, zoom)
    }

    map.on('moveend', handleMove)

    return () => {
      map.off('moveend', handleMove)
    }
  }, [map, onMapMove])

  return (
    <div className={cn('w-full h-full relative', className)}>
      {/* Map container - always rendered so MapLibre can initialize */}
      <div
        ref={containerRef}
        className="w-full h-full"
        dir="ltr" // Map controls should be LTR
      />

      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-night-deep">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 text-gold animate-spin" />
            <p className="text-text-secondary text-sm">جاري تحميل الخريطة...</p>
          </div>
        </div>
      )}

      {/* Error overlay */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-night-deep">
          <div className="flex flex-col items-center gap-3 text-center px-6">
            <AlertCircle className="w-8 h-8 text-error" />
            <p className="text-text-primary font-medium">
              تعذر تحميل الخريطة
            </p>
            <p className="text-text-secondary text-sm">
              يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
