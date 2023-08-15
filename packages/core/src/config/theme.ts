import { ThemeConfig, UserThemeConfigSchema } from "./schema";
import path from "path";
import { load } from "js-yaml";
import { readFileSync } from "fs";

export const DefaultThemeConfig: Required<ThemeConfig> = {
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
		destructive: "0 100% 50%",
		destructiveForeground: "215.4 16.3% 46.9%",
		ring: "210 40% 96.1%",
		radius: "0.5rem",
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
		info: "214 95% 67%",
		warning: "34 100% 60%",
	},
};

// this has to be synchronous to use in tailwind config
export const getSiteTheme = (
	themePath: string = path.join(process.cwd(), "config/theme.yaml"),
): Required<ThemeConfig> => {
	const themeData = load(readFileSync(themePath, "utf-8"));
	const themeParsed = UserThemeConfigSchema.safeParse(themeData);
	// here we only warns that some configurations are invalid
	// but the valid oneswill still be merged in the final output, as only known keys will be
	if (!themeParsed.success) {
		console.warn(
			"site theme is not valid",
			themeParsed.error,
			"\nfallback to default configurations when necessary",
		);
	}

	if (!(themeData instanceof Object)) {
		return DefaultThemeConfig;
	} else {
		return {
			light: {
				...DefaultThemeConfig.light,
				// @ts-ignore
				...(themeData.light || {}),
			},
			dark: {
				...DefaultThemeConfig.dark,
				// @ts-ignore
				...(themeData.dark || {}),
			},
		};
	}
};