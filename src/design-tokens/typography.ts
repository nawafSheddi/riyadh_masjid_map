/**
 * Design Tokens: Typography
 *
 * Font sizes, weights, and line heights.
 */

export const typography = {
  fontFamily: {
    sans: ['Cairo', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
  },

  headings: {
    h1: {
      fontSize: '2rem',
      lineHeight: '1.2',
      fontWeight: '700',
    },
    h2: {
      fontSize: '1.75rem',
      lineHeight: '1.2',
      fontWeight: '600',
    },
    h3: {
      fontSize: '1.5rem',
      lineHeight: '1.2',
      fontWeight: '600',
    },
    h4: {
      fontSize: '1.25rem',
      lineHeight: '1.3',
      fontWeight: '500',
    },
    h5: {
      fontSize: '1.125rem',
      lineHeight: '1.3',
      fontWeight: '500',
    },
    h6: {
      fontSize: '1rem',
      lineHeight: '1.3',
      fontWeight: '500',
    },
  },

  body: {
    large: {
      fontSize: '1.125rem',
      lineHeight: '1.5',
      fontWeight: '400',
    },
    base: {
      fontSize: '1rem',
      lineHeight: '1.5',
      fontWeight: '400',
    },
    small: {
      fontSize: '0.875rem',
      lineHeight: '1.5',
      fontWeight: '400',
    },
    xsmall: {
      fontSize: '0.75rem',
      lineHeight: '1.4',
      fontWeight: '400',
    },
  },

  special: {
    caption: {
      fontSize: '0.75rem',
      lineHeight: '1.4',
      fontWeight: '400',
    },
    label: {
      fontSize: '0.875rem',
      lineHeight: '1.4',
      fontWeight: '500',
    },
  },
} as const
