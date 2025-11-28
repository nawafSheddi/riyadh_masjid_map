/**
 * Design Tokens: Colors
 *
 * Single source of truth for all color decisions.
 * Follow semantic naming: describe PURPOSE, not appearance.
 */

export const colors = {
  brand: {
    primary: '#1a1a1a',
    accent: '#10b981',
  },

  semantic: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },

  region: {
    north: '#10b981',      // Green - الشمال
    east: '#3b82f6',       // Blue - الشرق
    westSouth: '#f59e0b',  // Amber - الغرب والجنوب
  },

  neutral: {
    border: {
      light: 'rgba(0, 0, 0, 0.1)',
      dark: 'rgba(255, 255, 255, 0.1)',
    },
    disabled: {
      light: 'rgba(0, 0, 0, 0.4)',
      dark: 'rgba(255, 255, 255, 0.4)',
    },
  },
} as const

export type RegionKey = keyof typeof colors.region
