import { Typography } from "@itell/ui/server";
import Balancer from "react-wrap-balancer";
import { Mdx } from "@/components/mdx";
import Summary from "@/components/summary";
import { notFound } from "next/navigation";
import { SectionLocation } from "@/types/location";
import { ChapterSidebar, TocSidebar } from "@/components/textbook-sidebar";
import "@/styles/prism-one-dark.css";

import SectionAuthDialog from "@/components/chapter-auth-dialog";
import SectionPager from "@/components/chapter-pager";
import { getPagerForChapter } from "@/lib/pager";
import NoteList from "@/components/note/note-list";
import Highlighter from "@/components/note/note-toolbar";
import { ArrowUpIcon, PencilIcon } from "lucide-react";
import { Fragment } from "react";
import { allChaptersSorted } from "@/lib/sections";
import { Button } from "@/components/ui-components";

export const generateStaticParams = async () => {
	return allChaptersSorted.map((section) => {
		return {
			slug: section._raw.flattenedPath.split("/"),
		};
	});
};

export const generateMetadata = ({
	params,
}: { params: { slug: string[] } }) => {
	const chapter = allChaptersSorted.find(
		(chapter) => chapter._raw.flattenedPath === params.slug.join("/"),
	);
	if (chapter) {
		return {
			title: chapter.title,
			description: chapter.body.raw.slice(0, 100),
		};
	}
};

const AnchorLink = ({
	text,
	href,
	icon,
}: { text: string; href: string; icon: React.ReactNode }) => {
	return (
		<a href={href}>
			<Button
				size="sm"
				variant="ghost"
				className="flex items-center gap-1 mb-0 py-1"
			>
				{icon}
				{text}
			</Button>
		</a>
	);
};

export default async function ({ params }: { params: { slug: string[] } }) {
	const path = params.slug.join("/");
	const chapterIndex = allChaptersSorted.findIndex(
		(chapter) => chapter._raw.flattenedPath === path,
	);

	if (chapterIndex === -1) {
		return notFound();
	}

	const chapter = allChaptersSorted[chapterIndex];
	const currentLocation = chapter.location as SectionLocation;
	const pager = getPagerForChapter({
		allChapters: allChaptersSorted,
		index: chapterIndex,
	});

	return (
		<Fragment>
			<div className="max-w-[1440px] mx-auto grid grid-cols-12 gap-6 px-2">
				<SectionAuthDialog />
				<aside className="module-sidebar col-span-2">
					<div className="sticky top-20">
						<ChapterSidebar
							currentLocation={currentLocation}
							chapters={allChaptersSorted}
						/>
						<div className="mt-12 flex flex-col">
							<AnchorLink
								icon={<PencilIcon className="w-4 h-4" />}
								text="Write a Summary"
								href="#section-summary"
							/>
							<AnchorLink
								icon={<ArrowUpIcon className="w-4 h-4" />}
								text="Back to Top"
								href="#section-title"
							/>
						</div>
					</div>
				</aside>

				<section
					className="section-content relative col-span-8"
					id="section-content"
				>
					<div className="mb-4 text-center" id="section-title">
						<Typography variant="h1">
							<Balancer className="text-3xl">{chapter.title}</Balancer>
						</Typography>
					</div>

					<Mdx code={chapter.body.code} />
					<Highlighter location={currentLocation} />
					<SectionPager pager={pager} />
				</section>

				<aside className="toc-sidebar col-span-2">
					<TocSidebar headings={chapter.headings} />
					<NoteList location={currentLocation} />
				</aside>
			</div>

			<Summary location={currentLocation} />
		</Fragment>
	);
}
