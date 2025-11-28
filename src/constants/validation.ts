/**
 * Validation Constants
 *
 * Validation rules, limits, and constraints.
 */

export const VALIDATION = {
  TEXT: {
    SHORT_MAX_LENGTH: 100,
    MEDIUM_MAX_LENGTH: 500,
    LONG_MAX_LENGTH: 2000,
  },

  SEARCH: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 100,
  },

  COORDINATES: {
    LAT_MIN: -90,
    LAT_MAX: 90,
    LNG_MIN: -180,
    LNG_MAX: 180,
  },

  // Riyadh approximate bounds
  RIYADH_BOUNDS: {
    LAT_MIN: 24.4,
    LAT_MAX: 25.1,
    LNG_MIN: 46.3,
    LNG_MAX: 47.1,
  },
} as const
