import { useEffect, useState } from "react";
import { useLocalStorage, useCurrentChapter } from "./utils";
import { makeChapterHref } from "../utils";

export const useTrackLastVisitedChapter = () => {
	const currentChapter = useCurrentChapter();
	const [_, setLastVisitedChapter] = useLocalStorage<number | undefined>(
		"think-python-last-visited-chapter",
		undefined,
	);

	useEffect(() => {
		if (currentChapter) {
			setLastVisitedChapter(currentChapter);
		}
	}, [currentChapter]);
};

export const useLastVisitedChapterUrl = () => {
	const [lastVisitedChapter, _] = useLocalStorage<number | undefined>(
		"think-python-last-visited-chapter",
		undefined,
	);
	const [url, setUrl] = useState<string | null>(null);

	useEffect(() => {
		if (lastVisitedChapter) {
			setUrl(makeChapterHref(lastVisitedChapter));
		}
	}, [lastVisitedChapter]);

	return url;
};
