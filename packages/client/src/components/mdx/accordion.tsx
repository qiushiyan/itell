"use client";
import {
	ReactNode,
	createContext,
	useCallback,
	useContext,
	useState,
} from "react";

import {
	Accordion as MAccordion,
	AccordionHeader as MAccordionHeader,
	AccordionBody as MAccordionBody,
	Typography,
} from "@/components/material-tailwind";

type AccordionContextType = {
	activeItems: string[];
	toggleItem: (x: string) => void;
};

const AccordionContext = createContext<AccordionContextType>(
	{} as AccordionContextType,
);

type Props = {
	children: React.ReactNode;
	defaultOpen?: string[] | undefined | null;
};

export const Accordion = ({
	value,
	children,
}: { value: string; children: ReactNode }) => {
	const { activeItems, toggleItem } = useContext(AccordionContext);
	return (
		<MAccordion open={activeItems.includes(value)}>
			<MAccordionHeader
				onClick={() => toggleItem(value)}
				className="text-left font-semibold text-lg"
			>
				{value}
			</MAccordionHeader>
			<MAccordionBody>
				<Typography as="div" className="prose dark:prose-invert max-w-none">
					{children}
				</Typography>
			</MAccordionBody>
		</MAccordion>
	);
};

export const Accordions = ({ children, defaultOpen }: Props) => {
	let defaultOpenArray: string[];
	if (!defaultOpen) {
		defaultOpenArray = [];
	} else {
		defaultOpenArray = [...defaultOpen];
	}
	const [activeItems, setActiveItems] = useState(defaultOpenArray);

	const toggleItem = useCallback(
		(value: string) => {
			if (activeItems.includes(value)) {
				setActiveItems((prev) => prev.filter((item) => item !== value));
			} else {
				setActiveItems((prev) => [...prev, value]);
			}
		},
		[activeItems],
	);

	return (
		<AccordionContext.Provider value={{ activeItems, toggleItem }}>
			{children}
		</AccordionContext.Provider>
	);
};
