"use client";

import { useRouter } from "next/navigation";
import { ChapterCombobox } from "../chapter-combobox";

export const ChapterSelect = () => {
	const router = useRouter();
	const onSelectChapter = (value: number | null) => {
		if (value) {
			router.push(`/dashboard/summaries?chapter=${value}`);
		} else {
			router.push("/dashboard/summaries");
		}
	};

	return <ChapterCombobox onValueChange={onSelectChapter} />;
};
