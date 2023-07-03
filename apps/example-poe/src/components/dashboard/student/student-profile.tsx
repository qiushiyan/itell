import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@itell/ui/server";
import { User } from "@prisma/client";
import { Suspense } from "react";
import { StudentBadges } from "./student-badges";
import { ReadingTime } from "../reading-time";
import { RecentSummaries } from "../recent-summaries";
import { Badge } from "../badge";
import { UserStatistics } from "../user-statistics";

type Props = {
	student: User;
};

export const StudentProfile = ({ student }: Props) => (
	<Card>
		<CardHeader>
			<CardTitle>
				<div className="flex items-center justify-between">
					<p>{student.name}</p>
					<p className="text-muted-foreground text-sm font-medium">{`at Chapter ${student.chapter} Section ${student.section}`}</p>
				</div>
			</CardTitle>
			<CardDescription>
				<div className="flex items-center justify-between">
					<p>{student.email}</p>
					<p>joined at {student.created_at.toLocaleString("en-us")}</p>
				</div>
			</CardDescription>
		</CardHeader>
		<CardContent>
			<div className="space-y-4">
				<UserStatistics user={student} />
			</div>
		</CardContent>
	</Card>
);