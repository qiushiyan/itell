"use client";

import Typography from "../typography";
import {
	Tabs as BaseTabs,
	TabsContent as BaseTabsContent,
	TabsList as BaseTabsList,
	TabsTrigger as BaseTabsTrigger,
} from "./tabs";

export const Tab = ({
	children,
	value,
}: {
	children: React.ReactNode;
	value: string;
}) => {
	return (
		<BaseTabsTrigger value={value} className="px-4 py-2 flex-1">
			{children}
		</BaseTabsTrigger>
	);
};

export const TabsHeader = ({ children }: { children: React.ReactNode }) => {
	return <BaseTabsList className="w-full">{children}</BaseTabsList>;
};

export const TabPanel = ({
	value,
	children,
}: { value: string; children: React.ReactNode }) => {
	return (
		<BaseTabsContent value={value}>
			<Typography as="div" className="my-0">
				{children}
			</Typography>
		</BaseTabsContent>
	);
};

// kept for legacy code
export const TabsBody = ({ children }: { children: React.ReactNode }) => {
	return <>{children}</>;
};

// rome-ignore lint/suspicious/noExplicitAny: <explanation>
interface TabsProps extends React.ComponentProps<any> {
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
