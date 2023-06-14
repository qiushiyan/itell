"use client";
import { Info, Warning, Keyterm, Callout, Caption } from "@itell/ui/server";
import { useMDXComponent } from "next-contentlayer/hooks";
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
import { TextOverImage } from "./ui/text-over-image";

const MdxComponents = {
	a: Link,
	YoutubeVideo,
	Image,
	Accordion,
	AccordionItem,
	TextOverImage,
	Info,
	Warning,
	Keyterm,
	Callout,
	Caption,
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
		<article
			className="prose prose-quoteless prose-neutral dark:prose-invert max-w-none section-content"
			id="section-content"
		>
			{/* @ts-ignore */}
			<Component components={MdxComponents} />
		</article>
	);
}
