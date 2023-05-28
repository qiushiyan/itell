import { keyof } from "@itell/core";
import { Summary } from "@prisma/client";
import { Typography } from "@itell/ui/server";
import { Tab, TabPanel, Tabs, TabsBody, TabsHeader } from "../ui-components";

type Props = {
	summariesByChapter: Record<string, Summary[]>;
};

export default function ({ summariesByChapter }: Props) {
	const chapters = keyof(summariesByChapter);

	return (
		<Tabs value={chapters[0]} className="grid grid-cols-12 gap-4">
			<div className="col-span-3">
				<TabsHeader>
					{chapters.map((module) => (
						<Tab key={module} value={module}>
							Module {module}
						</Tab>
					))}
				</TabsHeader>
			</div>
			<div className="col-span-9">
				<TabsBody>
					{chapters.map((module) => (
						<TabPanel
							key={module}
							value={module}
							className="grid grid-cols-3 gap-4"
							typography={false}
						>
							{summariesByChapter[module].map((summary) => (
								<div
									className="rounded-md shadow-md group hover:shadow-lg transition ease-in-out duration-100 col-span-1 text-muted-foreground text-sm"
									key={summary.id}
								>
									{summary.text.slice(0, 100)}
								</div>
							))}
						</TabPanel>
					))}
				</TabsBody>
			</div>
		</Tabs>
	);
}
