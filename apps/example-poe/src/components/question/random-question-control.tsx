"use client";

import { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { QuestionBox } from "./question-box";
import { SectionLocation } from "@/types/location";
import { useQA } from "../context/qa-context";

type Props = {
	subsectionIndex: number;
	subsectionQuestion: string | null;
	location: SectionLocation;
};

export const RandomQuestionControl = ({
	subsectionIndex,
	subsectionQuestion,
	location,
}: Props) => {
	// Ref for current chunk
	const chunksRef = useRef<HTMLDivElement[] | null>(null);
	const currentChunkRef = useRef<HTMLDivElement | null>(null);
	const { currentChunk } = useQA();

	useEffect(() => {
		currentChunkRef.current = chunksRef.current?.[currentChunk] ?? null;
	}, [currentChunk]);

	useEffect(() => {
		const els = document.querySelectorAll(".content-chunk");
		if (els && subsectionQuestion) {
			chunksRef.current = Array.from(els) as HTMLDivElement[];
			chunksRef.current.forEach((chunk, index) => {
				if (index === subsectionIndex) {
					const chunkRoot = createRoot(chunk);
					chunkRoot.render(
						<QuestionBox
							question={subsectionQuestion}
							chapter={location.chapter}
							section={location.section}
							subsection={subsectionIndex}
						/>,
					);
				} else if (index < subsectionIndex) {
				} else {
					chunk.style.filter = "blur(4px)";
				}
			});
		}
	}, []);

	return null;
};
