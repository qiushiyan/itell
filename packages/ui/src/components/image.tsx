import { cn } from "@itell/core";
import NextImage from "next/image";
import Balancer from "react-wrap-balancer";

export const Image = ({
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
				<NextImage
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
