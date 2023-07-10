"use client";

import { Button } from "@/components/client-components";
import { Typography, Warning } from "@itell/ui/server";
import Spinner from "../spinner";
import Feedback from "./summary-feedback";
import TextArea from "../ui/textarea";
import { makeInputKey, numOfWords } from "@/lib/utils";
import { useSummary } from "@/lib/hooks/use-summary";
import { useFocusTime } from "@/lib/hooks/use-focus-time";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import ConfettiExplosion from "react-confetti-explosion";
import { useCurrentChapter } from "@/lib/hooks/utils";

export default function SummaryInput() {
	const { state, setInput, score, create } = useSummary({
		useLocalStorage: true,
	});
	const { status: sessionStatus } = useSession();
	const currentChapter = useCurrentChapter();
	const router = useRouter();

	const {
		saveFocusTime,
		start: startFocusTimeCounting,
		pause: pauseFocusTimeCounting,
	} = useFocusTime();

	const handleSubmit = async (e: FormEvent) => {
		if (sessionStatus === "authenticated" && currentChapter) {
			e.preventDefault();

			// stop counting focus time
			// pauseFocusTimeCounting();

			// save summary text for the current section
			const inputKey = makeInputKey(currentChapter);
			window.localStorage.setItem(inputKey, state.input);

			// score the summary
			const response = await score(currentChapter);
			if (response) {
				const savedSummary = await create(
					response.result,
					response.feedback,
					currentChapter,
				);
				if (savedSummary) {
					await saveFocusTime({
						summaryId: savedSummary.id,
					});
				}
			}
		} else {
			router.push("/auth");
		}
	};

	return (
		<>
			{state.feedback && <Feedback feedback={state.feedback} />}
			{state.feedback?.isPassed && (
				<ConfettiExplosion width={window.innerWidth} />
			)}
			<Typography variant="small" className="my-2">
				Number of words: {numOfWords(state.input)}
			</Typography>
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
		</>
	);
}
