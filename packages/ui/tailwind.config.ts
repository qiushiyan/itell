import config from "@itell/tailwind-config/tailwind.config.cjs";
import type { Config } from "tailwindcss";

export default {
	...config,
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
} satisfies Config;
