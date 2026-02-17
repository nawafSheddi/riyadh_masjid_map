/**
 * Map Constants
 *
 * Configuration for MapLibre GL JS and OpenFreeMap.
 */

export const MAP_CONFIG = {
  // Riyadh city center coordinates
  CENTER: {
    lng: 46.6753,
    lat: 24.7136,
  },

  // Initial zoom level to show all of Riyadh
  INITIAL_ZOOM: 11,

  // Min/max zoom bounds
  MIN_ZOOM: 9,
  MAX_ZOOM: 18,

  // Map bounds (approximate Riyadh bounds)
  BOUNDS: {
    southwest: { lng: 46.3, lat: 24.4 },
    northeast: { lng: 47.1, lat: 25.1 },
  },

  // Style URL (local custom style)
  STYLE_URL: '/styles/masjid-map-style.json',

  // OpenFreeMap tile source (fallback)
  OPENFREEMAP_STYLE: 'https://tiles.openfreemap.org/styles/dark',
} as const

export const MARKER_CONFIG = {
  // Marker colors by region
  COLORS: {
    north: '#10B981',      // Green
    east: '#3B82F6',       // Blue
    westSouth: '#F59E0B',  // Amber
  },

  // Marker size
  SIZE: 24,

  // Selected marker size
  SELECTED_SIZE: 32,
} as const

export const REGION_LABELS = {
  north: 'الشمال',
  east: 'الشرق',
  westSouth: 'الغرب والجنوب',
} as const

export type Region = keyof typeof REGION_LABELS
