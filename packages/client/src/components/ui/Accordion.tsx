"use client";

import { Fragment, useState } from "react";
import {
	Accordion,
	AccordionHeader,
	AccordionBody,
	Typography,
} from "@/components/material-tailwind";
import { AccordionItem } from "@/types/components";

type Props = {
	items: AccordionItem[];
	defaultOpen?: number[] | null;
};

export default function CustomAccordion({ items, defaultOpen }: Props) {
	let defaultOpenArray;
	if (defaultOpen) {
		defaultOpenArray = [...defaultOpen];
	} else if (defaultOpen === null) {
		defaultOpenArray = [];
	} else {
		defaultOpenArray = [0];
	}
	const [openedItems, setOpenedItems] = useState(defaultOpenArray);

	const handleOpen = (value: number) => {
		if (openedItems.includes(value)) {
			setOpenedItems((prev) => prev.filter((item) => item !== value));
			return;
		} else {
			setOpenedItems((prev) => [...prev, value]);
		}
	};

	return (
		<Fragment>
			{items.map((item, index) => (
				<Accordion open={openedItems.includes(index)} key={item.label}>
					<AccordionHeader
						onClick={() => handleOpen(index)}
						className="text-left text-lg"
					>
						{item.label}
					</AccordionHeader>
					<AccordionBody>
						<Typography as="div" className="prose dark:prose-invert">
							{item.content}
						</Typography>
					</AccordionBody>
				</Accordion>
			))}
		</Fragment>
	);
}
