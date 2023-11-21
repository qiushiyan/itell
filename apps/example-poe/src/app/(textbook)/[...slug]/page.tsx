import Balancer from "react-wrap-balancer";
import { notFound } from "next/navigation";
import { SectionLocation } from "@/types/location";
import { getPagerLinksForSection } from "@/lib/pager";
import NoteList from "@/components/note/note-list";
import Highlighter from "@/components/note/note-toolbar";
import { Fragment, Suspense } from "react";
import { allSectionsSorted } from "@/lib/sections";
import { Pager } from "@/components/client-components";
import { TocSidebar } from "@/components/toc-sidebar";
import { Section } from "contentlayer/generated";
import Spinner from "@/components/spinner";
import { PageContent } from "@/components/section/page-content";
import { QuestionControl } from "@/components/question/question-control";
import { getCurrentUser } from "@/lib/auth";
import { env } from "@/env.mjs";
import { getPageQuestions } from "@/lib/question";
import { PageTitle } from "@/components/page-title";
import { getUser } from "@/lib/user";
import { isLocationAfter, isLocationUnlockedWithoutUser } from "@/lib/location";
import { PageStatusModal } from "@/components/page-status/page-status-modal";
import { EyeIcon, LockIcon, UnlockIcon } from "lucide-react";
import { PageStatus } from "@/components/page-status/page-status";
import { NoteCount } from "@/components/note/note-count";

export default async function ({ params }: { params: { slug: string[] } }) {
	const sessionUser = await getCurrentUser();
	const user = sessionUser ? await getUser(sessionUser.id) : null;
	const whitelist = JSON.parse(env.SUMMARY_WHITELIST || "[]") as string[];
	const isUserWhitelisted = whitelist.includes(user?.email || "");

	const path = params.slug.join("/");
	const sectionIndex = allSectionsSorted.findIndex((section) => {
		return section.url === path;
	});

	if (sectionIndex === -1) {
		return notFound();
	}

	const section = allSectionsSorted[sectionIndex] as Section;
	const enableQA = section.qa;
	const currentLocation = section.location as SectionLocation;
	const pagerLinks = getPagerLinksForSection(sectionIndex);

	// Would be easier if we change chapter and section in Supabase to strings that match the
	// formatting of subsection indices (i.e., strings with leading zeroes)
	const pageId = `${currentLocation.chapter < 10 ? "0" : ""}${
		currentLocation.chapter
	}-${currentLocation.section < 10 ? "0" : ""}${currentLocation.section}`;

	// get subsections
	let questions: Awaited<ReturnType<typeof getPageQuestions>> = [];
	// Subsections to be passed onto page
	const selectedQuestions = new Map<
		number,
		{ question: string; answer: string }
	>();
	if (enableQA) {
		const chooseQuestion = (question: typeof questions[0]) => {
			let targetQuestion = question.question;
			// band-aid solution for YouTube videos until we implement content-types via Strapi
			if (question.slug.includes("learn-with-videos")) {
				targetQuestion = `(Watch the YouTube video above to answer this question) ${targetQuestion}`;
			}

			if (targetQuestion && question.answer) {
				selectedQuestions.set(question.subsection, {
					question: targetQuestion,
					answer: question.answer,
				});
			}
		};

		questions = await getPageQuestions(pageId);

		for (let index = 0; index < questions.length - 1; index++) {
			// Each subsection has a 1/3 chance of spawning a question
			if (Math.random() < 1 / 3) {
				chooseQuestion(questions[index]);
			}
		}

		// Each page will have at least one question
		if (selectedQuestions.size === 0) {
			const randChunk = Math.floor(Math.random() * (questions.length - 1));
			chooseQuestion(questions[randChunk]);
		}
	}

	const isUserLatestPage = user
		? user.chapter === currentLocation.chapter &&
		  user.section === currentLocation.section
		: false;
	// can view page, with no blurred chunks
	const isPageUnlocked = user
		? isLocationAfter(
				{
					module: user.module,
					chapter: user.chapter,
					section: user.section,
				},
				currentLocation,
		  )
		: isLocationUnlockedWithoutUser(currentLocation);
	// can view page, but with blurred chunks
	const isPageMasked = user ? !isPageUnlocked : true;

	return (
		<Fragment>
			<section className="page-content relative col-span-8">
				<PageTitle>
					<Balancer>{section.title}</Balancer>
					{isUserLatestPage ? (
						<EyeIcon />
					) : isPageUnlocked ? (
						<UnlockIcon />
					) : (
						<LockIcon />
					)}
				</PageTitle>
				<PageContent code={section.body.code} />
				<Highlighter location={currentLocation} />
				<Pager prev={pagerLinks.prev} next={pagerLinks.next} />
			</section>

			<aside className="toc-sidebar col-span-2 relative">
				<div className="sticky top-20">
					<TocSidebar headings={section.headings} />
					<div className="mt-8 flex flex-col gap-2">
						<PageStatus
							status={
								isUserLatestPage
									? "current"
									: isPageUnlocked
									? "unlocked"
									: "locked"
							}
						/>
						<NoteCount />
					</div>
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

			<PageStatusModal
				location={currentLocation}
				user={user}
				isWhitelisted={isUserWhitelisted}
			/>
			{section.qa && (
				<QuestionControl
					isPageMasked={isPageMasked}
					selectedQuestions={selectedQuestions}
					location={currentLocation}
				/>
			)}
		</Fragment>
	);
}
