import ClassForm from "@/components/dashboard/class-form";
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
			<DashboardHeader heading="Class" text="Manage class registration" />
			<ClassForm />
		</DashboardShell>
	);
}
