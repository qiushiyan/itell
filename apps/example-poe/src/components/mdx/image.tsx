import { cn } from "@itell/core";
import Image from "next/image";
import { Typography } from "../material-tailwind";
import Balancer from "react-wrap-balancer";

export const CustomImage = ({
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
}) => {
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
};

export const TextOverImage = ({
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
