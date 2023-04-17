"use client";

import { useLocation } from "@/lib/hooks";
import SummaryDescription from "./SummaryDescription";
import SummaryInput from "./SummaryInput";
import { Typography } from "../material-tailwind";

export default function Summary() {
	const location = useLocation();
	if (location.section === undefined) {
		return (
			<div className="mt-10 border-l-4 border-blue-400 bg-blue-50 px-4 py-2">
				<div className="ml-3">
					<Typography>
						No summary is required for this section. You are good to go!
					</Typography>
				</div>
			</div>
		);
	}
	return (
		<section
			className="flex flex-col gap-8 mt-10 border-t-2 py-4"
			id="section-summary"
		>
			<SummaryDescription />
			<SummaryInput />
		</section>
	);
}
