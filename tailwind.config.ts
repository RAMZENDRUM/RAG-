import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      "colors": {
        "on-surface-variant": "#4f4535",
        "on-primary-container": "#fffbff",
        "surface-variant": "#e3e2e2",
        "surface-dim": "#dadada",
        "on-secondary-fixed": "#111d27",
        "tertiary-fixed": "#ffdbd0",
        "outline-variant": "#d3c4af",
        "on-surface": "#1a1c1c",
        "on-background": "#1a1c1c",
        "on-error": "#ffffff",
        "on-primary-fixed": "#271900",
        "surface-container-highest": "#e3e2e2",
        "surface-bright": "#faf9f9",
        "on-primary-fixed-variant": "#5d4200",
        "on-secondary-fixed-variant": "#3d4854",
        "surface-container-lowest": "#ffffff",
        "primary-container": "#986d00",
        "primary": "#785600",
        "surface": "#faf9f9",
        "error-container": "#ffdad6",
        "surface-container-high": "#e9e8e8",
        "on-primary": "#ffffff",
        "error": "#ba1a1a",
        "on-tertiary": "#ffffff",
        "inverse-primary": "#f7bd48",
        "surface-container-low": "#f4f3f3",
        "tertiary-fixed-dim": "#e7bdb1",
        "primary-fixed": "#ffdea6",
        "on-secondary": "#ffffff",
        "inverse-on-surface": "#f1f0f0",
        "primary-fixed-dim": "#f7bd48",
        "on-tertiary-fixed-variant": "#5d4037",
        "surface-container": "#eeeeed",
        "secondary-fixed": "#d8e4f3",
        "secondary-container": "#d8e4f3",
        "tertiary-container": "#8f6d62",
        "secondary-fixed-dim": "#bcc8d6",
        "on-tertiary-fixed": "#2c160e",
        "inverse-surface": "#2f3131",
        "secondary": "#545f6c",
        "tertiary": "#74554b",
        "on-error-container": "#93000a",
        "background": "#faf9f9",
        "surface-tint": "#7b5800",
        "outline": "#817563",
        "on-secondary-container": "#5a6572",
        "on-tertiary-container": "#fffbff"
      },
      "borderRadius": {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      "fontFamily": {
        "headline": ["var(--font-newsreader)"],
        "body": ["var(--font-jakarta)"],
        "label": ["var(--font-jakarta)"]
      }
    },
  },
  plugins: [],
};
export default config;
