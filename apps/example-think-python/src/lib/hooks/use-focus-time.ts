import { trpc } from "@/trpc/trpc-provider";
import { useEffect, useRef, useState } from "react";
import { FOCUS_TIME_COUNT_INTERVAL } from "../constants";

const createTrackingElements = () => {
	// select direct children of h2, p and div of #page-content
	const chapterContent = document.getElementById("page-content");
	const subsectionElements: HTMLElement[] = [];
	if (chapterContent) {
		const els = chapterContent.querySelectorAll(
			":scope > h2, :scope > p, :scope > div",
		);
		// h2: start of a section
		// p or div: end of a section
		for (let i = 0; i < els.length; i++) {
			const el = els[i] as HTMLElement;
			if (el.tagName === "H2") {
				el.dataset.sectionId = el.id;
				el.dataset.sectionType = "section-start";
				subsectionElements.push(el);
			} else if (els[i + 1]?.tagName === "H2") {
				if (subsectionElements.length > 0) {
					// avoid the case where an element is appeared before the first h2
					const previousEl = subsectionElements[subsectionElements.length - 1];
					el.dataset.sectionId = previousEl.dataset.sectionId;
					el.dataset.sectionType = "section-end";
					subsectionElements.push(el);
				}
			}
		}
	}
	return subsectionElements;
};

export type FocusTimeEntry = {
	sectionId: string;
	totalViewTime: number;
	lastTick: number;
};

export const useFocusTime = () => {
	const data = useRef<FocusTimeEntry[]>();
	const isSaving = useRef(false);
	const createFocusTime = trpc.focusTime.create.useMutation();
	const visibleSections = new Set<string>();

	const options: IntersectionObserverInit = {
		root: null,
		rootMargin: "0px",
		threshold: 0,
	};

	let countTimer: NodeJS.Timer | null = null;

	const pause = () => {
		if (countTimer) {
			clearInterval(countTimer);
		}
	};

	const start = () => {
		pause();
		data.current?.forEach((entry) => {
			entry.lastTick = performance.now();
		});
		countTimer = setInterval(() => {
			data.current?.forEach((entry) => {
				if (visibleSections.has(entry.sectionId)) {
					entry.totalViewTime += Math.round(
						(performance.now() - entry.lastTick) / 1000,
					);
				}
				entry.lastTick = performance.now();
			});
		}, FOCUS_TIME_COUNT_INTERVAL);
	};

	const saveFocusTime = async (summaryId?: string) => {
		if (data.current && !isSaving.current) {
			isSaving.current = true;
			await createFocusTime.mutateAsync({
				summaryId,
				data: data.current,
				totalViewTime: data.current
					.map((entry) => entry.totalViewTime)
					.reduce((a, b) => a + b, 0),
			});

			isSaving.current = false;

			// clear past data
			data.current.forEach((entry) => {
				entry.totalViewTime = 0;
				entry.lastTick = performance.now();
			});
		}
	};

	const handleVisibilityChange = () => {
		if (document.hidden) {
			pause();
		} else {
			start();
		}
	};

	useEffect(() => {
		// pause when the tab is not visible
		// start when the tab is visible
		document.addEventListener("visibilitychange", handleVisibilityChange);

		// had to create the observer inside useEffect to avoid build error
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				const target = entry.target as HTMLElement;
				const id = target.dataset.sectionId as string;
				const sectionType = target.dataset.sectionType as string;
				if (entry.isIntersecting) {
					if (sectionType === "section-start") {
						visibleSections.add(id);
					}
				} else {
					if (sectionType === "section-end") {
						visibleSections.delete(id);
					}
				}
			});
		}, options);
		const elements = createTrackingElements();
		data.current = elements
			.filter((el) => el.dataset.sectionType === "section-start")
			.map((el) => ({
				sectionId: el.dataset.sectionId as string,
				totalViewTime: 0,
				lastTick: performance.now(),
			}));

		elements.forEach((el) => {
			observer.observe(el);
		});

		start();

		return () => {
			elements.forEach((el) => observer.unobserve(el));
			document.removeEventListener("visibilitychange", handleVisibilityChange);
			pause();
		};
	}, []);

	return { saveFocusTime, start, pause };
};
