import { Accordion, AccordionItem } from "@/components/ui-components";
import { Typography } from "@itell/ui/server";
import { Fragment } from "react";

const accordionItems = [
	{
		title: "What makes a good summary",
		value: "what",
		content: (
			<>
				<p>A successful summary will</p>
				<ul>
					<li>Be within 50 ~ 200 words long</li>
					<li>Be written in English</li>
					<li>Be on topic</li>
					<li>Not be plagiarized</li>
				</ul>
			</>
		),
	},
	{
		title: "Scoring details",
		value: "scoring",
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
		<Fragment>
			<Typography variant="lead">
				Write your summary for this section
			</Typography>
			<Typography>
				You can unlock the next section by submitting a good summary of this
				section
			</Typography>
			<Accordion value={"what"}>
				{accordionItems.map((item, index) => (
					<AccordionItem key={item.value} title={item.title} value={item.value}>
						{item.content}
					</AccordionItem>
				))}
			</Accordion>
		</Fragment>
	);
}
