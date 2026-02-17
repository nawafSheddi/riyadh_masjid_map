/**
 * useMapLibre Hook
 *
 * Initializes and manages MapLibre GL JS map instance.
 */

import { useEffect, useRef, useState, useCallback } from 'react'
import maplibregl from 'maplibre-gl'
import { MAP_CONFIG } from '@/constants/map'
import type { Coordinates } from '@/types'

interface UseMapLibreOptions {
  /** Container element ref */
  containerRef: React.RefObject<HTMLDivElement | null>
  /** Callback when map is ready */
  onMapLoad?: () => void
  /** Callback when map errors */
  onMapError?: (error: Error) => void
}

interface UseMapLibreReturn {
  /** Map instance (null until loaded) */
  map: maplibregl.Map | null
  /** Loading state */
  isLoading: boolean
  /** Error state */
  error: Error | null
  /** Fly to specific coordinates */
  flyTo: (coordinates: Coordinates, zoom?: number) => void
}

export function useMapLibre({
  containerRef,
  onMapLoad,
  onMapError,
}: UseMapLibreOptions): UseMapLibreReturn {
  const mapRef = useRef<maplibregl.Map | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  // Initialize map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    try {
      const map = new maplibregl.Map({
        container: containerRef.current,
        style: MAP_CONFIG.OPENFREEMAP_STYLE,
        center: [MAP_CONFIG.CENTER.lng, MAP_CONFIG.CENTER.lat],
        zoom: MAP_CONFIG.INITIAL_ZOOM,
        minZoom: MAP_CONFIG.MIN_ZOOM,
        maxZoom: MAP_CONFIG.MAX_ZOOM,
        maxBounds: [
          [MAP_CONFIG.BOUNDS.southwest.lng, MAP_CONFIG.BOUNDS.southwest.lat],
          [MAP_CONFIG.BOUNDS.northeast.lng, MAP_CONFIG.BOUNDS.northeast.lat],
        ],
        attributionControl: false,
      })

      // Add compact attribution
      map.addControl(
        new maplibregl.AttributionControl({ compact: true }),
        'bottom-left'
      )

      // Add navigation controls (zoom buttons)
      map.addControl(
        new maplibregl.NavigationControl({ showCompass: false }),
        'bottom-right'
      )

      map.on('load', () => {
        setIsLoading(false)
        onMapLoad?.()
      })

      map.on('error', (e) => {
        const mapError = new Error(e.error?.message || 'Map failed to load')
        setError(mapError)
        setIsLoading(false)
        onMapError?.(mapError)
      })

      mapRef.current = map
    } catch (err) {
      const initError = err instanceof Error ? err : new Error('Failed to initialize map')
      setError(initError)
      setIsLoading(false)
      onMapError?.(initError)
    }

    // Cleanup
    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [containerRef, onMapLoad, onMapError])

  // Fly to coordinates
  const flyTo = useCallback((coordinates: Coordinates, zoom?: number) => {
    if (!mapRef.current) return

    mapRef.current.flyTo({
      center: [coordinates.lng, coordinates.lat],
      zoom: zoom ?? MAP_CONFIG.MAX_ZOOM - 2,
      duration: 1000,
    })
  }, [])

  return {
    map: mapRef.current,
    isLoading,
    error,
    flyTo,
  }
}
