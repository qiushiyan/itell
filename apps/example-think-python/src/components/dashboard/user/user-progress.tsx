import { Progress } from "@/components/client-components";
import { User } from "@prisma/client";
import { allChapters } from "contentlayer/generated";

export const UserProgress = ({ user }: { user: User }) => {
	const usersIndex = allChapters.findIndex(
		(chapter) => chapter.chapter === user.chapter,
	);
	const progress = ((usersIndex + 1) / allChapters.length) * 100;

	return (
		<div className="flex items-center gap-4">
			<Progress value={progress} className="w-1/3" />
			<p className="text-muted-foreground">
				{progress.toFixed(2)}% completed, {usersIndex + 1}/{allChapters.length}{" "}
				chapters
			</p>
		</div>
	);
};
