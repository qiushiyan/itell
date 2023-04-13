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
};

export default function CustomAccordion({ items }: Props) {
	const [openedItems, setOpenedItems] = useState([0]);

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
				<Accordion open={openedItems.includes(index)} key={item.title}>
					<AccordionHeader
						onClick={() => handleOpen(index)}
						className="text-left text-lg"
					>
						{item.title}
					</AccordionHeader>
					<AccordionBody>
						<Typography as="div">{item.content}</Typography>
					</AccordionBody>
				</Accordion>
			))}
		</Fragment>
	);
}
