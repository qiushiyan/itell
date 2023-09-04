import { Typography } from "@itell/ui/server";
import Balancer from "react-wrap-balancer";
import { PageSummary } from "@/components/summary/page-summary";
import { notFound } from "next/navigation";
import ChapterPager from "@/components/chapter-pager";
import { getPagerForChapter } from "@/lib/pager";
import NoteList from "@/components/note/note-list";
import NoteToolbar from "@/components/note/note-toolbar";
import { ArrowUpIcon, PencilIcon } from "lucide-react";
import { Fragment, Suspense } from "react";
import { allChaptersSorted } from "@/lib/chapters";
import { Button } from "@/components/client-components";
import { TocSidebar } from "@/components/toc-sidebar";
import { ChapterSidebar } from "@/components/chapter-sidebar";
import { PageContent } from "@/components/code/page-content";
import Spinner from "@/components/spinner";
import ChapterAuthModal from "@/components/chapter-auth-modal";

export const generateStaticParams = async () => {
	return allChaptersSorted.map((chapter) => {
		return {
			slug: chapter.url,
		};
	});
};

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
	const chapter = allChaptersSorted.find(
		(chapter) => chapter.url === params.slug,
	);
	if (chapter) {
		return {
			title: chapter.title,
			description: chapter.body.raw.slice(0, 80),
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

export default async function ({ params }: { params: { slug: string } }) {
	const url = params.slug;
	const chapterIndex = allChaptersSorted.findIndex((section) => {
		return section.url === url;
	});

	if (chapterIndex === -1) {
		return notFound();
	}

	const chapter = allChaptersSorted[chapterIndex];
	const pager = getPagerForChapter({
		index: chapterIndex,
	});

	const hasSummary = chapter.chapter !== 0;

	return (
		<Fragment>
			<div className="max-w-[1440px] mx-auto grid grid-cols-12 gap-6 px-2">
				<ChapterAuthModal />

				<aside className="module-sidebar  md:col-span-2">
					<div className="sticky top-20">
						<ChapterSidebar
							currentChapter={chapter.chapter}
							chapters={allChaptersSorted}
						/>
						<div className="mt-12 flex flex-col gap-2">
							{hasSummary && (
								<AnchorLink
									icon={<PencilIcon className="w-4 h-4" />}
									text="Write a Summary"
									href="#page-summary"
								/>
							)}
							<AnchorLink
								icon={<ArrowUpIcon className="w-4 h-4" />}
								text="Back to Top"
								href="#page-title"
							/>
						</div>
					</div>
				</aside>

				<section className="relative col-span-12 md:col-span-10 lg:col-span-8">
					<div className="mb-4 text-center" id="page-title">
						<Typography variant="h1">
							<Balancer className="text-3xl">{chapter.title}</Balancer>
						</Typography>
					</div>

					<PageContent code={chapter.body.code} />
					<NoteToolbar chapter={chapter.chapter} />
					<ChapterPager pager={pager} />
				</section>

				<aside className="toc-sidebar col-span-2 relative">
					<div className="sticky top-20">
						<TocSidebar headings={chapter.headings} />
					</div>
					<Suspense
						fallback={
							<p className="text-sm text-muted-foreground mt-8">
								<Spinner className="inline mr-2" />
								loading notes
							</p>
						}
					>
						<NoteList chapter={chapter.chapter} />
					</Suspense>
				</aside>
			</div>

			{hasSummary && <PageSummary chapter={chapter.chapter} />}
		</Fragment>
	);
}
