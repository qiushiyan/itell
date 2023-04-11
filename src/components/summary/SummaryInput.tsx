"use client";

import { useState } from "react";
import { Button } from "@/components/material-tailwind";

export default function SummaryInput() {
	const [input, setInput] = useState("");

	return (
		<section className="summary-input flex-1">
			<form>
				<textarea
					placeholder="Write your summary here."
					value={input}
					onChange={(e) => setInput(e.target.value)}
					rows={10}
					className="resize-none rounded-md shadow-md p-4 w-full"
				/>
				<Button className="mt-8" fullWidth>
					Submit
				</Button>
			</form>
		</section>
	);
}
