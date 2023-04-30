"use client";

import Link from "next/link";
import Image from "next/image";
import { useMDXComponent } from "next-contentlayer/hooks";
import { Button, Typography } from "@/components/material-tailwind";
import Accordion from "@/components/ui/Accordion";
import { cn, getYoutubeLinkFromEmbed } from "@/lib/utils";
import Balancer from "react-wrap-balancer";
import Tabs from "./ui/Tabs";

const Keyterm = ({
	children,
	label,
}: { label: string; children: React.ReactNode }) => {
	return (
		<div className="border-2 px-4 py-2 rounded-md my-4">
			<div className="border-blue-400 border-b font-bold ">
				<Typography variant="h6">{label}</Typography>
			</div>
			<Typography as="div">{children}</Typography>
		</div>
	);
};

const Caption = ({ children }: { children: React.ReactNode }) => {
	return (
		<Typography
			as="div"
			variant="small"
			className="max-w-2xl mx-auto text-center"
		>
			{children}
		</Typography>
	);
};

const Callout = ({ children }: { children: React.ReactNode }) => {
	return (
		<Typography as="div" className="text-xl max-w-lg mx-auto">
			{children}
		</Typography>
	);
};

const CustomLink = (props) => {
	const href = props.href;

	if (href.startsWith("/")) {
		return (
			<Link href={href} {...props}>
				{props.children}
			</Link>
		);
	}

	if (href.startsWith("#")) {
		return <a {...props} />;
	}

	return <a target="_blank" rel="noopener noreferrer" {...props} />;
};

function RoundedImage({
	src,
	alt,
	children,
	width = 600,
	height = 400,
	rounded = true,
	floatLeft = false,
	floatRight = false,
}: {
	src: string;
	alt: string;
	children: React.ReactNode;
	width?: number;
	height?: number;
	rounded?: boolean;
	floatLeft?: boolean;
	floatRight?: boolean;
}) {
	return (
		<figure
			className={cn({
				"float-left": floatLeft,
				"float-right": floatRight,
				"mr-4": floatLeft,
				"ml-4": floatRight,
			})}
		>
			<div className="flex justify-center items-center">
				<Image
					className={cn("object-cover", { "rounded-md": rounded })}
					src={src}
					alt={alt}
					width={width}
					height={height}
				/>
			</div>
			<figcaption
				className={cn(
					"mt-2 text-sm text-center text-gray-500 dark:text-gray-400",
					{ "md:w-72 lg:w-96": floatLeft || floatRight },
				)}
			>
				<Balancer as="div">{children}</Balancer>
			</figcaption>
		</figure>
	);
}

const Info = ({
	title,
	children,
}: { title?: string; children: React.ReactNode }) => (
	<div className="border-l-4 border-blue-400 bg-blue-50 px-4 py-2">
		<div className="ml-3">
			{title && <Typography variant="h5">{title}</Typography>}
			{children}
		</div>
	</div>
);

export const Warning = ({ children }) => (
	<div className="border-l-4 border-orange-400 bg-orange-50 px-4 py-2">
		<div className="ml-3">{children}</div>
	</div>
);

const Card = ({ title, children }) => {
	return (
		<div className="mb-4 rounded-md max-w-2xl mx-auto px-4 py-2 border-l-2 border-yellow-700">
			<h5>{title}</h5>
			{children}
		</div>
	);
};
const TextOverImage = ({
	src,
	children,
	width = 600,
	height = 400,
	alt = "Card Image",
	rounded = true,
	priority = false,
}: {
	src: string;
	children: React.ReactNode;
	alt?: string;
	width?: number;
	height?: number;
	rounded?: boolean;
	priority?: boolean;
}) => {
	return (
		<div className="flex justify-center items-center relative group">
			<Image
				src={src}
				alt={alt}
				width={width}
				height={height}
				priority={priority}
				className={cn(
					"blur-sm group-hover:blur-md transition-all duration-100 object-cover",
					{
						"rounded-md": rounded,
					},
				)}
			/>
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 group-hover:font-bold">
				<Typography variant="h6" className="text-gray-50">
					{children}
				</Typography>
			</div>
		</div>
	);
};

const CustomIFrame = ({
	src,
	width = 500,
	height = 300,
	youtube = true,
	title,
	children,
}: {
	src: string;
	width: number;
	height: number;
	youtube?: boolean;
	title?: string;
	children?: React.ReactNode;
}) => {
	return (
		<div
			className={cn("mb-4 rounded-md max-w-2xl mx-auto", {
				"border-2 p-2": youtube,
			})}
		>
			<div className="flex justify-center items-center flex-col p-4 gap-2">
				<iframe
					src={src}
					width={width}
					height={height}
					className="rounded-md aspect-video w-full mb-4"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
				/>
				{title && (
					<Typography variant="h5" className="m-0">
						<Balancer as="div">{title}</Balancer>
					</Typography>
				)}
				{children && (
					<Typography as="div" variant="small">
						{children}
					</Typography>
				)}
				{youtube && (
					<a href={getYoutubeLinkFromEmbed(src)} className="no-underline">
						<Button variant="outlined">View on youtube</Button>
					</a>
				)}
			</div>
		</div>
	);
};

const components = {
	Image: RoundedImage,
	a: CustomLink,
	Iframe: CustomIFrame,
	Typography,
	Accordion,
	Callout,
	Card,
	TextOverImage,
	Info,
	Warning,
	Tabs,
	Keyterm,
	Caption,
};

interface MdxProps {
	code: string;
}

export function Mdx({ code }: MdxProps) {
	const Component = useMDXComponent(code);

	return (
		<article className="prose prose-quoteless prose-neutral dark:prose-invert max-w-none">
			<Component components={components} />
		</article>
	);
}
