/**
 * Design Tokens: Spacing & Border Radius
 *
 * Consistent spacing scale based on mathematical rhythm.
 * Generous rounded corners for the Ramadan night theme.
 */

export const spacing = {
  base: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px',
    '4xl': '96px',
  },

  component: {
    button: {
      sm: { x: '12px', y: '8px' },
      md: { x: '16px', y: '12px' },
      lg: { x: '24px', y: '16px' },
    },
    card: {
      padding: '24px',
      gap: '16px',
    },
    input: {
      padding: '12px 16px',
    },
    popup: {
      padding: '16px',
      gap: '12px',
    },
    bottomSheet: {
      padding: '24px',
      handleHeight: '4px',
      handleWidth: '40px',
    },
    filterPill: {
      padding: '8px 16px',
      gap: '8px',
    },
  },

  touch: {
    minimum: '44px',
    comfortable: '48px',
  },
} as const

/**
 * Border Radius - Generous rounded corners
 */
export const radius = {
  none: '0px',
  sm: '8px',       // Small elements, badges
  md: '12px',      // Buttons, inputs
  lg: '16px',      // Cards
  xl: '24px',      // Large cards, modals
  '2xl': '32px',   // Bottom sheet
  full: '9999px',  // Pills, avatars, circular elements
} as const

export type SpacingKey = keyof typeof spacing.base
export type RadiusKey = keyof typeof radius
