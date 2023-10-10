import { trpc } from "@/trpc/trpc-provider";
import { useEffect, useRef, useState } from "react";
import { FOCUS_TIME_COUNT_INTERVAL } from "../constants";

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
		const chunks = Array.from(
			document.querySelectorAll("#page-content .chunk"),
		) as HTMLDivElement[];

		data.current = chunks.map((el) => ({
			sectionId: el.dataset.subsectionId as string,
			totalViewTime: 0,
			lastTick: performance.now(),
		}));

		document.addEventListener("visibilitychange", handleVisibilityChange);

		// had to create the observer inside useEffect to avoid build error
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				const target = entry.target as HTMLElement;
				const id = target.dataset.subsectionId as string;
				if (entry.isIntersecting) {
					visibleSections.add(id);
				} else {
					visibleSections.delete(id);
				}
			});
		}, options);

		chunks.forEach((el) => {
			observer.observe(el);
		});

		start();

		return () => {
			chunks.forEach((el) => observer.unobserve(el));
			document.removeEventListener("visibilitychange", handleVisibilityChange);
			pause();
		};
	}, []);

	return { saveFocusTime, start, pause };
};
