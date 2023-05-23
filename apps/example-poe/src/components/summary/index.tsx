import { useLocation } from "@/lib/hooks";
import SummaryDescription from "./summary-description";
import SummaryInput from "./summary-input";
import { Info, Typography } from "@itell/ui/server";
import { SectionLocation } from "@/types/location";

export default function Summary({ location }: { location: SectionLocation }) {
	if (location.section === 0) {
		return (
			<section className="mt-2">
				<Info>
					No summary is required for this section. You are good to go!
				</Info>
			</section>
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
