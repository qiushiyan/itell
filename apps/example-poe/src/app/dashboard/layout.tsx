import { DashboardNav } from "@/components/nav/dashboard-nav";
import { MainNav } from "@/components/nav/main-nav";
import ThemeToggle from "@/components/theme/theme-toggle";
import UserAvatar from "@/components/user-avatar";
import { dashboardConfig } from "@/config/dashboard";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const user = await getCurrentUser();
	if (!user) {
		return redirect("/auth");
	}
	3;

	return (
		<div className="flex min-h-screen flex-col space-y-6">
			<header className="sticky top-0 z-40 border-b bg-background">
				<div className="container flex h-16 items-center justify-between py-4">
					<MainNav items={dashboardConfig.mainNav} />
					<div className="ml-auto flex items-center gap-2">
						<ThemeToggle />
						<UserAvatar />
					</div>
				</div>
			</header>
			<div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
				<aside className="hidden w-[200px] flex-col md:flex">
					<DashboardNav items={dashboardConfig.sidebarNav} />
				</aside>
				<main className="flex w-full flex-1 flex-col">{children}</main>
			</div>
		</div>
	);
}
