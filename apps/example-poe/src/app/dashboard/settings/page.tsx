import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import SettingsForm from "@/components/dashboard/settings-form";
import { DashboardShell } from "@/components/shell";
import { getCurrentUser } from "@/lib/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";

const title = "Settings";
const description = "Manage account and website settings.";

export const metadata: Metadata = {
	title,
	description,
};

export default async function () {
	const user = await getCurrentUser();

	if (!user) {
		redirect("/auth");
	}

	return (
		<DashboardShell>
			<DashboardHeader heading={title} text={description} />
			<SettingsForm />
		</DashboardShell>
	);
}
