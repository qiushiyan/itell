import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Skeleton,
} from "@itell/ui/server";
import { ReadingTimeChart } from "./reading-time-chart";
import { getReadingTime } from "@/lib/dashboard";

type Props = {
	uid: string;
};

export const ReadingTime = async ({ uid }: Props) => {
	const chartData = await getReadingTime(uid);

	return (
		<Card className="col-span-4">
			<CardHeader>
				<CardTitle>Total Reading Time During Last Week</CardTitle>
				<CardDescription>updated when you made a new summary</CardDescription>
			</CardHeader>
			<CardContent className="pl-2">
				<ReadingTimeChart data={chartData} />
			</CardContent>
		</Card>
	);
};

ReadingTime.Skeleton = () => <Skeleton className="col-span-4 h-[350px]" />;
