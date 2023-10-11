"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { QuestionBox } from "./question-box";
import { SectionLocation } from "@/types/location";
import { useQA } from "../context/qa-context";
import { createPortal } from "react-dom";
import { buttonVariants } from "@itell/ui/server";

type Props = {
	subsectionWithQuestionIndex: number;
	subsectionQuestion: string | null;
	location: SectionLocation;
};

export const QuestionControl = ({
	subsectionWithQuestionIndex,
	subsectionQuestion,
	location,
}: Props) => {
	// Ref for current chunk
	const chunksRef = useRef<HTMLDivElement[] | null>(null);
	const [questionBoxNode, setQuestionBoxNode] = useState<JSX.Element | null>();
	const currentChunkRef = useRef<HTMLDivElement | null>(null);
	const { currentChunk, goToNextChunk } = useQA();

	const hideNextChunkButton = (el: HTMLDivElement) => {
		const button = el.querySelector(
			":scope .next-chunk-button-container",
		) as HTMLDivElement;

		if (button) {
			button.remove();
		}
	};

	const insertScrollBackButton = (el: HTMLDivElement) => {
		if (el.parentElement) {
			const buttonContainer = document.createElement("div");
			buttonContainer.className =
				"scroll-back-button-container flex justify-center items-center p-4 gap-2";
			buttonContainer.style.filter = "none";

			el.parentElement.insertBefore(buttonContainer, el.nextSibling);

			// create button
			const button = document.createElement("button");
			button.textContent =
				"Click Here to Scroll Back Up to Your Current Subsection";
			button.className = buttonVariants();
			button.addEventListener("click", () => {
				if (currentChunkRef.current) {
					currentChunkRef.current.scrollIntoView({ behavior: "smooth" });
				}
			});

			// create divider
			const leftDivider = document.createElement("span");
			leftDivider.className =
				"absolute left-0 w-1/4 h-px bg-emerald-800 opacity-50";
			const rightDivider = document.createElement("span");
			rightDivider.className =
				"absolute right-0 w-1/4 h-px bg-emerald-800 opacity-50";

			buttonContainer.appendChild(leftDivider);
			buttonContainer.appendChild(button);
			buttonContainer.appendChild(rightDivider);
		}
	};

	const insertNextChunkButton = (el: HTMLDivElement) => {
		// insert button container
		const buttonContainer = document.createElement("div");
		buttonContainer.className =
			"next-chunk-button-container flex justify-center items-center p-4 gap-2";
		el.style.filter = "none";
		el.appendChild(buttonContainer);

		// create button
		const button = document.createElement("button");
		button.textContent = "Click Here to Continue Reading";
		button.className = buttonVariants({ variant: "outline" });
		button.addEventListener("click", goToNextChunk);

		// create divider
		const leftDivider = document.createElement("span");
		leftDivider.className = "absolute left-0 w-1/4 h-px bg-red-800 opacity-50";
		const rightDivider = document.createElement("span");
		rightDivider.className =
			"absolute right-0 w-1/4 h-px bg-red-800 opacity-50";

		buttonContainer.appendChild(leftDivider);
		buttonContainer.appendChild(button);
		buttonContainer.appendChild(rightDivider);
	};

	const insertQuestion = (el: HTMLDivElement) => {
		const questionContainer = document.createElement("div");
		questionContainer.className = "question-container";
		el.appendChild(questionContainer);

		setQuestionBoxNode(
			createPortal(
				<QuestionBox
					question={subsectionQuestion}
					chapter={location.chapter}
					section={location.section}
					subsection={subsectionWithQuestionIndex}
				/>,
				questionContainer,
			),
		);
	};

	useEffect(() => {
		// set up chunks
		const els = document.querySelectorAll(".content-chunk");
		if (els.length > 0 && subsectionQuestion) {
			chunksRef.current = Array.from(els) as HTMLDivElement[];
			chunksRef.current.forEach((el, index) => {
				if (index !== 0) {
					el.style.filter = "blur(4px)";
				}
				if (index === subsectionWithQuestionIndex) {
					insertQuestion(el);
				} else if (index === els.length - 1) {
					insertScrollBackButton(el);
				}
			});
		}
	}, []);

	useEffect(() => {
		if (chunksRef.current) {
			// set up currentChunk
			const currentChunkElement = chunksRef.current.at(currentChunk);
			const prevChunkElement = chunksRef.current.at(currentChunk - 1);

			if (currentChunkElement) {
				currentChunkElement.style.filter = "none";
				currentChunkRef.current = currentChunkElement;
				if (
					currentChunk !== subsectionWithQuestionIndex &&
					currentChunk !== chunksRef.current.length - 1
				) {
					insertNextChunkButton(currentChunkElement);
				}
			}

			// when a fresh page is loaded,. set up ref data and prepare chunk styles
			if (currentChunk !== 0 && prevChunkElement) {
				hideNextChunkButton(prevChunkElement);
			}
		}
	}, [currentChunk]);

	return questionBoxNode;
};
