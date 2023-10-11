"use client";

import React, {
	useEffect,
	useState,
	useRef,
	useContext,
	Suspense,
} from "react";
import { useMDXComponent } from "next-contentlayer/hooks";
import { cn } from "@itell/core/utils";
import { env } from "@/env.mjs";
import { qContext } from "@/components/contexthandler";
import { buttonVariants, Checkbox } from "@itell/ui/server";
import { QAScoreSchema } from "@/trpc/schema";
import { TEXTBOOK_NAME } from "@/lib/constants";
import { AlertTriangle, ThumbsUp, ThumbsDown } from "lucide-react";
import Spinner from "@/components/spinner";
import ConfettiExplosion from "react-confetti-explosion";
import "@/styles/shakescreen.css";

// Interface for subsections (i.e., <div>s from MDX)
interface ChunkifyProps {
	children: React.ReactNode;
}

// async function to get QA scores from scoring API
const getQAScore = async ({
	input,
	chapter,
	section,
	subsection,
}: { input: string; chapter: string; section: string; subsection: string }) => {
	const response = await fetch(`${env.NEXT_PUBLIC_SCORE_API_URL}/answer`, {
		method: "POST",
		body: JSON.stringify({
			textbook_name: TEXTBOOK_NAME,
			chapter_index: chapter,
			section_index: section,
			subsection_index: subsection,
			answer: input,
		}),
		headers: {
			"Content-Type": "application/json",
		},
	});

	const data = await response.json();
	return QAScoreSchema.safeParse(data);
};

