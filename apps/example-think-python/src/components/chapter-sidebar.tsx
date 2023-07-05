import { cn } from "@itell/core";
import { Typography } from "@itell/ui/server";
import { Chapter } from "contentlayer/generated";
import Balancer from "react-wrap-balancer";

type ChapterSidebarProps = {
	chapters: Chapter[];
	currentChapter: number;
};

export function ChapterSidebar({
	chapters,
	currentChapter,
}: ChapterSidebarProps) {
	return (
		<nav>
			<ol className="space-y-2">
				{chapters.map((chapter) => (
					<li
						className={cn(
							"px-2 py-1 transition ease-in-out duration-200 relative rounded-md hover:bg-accent",
							{
								"bg-accent": chapter.chapter === currentChapter,
							},
						)}
						key={chapter.url}
					>
						<a href={`/${chapter.url}`}>
							<Typography variant="small" className="m-0 p-0">
								<Balancer>{chapter.title}</Balancer>
							</Typography>
						</a>
					</li>
				))}
			</ol>
		</nav>
	);
}
