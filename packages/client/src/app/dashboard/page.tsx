import DashboardStudent from "@/components/dashboard-student";
import { delay } from "@/lib/utils";

export default async function () {
	await delay(1000);
	return <DashboardStudent />;
}