// MDX component to be exported
// TODO: change usestates into reducer?
export const Chunkify = ({ children }: ChunkifyProps) => {
	// Manage the currently visible chunk
	const [currentChunk, setCurrentChunk] = useState(0);
	// Manage the chunk in which the question will appear
	const [randomQuestionChunk, setRandomQuestionChunk] = useState(0);
	// Manage feedback modal state
	const [isModalOpen, setIsModalOpen] = useState(false);
	// Check if feedback is positive or negative
	const [positiveFeed, setPositiveFeed] = useState(false);
	// QA input
	const [inputValue, setInputValue] = useState("");
	// QA status
	const [isQACorrect, setIsQACorrect] = useState(false);
	// Ref for current chunk
	const currentChunkRef = useRef<HTMLDivElement | null>(null);
	// Screen shake
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

	// Function to scroll back to the current chunk at the end of the page
	const scrollCurrent = () => {
		// Check if the ref exists
		if (currentChunkRef.current) {
			// Scroll to the currentChunk element
			currentChunkRef.current.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		}
	};

	// Extract chunks
	const chunks = React.Children.toArray(children);

	// Show the next chunk
	const handleNextChunk = () => {
		if (currentChunk < chunks.length - 1) {
			setCurrentChunk(currentChunk + 1);
		}
	};

	// When positive review is clicked
	const positiveModal = () => {
		setIsModalOpen(true);
		setPositiveFeed(true);
	};

	// When negative review is clicked
	const negativeModal = () => {
		setIsModalOpen(true);
		setPositiveFeed(false);
	};

	// Close modal
	const closeModal = () => {
		setIsModalOpen(false);
	};

	// For context management (instead of prop drilling)
	const qObj = useContext(qContext);

	if (qObj === null || qObj === undefined) {
		// Handle the case where qObj is null or undefined
		return <div>qObj is null or undefined</div>;
	}

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

	// Celebrate when response is 2
	const passed = () => {
		setIsPerfect(2);
		setIsCelebrating(true);

		// Stop the confettis after a short delay
		setTimeout(() => {
			setIsCelebrating(false);
		}, 750); // Adjust the delay as needed
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

	// Set random question chunk
	const useqObj = () => {
		// Generate a random index
		setRandomQuestionChunk(Math.floor(Math.random() * (qObj.length - 1)));
	};

	// Handle the Submit button click
	const handleSubmitClick = async () => {
		// Spinner animation when loading
		setIsLoading(true);
		const response = await getQAScore({
			input: inputValue,
			chapter: qObj[randomQuestionChunk].sectionId.split("-")[0],
			section: qObj[randomQuestionChunk].sectionId.split("-")[1],
			subsection: qObj[randomQuestionChunk].subsection.toString(),
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

	useEffect(() => {
		useqObj();
	}, []);

	return (
		<div>
			{isModalOpen && (
				<div className="fixed inset-0 flex items-center justify-center z-50">
					<div className="bg-white flex justify-center items-center p-4 gap-2 border-2 my-4 border-indigo-700 rounded-md w-1/2 mx-auto flex-col">
						<h2>Additional feedback</h2>
						<div className="w-3/4">
							<textarea
								rows={3}
								className="rounded-md shadow-md w-full p-4 mb-4"
								placeholder="Tell us more about your experience and how we can improve iTELL AI."
							/>
							{!positiveFeed && (
								<div className="flex flex-col justify-start mb-4 w-full">
									<Checkbox id="checkbox1" label="This is nonsensical" />
									<Checkbox id="checkbox2" label="This is inaccurate" />
									<Checkbox id="checkbox3" label="This is harmful" />
								</div>
							)}
							{positiveFeed && (
								<div className="flex flex-col justify-start mb-4 w-full">
									<Checkbox id="checkbox4" label="This is informative" />
									<Checkbox id="checkbox5" label="This is supportive" />
									<Checkbox id="checkbox6" label="This is helpful" />
								</div>
							)}
						</div>
						<button
							className={cn(buttonVariants({ variant: "secondary" }), "mb-4")}
							onClick={closeModal}
						>
							Submit feedback
						</button>
					</div>
				</div>
			)}

			{chunks.map((chunk, index) => (
				<div
					key={index}
					ref={index === currentChunk ? currentChunkRef : null}
					style={{
						filter: index <= currentChunk ? "none" : "blur(4px)",
						transition: "filter 0.25s ease-in-out",
					}}
				>
					{chunk}
					{index === currentChunk && index < chunks.length - 1 && (
						<div>
							{qObj[randomQuestionChunk].subsection === index ? (
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
									{isCelebrating && (
										<ConfettiExplosion width={window.innerWidth} />
									)}

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
											<AlertTriangle className="stroke-yellow-400 mr-2" /> iTELL
											AI is in alpha testing. It will try its best to help you
											but it can still make mistakes. Let us know how you feel
											about iTELL AI's performance using the feedback icons on
											the top right side of this box (thumbs up or thumbs down).{" "}
										</p>
									</div>

									{isPerfect < 2 && (
										<div className="flex justify-center items-center flex-col text-xs m-2">
											{isPerfect == 0 && (
												<>
													<p className="text-red-400">
														<b>iTELL AI says:</b> You likely got a part of the
														answer wrong. Please try again.
													</p>
													<p>
														<u>
															If you believe iTELL AI has made an error, you can
															click on the "Skip this question" button to skip
															this question.
														</u>{" "}
														If you would like to help improve iTELL, please
														click on the feedback icons on the top right side of
														this box to give us feedback on this question.
													</p>
												</>
											)}
											{isPerfect == 1 && (
												<p className="text-yellow-600">
													<b>iTELL AI says:</b> You may have missed something,
													but you were generally close. You can click on the
													button below to continue reading or try again with a
													different response.{" "}
												</p>
											)}
										</div>
									)}

									{isPerfect == 2 ? (
										<div className="flex items-center flex-col max-w-2xl">
											<p className="text-xl2 text-emerald-600 text-center">
												Your answer was CORRECT!
											</p>
											<p className="text-sm">
												Click on the button below to continue reading. Please
												use the thumbs-up or thumbs-down icons on the top right
												side of this box if you have any feedback about this
												question that you would like to provide before you
												continue reading.
											</p>
										</div>
									) : (
										qObj[randomQuestionChunk].question !== undefined && (
											<p>
												<b>Question:</b> {qObj[randomQuestionChunk].question!}
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
												className={cn(
													buttonVariants({ variant: "secondary" }),
													"mb-4",
												)}
												onClick={handleNextChunk}
											>
												Click Here to Continue Reading
											</button>
										</div>
									) : (
										<div className="flex justify-center items-center flex-row">
											<button
												className={cn(
													buttonVariants({ variant: "secondary" }),
													"mb-4",
												)}
												onClick={handleSubmitClick}
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
								</div>
							) : (
								<div className="flex justify-center items-center p-4 gap-2">
									<button
										className={cn(
											buttonVariants({ variant: "secondary" }),
											"bg-red-400  hover:bg-red-200 text-white m-2 p-2",
										)}
										onClick={handleNextChunk}
									>
										Click Here to Continue Reading
									</button>
									<span className="absolute left-0 w-1/4 h-px bg-red-800 opacity-50"></span>
									<span className="absolute right-0 w-1/4 h-px bg-red-800 opacity-50"></span>
								</div>
							)}
						</div>
					)}
				</div>
			))}

			{currentChunk < chunks.length - 1 && (
				<div className="flex justify-center items-center p-4 gap-2">
					<button
						className={cn(
							buttonVariants({ variant: "secondary" }),
							"bg-emerald-400  hover:bg-emerald-200 text-white m-2 p-2",
						)}
						onClick={scrollCurrent}
					>
						Click Here to Scroll Back Up to Your Current Subsection
					</button>
					<span className="absolute left-0 w-1/4 h-px bg-emerald-800 opacity-50"></span>
					<span className="absolute right-0 w-1/4 h-px bg-emerald-800 opacity-50"></span>
				</div>
			)}
		</div>
	);
};
