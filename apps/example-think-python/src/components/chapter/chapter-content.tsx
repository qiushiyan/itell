import { MainMdx, Mdx } from "../mdx";
import { TrackLastVisitedChapter } from "./chapter-last-visited";

export default function ({ code }: { code: string }) {
	return (
		<>
			<TrackLastVisitedChapter />
			<article
				className="prose prose-quoteless prose-neutral dark:prose-invert max-w-none"
				id="chapter-content"
			>
				<MainMdx code={code} />
			</article>
		</>
	);
}
