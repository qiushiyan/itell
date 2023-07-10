import SummaryDescription from "./summary-description";
import SummaryInput from "./summary-input";

export default function Summary() {
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
