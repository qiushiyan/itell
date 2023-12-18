import {
	Button,
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/client-components";
import pluralize from "pluralize";
import { StickyNoteIcon } from "lucide-react";
import { User } from "@prisma/client";
import { SectionLocation } from "@/types/location";
import db from "@/lib/db";

type Props = {
	user: User;
	location: SectionLocation;
};

// rendered by TocSidebar
export const NoteCount = async ({ user, location }: Props) => {
	const res = (await db.$queryRaw`
			SELECT COUNT(*),
					CASE WHEN note_text IS NULL THEN 'highlight' ELSE 'note' END as type
			FROM notes
			WHERE user_id = ${user.id} AND chapter = ${location.chapter} AND section = ${location.section}
			GROUP BY CASE WHEN note_text IS NULL THEN 'highlight' ELSE 'note' END`) as {
		count: number;
		type: string;
	}[];

	const noteCount = res.find((r) => r.type === "note")?.count || 0;
	const highlightCount = res.find((r) => r.type === "highlight")?.count || 0;

	return (
		<HoverCard>
			<HoverCardTrigger>
				<Button variant={"link"} className="text-sm px-0 text-left">
					<span>
						{`${pluralize("note", noteCount, true)}, ${pluralize(
							"highlight",
							highlightCount,
							true,
						)}`}
					</span>
				</Button>
			</HoverCardTrigger>
			<HoverCardContent className="w-48 text-sm">
				<p>Leave a note or highlight by selecting the text</p>
			</HoverCardContent>
		</HoverCard>
	);
};
