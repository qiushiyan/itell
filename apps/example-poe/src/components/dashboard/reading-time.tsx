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
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../client-components";
import { InfoIcon } from "lucide-react";

type Props = {
	uid: string;
};

export const ReadingTime = async ({ uid }: Props) => {
	const { chartData, totalViewTime } = await getReadingTime(uid);

	return (
		<Card className="col-span-4">
			<CardHeader>
				<CardTitle>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<p className="flex items-center gap-2">
									Total Reading Time During Last Week
									<InfoIcon className="w-4 h-4" />
								</p>
							</TooltipTrigger>
							<TooltipContent>
								<p>updated when you made a new summary</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</CardTitle>
				<CardDescription>
					<p>You spent {(totalViewTime / 60).toFixed(2)} minutes</p>
				</CardDescription>
			</CardHeader>
			<CardContent className="pl-2">
				<ReadingTimeChart data={chartData} />
			</CardContent>
		</Card>
	);
};

ReadingTime.Skeleton = () => <Skeleton className="col-span-4 h-[350px]" />;
