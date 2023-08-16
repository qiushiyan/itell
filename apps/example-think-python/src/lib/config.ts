import { getSiteConfig as getConfig } from "@itell/core/config";
import path from "path";
import { existsSync } from "fs";

export const getSiteConfig = async () => {
	const siteConfigPath = path.join(process.cwd(), "config/site.yaml");
	console.log("existing?", existsSync(siteConfigPath));
	console.log(siteConfigPath);
	return getConfig(siteConfigPath);
};
