import { Summary } from "@prisma/client";
import { Button, Dialog, DialogContent, DialogTrigger } from "../ui-components";
import SummaryCard from "./summary-card";
import Link from "next/link";
import { Typography } from "@itell/ui/server";
import { relativeDate } from "@/lib/utils";

type Props = {
	summary: Summary;
};

export default function ({ summary }: Props) {
	return (
		<Dialog>
			<DialogTrigger asChild={true}>
				<button className="block text-left">
					<SummaryCard summary={summary} />
				</button>
			</DialogTrigger>
			<DialogContent>
				<div className="p-8 lg:p-4">
					<div className="rounded-md px-2 py-1 tracking-tighter flex items-center justify-between">
						<Link href={`/chapter-${summary.chapter}`} className="underline">
							<Typography variant="small">Chapter {summary.chapter}</Typography>
						</Link>
						<Typography variant="small">
							updated at{" "}
							<span className="font-semibold">
								{relativeDate(summary.updated_at)}
							</span>
						</Typography>
					</div>
					<textarea
						rows={10}
						className="resize-none rounded-md shadow-md p-4 w-full border-2 border-indigo-600"
					>
						{summary.text}
					</textarea>
					<footer className="flex justify-end">
						<Button>Update</Button>
					</footer>
				</div>
			</DialogContent>
		</Dialog>
	);
}
