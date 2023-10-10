"use client";

import { cn } from "@itell/core/utils";
import { buttonVariants } from "@itell/ui/server";
import { AlertTriangle, ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import Spinner from "../spinner";
import { getQAScore } from "@/lib/question-answer";
import { useQA } from "../context/qa-context";
import { FeedbackModal } from "./feedback-modal";

type Props = {
	question: string | null;
	chapter: number;
	section: number;
	subsection: number;
};

export const QuestionBox = ({
	question,
	chapter,
	section,
	subsection,
}: Props) => {
	const { currentChunk, setCurrentChunk } = useQA();
	const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
	const [isShaking, setIsShaking] = useState(false);
	const [isFlashingYellow, setIsFlashingYellow] = useState(false);
	/*
  QA score state
  3: default
  2: both models responded correct
  1: one model responded correct
  0: both models responded incorrect
  */
	const [isPerfect, setIsPerfect] = useState(3);
	// If QA passed
	const [isCelebrating, setIsCelebrating] = useState(false);
	// Handle spinner animatino when loading
	const [isLoading, setIsLoading] = useState(false);
	// Check if feedback is positive or negative
	const [isPositiveFeedback, setIsPositiveFeedback] = useState(false);
	// QA input
	const [inputValue, setInputValue] = useState("");

	const positiveModal = () => {
		setIsFeedbackModalOpen(true);
		setIsPositiveFeedback(true);
	};

	// When negative review is clicked
	const negativeModal = () => {
		setIsFeedbackModalOpen(true);
		setIsPositiveFeedback(false);
	};

	const handleNextChunk = () => {
		setCurrentChunk(currentChunk + 1);
	};

	const passed = () => {
		setIsPerfect(2);
		setIsCelebrating(true);

		// Stop the confettis after a short delay
		setTimeout(() => {
			setIsCelebrating(false);
		}, 750); // Adjust the delay as needed
	};

	// Function to trigger the shake animation
	const shakeModal = () => {
		setIsShaking(true);

		// Reset the shake animation after a short delay
		setTimeout(() => {
			setIsShaking(false);
		}, 400);
	};

	// Function to trigger the border color change animation
	const flashYellow = () => {
		setIsFlashingYellow(true);

		setTimeout(() => {
			setIsFlashingYellow(false);
		}, 600);
	};

	// Semi-celebrate when response is 1
	const semiPassed = () => {
		flashYellow();
		setIsPerfect(1);
	};

	// Failed = response is 0
	const failed = () => {
		shakeModal();
		setIsPerfect(0);
	};

	const handleSubmit = async () => {
		// Spinner animation when loading
		setIsLoading(true);
		const response = await getQAScore({
			input: inputValue,
			chapter: String(chapter),
			section: String(section),
			subsection: String(subsection),
		});

		if (!response.success) {
			// API response is not in correct shape
			console.error("API Response error", response);
			return;
		}

		const result = response.data;
		setIsLoading(false);

		if (result.score === 2) {
			passed();
		} else if (result.score === 1) {
			semiPassed();
		} else {
			failed();
		}
	};

	return (
		<div
			className={`flex justify-center items-center flex-col py-5 px-6 gap-2
                border-4 my-6 rounded-md max-w-4xl mx-auto ${
									isShaking
										? "shake border-red-400"
										: isFlashingYellow
										? "border-yellow-400"
										: "border-blue-400"
								}`}
		>
			{isCelebrating && <ConfettiExplosion width={window.innerWidth} />}

			<div className="flex justify-end items-center flex-row mt-2 mb-1 w-full">
				<ThumbsUp
					className="hover:stroke-emerald-400 hover:cursor-pointer h-4"
					onClick={positiveModal}
				/>
				<ThumbsDown
					className="hover:stroke-rose-700 hover:cursor-pointer h-4"
					onClick={negativeModal}
				/>
			</div>

			<div className="flex justify-center items-center text-xs my-2 font-light text-zinc-400">
				<p className="inline-flex">
					{" "}
					<AlertTriangle className="stroke-yellow-400 mr-2" /> iTELL AI is in
					alpha testing. It will try its best to help you but it can still make
					mistakes. Let us know how you feel about iTELL AI's performance using
					the feedback icons on the top right side of this box (thumbs up or
					thumbs down).{" "}
				</p>
			</div>

			{isPerfect < 2 && (
				<div className="flex justify-center items-center flex-col text-xs m-2">
					{isPerfect === 0 && (
						<>
							<p className="text-red-400">
								<b>iTELL AI says:</b> You likely got a part of the answer wrong.
								Please try again.
							</p>
							<p>
								<u>
									If you believe iTELL AI has made an error, you can click on
									the "Skip this question" button to skip this question.
								</u>{" "}
								If you would like to help improve iTELL, please click on the
								feedback icons on the top right side of this box to give us
								feedback on this question.
							</p>
						</>
					)}
					{isPerfect === 1 && (
						<p className="text-yellow-600">
							<b>iTELL AI says:</b> You may have missed something, but you were
							generally close. You can click on the button below to continue
							reading or try again with a different response.{" "}
						</p>
					)}
				</div>
			)}

			{isPerfect === 2 ? (
				<div className="flex items-center flex-col max-w-2xl">
					<p className="text-xl2 text-emerald-600 text-center">
						Your answer was CORRECT!
					</p>
					<p className="text-sm">
						Click on the button below to continue reading. Please use the
						thumbs-up or thumbs-down icons on the top right side of this box if
						you have any feedback about this question that you would like to
						provide before you continue reading.
					</p>
				</div>
			) : (
				question && (
					<p>
						<b>Question:</b> {question}
					</p>
				)
			)}

			{isPerfect !== 2 && (
				<input
					className="rounded-md shadow-md w-3/4 p-4 mb-4"
					value={inputValue}
					type="text"
					onChange={(e) => setInputValue(e.currentTarget.value)}
				/>
			)}

			{isPerfect === 2 ? (
				<div className="flex justify-center items-center flex-row">
					<button
						className={cn(buttonVariants({ variant: "secondary" }), "mb-4")}
						onClick={handleNextChunk}
					>
						Click Here to Continue Reading
					</button>
				</div>
			) : (
				<div className="flex justify-center items-center flex-row">
					<button
						className={cn(buttonVariants({ variant: "secondary" }), "mb-4")}
						onClick={handleSubmit}
					>
						{isLoading && <Spinner className="inline" />}
						{isPerfect !== 1 ? "Submit" : "Resubmit"}
					</button>
					{isPerfect < 2 && (
						<button
							className={cn(
								buttonVariants({ variant: "secondary" }),
								"bg-red-400 hover:bg-red-200 text-white mb-4 ml-6",
							)}
							onClick={handleNextChunk}
						>
							{isPerfect === 1
								? "Click Here to Continue Reading"
								: "Skip this question"}
						</button>
					)}
				</div>
			)}
			<FeedbackModal
				open={isFeedbackModalOpen}
				onOpenChange={setIsFeedbackModalOpen}
				isPositive={isPositiveFeedback}
			/>
		</div>
	);
};
