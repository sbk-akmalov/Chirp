/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      screens: {
        sm: "500px",
        md: "700px",
        lg: "1000px",
        xl: "1200px",
      },
      colors: {
        "custom-white": "var(--custom-white)",
        "custom-black-1": "var(--custom-black-1)",
        "custom-black-2": "var(--custom-black-2)",
        "custom-blue-1": "var(--custom-blue-1)",
        "custom-blue-2": "var(--custom-blue-2)",
        "custom-blue-3": "var(--custom-blue-3)",
        "custom-blue-4": "var(--custom-blue-4)",
        "custom-red-1": "var(--custom-red-1)",
        "custom-red-2": "var(--custom-red-2)",
        "custom-gray-1": "var(--custom-gray-1)",
        "custom-gray-2": "var(--custom-gray-2)",
        "custom-gray-3": "var(--custom-gray-3)",
        "custom-border": "var(--custom-border)",
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
