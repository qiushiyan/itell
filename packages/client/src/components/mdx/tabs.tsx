"use client";

import {
	Tabs as MTabs,
	TabsHeader as MTabsHeader,
	TabsBody as MTabsBody,
	Tab as MTab,
	TabPanel as MTabPanel,
	Typography,
} from "@material-tailwind/react";

export const Tab = ({
	children,
	value,
}: {
	children: React.ReactNode;
	value: string;
}) => {
	return (
		<MTab value={value}>
			<Typography>{children}</Typography>
		</MTab>
	);
};

export const TabsHeader = ({ children }: { children: React.ReactNode }) => {
	return <MTabsHeader className="mb-0">{children}</MTabsHeader>;
};

export const TabPanel = ({
	value,
	children,
}: { value: string; children: React.ReactNode }) => {
	return (
		<MTabPanel value={value} className="py-0">
			<Typography as="div" className="my-0">
				{children}
			</Typography>
		</MTabPanel>
	);
};

export const TabsBody = ({ children }: { children: React.ReactNode }) => {
	return <MTabsBody>{children}</MTabsBody>;
};

export const Tabs = ({
	value,
	children,
}: { value: string; children: React.ReactNode }) => {
	return <MTabs value={value}>{children}</MTabs>;
};
