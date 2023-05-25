import { Section } from "contentlayer/generated";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Mdx } from "./mdx";
import { Button } from "./ui-components";

export default function ({ section }: { section: Section }) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="ghost" className="text-2xl font-bold underline">
					{section.title}
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-3xl h-[800px] top-4 bottom-4 overflow-y-auto  ">
				<Mdx code={section.body.code} />
			</DialogContent>
		</Dialog>
	);
}
