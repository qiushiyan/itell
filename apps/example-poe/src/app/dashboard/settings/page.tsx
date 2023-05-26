import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import SettingsForm from "@/components/dashboard/settings-form";
import { DashboardShell } from "@/components/shell";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function () {
	const user = await getCurrentUser();

	if (!user) {
		redirect("/auth");
	}

	return (
		<DashboardShell>
			<DashboardHeader
				heading="Settings"
				text="Manage account and website settings."
			/>
			<SettingsForm />
		</DashboardShell>
	);
}
