"use client";

import { Button } from "@/components/ui-components";
import { Typography, Warning } from "@itell/ui/server";
import Spinner from "../spinner";
import Feedback from "./summary-feedback";
import TextArea from "../ui/textarea";
import { isTextbookPage, makeInputKey, numOfWords } from "@/lib/utils";
import { useSummary } from "@/lib/hooks/summary";
import { useEffect, useState } from "react";
import { useLocation } from "@/lib/hooks/utils";

export default function SummaryInput() {
	const { state, setInput, handleScore, handleSave } = useSummary();
	const location = useLocation();

	return (
		<>
			{state.feedback && <Feedback feedback={state.feedback} />}
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
				/>
				{state.error && <Warning>{state.error}</Warning>}
				<div className="flex justify-end">
					<Button
						onClick={async (e) => {
							e.preventDefault();
							const result = await handleScore(location);
							if (result) {
								await handleSave(result.score, result.feedback);
							}
						}}
						disabled={state.pending}
					>
						{state.pending && (
							<Spinner className="w-6 h-6 text-background mr-1" />
						)}
						{state.prompt}
					</Button>
				</div>
			</form>
		</>
	);
}
