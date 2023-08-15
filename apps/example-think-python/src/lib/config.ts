import { getSiteConfig as getConfig } from "@itell/core/config";
import path from "path";

export const getSiteConfig = async () => {
	return getConfig(path.join(process.cwd(), "config/site.yaml"));
};
