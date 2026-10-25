/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        google: {
          blue: "#1A73E8",
          blueHover: "#1765CC",
          blueContainer: "#E8F0FE",
          blueBorder: "#D2E3FC",
          canvas: "#F8F9FA",
          surface: "#FFFFFF",
          border: "#DADCE0",
          divider: "#DADCE0",
          textPrimary: "#202124",
          textSecondary: "#5F6368",
          searchBg: "#F1F3F4",
          searchBgHover: "#E8EAED",
          greenText: "#188038",
          greenContainer: "#E6F4EA",
          greenBorder: "#CEEAD6",
          redText: "#D93025",
          redContainer: "#FCE8E6",
          redBorder: "#FAD2CF",
          yellowText: "#B06000",
          yellowContainer: "#FEF7E0",
          yellowBorder: "#FEEFC3",
        }
      },
      fontFamily: {
        roboto: ['"Roboto Flex"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '16px',
      }
    },
  },
  plugins: [],
}
