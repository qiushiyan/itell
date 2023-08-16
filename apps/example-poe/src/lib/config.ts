import { getSiteConfig as getConfig } from "@itell/core/config";
import path from "path";

const siteConfigPath = path.join(process.cwd(), "config/site.yaml");

export const getSiteConfig = async () => {
	return getConfig(siteConfigPath);
};
