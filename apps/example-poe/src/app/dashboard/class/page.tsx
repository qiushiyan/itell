import ClassForm from "@/components/dashboard/class-form";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardShell } from "@/components/shell";
import { getCurrentUser } from "@/lib/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";

const title = "Class Registration";
const description = "Manage your class";

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
			<ClassForm />
		</DashboardShell>
	);
}
