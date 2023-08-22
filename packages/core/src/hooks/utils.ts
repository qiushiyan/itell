import { useState, useEffect, useRef, RefObject, useLayoutEffect } from "react";

export const useLocalStorage = <T,>(key: string, initialValue: T) => {
	const [storedValue, setStoredValue] = useState<T>(() => {
		if (typeof window === "undefined") {
			return initialValue;
		}
		try {
			const item = window.localStorage.getItem(key);
			return item ? (JSON.parse(item) as T) : initialValue;
		} catch (error) {
			console.log(error);
			return initialValue;
		}
	});
	const setValue = (value: T | ((val: T) => T)) => {
		try {
			// Allow value to be a function so we have same API as useState
			const valueToStore =
				value instanceof Function ? value(storedValue) : value;
			// Save state
			setStoredValue(valueToStore);
			// Save to local storage
			if (typeof window !== "undefined") {
				window.localStorage.setItem(key, JSON.stringify(valueToStore));
			}
		} catch (error) {
			// A more advanced implementation would handle the error case
			console.log(error);
		}
	};
	return [storedValue, setValue] as const;
};

export const useClickOutside = <T extends HTMLElement>(
	handler: () => void,
): RefObject<T> => {
	const ref = useRef<T>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				handler();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [handler]);

	return ref;
};

export const useAutosizeTextArea = (
	textAreaRef: HTMLTextAreaElement | null,
	value: string,
	enabled: boolean,
) => {
	useEffect(() => {
		if (textAreaRef && enabled) {
			// We need to reset the height momentarily to get the correct scrollHeight for the textarea
			textAreaRef.style.height = "0px";
			const scrollHeight = textAreaRef.scrollHeight;

			// We then set the height directly, outside of the render loop
			// Trying to set this with state or a ref will product an incorrect value.
			textAreaRef.style.height = `${scrollHeight}px`;
		}
	}, [textAreaRef, value]);
};

export function useLockBody() {
	useLayoutEffect((): (() => void) => {
		const originalStyle: string = window.getComputedStyle(
			document.body,
		).overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = originalStyle;
		};
	}, []);
}

export const useWindowSize = () => {
	const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

	const handleSize = () => {
		setWindowSize({
			width: window.innerWidth,
			height: window.innerHeight,
		});
	};

	useLayoutEffect(() => {
		handleSize();

		window.addEventListener("resize", handleSize);

		return () => window.removeEventListener("resize", handleSize);
	}, []);

	return windowSize;
};

