"use client";

import { Avatar as BaseAvatar, AvatarFallback, AvatarImage } from "./avatar";

export const Avatar = ({
	src,
	fallback = "fallback",
	alt = "user profile picture",
	...rest
}: {
	src: string;
	alt?: string;
	fallback?: React.ReactNode;
} & React.ComponentProps<typeof BaseAvatar>) => {
	return (
		<BaseAvatar {...rest}>
			<AvatarImage src={src} alt={alt} />
			<AvatarFallback>{fallback}</AvatarFallback>
		</BaseAvatar>
	);
};
