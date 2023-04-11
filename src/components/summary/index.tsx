"use client";

import { useState } from "react";
import SummaryDescription from "./SummaryDescription";
import SummaryInput from "./SummaryInput";

export default function Summary() {
	return (
		<section className="flex flex-col lg:flex-row gap-8 mt-10 border-t-2 py-4">
			<SummaryDescription />
			<SummaryInput />
		</section>
	);
}
