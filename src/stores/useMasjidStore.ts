/**
 * Masjid Store
 *
 * Global state management for masjid selection and region filtering.
 */

import { create } from 'zustand'
import { MASJIDS } from '@/data/masjids'
import type { Masjid, Region } from '@/types'

interface MasjidState {
  masjids: Masjid[]
  selectedMasjid: Masjid | null
  activeRegions: Region[]

  selectMasjid: (masjid: Masjid | null) => void
  toggleRegion: (region: Region) => void
}

export const useMasjidStore = create<MasjidState>((set) => ({
  masjids: MASJIDS,
  selectedMasjid: null,
  activeRegions: [],

  selectMasjid: (masjid) => set({ selectedMasjid: masjid }),

  toggleRegion: (region) =>
    set((state) => ({
      activeRegions: state.activeRegions.includes(region)
        ? state.activeRegions.filter((r) => r !== region)
        : [...state.activeRegions, region],
    })),
}))
