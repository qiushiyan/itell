import { SectionLocation } from "@/types/location";
import { Mdx } from "../mdx";
import { TrackLastVisitedSection } from "./section-last-visited";

export default function ({
	code,
	location,
}: { code: string; location?: SectionLocation }) {
	return (
		<>
			<TrackLastVisitedSection location={location} />
			<article
				className="prose prose-quoteless prose-neutral dark:prose-invert max-w-none section-content"
				id="section-content"
			>
				{/* @ts-ignore */}
				<Mdx code={code} />
			</article>
		</>
	);
}
