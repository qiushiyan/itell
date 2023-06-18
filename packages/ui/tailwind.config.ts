import type { Config } from "tailwindcss";
import animatePlugin from "tailwindcss-animate";
import itellPlugin from "@itell/tailwind-plugin";

export default {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	plugins: [itellPlugin, animatePlugin],
} satisfies Config;
