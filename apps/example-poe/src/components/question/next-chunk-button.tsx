"use client";

import { useQA } from "../context/qa-context";
import { useSession } from "next-auth/react";
import { createEvent } from "@/lib/server-actions";
import { Button } from "../client-components";

interface Props extends React.ComponentPropsWithRef<typeof Button> {
	onClick?: () => void;
	clickEventType: string;
	standalone?: boolean;
	children: React.ReactNode;
}

export const NextChunkButton = ({
	onClick,
	clickEventType,
	children,
	standalone,
	...rest
}: Props) => {
	const { goToNextChunk, currentChunk } = useQA();
	const { data: session } = useSession();
	// submit event
	const submitEvent = async () => {
		if (session) {
			await createEvent({
				eventType: clickEventType,
				userId: session?.user?.id,
				page: location.href,
				data: {
					currentChunk: currentChunk,
				},
			});
		}
	};

	const onSubmit = async () => {
		goToNextChunk();
		if (onClick) {
			onClick();
		}
		await submitEvent();
	};

	return (
		<div className="flex justify-center items-center p-4 gap-2">
			<Button variant="secondary" onClick={onSubmit} {...rest}>
				{children}
			</Button>
			{standalone && (
				<>
					<span className="absolute left-0 w-1/4 h-px bg-red-800 opacity-50" />
					<span className="absolute right-0 w-1/4 h-px bg-red-800 opacity-50" />
				</>
			)}
		</div>
	);
};
