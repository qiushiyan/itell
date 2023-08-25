import { getSiteConfig as getConfig } from "@itell/core/config";
import path from "path";

// const siteConfigPath = path.join(process.cwd(), "config/site.yaml");

export const getSiteConfig = async () => {
	// return getConfig(siteConfigPath);

	return {
		title: "Think Python, 2nd",
		latex: false,
		description:
			"This textbook is adopted from https://greenteapress.com/wp/think-python-2e/.",
		footer:
			"A project by the Language and Educational Analytics Research (Lear)Lab",
		favicon: "/images/avatars/favicon.png",
	};
};
