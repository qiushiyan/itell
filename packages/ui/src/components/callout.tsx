import { cn } from "@itell/core";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import Typography from "./typography";
import { InfoIcon, AlertCircleIcon, AlertTriangleIcon } from "lucide-react";

export const Callout = ({ children }: { children: React.ReactNode }) => {
	return (
		<Typography as="div" className="text-xl max-w-lg mx-auto">
			{children}
		</Typography>
	);
};

export const Keyterm = ({
	children,
	label,
}: { label: string; children: React.ReactNode }) => {
	return (
		<div className="border-2 px-4 py-2 rounded-md my-4">
			<div className="border-blue-400 border-b font-bold ">
				<Typography variant="h6">{label}</Typography>
			</div>
			<Typography as="div">{children}</Typography>
		</div>
	);
};

export const Info = ({
	title,
	children,
}: { title?: string; children: React.ReactNode }) => (
	<Alert className="bg-blue-50">
		<InfoIcon className="h-4 w-4" />
		{title && <AlertTitle>{title}</AlertTitle>}
		<AlertDescription className={cn({ "[&>p]:mt-0": !title })}>
			{children}
		</AlertDescription>
	</Alert>
);

export const Errorbox = ({
	title,
	children,
}: { title?: string; children: React.ReactNode }) => (
	<Alert variant="destructive">
		<AlertTriangleIcon className="h-4 w-4" />
		{title && <AlertTitle>{title}</AlertTitle>}
		{/* align content with icon when there is no title */}
		<AlertDescription className={cn({ "[&>p]:mt-0": !title })}>
			{children}
		</AlertDescription>
	</Alert>
);

export const Warning = ({
	title,
	children,
}: { title?: string; children: React.ReactNode }) => (
	<Alert className="bg-orange-50">
		<AlertCircleIcon className="h-4 w-4" />
		{title && <AlertTitle>{title}</AlertTitle>}
		<AlertDescription className={cn({ "[&>p]:mt-0": !title })}>
			{children}
		</AlertDescription>
	</Alert>
);

export const Card = ({
	title,
	children,
}: { title: string; children: React.ReactNode }) => {
	return (
		<div className="mb-4 rounded-md max-w-2xl mx-auto px-4 py-2 border-l-2 border-yellow-700">
			<h5>{title}</h5>
			{children}
		</div>
	);
};
