import { trpc } from "@/trpc/trpc-provider";
import { useLocation } from "./utils";
import { SummaryFeedback, SummaryScore, getFeedback } from "../summary";
import { isTextbookPage, makeInputKey, numOfWords } from "../utils";
import { useImmerReducer } from "use-immer";
import { useCallback, useEffect, useReducer } from "react";
import { toast } from "sonner";
import cld3 from "../cld";
import { Location } from "@/types/location";
import { Summary } from "@prisma/client";

enum ErrorType {
	LANGUAGE_NOT_EN = "LANGUAGE_NOT_EN",
	WORD_COUNT = "WORD_COUNT",
}

const ErrorFeedback: Record<ErrorType, string> = {
	[ErrorType.LANGUAGE_NOT_EN]: "Please use English for your summary.",
	[ErrorType.WORD_COUNT]: "Your summary must be between 50 and 200 words.",
};

type State = {
	input: string;
	prompt: string;
	error: string | null;
	pending: boolean;
	feedback: SummaryFeedback | null;
	score: SummaryScore | null;
};

type Action =
	| { type: "set_input"; payload: string }
	| { type: "set_pending"; payload: boolean }
	| { type: "check_length" }
	| { type: "check_length_error" }
	| { type: "check_language" }
	| { type: "check_language_error" }
	| { type: "score_summary" }
	| {
			type: "score_summary_finished";
			payload: { score: SummaryScore; feedback: SummaryFeedback };
	  }
	| { type: "save_summary" }
	| { type: "save_summary_finished" }
	| { type: "update_summary" }
	| { type: "update_summary_finished" }
	| { type: "reset" }
	| { type: "save_summary" };

const reducer = (state: State, action: Action) => {
	switch (action.type) {
		case "set_input":
			return {
				...state,
				input: action.payload,
			};
		case "set_pending": {
			return {
				...state,
				pending: action.payload,
			};
		}
		case "check_length": {
			return {
				...state,
				error: null,
				pending: true,
				prompt: "Checking length",
			};
		}
		case "check_length_error": {
			return {
				...state,
				error: ErrorFeedback[ErrorType.WORD_COUNT],
				pending: false,
				prompt: "Submit your summary",
			};
		}
		case "check_language": {
			return {
				...state,
				error: null,
				pending: true,
				prompt: "Checking language",
			};
		}
		case "check_language_error": {
			return {
				...state,
				error: ErrorFeedback[ErrorType.LANGUAGE_NOT_EN],
				pending: false,
				prompt: "Submit your summary",
			};
		}
		case "score_summary": {
			return {
				...state,
				pending: true,
				feedback: null,
				prompt: "Generating score",
			};
		}
		case "score_summary_finished": {
			return {
				...state,
				score: action.payload.score,
				feedback: action.payload.feedback,
				pending: false,
				prompt: "Score generated",
			};
		}
		case "save_summary": {
			return {
				...state,
				pending: true,
				prompt: "Saving summary",
			};
		}
		case "save_summary_finished": {
			return {
				...state,
				pending: false,
				prompt: "Submit your summary",
			};
		}
		// no need to update the prompt
		// which is handled as local state in summary-editor
		case "update_summary":
			return {
				...state,
				pending: true,
			};
		case "update_summary_finished":
			return {
				...state,
				pending: false,
			};
		case "reset": {
			return {
				...state,
				pending: false,
				prompt: "Submit your summary",
				score: null,
				feedback: null,
			};
		}
		default:
			return state;
	}
};

