import UserAvatar from "@/components/user-avatar";
import { User } from "@prisma/client";

export const Profile = ({ user }: { user: User }) => {
	return (
		<div className="space-y-4">
			<h3 className="mb-4 text-lg font-medium">Profile</h3>
			<div className="space-y-2">
				<p className="font-medium flex items-center gap-2">
					<UserAvatar user={user} />
					{user.name}
				</p>
				<p className="text-muted-foreground text-sm">{user.email}</p>
			</div>
		</div>
	);
};
