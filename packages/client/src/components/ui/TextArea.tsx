"use client";

import { cn } from "@/lib/utils";

interface TextAreaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	value: string;
	setValue: (value: string) => void;
	className?: string;
}

export default function TextArea({
	className,
	value,
	setValue,
	...props
}: TextAreaProps) {
	return (
		<textarea
			value={value}
			onChange={(e) => setValue(e.currentTarget.value)}
			className={cn(
				"w-full px-3 py-2 text-gray-700 border border-indigo-400 bg-white rounded-lg text-sm shadow-sm focus:outline-none ",
				className,
			)}
			{...props}
		/>
	);
}
