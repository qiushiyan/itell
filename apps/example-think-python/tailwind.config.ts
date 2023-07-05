import type { Config } from "tailwindcss";
import tailwindPreset from "@itell/tailwind";
import { getThemeConfig } from "@itell/core";

import themeConfig from "./config/theme.json";

export default {
	presets: [tailwindPreset],
	content: ["./src/**/*.{js,ts,jsx,tsx}", "./content/**/*.mdx"],
	itell: {
		theme: getThemeConfig(themeConfig),
	},
} satisfies Config;
