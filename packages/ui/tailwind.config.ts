import sharedConfig from "@itell/tailwind-config";
import type { Config } from "tailwindcss";

export default {
	...sharedConfig,
	darkMode: ["class"],
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
} satisfies Config;
