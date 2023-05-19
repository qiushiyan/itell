import type { Config } from "tailwindcss";
// @ts-ignore
import sharedConfig from "@itell/tailwind-config/tailwind.config.cjs";

export default {
	...sharedConfig,
	content: ["./src/**/*.{js,ts,jsx,tsx}", "./content/**/*.{mdx}"],
} satisfies Config;
