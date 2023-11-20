"use client";

import { useEffect, useState } from "react";
import { QuestionBox } from "./question-box";
import { useQA } from "../context/qa-context";
import { createPortal } from "react-dom";
import { NextChunkButton } from "./next-chunk-button";
import { ScrollBackButton } from "./scroll-back-button";
import { getChapterFromPathname, useCurrentChunkLocal } from "@/lib/utils";

type Props = {
	isPageMasked: boolean;
	selectedQuestions: Map<number, { question: string; answer: string }>;
	chapter: number;
};

export const QuestionControl = ({
	isPageMasked,
	selectedQuestions,
	chapter,
}: Props) => {
	// Ref for current chunk
	const { currentChunk, chunks, setChunks } = useQA();
	const [nodes, setNodes] = useState<JSX.Element[]>([]);

	const addNode = (node: JSX.Element) => {
		setNodes((nodes) => [...nodes, node]);
	};

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

			// note this the scroll back button is inserted as a sibling to the content chunk
			// so it won't be blurred as a children
			el.parentElement.insertBefore(buttonContainer, el.nextSibling);

			addNode(createPortal(<ScrollBackButton />, buttonContainer));
		}
	};

	const insertNextChunkButton = (el: HTMLDivElement) => {
		// insert button container
		const buttonContainer = document.createElement("div");
		buttonContainer.className = "next-chunk-button-container";
		el.style.filter = "none";
		el.appendChild(buttonContainer);

		addNode(
			createPortal(
				<NextChunkButton
					clickEventType="chunk reveal"
					standalone
					className="bg-red-400  hover:bg-red-200 text-white m-2 p-2"
				>
					Click here to continue reading
				</NextChunkButton>,
				buttonContainer,
			),
		);
	};

	const insertQuestion = (el: HTMLDivElement, index: number) => {
		const questionContainer = document.createElement("div");
		questionContainer.className = "question-container";
		el.appendChild(questionContainer);

		const q = selectedQuestions.get(index) as {
			question: string;
			answer: string;
		};

		addNode(
			createPortal(
				<QuestionBox
					isPageMasked={isPageMasked}
					question={q.question}
					answer={q.answer}
					chapter={chapter}
					subsection={index}
				/>,
				questionContainer,
			),
		);
	};

	useEffect(() => {
		const els = document.querySelectorAll(".content-chunk");
		if (els.length > 0) {
			setChunks(Array.from(els) as HTMLDivElement[]);
		}
	}, []);

	useEffect(() => {
		// set up chunks
		if (chunks) {
			chunks.forEach((el, index) => {
				const isChunkUnvisited = index > currentChunk;
				if (index !== 0 && isPageMasked && isChunkUnvisited) {
					el.style.filter = "blur(4px)";
				}
				if (selectedQuestions.has(index)) {
					insertQuestion(el, index);
				} else if (index === chunks.length - 1 && isPageMasked) {
					insertScrollBackButton(el);
				}
			});
		}
	}, [chunks]);

	useEffect(() => {
		if (chunks && isPageMasked) {
			// set up currentChunk
			const currentChunkElement = chunks.at(currentChunk);
			const prevChunkElement = chunks.at(currentChunk - 1);

			if (currentChunkElement) {
				currentChunkElement.style.filter = "none";
				if (
					!selectedQuestions.has(currentChunk) &&
					currentChunk !== chunks.length - 1
				) {
					insertNextChunkButton(currentChunkElement);
				}
			}

			// when a fresh page is loaded,. set up ref data and prepare chunk styles
			if (currentChunk !== 0 && prevChunkElement) {
				hideNextChunkButton(prevChunkElement);
			}
		}
	}, [chunks, currentChunk]);

	return nodes;
};
