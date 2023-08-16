import { readYAML } from "./utils";
import { SiteConfig, SiteConfigSchema } from "./schema";

export const DefaultSiteConfig: SiteConfig = {
	title: "My iTELL Site",
	description: "My iTELL site description",
	footer: "My iTELL site footer",
	latex: false,
	favicon: "favicon.ico",
};

export const getSiteConfig = async (
	configPath: string,
): Promise<SiteConfig> => {
	const configData = await readYAML(configPath);
	const configParsed = SiteConfigSchema.safeParse(configData);
	if (!configParsed.success) {
		console.warn(
			"site config is not valid\n",
			configParsed.error,
			"\nfallback to default configurations when necessary",
		);
	}
	if (!(configData instanceof Object)) {
		return DefaultSiteConfig;
	} else {
		return { ...DefaultSiteConfig, ...configData };
	}
};
