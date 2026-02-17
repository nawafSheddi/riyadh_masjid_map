/**
 * Masjid Types
 *
 * TypeScript definitions for masjid data structure.
 */

import type { Region } from '@/constants/map'

export type { Region }

/**
 * Geographic coordinates
 */
export interface Coordinates {
  lat: number
  lng: number
}

/**
 * Masjid data structure
 *
 * Represents a single masjid with reader information, location, and audio.
 */
export interface Masjid {
  /** Unique identifier */
  id: string

  /** Reader/Imam name (القارئ) */
  readerName: string

  /** Mosque name (الجامع) */
  masjidName: string

  /** Region classification */
  region: Region

  /** Geographic coordinates */
  coordinates: Coordinates

  /** Google Maps URL for navigation */
  googleMapsUrl: string

  /** Audio file URL for Quran recitation sample */
  audioUrl: string

  /** Optional additional notes */
  notes?: string
}

/**
 * Map viewport state
 */
export interface MapViewState {
  center: Coordinates
  zoom: number
}

/**
 * Region filter state - supports multi-select
 */
export type RegionFilter = Region[]
