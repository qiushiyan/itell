import { cn } from "@itell/core/utils";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { Typography } from "./typography";
import { InfoIcon, AlertCircleIcon, AlertTriangleIcon } from "lucide-react";
import { Card, CardContent } from "./card";

export const Callout = ({ children }: { children: React.ReactNode }) => {
	return (
		<Card className="my-12 max-w-2xl mx-auto ">
			<CardContent>
				<div className="text-xl text-center font-serif tracking-tight">
					{children}
				</div>
			</CardContent>
		</Card>
	);
};

export const Keyterm = ({
	children,
	label,
}: { label: string; children: React.ReactNode }) => {
	return (
		<div className="border-2 px-4 py-2 rounded-md my-4">
			<div className="border-accent border-b font-bold ">
				<Typography variant="h6">{label}</Typography>
			</div>
			<Typography as="div">{children}</Typography>
		</div>
	);
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	title?: string;
	children: React.ReactNode;
}

export const Info = ({ title, children, className, ...rest }: Props) => (
	<Alert
		className={cn(
			"bg-info dark:bg-inherit dark:border-2 dark:border-info",
			className,
		)}
		{...rest}
	>
		<InfoIcon className="h-4 w-4" />
		{title && <AlertTitle>{title}</AlertTitle>}
		{/* align content with icon when there is no title */}
		<AlertDescription className={cn({ "callout-no-title": !title })}>
			{children}
		</AlertDescription>
	</Alert>
);

export const Errorbox = ({ title, children, ...rest }: Props) => (
	<Alert variant="destructive" {...rest}>
		<AlertTriangleIcon className="h-4 w-4" />
		{title && <AlertTitle>{title}</AlertTitle>}
		<AlertDescription className={cn({ "callout-no-title": !title })}>
			{children}
		</AlertDescription>
	</Alert>
);

export const Warning = ({ title, children, className, ...rest }: Props) => (
	<Alert
		className={cn("bg-warning dark:bg-inherit dark:border-warning", className)}
		{...rest}
	>
		<AlertCircleIcon className="h-4 w-4" />
		{title && <AlertTitle>{title}</AlertTitle>}
		<AlertDescription className={cn({ "callout-no-title": !title })}>
			{children}
		</AlertDescription>
	</Alert>
);
