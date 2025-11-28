/**
 * UI Constants
 *
 * Non-visual constants for UI behavior and business logic.
 */

export const UI_CONSTANTS = {
  NOTIFICATION: {
    AUTO_DISMISS_DURATION: 5000,
    MAX_VISIBLE: 5,
    POSITION: 'top-right' as const,
  },

  PAGINATION: {
    DEFAULT_PAGE_SIZE: 20,
    PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
  },

  TIME: {
    SECOND: 1000,
    MINUTE: 60 * 1000,
    HOUR: 60 * 60 * 1000,
    DAY: 24 * 60 * 60 * 1000,
  },

  DEBOUNCE: {
    SEARCH: 300,
    RESIZE: 150,
    SCROLL: 100,
  },

  Z_INDEX: {
    DROPDOWN: 1000,
    STICKY: 1020,
    FIXED: 1030,
    MODAL_BACKDROP: 1040,
    MODAL: 1050,
    POPOVER: 1060,
    TOOLTIP: 1070,
  },
} as const
