"use client";

import { Button, Typography } from "@/components/material-tailwind";
import { trpc } from "@/trpc/trpc-provider";
import { useLocation } from "@/lib/hooks";
import { Location } from "@/types/location";
import { useImmerReducer } from "use-immer";
import { toast } from "sonner";
import cld3 from "@/lib/cld";
import { Warning } from "../mdx";
import Spinner from "../spinner";
import { SummaryFeedback, getFeedback } from "@/lib/summary";
import Feedback from "./SummaryFeedback";
import { useEffect } from "react";

type State = {
	input: string;
	prompt: string;
	error: string | null;
	pending: boolean;
	feedback: SummaryFeedback | null;
};

type Action =
	| {
			type: "set_input";
			payload: string;
	  }
	| { type: "check_language" }
	| { type: "check_language_error"; payload: string }
	| { type: "score_summary" }
	| { type: "set_feedback"; payload: SummaryFeedback }
	| { type: "reset" }
	| { type: "save_summary" };

const makeInputKey = (location: Location) => {
	return `chapter-${location.chapter}-section-${location.section}-summary`;
};

const numOfWords = (str: string): number => {
	if (str.trim() === "") {
		return 0;
	}
	const strWithoutSpace = str.replace(/[\s\t]+/g, " ");
	return strWithoutSpace.split(" ").length;
};

export default function SummaryInput() {
	const location = useLocation();
	const scoreSummary = trpc.summary.getScore.useMutation();
	const addSummary = trpc.summary.create.useMutation();
	const inputKey = makeInputKey(location);
	const [state, dispatch] = useImmerReducer<State, Action>(
		(draft, action) => {
			switch (action.type) {
				case "set_input": {
					draft.input = action.payload;
					break;
				}
				case "check_language": {
					draft.error = null;
					draft.pending = true;
					draft.prompt = "Checking language";
					break;
				}
				case "check_language_error": {
					draft.error = action.payload;
					draft.pending = false;
					draft.prompt = "Submit your summary";
					break;
				}
				case "score_summary": {
					draft.pending = true;
					draft.feedback = null;
					draft.prompt = "Generating score";
					break;
				}
				case "save_summary": {
					draft.pending = true;
					draft.prompt = "Saving summary";
					break;
				}
				case "set_feedback": {
					draft.feedback = action.payload;
					break;
				}
				case "reset": {
					draft.pending = false;
					draft.prompt = "Submit your summary";
					break;
				}
			}
		},
		{
			input: "",
			prompt: "Submit your summary",
			error: null,
			pending: false,
			feedback: null,
		},
	);

	useEffect(() => {
		dispatch({
			type: "set_input",
			payload: window.localStorage.getItem(inputKey) || "",
		});
		dispatch({ type: "reset" });
	}, []);

	if (location.section === undefined) {
		return (
			<div className="border-l-4 border-blue-400 bg-blue-50 px-4 py-2">
				<div className="ml-3">
					<Typography>
						No summary is required for this section. You are good to go!
					</Typography>
				</div>
			</div>
		);
	}

	const wordNum = numOfWords(state.input);

	const handleSubmit = async () => {
		window.localStorage.setItem(inputKey, state.input);
		if (wordNum < 50 || wordNum > 200) {
			toast.error("Your summary must be between 50 and 200 words.");
			return;
		}

		dispatch({ type: "check_language" });
		const cldResult = cld3.findLanguage(state.input);
		if (cldResult.language !== "en") {
			toast.error("Please use English for your summary");
			return dispatch({
				type: "check_language_error",
				payload: "Please use English for your summary",
			});
		}

		dispatch({ type: "score_summary" });

		if (
			location.module !== undefined &&
			location.chapter !== undefined &&
			location.section !== undefined
		) {
			try {
				const score = await scoreSummary.mutateAsync({
					text: state.input,
					location: {
						module: location.module,
						chapter: location.chapter,
						section: location.section,
					},
				});
				const feedback = getFeedback(score);
				dispatch({ type: "set_feedback", payload: feedback });
				dispatch({ type: "save_summary" });

				await addSummary.mutateAsync({
					text: state.input,
					location: {
						module: location.module,
						chapter: location.chapter,
						section: location.section,
					},
					isPassed: feedback.isPassed,
					score: {
						containment: score.containment,
						similarity: score.similarity,
						wording: score.wording,
						content: score.wording,
					},
				});
				if (feedback.isPassed) {
					toast.success("You can now proceed to the next section");
				}
				dispatch({ type: "reset" });
			} catch (err) {
				console.log(err);
				toast.error("Something went wrong, please try again later");
				return;
			}

			// dispatch({ type: "reset" });
		} else {
			toast.success(
				"No summary is required for this section. You are good to go!",
			);
		}
	};

	return (
		<section className="summary-input flex-1">
			{state.feedback && <Feedback feedback={state.feedback} />}
			<Typography variant="small">Number of words: {wordNum}</Typography>
			<form className=" space-y-4">
				<textarea
					placeholder="Write your summary here."
					value={state.input}
					onChange={(e) =>
						dispatch({ type: "set_input", payload: e.target.value })
					}
					rows={10}
					className="resize-none rounded-md shadow-md p-4 w-full"
				/>
				{state.error && <Warning>{state.error}</Warning>}
				<Button
					fullWidth
					onClick={(e) => {
						e.preventDefault();
						handleSubmit();
					}}
					disabled={state.pending}
					className="flex items-center justify-center gap-1"
				>
					{state.pending && <Spinner className="w-6 h-6 text-indigo-900" />}
					{state.prompt}
				</Button>
			</form>
		</section>
	);
}
