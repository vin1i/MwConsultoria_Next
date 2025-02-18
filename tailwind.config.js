/** @type {import('tailwindcss').Config} */
import { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#9C192B",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#6B0D1A",
          foreground: "#222222",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#222222",
        },
        badge: {
          available: "#9C192B",
          pending: "#FFA726",
          sold: "#EF5350",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "image-rotate": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.05)" },
        },
        "card-hover": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-5px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "image-rotate": "image-rotate 0.3s ease-out forwards",
        "card-hover": "card-hover 0.3s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} 
export default config;
