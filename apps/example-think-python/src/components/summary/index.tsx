import { useLocation } from "@/lib/hooks";
import SummaryDescription from "./summary-description";
import SummaryInput from "./summary-input";
import { Typography } from "@itell/ui/server";
import { SectionLocation } from "@/types/location";

export default function Summary({ location }: { location: SectionLocation }) {
	if (location.chapter === 0) {
		return (
			<div className="mt-10 border-l-4 border-accent bg-background p-4">
				<Typography className="mb-0">
					No summary is required for this section. You are good to go!
				</Typography>
			</div>
		);
	}
	return (
		<section
			className="flex flex-col lg:flex-row gap-8 mt-10 border-t-2 py-4"
			id="section-summary"
		>
			<section className="lg:basis-1/3">
				<SummaryDescription />
			</section>
			<section className="lg:basis-2/3">
				<SummaryInput />
			</section>
		</section>
	);
}
