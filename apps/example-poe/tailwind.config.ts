import type { Config } from "tailwindcss";
import tailwindPreset from "@itell/tailwind";
import { getItellConfig } from "@itell/core";

import itellConfig from "./itell.json";

export default {
	presets: [tailwindPreset],
	content: ["./src/**/*.{js,ts,jsx,tsx}", "./content/**/*.mdx"],
	itell: getItellConfig(itellConfig),
} satisfies Config;
