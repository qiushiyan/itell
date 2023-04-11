import Link from "next/link";
import Image from "next/image";
import { useMDXComponent } from "next-contentlayer/hooks";
import { Button, Typography } from "@/components/material-tailwind";
import Accordion from "@/components/ui/Accordion";
import { cn, getYoutubeLinkFromEmbed } from "@/lib/utils";
import Balancer from "react-wrap-balancer";
import { BalancerProvider } from "./providers";
import Steps from "./ui/Steps";

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

function Callout(props: { emoji: React.ReactNode; children: React.ReactNode }) {
	return (
		<div className="flex bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-md p-4 my-8">
			<div className="flex items-center w-4 mr-4">{props.emoji}</div>
			<div className="w-full callout">{props.children}</div>
		</div>
	);
}

function ProsCard({ title, pros }: { title: string; pros: string[] }) {
	return (
		<div className="border border-emerald-200 dark:border-emerald-900 bg-neutral-50 dark:bg-neutral-900 rounded-xl p-6 my-4 w-full">
			<span>{`You might use ${title} if...`}</span>
			<div className="mt-4">
				{pros.map((pro) => (
					<div key={pro} className="flex font-medium items-baseline mb-2">
						<div className="h-4 w-4 mr-2">
							<svg className="h-4 w-4 text-emerald-500" viewBox="0 0 24 24">
								<g
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
									<path d="M22 4L12 14.01l-3-3" />
								</g>
							</svg>
						</div>
						<span>{pro}</span>
					</div>
				))}
			</div>
		</div>
	);
}

function ConsCard({ title, cons }: { title: string; cons: string[] }) {
	return (
		<div className="border border-red-200 dark:border-red-900 bg-neutral-50 dark:bg-neutral-900 rounded-xl p-6 my-6 w-full">
			<span>{`You might not use ${title} if...`}</span>
			<div className="mt-4">
				{cons.map((con) => (
					<div key={con} className="flex font-medium items-baseline mb-2">
						<div className="h-4 w-4 mr-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								className="h-4 w-4 text-red-500"
							>
								<path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
							</svg>
						</div>
						<span>{con}</span>
					</div>
				))}
			</div>
		</div>
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

const Warning = ({ children }) => (
	<div className="border-l-4 border-orange-400 bg-orange-50 px-4 py-2">
		<div className="ml-3">{children}</div>
	</div>
);

const TextOverImage = ({
	src,
	children,
	width = 600,
	height = 400,
	alt = "Card Image",
	rounded = true,
}: {
	src: string;
	children: React.ReactNode;
	alt?: string;
	width?: number;
	height?: number;
	rounded?: boolean;
}) => {
	return (
		<div className="flex justify-center items-center relative group">
			<Image
				src={src}
				alt={alt}
				width={width}
				height={height}
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
					<Typography variant="h5" className="my-1">
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
	ProsCard,
	ConsCard,
	TextOverImage,
	Info,
	Warning,
	Steps,
};

interface MdxProps {
	code: string;
}

export function Mdx({ code }: MdxProps) {
	const Component = useMDXComponent(code);

	return (
		<BalancerProvider>
			<article className="prose prose-quoteless prose-neutral dark:prose-invert max-w-none">
				<Component components={components} />
			</article>
		</BalancerProvider>
	);
}
