import { z } from "zod";

export const ColorConfigSchema = z.object({
	background: z.string(),
	foreground: z.string(),
	muted: z.string(),
	mutedForeground: z.string(),
	popover: z.string(),
	popoverForeground: z.string(),
	card: z.string(),
	cardForeground: z.string(),
	border: z.string(),
	input: z.string(),
	primary: z.string(),
	primaryForeground: z.string(),
	secondary: z.string(),
	secondaryForeground: z.string(),
	accent: z.string(),
	accentForeground: z.string(),
	destructive: z.string(),
	destructiveForeground: z.string(),
	ring: z.string(),
	radius: z.string(),
	info: z.string(),
	warning: z.string(),
});

export const UserColorConfigSchema = ColorConfigSchema.strict()
	.partial()
	.optional();

export type ColorConfig = z.infer<typeof ColorConfigSchema>;
// entire object could be undefined, or any of the properties could be undefined
export type UserColorConfig = z.infer<typeof UserColorConfigSchema>;

export const ThemeConfigSchema = z.object({
	light: ColorConfigSchema,
	dark: ColorConfigSchema,
});
export const UserThemeConfigSchema = z
	.object({
		light: UserColorConfigSchema,
		dark: UserColorConfigSchema,
	})
	.strict()
	.optional();

export type ThemeConfig = z.infer<typeof ThemeConfigSchema>;
export type UserThemeConfig = z.infer<typeof UserThemeConfigSchema>;

export const SiteConfigSchema = z
	.object({
		title: z.string(),
		description: z.string(),
		footer: z.string(),
		latex: z.boolean().optional(),
		favicon: z.string().optional(),
	})
	.strict();

export type SiteConfig = z.infer<typeof SiteConfigSchema>;
