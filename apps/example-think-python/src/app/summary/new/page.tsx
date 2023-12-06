import { SummaryBackButton } from "@/components/summary/summary-back-button";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function () {
	const user = await getCurrentUser();
	if (!user) {
		return redirect("/auth");
	}

	return (
		<div className="w-[800px] mx-auto">
			<div className="flex justify-start">
				<SummaryBackButton />
			</div>
		</div>
	);
}
