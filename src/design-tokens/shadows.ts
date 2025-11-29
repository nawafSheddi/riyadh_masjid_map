/**
 * Design Tokens: Shadows
 *
 * Soft shadows for depth and elevation in the Ramadan night theme.
 */

export const shadows = {
  // Elevation shadows
  soft: '0 4px 20px rgba(0, 0, 0, 0.4)',
  card: '0 8px 32px rgba(0, 0, 0, 0.5)',
  elevated: '0 12px 48px rgba(0, 0, 0, 0.6)',

  // Glow effects for highlights
  glow: {
    gold: '0 0 20px rgba(212, 168, 83, 0.3)',
    goldStrong: '0 0 30px rgba(212, 168, 83, 0.5)',
    blue: '0 0 20px rgba(59, 130, 246, 0.3)',
    green: '0 0 20px rgba(16, 185, 129, 0.3)',
    amber: '0 0 20px rgba(245, 158, 11, 0.3)',
  },

  // Focus rings
  focus: {
    gold: '0 0 0 3px rgba(212, 168, 83, 0.3)',
    default: '0 0 0 3px rgba(255, 255, 255, 0.1)',
  },

  // Inner shadows
  inner: {
    subtle: 'inset 0 2px 4px rgba(0, 0, 0, 0.2)',
    medium: 'inset 0 4px 8px rgba(0, 0, 0, 0.3)',
  },
} as const

export type ShadowKey = keyof typeof shadows
export type GlowKey = keyof typeof shadows.glow
