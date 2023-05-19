import { keyof } from "@itell/core";
import { Summary } from "@prisma/client";
import { Typography } from "@itell/ui/server";
import { Tab, TabPanel, Tabs, TabsBody, TabsHeader } from "../ui-components";
import SummaryDialog from "./summary-dialog";

type Props = {
	summariesByModule: Record<string, Summary[]>;
};

export default function ({ summariesByModule }: Props) {
	const modules = keyof(summariesByModule);

	return (
		<Tabs value={modules[0]} className="grid grid-cols-12 gap-4">
			<div className="col-span-3">
				<TabsHeader>
					{modules.map((module) => (
						<Tab key={module} value={module}>
							Module {module}
						</Tab>
					))}
				</TabsHeader>
			</div>
			<div className="col-span-9">
				<TabsBody>
					{modules.map((module) => (
						<TabPanel
							key={module}
							value={module}
							className="grid grid-cols-3 gap-4"
							typography={false}
						>
							{summariesByModule[module].map((summary) => (
								<div
									className="rounded-md shadow-md group hover:shadow-lg transition ease-in-out duration-100 col-span-1"
									key={summary.id}
								>
									<SummaryDialog summary={summary} />
								</div>
							))}
						</TabPanel>
					))}
				</TabsBody>
			</div>
		</Tabs>
	);
}
