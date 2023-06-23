"use client";
import {
	Info,
	Warning,
	Keyterm,
	Callout,
	Caption,
	Typography,
} from "@itell/ui/server";
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
	Typography,
};
interface MdxProps {
	code: string;
}

export function Mdx({ code }: MdxProps) {
	const Component = useMDXComponent(code);

	// @ts-ignore
	return <Component components={MdxComponents} />;
}
