import type { Config } from "tailwindcss";
import tailwindPreset from "@itell/tailwind";
import { getSiteTheme } from "@itell/core/config";
import path from "path";
const themeConfigPath = path.join(process.cwd(), "config/theme.yaml");

export default {
	presets: [tailwindPreset],
	content: ["./src/**/*.{js,ts,jsx,tsx}", "./content/**/*.mdx"],
	itell: {
		theme: getSiteTheme(themeConfigPath),
	},
} satisfies Config;