export const useSummary = () => {
	const location = useLocation();
	const scoreSummary = trpc.summary.getScore.useMutation();
	const addSummary = trpc.summary.create.useMutation();
	const updateSummary = trpc.summary.update.useMutation();

	const initialState: State = {
		input: "",
		prompt: "Submit your summary",
		error: null,
		pending: false,
		feedback: null,
		score: null,
	};

	const [state, dispatch] = useReducer(reducer, initialState);

	const checkSummary = (text: string) => {
		const inputKey = makeInputKey(location);
		const wordNum = numOfWords(text);

		window.localStorage.setItem(inputKey, text);
		dispatch({ type: "check_length" });
		if (wordNum < 50 || wordNum > 200) {
			dispatch({ type: "check_length_error" });
			toast.error(ErrorFeedback[ErrorType.WORD_COUNT]);
			return false;
		}

		dispatch({ type: "check_language" });
		const cldResult = cld3.findLanguage(text);
		if (cldResult.language !== "en") {
			dispatch({ type: "check_language_error" });
			toast.error(ErrorFeedback[ErrorType.LANGUAGE_NOT_EN]);
			return false;
		}

		return true;
	};
	// 	switch (action.type) {
	// 		case "check_length": {
	// 			draft.error = null;
	// 			draft.pending = true;
	// 			draft.prompt = "Checking length";
	// 			break;
	// 		}
	// 		case "check_length_error": {
	// 			draft.error = ErrorFeedback[ErrorType.WORD_COUNT];
	// 			draft.pending = false;
	// 			draft.prompt = "Submit your summary";
	// 			break;
	// 		}
	// 		case "check_language": {
	// 			draft.error = null;
	// 			draft.pending = true;
	// 			draft.prompt = "Checking language";
	// 			break;
	// 		}
	// 		case "check_language_error": {
	// 			draft.error = ErrorFeedback[ErrorType.LANGUAGE_NOT_EN];
	// 			draft.pending = false;
	// 			draft.prompt = "Submit your summary";
	// 			break;
	// 		}
	// 		case "score_summary": {
	// 			draft.pending = true;
	// 			draft.feedback = null;
	// 			draft.prompt = "Generating score";
	// 			break;
	// 		}
	// 		case "save_summary": {
	// 			draft.pending = true;
	// 			draft.prompt = "Saving summary";
	// 			break;
	// 		}
	// 		case "reset": {
	// 			draft.pending = false;
	// 			draft.prompt = "Submit your summary";
	// 			draft.score = null;
	// 			draft.feedback = null;
	// 			break;
	// 		}
	// 	}
	// }, initialState);

	const setInput = (text: string) => {
		dispatch({ type: "set_input", payload: text });
	};

	const inputKey = makeInputKey(location);

	useEffect(() => {
		if (isTextbookPage(location)) {
			setInput(localStorage.getItem(inputKey) || "");
		}
	}, [location]);

	const handleScore = async (location: Location) => {
		if (checkSummary(state.input)) {
			dispatch({ type: "score_summary" });
			if (isTextbookPage(location)) {
				try {
					const score = await scoreSummary.mutateAsync({
						text: state.input,
						location: {
							module: location.module as number,
							chapter: location.chapter as number,
							section: location.section,
						},
					});
					const feedback = getFeedback(score);
					dispatch({
						type: "score_summary_finished",
						payload: { score, feedback },
					});
					return { score, feedback };
				} catch (err) {
					console.log(err);
					toast.error("Something went wrong, please try again later.");
				}
			} else {
				toast.success(
					"No summary is required for this section. You are good to go!",
				);
			}
		}
	};

	const handleUpdate = async (
		summary: Summary,
		score: SummaryScore | null,
		feedback: SummaryFeedback | null,
	) => {
		if (score && feedback) {
			dispatch({ type: "update_summary" });
			try {
				await updateSummary.mutateAsync({
					id: summary.id,
					text: state.input,
					isPassed: feedback.isPassed,
					score: score,
				});
				toast.success("Summary updated!");
				dispatch({ type: "update_summary_finished" });
			} catch (err) {
				toast.error("Something went wrong, please try again later.");
			}
		} else {
			toast.error("Please score your summary first.");
		}
	};

	const handleSave = async (score: SummaryScore, feedback: SummaryFeedback) => {
		if (feedback && score && isTextbookPage(location)) {
			dispatch({ type: "save_summary" });
			try {
				await addSummary.mutateAsync({
					text: state.input,
					location: {
						module: location.module as number,
						chapter: location.chapter as number,
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
					toast.success("You can now proceed to the next section.");
				}
				dispatch({ type: "save_summary_finished" });
			} catch (err) {
				toast.error("Something went wrong, please try again later.");
			}
		}
	};

	return { state, setInput, handleScore, handleSave, handleUpdate };
};
