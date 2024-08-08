/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
			colors: {
				text: {
				  headline: "#0A0A0A",
				  primary: "#2B2D42",
				  secondary: "#75778F",
				  accent: "#6868F7",
				  accent2: "#4C5075",
				},
				border: {
				  2: "#E2E8F0",
				  1: "#F8FAFC",
				},
				primary: {
				  main: "#6868F7",
				  600: "#4848F5",
				},
				brand: {
				  main: {
					30: "#D2D2FD",
					10: "#F0F0FE",
				  },
				},
				background: {
				  one: "#F9FAFB",
				  two: "#F5F6FC",
				  three: "#EFF0FA",
				},
				accent: {
				  orange: "#EA580C",
				  red: "#EF4444",
				},
			  },
		},
  },
  plugins: [],
}

