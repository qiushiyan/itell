"use client";

import { TextArea } from "@/components/client-components";
import { makeInputKey } from "@/lib/utils";
import { useState } from "react";
import { cn, numOfWords } from "@itell/core/utils";
import { isProduction } from "@/lib/constants";
import { SectionLocation } from "@/types/location";
import { toast } from "sonner";

type Props = {
	location: SectionLocation;
	textAreaClassName?: string;
};

export const SummaryInput = ({ location, textAreaClassName }: Props) => {
	const [input, setInput] = useState(
		localStorage.getItem(makeInputKey(location)) || "",
	);
	return (
		<>
			<p className="text-sm font-light">Number of words: {numOfWords(input)}</p>
			<TextArea
				name="input"
				placeholder="Write your summary here."
				value={input}
				onValueChange={(val) => setInput(val)}
				rows={10}
				className={cn(
					"resize-none rounded-md shadow-md p-4 w-full",
					textAreaClassName,
				)}
				onPaste={(e) => {
					if (isProduction) {
						e.preventDefault();
						toast.warning("Copy & Paste is not allowed");
					}
				}}
			/>
		</>
	);
};
