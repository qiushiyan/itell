"use client";

import { useMDXComponent } from "next-contentlayer/hooks";
import { Typography } from "@/components/material-tailwind";
import { CustomImage, TextOverImage } from "./mdx/image";
import { CustomLink } from "./mdx/link";
import {
	Stepper,
	StepperBody,
	StepperHeader,
	StepperPanel,
	Step,
} from "./mdx/stepper";
import {
	Accordion,
	Accordions,
	Callout,
	CustomIFrame,
	Info,
	Warning,
	Keyterm,
	Card,
	Caption,
	Tabs,
	Tab,
	TabsBody,
	TabsHeader,
	TabPanel,
} from "@itell/ui/mdx";

const MdxComponents = {
	Image: CustomImage,
	a: CustomLink,
	Iframe: CustomIFrame,
	Typography,
	Callout,
	Card,
	TextOverImage,
	Info,
	Warning,
	Keyterm,
	Caption,
	// stepper related
	Stepper,
	Step,
	StepperBody,
	StepperHeader,
	StepperPanel,
	// tab related
	Tabs,
	Tab,
	TabsBody,
	TabsHeader,
	TabPanel,
	// accordion related
	Accordions,
	Accordion,
};

interface MdxProps {
	code: string;
}

export function Mdx({ code }: MdxProps) {
	const Component = useMDXComponent(code);

	return (
		<article className="prose prose-quoteless prose-neutral dark:prose-invert max-w-none">
			{/* @ts-ignore */}
			<Component components={MdxComponents} />
		</article>
	);
}
