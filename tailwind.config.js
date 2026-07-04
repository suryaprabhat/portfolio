/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "hsl(240, 10%, 4%)",
        foreground: "hsl(0, 0%, 98%)",
        primary: {
          DEFAULT: "hsl(263.4, 70%, 50.4%)",
          foreground: "hsl(210, 20%, 98%)",
        },
        card: {
          DEFAULT: "rgba(10, 10, 12, 0.5)",
          foreground: "hsl(0, 0%, 98%)",
        },
        border: "rgba(255, 255, 255, 0.08)",
        ring: "hsl(263.4, 70%, 50.4%)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["Geist Mono", "JetBrains Mono", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "border-beam": "border-beam 6s linear infinite",
      },
      keyframes: {
        "border-beam": {
          "100%": {
            "offset-distance": "100%",
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
