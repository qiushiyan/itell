import { SectionLocation } from "@/types/location";
import { Mdx } from "../mdx";
import { TrackLastVisitedSection } from "./section-last-visited";

export default function ({ code }: { code: string }) {
	return (
		<>
			<TrackLastVisitedSection />
			<article
				className="prose prose-quoteless prose-neutral dark:prose-invert max-w-none section-content"
				id="section-content"
			>
				<Mdx code={code} />
			</article>
		</>
	);
}
