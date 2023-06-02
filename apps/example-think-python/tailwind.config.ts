import type { Config } from "tailwindcss";
import sharedConfig from "@itell/tailwind-config";

export default {
	...sharedConfig,
	darkMode: ["class"],
	content: ["./src/**/*.{js,ts,jsx,tsx}", "./content/**/*.mdx"],
	plugins: [require("@itell/tailwind-plugin")],
} satisfies Config;
