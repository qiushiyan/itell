"use client";

import { cn } from "@itell/core/utils";
import { useQA } from "../context/qa-context";
import { buttonVariants } from "@itell/ui/server";
import { useSession } from "next-auth/react";
import { createEvent } from "@/lib/server-actions";

export const NextChunkButton = () => {
	const { goToNextChunk, currentChunk } = useQA();
	const { data: session } = useSession();

	// submit event
	const submitEvent = async () => {
		if (session)
			createEvent({
				eventType: "chunk reveal",
				userId: session?.user?.id,
				page: location.href,
				data: {
					currentChunk: currentChunk,
				},
			});
	};

	const thenGoToNextChunk = async () => {
		goToNextChunk();
		await submitEvent();
	};

	return (
		<div className="next-chunk-button-container flex justify-center items-center p-4 gap-2">
			<button
				className={cn(
					buttonVariants({ variant: "secondary" }),
					"bg-red-400  hover:bg-red-200 text-white m-2 p-2",
				)}
				onClick={thenGoToNextChunk}
			>
				Click Here to Continue Reading
			</button>
			<span className="absolute left-0 w-1/4 h-px bg-red-800 opacity-50" />
			<span className="absolute right-0 w-1/4 h-px bg-red-800 opacity-50" />
		</div>
	);
};
