"use client";

import { Button } from "@/components/client-components";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogFooter,
	DialogHeader,
} from "@/components/ui/dialog";
import { Warning } from "@itell/ui/server";
import Spinner from "../spinner";
import Feedback from "./summary-feedback";
import TextArea from "../ui/textarea";
import { makeChapterHref, makeInputKey } from "@/lib/utils";
import { useSummary } from "@/lib/hooks/use-summary";
import { useFocusTime } from "@/lib/hooks/use-focus-time";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ConfettiExplosion from "react-confetti-explosion";
import { numOfWords } from "@itell/core/utils";
import {
	FOCUS_TIME_SAVE_INTERVAL,
	PAGE_SUMMARY_THRESHOLD,
} from "@/lib/constants";
import { trpc } from "@/trpc/trpc-provider";
import { allChaptersSorted } from "@/lib/chapters";

export const SummaryInput = ({ chapter }: { chapter: number }) => {
	const [showProceedModal, setShowProceedModal] = useState(false);
	const { state, setInput, score, create } = useSummary({
		useLocalStorage: true,
	});
	const router = useRouter();
	const { status: sessionStatus } = useSession();

	const [isGoingToNextChapter, setIsGoingToNextChapter] = useState(false);

	const { refetch: fetchSummaryCount, data: currentSummaryCount } =
		trpc.summary.countWithChapter.useQuery(
			{ chapter },
			{
				enabled: false, // manually fetch when user submitting a summary
			},
		);
	const { refetch: fetchUserChapter } = trpc.user.getChapter.useQuery(
		undefined,
		{
			enabled: false,
		},
	);

	const incrementUserChapter = trpc.user.incrementChapter.useMutation();
	const {
		saveFocusTime,
		start: startFocusTimeCounting,
		pause: pauseFocusTimeCounting,
	} = useFocusTime();

	const handleSubmit = async (e: FormEvent) => {
		if (sessionStatus === "authenticated" && chapter) {
			e.preventDefault();

			// stop counting focus time
			// pauseFocusTimeCounting();

			// save summary text for the current section
			const inputKey = makeInputKey(chapter);
			window.localStorage.setItem(inputKey, state.input);

			// score the summary
			const response = await score(chapter);
			if (response) {
				const savedSummary = await create(
					response.result,
					response.feedback,
					chapter,
				);
				if (savedSummary) {
					// this focus-time record is associated with a summary
					saveFocusTime(savedSummary.id);
				}
			}
		} else {
			router.push("/auth");
		}
	};

	useEffect(() => {
		// if the summary did not pass
		// update the summary count state (unless this is the last chapter)
		if (state.feedback && !state.feedback.isPassed) {
			if (allChaptersSorted[allChaptersSorted.length - 1].chapter > chapter) {
				fetchSummaryCount().then(({ data: count }) => {
					console.log(count);
					if (count && count > PAGE_SUMMARY_THRESHOLD) {
						setShowProceedModal(true);
					}
				});
			}
		}
	}, [state.feedback]);

	const handleGoToNextChapter = async () => {
		setIsGoingToNextChapter(true);
		const { data: userChapter } = await fetchUserChapter();
		// in practice userChapter should always
		// 1. equals to the current chapter: we should let them proceed
		// 2. greater than current chapter: do nothing
		// it should never be less than current chapter (since they should not be able to submit a summary for a chapter they have not read)
		// but I'll keep the less than for dev purpose
		if (userChapter && userChapter <= chapter) {
			await incrementUserChapter.mutateAsync({ chapter });
		}

		setIsGoingToNextChapter(false);
		router.push(makeChapterHref(chapter + 1));
	};

	let autoSaveTimer: NodeJS.Timer | null = null;

	useEffect(() => {
		if (process.env.NODE_ENV === "production") {
			autoSaveTimer = setInterval(() => {
				saveFocusTime();
			}, FOCUS_TIME_SAVE_INTERVAL);
		}

		return () => {
			if (autoSaveTimer) {
				clearInterval(autoSaveTimer);
			}
		};
	}, []);

	return (
		<>
			{state.feedback && <Feedback feedback={state.feedback} />}
			{state.feedback?.isPassed && (
				<ConfettiExplosion width={window.innerWidth} />
			)}
			<p className="text-sm font-light">
				Number of words: {numOfWords(state.input)}
			</p>
			<form className="mt-2 space-y-4">
				<TextArea
					placeholder="Write your summary here."
					value={state.input}
					onValueChange={(val) => setInput(val)}
					rows={10}
					className="resize-none rounded-md shadow-md p-4 w-full"
					onFocus={() => pauseFocusTimeCounting()}
					onBlur={() => startFocusTimeCounting()}
				/>
				{state.error && <Warning>{state.error}</Warning>}
				<div className="flex justify-end">
					<Button onClick={handleSubmit} disabled={state.pending}>
						{state.pending && <Spinner className="mr-2" />}
						{sessionStatus === "authenticated" ? (
							state.prompt
						) : (
							<Link href="/auth">Log in to create a summary</Link>
						)}
					</Button>
				</div>
			</form>
			<Dialog open={showProceedModal} onOpenChange={setShowProceedModal}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>You can now proceed to the next chapter</DialogTitle>
					</DialogHeader>
					<div>
						You have written {currentSummaryCount} summaries for this chapter.
						You can now proceed to the next chapter. You can always come back to
						this chapter to write more summaries.
					</div>
					<DialogFooter>
						<Button
							onClick={handleGoToNextChapter}
							disabled={isGoingToNextChapter}
						>
							{isGoingToNextChapter && <Spinner className="mr-2 inline" />} Next
							Chapter
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
};
