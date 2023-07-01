import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	Skeleton,
} from "@itell/ui/server";

type Props = {
	className?: string;
	title: string;
	text: string | number | null;
	description?: string | number | null;
	comparing?: boolean;
	icon?: React.ReactNode;
	rounding?: boolean;
};

export const Badge = ({
	title,
	text,
	description,
	icon,
	rounding,
	comparing,
	className,
}: Props) => {
	return (
		<Card className={className}>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium">{title}</CardTitle>
				{icon}
			</CardHeader>
			<CardContent>
				<div className="text-2xl font-bold">
					{rounding && typeof text === "number" ? text.toFixed(2) : text}
				</div>
				{description && (
					<p className="text-xs text-muted-foreground">
						{rounding && typeof description === "number"
							? description.toFixed(2)
							: description}
						{comparing && " compared to classmates"}
					</p>
				)}
			</CardContent>
		</Card>
	);
};

Badge.Skeleton = () => <Skeleton className="h-40" />;
Badge.Skeletons = ({ num = 4 }: { num?: number }) =>
	Array.from(Array(num)).map(() => <Badge.Skeleton />);
