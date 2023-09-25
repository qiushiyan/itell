import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Skeleton,
} from "@itell/ui/server";
import {
	Button,
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "../client-components";
import { ReadingTimeChart } from "./reading-time-chart";
import { PrevDaysLookup, getReadingTime } from "@/lib/getReadingTime";
import { InfoIcon } from "lucide-react";
import { ReadingTimeChartParams } from "@/types/reading-time";
import db from "@/lib/db";
import { format, subDays } from "date-fns";
import pluralize from "pluralize";
import Link from "next/link";

type Props = {
	uid: string;
	params: ReadingTimeChartParams;
};

export const ReadingTime = async ({ uid, params }: Props) => {
	const startDate = subDays(new Date(), PrevDaysLookup[params.level]);
	const [summaryCounts, { chartData, totalViewTime }] = await Promise.all([
		db.summary.count({
			where: {
				userId: uid,
				created_at: {
					gte: startDate,
				},
			},
		}),
		getReadingTime(uid, params),
	]);

	return (
		<Card className="col-span-7">
			<CardHeader>
				<CardTitle>
					<HoverCard>
						<HoverCardTrigger asChild>
							<Button
								variant="link"
								size="lg"
								className="pl-0 text-lg flex items-center gap-1"
							>
								Total Reading Time
								<InfoIcon className="w-4 h-4" />
							</Button>
						</HoverCardTrigger>
						<HoverCardContent>
							<p className="text-sm font-semibold">
								Measures how long you have stayed in all textbook pages, in
								minutes
							</p>
						</HoverCardContent>
					</HoverCard>
				</CardTitle>
				<CardDescription>
					<p>
						You spent {(totalViewTime / 60).toFixed(2)} minutes reading the
						textbook, wrote {""}
						<Link
							className="font-semibold underline"
							href="/dashboard/summaries"
						>
							{pluralize("summary", summaryCounts, true)}
						</Link>{" "}
						during{" "}
						{`${format(startDate, "LLL, dd")}-${format(new Date(), "LLL, dd")}`}
					</p>
				</CardDescription>
			</CardHeader>
			<CardContent className="pl-2 space-y-2">
				<ReadingTimeChart data={chartData} />
			</CardContent>
		</Card>
	);
};

ReadingTime.Skeleton = () => <Skeleton className="w-full h-[350px]" />;
