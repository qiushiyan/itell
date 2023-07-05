import { Site, allSites } from "contentlayer/generated";
import { Mdx } from "../mdx";

const description = allSites.find(
	(doc) => doc.slug === "summary-description",
) as Site;

export default function SummaryDescription() {
	return <Mdx code={description.body.code} />;
}
