/**
 * Design Tokens: Colors
 *
 * Ramadan Night Theme - Dark blue night sky with warm gold accents.
 * Single source of truth for all color decisions.
 * Follow semantic naming: describe PURPOSE, not appearance.
 */

export const colors = {
  // Ramadan Night Theme - Primary backgrounds
  ramadan: {
    night: {
      deepest: '#0a0f1a',    // Main app background
      deep: '#0f172a',        // Cards, elevated surfaces
      medium: '#1e293b',      // Secondary backgrounds
      soft: '#334155',        // Tertiary elements, borders
    },
    gold: {
      DEFAULT: '#d4a853',     // Primary accent
      bright: '#f5c869',      // CTAs, highlights
      muted: '#a68b3d',       // Subtle borders, secondary accents
      glow: 'rgba(212, 168, 83, 0.2)', // Glow effects
    },
    text: {
      primary: '#f8fafc',     // Primary text (off-white)
      secondary: '#cbd5e1',   // Secondary text
      muted: '#64748b',       // Muted/disabled text
    },
    border: {
      subtle: 'rgba(255, 255, 255, 0.08)',
      DEFAULT: 'rgba(255, 255, 255, 0.12)',
      strong: 'rgba(255, 255, 255, 0.2)',
    },
  },

  // Semantic colors - Status indicators
  semantic: {
    success: '#10b981',  // Green
    warning: '#f59e0b',  // Amber
    error: '#ef4444',    // Red
    info: '#3b82f6',     // Blue
  },

  // Region colors - For masjid markers
  region: {
    north: '#10b981',      // Green - الشمال
    east: '#3b82f6',       // Blue - الشرق
    westSouth: '#f59e0b',  // Amber - الغرب والجنوب
  },

  // Component state colors
  state: {
    hover: 'rgba(255, 255, 255, 0.05)',
    active: 'rgba(255, 255, 255, 0.1)',
    focus: 'rgba(212, 168, 83, 0.3)',  // Gold focus ring
    disabled: 'rgba(255, 255, 255, 0.3)',
  },
} as const

export type RegionKey = keyof typeof colors.region
export type RamadanNightKey = keyof typeof colors.ramadan.night
export type RamadanGoldKey = keyof typeof colors.ramadan.gold
