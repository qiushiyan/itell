"use client";

import useAutosizeTextArea from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

interface TextAreaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	value: string;
	setValue: (value: string) => void;
	className?: string;
	autoFocus?: boolean;
	autoHeight?: boolean;
}

export default function TextArea({
	className,
	value,
	setValue,
	autoFocus = false,
	autoHeight = true,
	...props
}: TextAreaProps) {
	const ref = useRef<HTMLTextAreaElement>(null);

	useAutosizeTextArea(ref.current, value, autoHeight);

	useEffect(() => {
		if (autoFocus) {
			ref.current?.focus();
		}
	}, []);

	return (
		<textarea
			value={value}
			onChange={(e) => setValue(e.currentTarget.value)}
			ref={ref}
			className={cn(
				"w-full resize-none px-3 py-2 text-gray-700 border border-indigo-400 bg-white rounded-lg text-sm shadow-sm focus:outline-none ",
				className,
			)}
			{...props}
		/>
	);
}
