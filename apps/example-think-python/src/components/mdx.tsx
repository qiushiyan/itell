"use client";
import {
	Info,
	Warning,
	Keyterm,
	Callout,
	Caption,
	Definition,
} from "@itell/ui/server";
import { useMDXComponent } from "next-contentlayer/hooks";
import { Exercise } from "./exercise";
import {
	YoutubeVideo,
	Accordion,
	AccordionItem,
	Stepper,
	StepperHeader,
	Step,
	StepperBody,
	StepperPanel,
	Image,
	Link,
} from "./ui-components";
import { Tabs, TabsHeader, Tab, TabPanel, TabsBody } from "./ui/tabs";

const MdxComponents = {
	a: Link,
	YoutubeVideo,
	Image,
	Accordion,
	AccordionItem,
	Info,
	Warning,
	Exercise,
	Keyterm,
	Callout,
	Caption,
	Definition,
	// tab related
	Tabs,
	TabsHeader,
	Tab,
	TabPanel,
	TabsBody,
	// stepper related
	Stepper,
	StepperHeader,
	Step,
	StepperBody,
	StepperPanel,
};
interface MdxProps {
	code: string;
}

export function Mdx({ code }: MdxProps) {
	const Component = useMDXComponent(code);

	return (
		<article className="prose prose-quoteless prose-stone dark:prose-invert max-w-none">
			{/* @ts-ignore */}
			<Component components={MdxComponents} />
		</article>
	);
}
