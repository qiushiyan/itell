"use client";

import { Button } from "@/components/ui-components";
import { Typography, Warning } from "@itell/ui/server";
import Spinner from "../spinner";
import Feedback from "./summary-feedback";
import TextArea from "../ui/textarea";
import { makeInputKey, numOfWords } from "@/lib/utils";
import { useSummary } from "@/lib/hooks/use-summary";
import { useLocation } from "@/lib/hooks/utils";
import { useFocusTime } from "@/lib/hooks/use-focus-time";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import ConfettiExplosion from "react-confetti-explosion";

export default function SummaryInput() {
	const { state, setInput, score, create } = useSummary({
		useLocalStorage: true,
	});
	const { status: sessionStatus } = useSession();
	const location = useLocation();
	const router = useRouter();

	const {
		saveFocusTime,
		start: startFocusTimeCounting,
		pause: pauseFocusTimeCounting,
	} = useFocusTime();

	const handleSubmit = async (e: FormEvent) => {
		if (sessionStatus === "authenticated") {
			e.preventDefault();
			pauseFocusTimeCounting();
			const inputKey = makeInputKey(location);
			window.localStorage.setItem(inputKey, state.input);
			const response = await score(location);
			if (response) {
				const savedSummary = await create(
					response.result,
					response.feedback,
					location,
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
						{state.pending && (
							<Spinner className="w-6 h-6 text-background mr-1" />
						)}
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
