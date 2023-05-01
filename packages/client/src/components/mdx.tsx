"use client";

import { useMDXComponent } from "next-contentlayer/hooks";
import { Typography } from "@/components/material-tailwind";
import { Accordion, Accordions } from "@/components/mdx/accordion";
import { Tabs, Tab, TabsBody, TabsHeader, TabPanel } from "./mdx/tabs";
import { CustomImage, TextOverImage } from "./mdx/image";
import { CustomLink } from "./mdx/link";
import { CustomIFrame } from "./mdx/iframe";
import { Caption } from "./mdx/table";
import { Card, Info, Warning, Callout, Keyterm } from "./mdx/callout";
import {
	Stepper,
	StepperBody,
	StepperHeader,
	StepperPanel,
	Step,
} from "./mdx/stepper";

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
			<Component components={MdxComponents} />
		</article>
	);
}
