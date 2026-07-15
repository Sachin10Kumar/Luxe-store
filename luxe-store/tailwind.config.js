/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#111111",
        accent: "#6C63FF",
        "accent-light": "#8B83FF",
        "accent-dark": "#5A52E0",
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "'Inter'", "system-ui", "sans-serif"],
        display: ["'Poppins'", "'Plus Jakarta Sans'", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "24px",
        "4xl": "32px",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease both",
        "fade-in": "fadeIn 0.4s ease both",
        float: "float 3s ease-in-out infinite",
        shimmer: "shimmer 1.5s infinite",
        "spin-slow": "spin 3s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      boxShadow: {
        "soft": "0 2px 40px rgba(0,0,0,0.08)",
        "soft-lg": "0 8px 60px rgba(0,0,0,0.12)",
        "accent": "0 8px 30px rgba(108,99,255,0.3)",
        "card": "0 1px 3px rgba(0,0,0,0.06), 0 4px 24px rgba(0,0,0,0.06)",
      },
      backdropBlur: { xs: "4px" },
      screens: { "3xl": "1920px" },
    },
  },
  plugins: [],
};
