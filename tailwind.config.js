/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
        sans: ['Cairo', 'sans-serif'],
      },

      colors: {
        // Ramadan Night Theme - Backgrounds
        night: {
          deepest: "var(--color-night-deepest)",
          deep: "var(--color-night-deep)",
          medium: "var(--color-night-medium)",
          soft: "var(--color-night-soft)",
        },

        // Gold Accents
        gold: {
          DEFAULT: "var(--color-gold)",
          bright: "var(--color-gold-bright)",
          muted: "var(--color-gold-muted)",
          glow: "var(--color-gold-glow)",
        },

        // Text Colors
        text: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          muted: "var(--color-text-muted)",
        },

        // Border Colors
        border: {
          DEFAULT: "var(--color-border)",
          subtle: "var(--color-border-subtle)",
          strong: "var(--color-border-strong)",
        },

        // Semantic Colors
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        error: "var(--color-error)",
        info: "var(--color-info)",
        destructive: "var(--color-error)",

        // Region colors for masjid markers
        region: {
          north: "var(--color-region-north)",
          east: "var(--color-region-east)",
          westSouth: "var(--color-region-west-south)",
        },

        // State colors
        state: {
          hover: "var(--color-state-hover)",
          active: "var(--color-state-active)",
          focus: "var(--color-state-focus)",
          disabled: "var(--color-state-disabled)",
        },

        // Legacy compatibility
        background: {
          DEFAULT: "var(--color-background)",
          cardDark: "var(--color-background-card-dark)",
        },
        foreground: {
          DEFAULT: "var(--color-foreground)",
          muted: "var(--color-foreground-muted)",
          mutedDark: "var(--color-foreground-muted-dark)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          dark: "var(--color-accent-dark)",
        },
        disabled: "var(--color-disabled)",
        placeholder: "var(--color-placeholder)",

        // shadcn/ui compatibility
        primary: {
          DEFAULT: "var(--color-gold)",
          foreground: "var(--color-night-deepest)",
        },
        secondary: {
          DEFAULT: "var(--color-night-medium)",
          foreground: "var(--color-text-primary)",
        },
        muted: {
          DEFAULT: "var(--color-night-soft)",
          foreground: "var(--color-text-muted)",
        },
        card: {
          DEFAULT: "var(--color-night-deep)",
          foreground: "var(--color-text-primary)",
        },
        input: "var(--color-border)",
        ring: "var(--color-gold)",
      },

      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        '2xl': "var(--radius-2xl)",
      },

      boxShadow: {
        soft: "var(--shadow-soft)",
        card: "var(--shadow-card)",
        elevated: "var(--shadow-elevated)",
        'glow-gold': "var(--shadow-glow-gold)",
        'focus-gold': "var(--shadow-focus-gold)",
      },

      spacing: {
        'touch': '44px',
        'touch-lg': '48px',
      },

      minHeight: {
        'touch': '44px',
        'touch-lg': '48px',
      },
      minWidth: {
        'touch': '44px',
        'touch-lg': '48px',
      },
    },
  },

  plugins: [],
}
