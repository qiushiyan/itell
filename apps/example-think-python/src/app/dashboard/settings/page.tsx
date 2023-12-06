import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { SettingsForm } from "@/components/dashboard/settings-form";
import { ClassInviteModal } from "@/components/dashboard/settings/class-invite-modal";
import { DashboardShell } from "@/components/shell";
import { getCurrentUser } from "@/lib/auth";
import { getTeacherWithClassId } from "@/lib/server-actions";
import { getUser } from "@/lib/user";
import { Metadata } from "next";
import { redirect } from "next/navigation";

const title = "Settings";
const description = "Manage account and website settings";

export const metadata: Metadata = {
	title,
	description,
};

type Props = {
	searchParams?: Record<string, string>;
};
export default async function ({ searchParams }: Props) {
	const currentUser = await getCurrentUser();
	const classId = searchParams?.join_class_code;
	const teacherToJoin = classId ? await getTeacherWithClassId(classId) : null;

	if (!currentUser) {
		return redirect("/auth");
	}

	const user = await getUser(currentUser.id);
	if (!user) {
		return redirect("/auth");
	}

	return (
		<DashboardShell>
			<DashboardHeader heading={title} text={description} />
			<SettingsForm user={user} />
			{classId && (
				<ClassInviteModal
					user={user}
					teacherToJoin={teacherToJoin}
					classId={classId}
				/>
			)}
		</DashboardShell>
	);
}
