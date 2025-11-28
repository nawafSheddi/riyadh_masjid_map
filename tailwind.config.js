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

        border: "var(--color-border)",
        disabled: "var(--color-disabled)",
        placeholder: "var(--color-placeholder)",

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

        // shadcn/ui compatibility
        primary: {
          DEFAULT: "var(--color-foreground)",
          foreground: "var(--color-accent)",
        },
        secondary: {
          DEFAULT: "transparent",
          foreground: "var(--color-foreground)",
        },
        muted: {
          DEFAULT: "var(--color-background)",
          foreground: "var(--color-placeholder)",
        },
        card: {
          DEFAULT: "var(--color-background)",
          foreground: "var(--color-foreground)",
        },
        input: "var(--color-border)",
        ring: "var(--color-foreground)",
      },

      borderRadius: {
        lg: "12px",
        md: "8px",
        sm: "4px",
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
