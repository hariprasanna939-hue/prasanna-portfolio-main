/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--bg) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        'surface-muted': 'rgb(var(--surface-muted) / <alpha-value>)',
        fg: 'rgb(var(--fg) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        'accent-electric': '#3978F6',
        'accent-cool': '#059669',
        mint: '#10B981',
        'soft-mint': '#D9F5E8',
        lavender: '#818CF8',
        'soft-lavender': '#DCD8FF',
        'pale-blue': '#DDEBFF',
        line: 'rgb(var(--line) / <alpha-value>)',
        'glass-border': 'rgba(255, 255, 255, 0.8)',
        'glass-edge': 'rgba(226, 232, 240, 0.65)',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"SF Pro Text"',
          'Inter',
          'system-ui',
          'sans-serif',
        ],
        display: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          'Inter',
          'system-ui',
          'sans-serif',
        ],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
      },
      letterSpacing: {
        wider2: '0.18em',
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 6px 20px -2px rgba(15, 23, 42, 0.06)',
        'card-hover': '0 8px 30px -4px rgba(31, 38, 135, 0.08), 0 2px 6px 0 rgba(0, 0, 0, 0.03)',
        elevated: '0 20px 48px -12px rgba(31, 38, 135, 0.12)',
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.06)',
        'glass-sm': '0 4px 16px 0 rgba(31, 38, 135, 0.04)',
        'glass-lg': '0 16px 48px -8px rgba(31, 38, 135, 0.09)',
        'glass-specular': 'inset 0 1px 1.5px 0 rgba(255, 255, 255, 0.95), 0 8px 32px 0 rgba(31, 38, 135, 0.06)',
        'glass-glow': '0 0 24px -4px rgba(57, 120, 246, 0.25)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
