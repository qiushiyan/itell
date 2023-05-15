import withMT from "@material-tailwind/react/utils/withMT";
import { Config } from "tailwindcss";

export default withMT({
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Inter", "sans-serif"],
				handwritten: ["Courgette", "cursive"],
			},
		},
	},
	future: {
		hoverOnlyWhenSupported: true,
	},
	plugins: [require("@tailwindcss/typography")],
} satisfies Config);
