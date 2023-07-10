"use client";

import { Avatar, AvatarFallback, AvatarImage } from "./client-components";
import { User } from "@prisma/client";

type Props = {
	user: Pick<User, "name" | "image" | "email">;
	className?: string;
};

export default function UserAvatar({ user, className }: Props) {
	return (
		<Avatar className={className}>
			{user.image ? (
				<AvatarImage alt="Picture" src={user.image} />
			) : (
				<AvatarFallback>
					<span className="sr-only">{user.name}</span>
					<span>{user.name?.[0]?.toUpperCase()}</span>
				</AvatarFallback>
			)}
		</Avatar>
	);
}
