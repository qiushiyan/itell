import type { Config } from "tailwindcss";
import itellPlugin from "@itell/tailwind-plugin";
// @ts-ignore
import animatePlugin from "tailwindcss-animate";
import typographyPlugin from "@tailwindcss/typography";
export default {
	content: ["./src/**/*.{js,ts,jsx,tsx}", "./content/**/*.mdx"],
	plugins: [itellPlugin, animatePlugin, typographyPlugin],
} satisfies Config;
