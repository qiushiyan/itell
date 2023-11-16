import Balancer from "react-wrap-balancer";
import { notFound } from "next/navigation";
import { getPagerLinksForChapter } from "@/lib/pager";
import { NoteList } from "@/components/note/note-list";
import { NoteToolbar } from "@/components/note/note-toolbar";
import { Fragment, Suspense } from "react";
import { allChaptersSorted } from "@/lib/chapters";
import {
	Pager,
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/client-components";
import { TocSidebar } from "@/components/toc-sidebar";
import { PageContent } from "@/components/page-content";
import Spinner from "@/components/spinner";
import { getPageQuestions } from "@/lib/question";
import { QuestionControl } from "@/components/question/question-control";
import { getCurrentUser } from "@/lib/auth";
import { getUser } from "@/lib/user";
import { EyeIcon, LockIcon, UnlockIcon } from "lucide-react";
import { cn } from "@itell/core/utils";
import { buttonVariants } from "@itell/ui/server";
import { PageStatusModal } from "@/components/page-status-modal";

export default async function ({ params }: { params: { slug: string } }) {
	const url = params.slug;
	const chapterIndex = allChaptersSorted.findIndex((section) => {
		return section.url === url;
	});

	if (chapterIndex === -1) {
		return notFound();
	}
	const chapter = allChaptersSorted[chapterIndex];
	const pagerLinks = getPagerLinksForChapter(chapterIndex);

	const sessionUser = await getCurrentUser();
	const user = sessionUser ? await getUser(sessionUser.id) : null;

	// get subsections
	let questions: Awaited<ReturnType<typeof getPageQuestions>> = [];
	const pageId = `${String(chapter.chapter).padStart(2, "0")}`;
	// Subsections to be passed onto page
	const selectedQuestions = new Map<
		number,
		{ question: string; answer: string }
	>();
	if (chapter.qa) {
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

	const isUserLatestPage = user ? user?.chapter === chapter.chapter : false;
	// can view page, with no blurred chunks
	const isPageUnlocked = user ? user.chapter > chapter.chapter : false;
	// can view page, but with blurred chunks
	const isPageMasked = user ? user.chapter <= chapter.chapter : true;

	return (
		<Fragment>
			{chapter.qa && (
				<QuestionControl
					isPageMasked={isPageMasked}
					selectedQuestions={selectedQuestions}
					chapter={chapter.chapter}
				/>
			)}

			<section className="relative col-span-12 md:col-span-10 lg:col-span-8">
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<h1
								className={cn(
									buttonVariants({ variant: "ghost" }),
									"text-3xl font-semibold mb-4 text-center flex items-center justify-center gap-2 h-fit",
								)}
								id="page-title"
							>
								<Balancer>{chapter.title}</Balancer>
								{isUserLatestPage ? (
									<EyeIcon />
								) : isPageUnlocked ? (
									<UnlockIcon />
								) : (
									<LockIcon />
								)}
							</h1>
						</TooltipTrigger>
						<TooltipContent>
							{isUserLatestPage
								? "Answer questions and summarize this chapter to move forward"
								: isPageUnlocked
								? "You have completed this chapter. You can now view all its content"
								: "You haven't got access to this chapter yet"}
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>

				<PageContent code={chapter.body.code} />
				<NoteToolbar chapter={chapter.chapter} />
				<Pager prev={pagerLinks.prev} next={pagerLinks.next} />
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

			<PageStatusModal chapter={chapter.chapter} user={user} />
		</Fragment>
	);
}
