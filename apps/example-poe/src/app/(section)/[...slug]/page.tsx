import Balancer from "react-wrap-balancer";
import { PageSummary } from "@/components/summary/page-summary";
import { notFound } from "next/navigation";
import { SectionLocation } from "@/types/location";
import getChapters from "@/lib/sidebar";
import { PageVisibilityModal } from "@/components/page-visibility-modal";
import SectionPager from "@/components/section-pager";
import { getPagerForSection } from "@/lib/pager";
import NoteList from "@/components/note/note-list";
import Highlighter from "@/components/note/note-toolbar";
import { ArrowUpIcon, PencilIcon } from "lucide-react";
import { Fragment, Suspense } from "react";
import { allSectionsSorted } from "@/lib/sections";
import { Button } from "@/components/client-components";
import { ModuleSidebar } from "@/components/module-sidebar";
import { TocSidebar } from "@/components/toc-sidebar";

import { Section } from "contentlayer/generated";
import Spinner from "@/components/spinner";

// imports added
import db from "@/lib/db";
// This replaces SectionContent; needed the section and subsection information
// as well as the corresponding QA pair from db to be passed down to Mdx. UseContext seemed better than prop-drilling.
import { EventTracker } from "@/components/telemetry/event-tracker";
import { PageContent } from "@/components/section/page-content";
import { QuestionControl } from "@/components/question/question-control";
// import SectionContent from "@/components/section/section-content";

// Context to be added into Mdx pages via ContextHandler
async function getSubsections(sectionIdinp: string) {
	return await db.subSection.findMany({
		where: {
			sectionId: sectionIdinp,
			NOT: {
				question: {
					equals: null,
				},
			},
		},
		select: {
			sectionId: true,
			subsection: true,
			question: true,
		},
	});
}

export const generateStaticParams = async () => {
	return allSectionsSorted.map((section) => {
		return {
			slug: section.url.split("/"),
		};
	});
};

export const generateMetadata = ({
	params,
}: { params: { slug: string[] } }) => {
	const section = allSectionsSorted.find(
		(section) => section.url === params.slug.join("/"),
	);
	if (section) {
		return {
			title: section.title,
			description: section.body.raw.slice(0, 100),
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
	const sectionIndex = allSectionsSorted.findIndex((section) => {
		return section.url === path;
	});

	if (sectionIndex === -1) {
		return notFound();
	}

	const section = allSectionsSorted[sectionIndex] as Section;
	const currentLocation = section.location as SectionLocation;
	const pager = getPagerForSection({
		allSections: allSectionsSorted,
		index: sectionIndex,
	});
	const chapters = await getChapters({
		module: currentLocation.module,
		allSections: allSectionsSorted,
	});

	const hasSummary = section.summary;
	const isDev = process.env.NODE_ENV === "development";

	// Would be easier if we change chapter and section in Supabase to strings that match the
	// formatting of subsection indices (i.e., strings with leading zeroes)
	const subsectionIndex = `${currentLocation.chapter < 10 ? "0" : ""}${
		currentLocation.chapter
	}-${currentLocation.section < 10 ? "0" : ""}${currentLocation.section}`;

	// get subsections
	const questions = await getSubsections(subsectionIndex);
	const randomQuestionIndex = Math.floor(
		Math.random() * (questions.length - 1),
	);
	const randomQuestion = questions[randomQuestionIndex];

	return (
		<Fragment>
			<div className="grid grid-cols-12 gap-6 px-2 relative">
				<PageVisibilityModal />
				{!isDev && <EventTracker />}

				<aside className="module-sidebar col-span-2 sticky top-20 h-fit">
					<ModuleSidebar
						chapters={chapters}
						currentLocation={currentLocation}
					/>
					<div className="mt-12 flex flex-col">
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
				</aside>

				<section className="page-content relative col-span-8">
					<h1
						className="text-3xl font-semibold mb-4 text-center"
						id="page-title"
					>
						<Balancer>{section.title}</Balancer>
					</h1>
					<QuestionControl
						subsectionWithQuestionIndex={randomQuestionIndex}
						subsectionQuestion={randomQuestion.question}
						location={currentLocation}
					/>
					<PageContent code={section.body.code} />
					<Highlighter location={currentLocation} />
					<SectionPager pager={pager} />
				</section>

				<aside className="toc-sidebar col-span-2 relative">
					<div className="sticky top-20">
						<TocSidebar headings={section.headings} />
					</div>
					<Suspense
						fallback={
							<p className="text-sm text-muted-foreground mt-8">
								<Spinner className="inline mr-2" />
								loading notes
							</p>
						}
					>
						<NoteList location={currentLocation} />
					</Suspense>
				</aside>
			</div>

			{hasSummary && <PageSummary location={currentLocation} />}
		</Fragment>
	);
}
