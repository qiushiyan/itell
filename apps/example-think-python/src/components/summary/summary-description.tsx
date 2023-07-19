"use client";
import { Site, allSites } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import { Accordion, AccordionItem } from "@/components/client-components";
import { Typography } from "@itell/ui/server";
const description = allSites.find(
	(doc) => doc.slug === "summary-description",
) as Site;

// had to avoid using <Mdx /> for this
// so that <Mdx /> don't have to import client components

export default function SummaryDescription() {
	const Component = useMDXComponent(description.body.code);

	return (
		<Component
			components={{
				Accordion,
				AccordionItem,
				Typography,
			}}
		/>
	);
}
