import TextbookNavbar from "@/components/nav/textbook-nav";
import { getServerAuthSession } from "@/lib/auth";
import db from "@/lib/db";
import { delay } from "@/lib/utils";
import { redirect } from "next/navigation";
import { Fragment } from "react";

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getServerAuthSession();
	if (session?.user) {
		const user = await db.user.findUnique({
			where: {
				id: session.user.id,
			},
		});
		if (user) {
			if (user.isTeacher) {
				return (
					<Fragment>
						<div className="max-w-6xl mx-auto py-8 px-4">you are a teacher</div>
					</Fragment>
				);
			} else {
				return (
					<Fragment>
						<TextbookNavbar />
						<div className="max-w-6xl mx-auto py-8 px-4">{children}</div>
					</Fragment>
				);
			}
		}
	}

	return redirect("/auth");
}
