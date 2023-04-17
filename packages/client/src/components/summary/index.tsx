import SummaryDescription from "./SummaryDescription";
import SummaryInput from "./SummaryInput";

export default function Summary() {
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
