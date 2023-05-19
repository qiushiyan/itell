"use client";
import React from "react";

import {
	Accordion as BaseAccordion,
	AccordionContent as BaseAccordionContent,
	AccordionItem as BaseAccordionItem,
	AccordionTrigger as BaseAccordionTrigger,
} from "./accordion";
import Typography from "../typography";

type Props = {
	children: React.ReactNode;
	value: string[] | string;
};

export const AccordionItem = ({
	value,
	title,
	children,
}: { value: string; title?: string; children: React.ReactNode }) => {
	return (
		<BaseAccordionItem value={value}>
			<BaseAccordionTrigger className="py-2">
				{title || value}
			</BaseAccordionTrigger>
			<BaseAccordionContent>
				<Typography as="div" className="prose dark:prose-invert max-w-none">
					{children}
				</Typography>
			</BaseAccordionContent>
		</BaseAccordionItem>
	);
};

export const Accordion = ({ children, value }: Props) => {
	if (typeof value === "string") {
		value = [value];
	}
	return (
		<BaseAccordion type="multiple" defaultValue={value}>
			{children}
		</BaseAccordion>
	);
};
