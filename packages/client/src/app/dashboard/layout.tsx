import TextbookNavbar from "@/components/textbook-navbar";
import { getServerAuthSession } from "@/lib/auth";
import db from "@/lib/db";
import { delay } from "@/lib/utils";
import { redirect } from "next/navigation";
import { Fragment } from "react";

export default async function DashboardLayout({
	children,
	student,
	teacher,
}: {
	children: React.ReactNode;
	student: React.ReactNode;
	teacher: React.ReactNode;
}) {
	const session = await getServerAuthSession();
	if (session?.user) {
		const user = await db.user.findUnique({
			where: {
				id: session.user.id,
			},
		});
		if (user) {
			if (user.is_teacher) {
				return (
					<Fragment>
						<TextbookNavbar />

						<div className="max-w-5xl mx-auto py-8 px-4">
							{children}
							{teacher}
						</div>
					</Fragment>
				);
			} else {
				return (
					<Fragment>
						<TextbookNavbar />
						<div className="max-w-5xl mx-auto py-8 px-4">
							{children}
							{student}
						</div>
					</Fragment>
				);
			}
		}
	}

	return redirect("/auth");
}
