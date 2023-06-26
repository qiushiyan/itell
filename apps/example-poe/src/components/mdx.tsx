"use client";
import {
	Info,
	Warning,
	Keyterm,
	Callout,
	Caption,
	Typography,
	Blockquote,
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
} from "./ui-components";
import { Tabs, TabsHeader, Tab, TabPanel, TabsBody } from "./ui/tabs";
import { TextOverImage } from "./ui/text-over-image";

const MdxComponents = {
	YoutubeVideo,
	Image,
	Blockquote,
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
