import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep Tech Theme - Deep Navy/Black
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        // Paleta: #5A5A5A → #4A4A4A → #3A3A3A → #2A2A2A → #000000
        "erp-light": "#5A5A5A",
        "erp-muted": "#4A4A4A",
        "erp-gray": "#3A3A3A",
        "erp-dark": "#2A2A2A",
        "erp-black": "#000000",
        glass: {
          DEFAULT: "rgba(42, 42, 42, 0.9)",
          border: "rgba(90, 90, 90, 0.2)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-accent":
          "linear-gradient(135deg, #5A5A5A 0%, #3A3A3A 100%)",
        "gradient-accent-subtle":
          "linear-gradient(135deg, rgba(90, 90, 90, 0.1) 0%, rgba(58, 58, 58, 0.05) 100%)",
      },
      boxShadow: {
        glow: "0 0 24px rgba(0, 0, 0, 0.4)",
        "glow-strong": "0 0 40px rgba(0, 0, 0, 0.5)",
        "glow-subtle": "0 0 20px rgba(255, 255, 255, 0.03)",
        "inner-glow": "inset 0 0 20px rgba(0, 0, 0, 0.2)",
      },
      backdropBlur: {
        xs: "2px",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
};

export default config;
