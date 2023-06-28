import { reader } from "./keystatic";
import defaultSiteConfig from "@/config/site";

export const getSiteConfig = async () => {
	const config = await reader.singletons.config.read();

	return config || defaultSiteConfig;
};
