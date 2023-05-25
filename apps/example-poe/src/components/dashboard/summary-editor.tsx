"use client";

import { Summary } from "@prisma/client";
import TextArea from "../ui/textarea";
import { FormEvent, Fragment, useEffect, useState } from "react";
import { Button } from "../ui-components";
import SummaryInput from "../summary/summary-input";
import { useSummary } from "@/lib/hooks/summary";
import Feedback from "../summary/summary-feedback";
import { numOfWords } from "@/lib/utils";
import Spinner from "../spinner";
import { SummaryFeedback, SummaryScore } from "@/lib/summary";
import { useRouter } from "next/navigation";

type Props =
	| {
			published: true;
			summary: Summary;
	  }
	| {
			published: false;
			module: Summary["module"];
			chapter: Summary["chapter"];
			section: Summary["section"];
			userId: Summary["userId"];
	  };

export default function (props: Props) {
	const router = useRouter();
	const { state, setInput, handleScore, handleUpdate } = useSummary();
	const [result, setResult] = useState<{
		score: SummaryScore | null;
		feedback: SummaryFeedback | null;
	}>({ score: null, feedback: null });
	const [prompt, setPrompt] = useState("Get Score");
	const [isScored, setIsScored] = useState(false);

	useEffect(() => {
		if (props.published) {
			setInput(props.summary.text);
		} else {
			setInput("");
		}
	}, []);

	const handleGetScore = async (event: FormEvent) => {
		event.preventDefault();
		if (props.published) {
			if (isScored) {
				await handleUpdate(props.summary, result.score, result.feedback);
				setPrompt("Get Score");
				setIsScored(false);
				router.refresh();
			} else {
				const result = await handleScore({
					module: props.summary.module,
					chapter: props.summary.chapter,
					section: props.summary.section,
				});
				if (result) {
					setResult(result);
				}
				setPrompt("Update and Save");
				setIsScored(true);
			}
		}
	};

	return (
		<div className="max-w-3xl mx-auto ">
			<form className="space-y-4">
				<p className="text-sm text-muted-foreground">
					Number of words: {numOfWords(state.input)}
				</p>
				<div className="text-left">
					{state.feedback && <Feedback feedback={state.feedback} />}
				</div>

				<div className="prose prose-stone dark:prose-invert max-w-2xl mx-auto space-y-4">
					<TextArea
						autoFocus
						id="title"
						value={state.input}
						onValueChange={setInput}
						placeholder="Summary Content"
						className="w-full resize-none appearance-none overflow-hidden bg-transparent focus:outline-none min-h-[400px]"
					/>
					<div className="flex justify-end">
						<Button disabled={state.pending} onClick={handleGetScore}>
							{state.pending && <Spinner className="w-6 h-6 mr-1" />}
							{prompt}
						</Button>
					</div>
				</div>
			</form>
		</div>
	);
}
