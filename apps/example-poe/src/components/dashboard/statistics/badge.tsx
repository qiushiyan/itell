import { Card, CardHeader, CardTitle, CardContent } from "@itell/ui/server";

type Props = {
	title: string;
	text: string | number;
	description?: string;
	icon?: React.ReactNode;
};

export const Badge = ({ title, text, description, icon }: Props) => {
	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium">{title}</CardTitle>
				{icon}
			</CardHeader>
			<CardContent>
				<div className="text-2xl font-bold">{text}</div>
				{description && (
					<p className="text-xs text-muted-foreground">{description}</p>
				)}
			</CardContent>
		</Card>
	);
};
