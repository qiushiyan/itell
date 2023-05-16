import { allSections } from "contentlayer/generated";
import { Typography } from "@/components/material-tailwind";
import Balancer from "react-wrap-balancer";
import { Mdx } from "@/components/mdx";
import Summary from "@/components/summary";
import { notFound } from "next/navigation";
import { SectionLocation } from "@/types/location";
import { ModuleSidebar, TocSidebar } from "@/components/textbook-sidebar";
import getChapters from "@/lib/textbook-sidebar";
import SectionAuthModal from "@/components/section-auth-modal";
import SectionPager from "@/components/section-pager";
import { getPagerForSection } from "@/lib/pager";
import NoteList from "@/components/note/note-list";
import Highlighter from "@/components/note/note-toolbar";
import { ArrowUpIcon, PencilIcon } from "lucide-react";

export const generateStaticParams = async () => {
	return allSections.map((section) => {
		return {
			slug: section._raw.flattenedPath.split("/"),
		};
	});
};

export const generateMetadata = ({
	params,
}: { params: { slug: string[] } }) => {
	const post = allSections.find(
		(post) => post._raw.flattenedPath === params.slug.join("/"),
	);
	if (post) {
		return { title: post.title, description: post.body.raw.slice(0, 100) };
	}
};

const AnchorLink = ({
	text,
	href,
	icon,
}: { text: string; href: string; icon: React.ReactNode }) => {
	return (
		<a
			href={href}
			className="flex gap-1 items-center hover:underline text-gray-800"
		>
			{icon}
			<Typography variant="small" className="mb-0">
				{text}
			</Typography>
		</a>
	);
};

export default async function ({ params }: { params: { slug: string[] } }) {
	const path = params.slug.join("/");
	const sectionIndex = allSections.findIndex(
		(section) => section._raw.flattenedPath === path,
	);

	if (sectionIndex === -1) {
		return notFound();
	}

	const section = allSections[sectionIndex];
	const currentLocation = section.location as SectionLocation;
	const pager = getPagerForSection({ allSections, index: sectionIndex });
	const chapters = await getChapters({
		module: currentLocation.module,
		allSections,
	});

	return (
		<div>
			<div className="max-w-7xl mx-auto grid grid-cols-12 gap-6 px-2">
				<SectionAuthModal />
				<aside className="hidden md:block md:col-span-3 lg:col-span-2 ">
					<div className="sticky top-20">
						<ModuleSidebar
							chapters={chapters}
							currentLocation={currentLocation}
						/>
						<div className="mt-12 flex flex-col gap-2">
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
					</div>
				</aside>

				<section
					className="relative col-span-12 md:col-span-9 lg:col-span-8"
					id="section-content"
				>
					<div className="mb-4 text-center" id="section-title">
						<Typography variant="h1">
							<Balancer className="text-3xl">{section.title}</Balancer>
						</Typography>
					</div>

					<Mdx code={section.body.code} />
					<Highlighter location={currentLocation} />
					<SectionPager pager={pager} />
				</section>

				<aside className="col-span-2">
					<TocSidebar headings={section.headings} />
					<NoteList location={currentLocation} />
				</aside>
			</div>

			<Summary location={currentLocation} />
		</div>
	);
}
