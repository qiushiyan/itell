import { Typography, buttonVariants } from "@itell/ui/server";
import Balancer from "react-wrap-balancer";
import { Mdx } from "@/components/mdx";
import Summary from "@/components/summary";
import { notFound } from "next/navigation";
import { SectionLocation } from "@/types/location";
import getChapters from "@/lib/sidebar";
import SectionAuthDialog from "@/components/section-auth-dialog";
import SectionPager from "@/components/section-pager";
import { getPagerForSection } from "@/lib/pager";
import NoteList from "@/components/note/note-list";
import Highlighter from "@/components/note/note-toolbar";
import { ArrowUpIcon, PencilIcon } from "lucide-react";
import { Fragment } from "react";
import { allSectionsSorted } from "@/lib/sections";
import { Button } from "@/components/ui-components";
import { cn } from "@itell/core";
import { ModuleSidebar } from "@/components/module-sidebar";
import { TocSidebar } from "@/components/toc-sidebar";

export const generateStaticParams = async () => {
	return allSectionsSorted.map((section) => {
		return {
			slug: section._raw.flattenedPath.split("/"),
		};
	});
};

export const generateMetadata = ({
	params,
}: { params: { slug: string[] } }) => {
	const section = allSectionsSorted.find(
		(section) => section._raw.flattenedPath === params.slug.join("/"),
	);
	if (section) {
		return {
			title: section.title,
			description: section.body.raw.slice(0, 100),
		};
	}
};

const AnchorLink = ({
	text,
	href,
	icon,
}: { text: string; href: string; icon: React.ReactNode }) => {
	return (
		<a href={href}>
			<Button
				size="sm"
				variant="ghost"
				className="flex items-center gap-1 mb-0 py-1"
			>
				{icon}
				{text}
			</Button>
		</a>
	);
};

export default async function ({ params }: { params: { slug: string[] } }) {
	const path = params.slug.join("/");
	const sectionIndex = allSectionsSorted.findIndex(
		(section) => section._raw.flattenedPath === path,
	);

	if (sectionIndex === -1) {
		return notFound();
	}

	const section = allSectionsSorted[sectionIndex];
	const currentLocation = section.location as SectionLocation;
	const pager = getPagerForSection({
		allSections: allSectionsSorted,
		index: sectionIndex,
	});
	const chapters = await getChapters({
		module: currentLocation.module,
		allSections: allSectionsSorted,
	});

	return (
		<Fragment>
			<div className="grid grid-cols-12 gap-6 px-2">
				<SectionAuthDialog />
				<aside className="module-sidebar col-span-2 sticky top-20 h-fit">
					<ModuleSidebar
						chapters={chapters}
						currentLocation={currentLocation}
					/>
					<div className="mt-12 flex flex-col">
						<AnchorLink
							icon={<PencilIcon className="w-4 h-4" />}
							text="Write a Summary"
							href="#section-summary"
						/>
						<AnchorLink
							icon={<ArrowUpIcon className="w-4 h-4" />}
							text="Back to Top"
							href="#section-title"
						/>
					</div>
				</aside>

				<section className="elative col-span-8">
					<div className="mb-4 text-center" id="section-title">
						<Typography variant="h1">
							<Balancer className="text-3xl">{section.title}</Balancer>
						</Typography>
					</div>

					<Mdx code={section.body.code} />
					<Highlighter location={currentLocation} />
					<SectionPager pager={pager} />
				</section>

				<aside className="toc-sidebar col-span-2">
					<TocSidebar headings={section.headings} />
					<NoteList location={currentLocation} />
				</aside>
			</div>

			<Summary location={currentLocation} />
		</Fragment>
	);
}
