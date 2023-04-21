import { usePathname } from "next/navigation";
import { useState, useEffect, useContext, useRef, RefObject } from "react";
import type { Location } from "@/types/location";
import { getLocationFromPathname } from "./utils";
import { NoteContext } from "@/contexts/note";

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

export const useLocation = () => {
	const pathname = usePathname();
	const [location, setLocation] = useState<Location>({
		module: undefined,
		chapter: undefined,
		section: undefined,
	});

	useEffect(() => {
		if (pathname) {
			setLocation(getLocationFromPathname(pathname));
		}
	}, [pathname]);

	return location;
};

export const useNotes = () => {
	const noteContext = useContext(NoteContext);

	return noteContext;
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
