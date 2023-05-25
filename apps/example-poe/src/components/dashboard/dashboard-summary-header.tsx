import { DashboardHeader } from "./dashboard-header";
import SummaryCreateButton from "./summary-create-button";

export default function () {
	return (
		<DashboardHeader heading="Summary" text="Create and manage summaries.">
			<SummaryCreateButton />
		</DashboardHeader>
	);
}
