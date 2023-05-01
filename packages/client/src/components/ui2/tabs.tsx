"use client";
import {
	Tabs,
	TabsHeader,
	TabsBody,
	Tab,
	TabPanel,
	Typography,
} from "@material-tailwind/react";

type TabItem = {
	label: string;
	content: React.ReactNode;
};

type Props = {
	items: TabItem[];
};

export default function ({ items }: Props) {
	return (
		<Tabs value={items[0].label}>
			<TabsHeader>
				{items.map(({ label }) => (
					<Tab key={label} value={label}>
						<Typography>{label}</Typography>
					</Tab>
				))}
			</TabsHeader>
			<TabsBody>
				{items.map(({ label, content }) => (
					<TabPanel key={label} value={label}>
						<Typography as="div">{content}</Typography>
					</TabPanel>
				))}
			</TabsBody>
		</Tabs>
	);
}
