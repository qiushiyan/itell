import type { Config } from "tailwindcss";
// @ts-ignore
import sharedConfig from "@itell/tailwind-config";

export default {
	...sharedConfig,
	darkMode: ["class"],
	content: ["./src/**/*.{js,ts,jsx,tsx}", "./content/**/*.mdx"],
	safelist: [
		{
			pattern: /col-span-2/,
			variants: ["md"],
		},
	],
} satisfies Config;
