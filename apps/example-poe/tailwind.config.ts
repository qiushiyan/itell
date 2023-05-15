import type { Config } from "tailwindcss";
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
		"./content/**/*.{mdx,md}",
		"./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Inter", "sans-serif"],
				handwritten: ["Courgette", "cursive"],
			},
			typography: {
				DEFAULT: {
					css: {
						h1: {
							"margin-top": "1.25em",
						},
						h2: {
							"margin-top": "1em",
						},
						h3: {
							"margin-top": "0.75em",
						},
						h4: {
							"margin-top": "0.5em",
						},
						p: {
							"margin-top": "1em",
							"margin-bottom": "1em",
						},
						ul: {
							"margin-top": "1em",
							"margin-bottom": "1em",
							"line-height": "1.5em",
						},
						li: {
							"margin-top": "0.3em",
							"margin-bottom": "0.3em",
						},
						figure: {
							"margin-top": "1em",
							"margin-bottom": "1em",
						},
						img: {
							"margin-top": "1em",
							"margin-bottom": "1em",
						},
					},
				},
				quoteless: {
					css: {
						"blockquote p:first-of-type::before": { content: "none" },
						"blockquote p:first-of-type::after": { content: "none" },
					},
				},
			},
		},
	},
	future: {
		hoverOnlyWhenSupported: true,
	},
	plugins: [require("@tailwindcss/typography")],
} satisfies Config);
