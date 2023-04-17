import Accordion from "@/components/ui/Accordion";
import { AccordionItem } from "@/types/components";
import { Typography } from "@/components/material-tailwind";

const accordionItems: AccordionItem[] = [
	{
		title: "What makes a good summary",
		content: (
			<>
				<p>A successful summary will</p>
				<ul>
					<li>Be within 50 ~ 200 words long Be written in</li>
					<li>English Be on topic Not be plagiarized</li>
				</ul>
			</>
		),
	},
	{
		title: "Scording details",
		content: (
			<>
				<p>
					Your summary will be automatically score based on the following
					attributes
				</p>
				<ul>
					<li>
						content which will include main points, details to support those
						main points, and general organization of summary
					</li>
					<li>
						paraphrasing which will include appropriate paraphrasing of text and
						using objective language
					</li>
					<li>
						key words which will include the use of important terms and phases
						from the text
					</li>
				</ul>
				<p>
					If your summary scores well on these attributes, you can move to the
					next section. If your summary scores low on these attributes, you will
					be required to rewrite the summary before you can move to the next
					section. After two attempts, you will be provided with a
					professionally written summary of the section and can then move to the
					next section.
				</p>
			</>
		),
	},
];

export default function SummaryDescription() {
	return (
		<div className="w-1/2">
			<Typography variant="lead">
				Write your summary for this section
			</Typography>
			<Typography>
				You can unlock the next section by submitting a good summary of this
				section
			</Typography>
			<Accordion items={accordionItems} defaultOpen={null} />
		</div>
	);
}
