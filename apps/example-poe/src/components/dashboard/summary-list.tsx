"use client";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/client-components";
import { keyof } from "@itell/core/utils";
import { Summary } from "@prisma/client";
import { useState } from "react";
import { SummaryItem } from "./summary-item";

const SelectModule = ({
	modules,
	...rest
}: { modules: string[] } & React.ComponentProps<typeof Select>) => {
	return (
		<Select {...rest}>
			<SelectTrigger className="w-[180px]">
				<SelectValue placeholder="Module" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Select a Module</SelectLabel>
					{modules.map((m) => (
						<SelectItem key={m} value={m}>
							Module {m}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
};

export const SummaryList = ({
	summariesByModule,
}: { summariesByModule: Record<string, Summary[]> }) => {
	const modules = keyof(summariesByModule);
	const [selectedModule, setSelectedModule] = useState(modules[0]);
	const moduleSummaries = summariesByModule[selectedModule];

	return (
		<div className="p-4">
			<div className="flex items-center justify-between">
				<SelectModule
					modules={modules}
					value={selectedModule}
					onValueChange={(val) => setSelectedModule(val)}
				/>
				<p className="text-muted-foreground text-sm">
					{`${moduleSummaries.length} ${
						moduleSummaries.length > 1 ? "summaries" : "summary"
					}.`}
				</p>
			</div>

			<div className="divide-y divide-border rounded-md border mt-4">
				{moduleSummaries.map((summary) => (
					<SummaryItem summary={summary} key={summary.id} />
				))}
			</div>
		</div>
	);
};
