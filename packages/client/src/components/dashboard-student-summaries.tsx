"use client";

import { keyof } from "@/lib/utils";
import {
	Tabs,
	TabsHeader,
	TabsBody,
	Tab,
	TabPanel,
	Typography,
} from "@material-tailwind/react";
import { Summary } from "@prisma/client";
import { useState } from "react";
import SummaryModal from "./sumary-modal";

type Props = {
	summariesByModule: Record<string, Summary[]>;
};

const SummaryCard = ({ summary }: { summary: Summary }) => {
	const [open, setOpen] = useState(false);
	return (
		// rome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
		<div
			className="rounded-md shadow-md p-4 group hover:shadow-lg transition ease-in-out duration-100 cursor-pointer"
			onClick={() => setOpen(true)}
		>
			<div className="line-clamp-5">
				<Typography>{summary.text}</Typography>
			</div>
			<div className="flex justify-end">
				<span className="inline-flex items-center rounded-fullpx-3 py-0.5 text-sm font-medium ">
					{summary.isPassed ? "✅" : "❌"}
				</span>
			</div>
			<SummaryModal
				open={open}
				handleClose={() => setOpen(false)}
				summary={summary}
			/>
		</div>
	);
};

export default function ({ summariesByModule }: Props) {
	const modules = keyof(summariesByModule);
	return (
		<Tabs value={modules[0]} className="grid grid-cols-12">
			<div className="col-span-3">
				<TabsHeader
					className="bg-transparent flex-col"
					indicatorProps={{
						className: "bg-blue-500/10 shadow-none text-blue-500",
					}}
				>
					{modules.map((module) => (
						<Tab key={module} value={module}>
							<Typography variant="h6">Module {module}</Typography>
						</Tab>
					))}
				</TabsHeader>
			</div>
			<TabsBody className="col-span-9">
				{modules.map((module) => (
					<TabPanel
						key={module}
						value={module}
						className="grid grid-cols-1 lg:grid-cols-3 gap-4"
					>
						{summariesByModule[module].map((summary) => (
							<SummaryCard key={summary.id} summary={summary} />
						))}
					</TabPanel>
				))}
			</TabsBody>
		</Tabs>
	);
}
