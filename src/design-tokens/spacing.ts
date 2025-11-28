/**
 * Design Tokens: Spacing
 *
 * Consistent spacing scale based on mathematical rhythm.
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
  },

  touch: {
    minimum: '44px',
    comfortable: '48px',
  },
} as const
