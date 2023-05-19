"use client";
import { Info, Warning, Keyterm, Callout, Caption } from "@itell/ui/server";
import { useMDXComponent } from "next-contentlayer/hooks";
import {
	CustomIFrame,
	Accordion,
	AccordionItem,
	Tabs,
	TabsHeader,
	Tab,
	TabPanel,
	TabsBody,
	Stepper,
	StepperHeader,
	Step,
	StepperBody,
	StepperPanel,
	Image,
	TextOverImage,
	Link,
} from "./ui-components";

const MdxComponents = {
	a: Link,
	Iframe: CustomIFrame,
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
		<article className="prose prose-quoteless prose-neutral dark:prose-invert max-w-none">
			{/* @ts-ignore */}
			<Component components={MdxComponents} />
		</article>
	);
}
