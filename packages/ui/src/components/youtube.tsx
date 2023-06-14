import Balancer from "react-wrap-balancer";
import { cn } from "@itell/core";
import { Typography } from "./typography";
import { Button } from "./button";

const getYoutubeLinkFromEmbed = (url: string) => {
	const regex = /embed\/([\w-]+)\?/;
	const match = url.match(regex);

	if (match) {
		return `https://www.youtube.com/watch?v=${match[1]}`;
	}

	return url;
};

export const YoutubeVideo = ({
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
						<Button variant="secondary">View on youtube</Button>
					</a>
				)}
			</div>
		</div>
	);
};
