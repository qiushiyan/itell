"use client";

import { Summary } from "@prisma/client";
import TextArea from "../ui/textarea";
import { FormEvent, useEffect, useState } from "react";
import { Button } from "../ui-components";
import { useSummary } from "@/lib/hooks/summary";
import Feedback from "../summary/summary-feedback";
import { numOfWords } from "@/lib/utils";
import Spinner from "../spinner";
import { SummaryFeedback } from "@/lib/summary";
import { useRouter } from "next/navigation";
import { SectionLocation } from "@/types/location";
import { SummaryResult } from "@/trpc/schema";

type Props =
	| {
			published: true;
			summary: Summary;
	  }
	| {
			published: false;
			location: SectionLocation;
	  };

export default function (props: Props) {
	const router = useRouter();
	const [pending, setPending] = useState({
		update: false,
		score: false,
	});
	const { state, setInput, score, update, create } = useSummary({
		useLocalStorage: false,
	});
	const [result, setResult] = useState<{
		result: SummaryResult | null;
		feedback: SummaryFeedback | null;
	}>({ result: null, feedback: null });
	const [isScored, setIsScored] = useState(false);
	const canUpdate = isScored && !state.error;

	useEffect(() => {
		if (props.published) {
			setInput(props.summary.text);
		} else {
			setInput("");
		}
	}, []);

	const handleUpsert = async (event: FormEvent) => {
		event.preventDefault();

		if (isScored && result.result) {
			setPending({ ...pending, update: true });
			if (props.published) {
				await update(props.summary, result.result, result.feedback);
				router.refresh();
			} else {
				await create(result.result, result.feedback, props.location);
				router.push("/dashboard");
			}
			setIsScored(false);
			setPending({ ...pending, update: false });
		}
	};

	const handleScore = async (event: FormEvent) => {
		event.preventDefault();
		const sectionLocation = props.published
			? {
					module: props.summary.module,
					chapter: props.summary.chapter,
					section: props.summary.section,
			  }
			: props.location;

		setPending({ ...pending, score: true });
		const result = await score(sectionLocation);
		if (result) {
			setResult(result);
		}
		setIsScored(true);
		setPending({ ...pending, score: false });
	};

	return (
		<form className="space-y-6">
			<p className="text-sm text-muted-foreground">
				Number of words: {numOfWords(state.input)}
			</p>
			<div className="text-left">
				{state.feedback && <Feedback feedback={state.feedback} />}
			</div>

			<div className="prose prose-stone dark:prose-invert max-w-2xl  space-y-4">
				<TextArea
					autoFocus
					id="title"
					value={state.input}
					onValueChange={setInput}
					placeholder="Summary Content"
					className="w-full resize-none appearance-none overflow-hidden bg-transparent focus:outline-none min-h-[400px]"
				/>
				<div className="flex justify-between">
					{canUpdate && (
						<Button disabled={state.pending} onClick={handleUpsert}>
							{pending.update && <Spinner className="w-6 h-6 mr-1" />}
							{props.published ? "Save and update" : "Create"}
						</Button>
					)}
					<Button
						disabled={state.pending}
						onClick={handleScore}
						className="ml-auto"
					>
						{pending.score && <Spinner className="w-6 h-6 mr-1" />}
						Get score
					</Button>
				</div>
			</div>
		</form>
	);
}
