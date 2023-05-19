// import config from "@itell/tailwind-config/tailwind.config.cjs";
import type { Config } from "tailwindcss";
import sharedConfig from "@itell/tailwind-config/tailwind.config.cjs";

export default {
	...sharedConfig,
	content: ["./src/**/*.{js,ts,jsx,tsx}", "./content/**/*.{mdx}"],
} satisfies Config;
