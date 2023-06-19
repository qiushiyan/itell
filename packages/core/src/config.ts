import { isObject } from "./utils";

export type ItellThemeColors = {
	background: string;
	foreground: string;
	muted: string;
	mutedForeground: string;
	popover: string;
	popoverForeground: string;
	card: string;
	cardForeground: string;
	border: string;
	input: string;
	primary: string;
	primaryForeground: string;
	secondary: string;
	secondaryForeground: string;
	accent: string;
	accentForeground: string;
	destructive: string;
	destructiveForeground: string;
	ring: string;
	radius: string;
	info: string;
	warning: string;
};

type ItellConfig = {
	theme: {
		light: ItellThemeColors;
		dark: ItellThemeColors;
	};
};

export const ItellDefaultConfig: ItellConfig = {
	theme: {
		light: {
			background: "0 0% 100%",
			foreground: "222.2 47.4% 11.2%",
			muted: "210 40% 96.1%",
			mutedForeground: "215.4 16.3% 46.9%",
			popover: "0 0% 100%",
			popoverForeground: "222.2 47.4% 11.2%",
			card: "0 0% 100%",
			cardForeground: "222.2 47.4% 11.2%",
			border: "214.3 31.8% 91.4%",
			input: "214.3 31.8% 91.4%",
			primary: "222.2 47.4% 11.2%",
			primaryForeground: "210 40% 98%",
			secondary: "210 40% 96.1%",
			secondaryForeground: "215.4 16.3% 46.9%",
			accent: "210 40% 96.1%",
			accentForeground: "215.4 16.3% 46.9%",
			destructive: "210 40% 96.1%",
			destructiveForeground: "215.4 16.3% 46.9%",
			ring: "210 40% 96.1%",
			radius: "210 40% 96.1%",
			info: "214 95% 93%",
			warning: "34 100% 92%",
		},
		dark: {
			background: "224 71% 4%",
			foreground: "213 31% 91%",
			muted: "223 47% 11%",
			mutedForeground: "215.4 16.3% 56.9%",
			popover: "224 71% 4%",
			popoverForeground: "215 20.2% 65.1%",
			card: "224 71% 4%",
			cardForeground: "213 31% 91%",
			border: "216 34% 17%",
			input: "216 34% 17%",
			primary: "210 40% 98%",
			primaryForeground: "222.2 47.4% 1.2%",
			secondary: "222.2 47.4% 11.2%",
			secondaryForeground: "210 40% 98%",
			accent: "216 34% 17%",
			accentForeground: "210 40% 98%",
			destructive: "0 63% 31%",
			destructiveForeground: "210 40% 98%",
			ring: "216 34% 17%",
			radius: "0.5rem",
			info: "214 95% 93%",
			warning: "34 100% 92%",
		},
	},
};

export const getItellConfig = (
	// rome-ignore lint/suspicious/noExplicitAny: <explanation>
	userConfig: Record<string, any>,
): ItellConfig => {
	const config = ItellDefaultConfig;
	console.log("user config", userConfig);

	if (isObject(userConfig, "theme")) {
		if (isObject(userConfig["theme"], "light")) {
			config.theme.light = {
				...config.theme.light,
				...userConfig["theme"]["light"],
			};
		}
		if (isObject(userConfig["theme"], "dark")) {
			config.theme.dark = {
				...config.theme.dark,
				...userConfig["theme"]["dark"],
			};
		}
	}

	return config;
};
