import { cn } from "@itell/core/utils";
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	Skeleton,
} from "@itell/ui/server";
import { TrendingDown, TrendingUp } from "lucide-react";

type Props = {
	className?: string;
	title: string;
	value: number | null;
	description?: string | number | null;
	comparing?: boolean;
	icon?: React.ReactNode;
};

const roundNumber = (num: number | null) => {
	if (num === null) {
		return "NA";
	}

	return Number.isInteger(num) ? num : Number(num.toFixed(2));
};
export const Badge = ({
	title,
	value,
	description,
	icon,
	comparing,
	className,
}: Props) => {
	return (
		<Card className={cn("flex flex-col justify-between", className)}>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium">{title}</CardTitle>
				{icon}
			</CardHeader>
			<CardContent>
				<div className="text-2xl font-bold">{roundNumber(value)}</div>
				{description && (
					<p className="text-xs text-muted-foreground mt-2">
						{typeof description === "number" ? (
							<span className="inline-flex items-center gap-2">
								{description > 0 ? (
									<TrendingUp className="w-4 h-4" />
								) : (
									<TrendingDown className="w-4 h-4" />
								)}
								{`${description > 0 ? "+ " : ""}${roundNumber(description)}`}
								{comparing && " compared to class"}
							</span>
						) : (
							description
						)}
					</p>
				)}
			</CardContent>
		</Card>
	);
};

Badge.Skeleton = () => <Skeleton className="h-40" />;
Badge.Skeletons = ({ num = 4 }: { num?: number }) =>
	Array.from(Array(num)).map(() => <Badge.Skeleton />);
