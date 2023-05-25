import { DashboardConfig } from "@/types/config";
import { FileEditIcon, SettingsIcon } from "lucide-react";

const iconClasses = "mr-2 h-4 w-4";

export const dashboardConfig: DashboardConfig = {
	mainNav: [],
	sidebarNav: [
		{
			title: "Summaries",
			href: "/dashboard",
			icon: <FileEditIcon className={iconClasses} />,
		},

		{
			title: "Settings",
			href: "/dashboard/settings",
			icon: <SettingsIcon className={iconClasses} />,
		},
	],
};
