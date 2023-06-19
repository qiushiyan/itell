import { Section } from "contentlayer/generated";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Mdx } from "./mdx";
import { Button } from "./ui-components";
import Link from "next/link";
import { buttonVariants } from "@itell/ui/server";
import { makeLocationHref } from "@/lib/utils";

export default function ({
	section,
	title,
}: { section: Section; title?: string }) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="ghost" className="text-lg font-bold underline">
					{title ? title : section.title}
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-3xl h-[800px] top-4 bottom-4 overflow-y-auto  ">
				<div className="flex justify-end mt-8">
					<Link
						href={makeLocationHref(section.location)}
						className={buttonVariants()}
					>
						Go to section
					</Link>
				</div>

				<Mdx code={section.body.code} />
			</DialogContent>
		</Dialog>
	);
}
