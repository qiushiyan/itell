import config from "@itell/tailwind-config/tailwind.config.cjs";
import type { Config } from "tailwindcss";

export default {
	...config,
	content: ["./src/**/*.{js,ts,jsx,tsx}", "./content/**/*.{mdx}"],
} satisfies Config;
