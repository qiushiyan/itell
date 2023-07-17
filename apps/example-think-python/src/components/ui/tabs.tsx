"use client";

import { cn } from "@itell/core/utils";
import { Typography } from "@itell/ui/server";
import {
	Tabs as BaseTabs,
	TabsContent as BaseTabsContent,
	TabsList as BaseTabsList,
	TabsTrigger as BaseTabsTrigger,
} from "@itell/ui/client";

export const Tab = ({
	children,
	value,
	className,
	...rest
}: {
	children: React.ReactNode;
	value: string;
} & React.ComponentProps<typeof BaseTabsTrigger>) => {
	return (
		<BaseTabsTrigger
			value={value}
			className={cn("px-4 py-2 flex-1", className)}
			{...rest}
		>
			{children}
		</BaseTabsTrigger>
	);
};

export const TabsHeader = ({
	children,
	className,
	...rest
}: { children: React.ReactNode } & React.ComponentProps<
	typeof BaseTabsList
>) => {
	return (
		<BaseTabsList className={cn("w-full", className)} {...rest}>
			{children}
		</BaseTabsList>
	);
};

export const TabPanel = ({
	value,
	children,
	typography = true,
	...rest
}: {
	value: string;
	children: React.ReactNode;
	typography?: boolean;
} & React.ComponentProps<typeof BaseTabsContent>) => {
	return (
		<BaseTabsContent value={value} {...rest}>
			{typography ? (
				<Typography as="div" className="my-0">
					{children}
				</Typography>
			) : (
				<>{children}</>
			)}
		</BaseTabsContent>
	);
};

// kept for legacy code
export const TabsBody = ({ children }: { children: React.ReactNode }) => {
	return <>{children}</>;
};

interface TabsProps extends React.ComponentProps<typeof BaseTabs> {
	value: string;
	children: React.ReactNode;
}

export const Tabs = ({ value, children, ...rest }: TabsProps) => {
	return (
		<BaseTabs defaultValue={value} {...rest}>
			{children}
		</BaseTabs>
	);
};
