/**
 * Masjid Data Utilities
 *
 * Lookup and filtering functions for masjid data.
 * Used by page components and the build-time HTML generation script.
 */

import { MASJIDS } from '@/data/masjids'
import type { Masjid, Region } from '@/types'

export function getMasjidById(id: string): Masjid | undefined {
  return MASJIDS.find((m) => m.id === id)
}

export function getMasjidsByRegion(region: Region): Masjid[] {
  return MASJIDS.filter((m) => m.region === region)
}

export function getRelatedMasjids(masjid: Masjid, limit = 4): Masjid[] {
  return MASJIDS
    .filter((m) => m.region === masjid.region && m.id !== masjid.id)
    .slice(0, limit)
}

export function getAllMasjidIds(): string[] {
  return MASJIDS.map((m) => m.id)
}

export function getAllRegions(): Region[] {
  return ['north', 'east', 'westSouth']
}
