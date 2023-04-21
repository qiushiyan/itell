import { allSections } from "contentlayer/generated";
import { Typography } from "@/components/material-tailwind";
import Balancer from "react-wrap-balancer";
import { Mdx } from "@/components/mdx";
import Summary from "@/components/summary";
import { notFound } from "next/navigation";
import { SectionLocation } from "@/types/location";
import { ModuleSidebar, TocSidebar } from "@/components/textbook-sidebar";
import getChapters from "@/lib/section-sidebar";
import SectionAuthModal from "@/components/section-auth-modal";
import SectionPager from "@/components/section-pager";
import { getPagerForSection } from "@/lib/pager";
import NoteList from "@/components/note-list";
import Highlighter from "@/components/highlighter";

export const generateStaticParams = async () => {
	return allSections.map((section) => {
		return {
			slug: section._raw.flattenedPath.split("/"),
		};
	});
};

export const generateMetadata = ({ params }) => {
	const post = allSections.find(
		(post) => post._raw.flattenedPath === params.slug.join("/"),
	);
	if (post) {
		return { title: post.title, description: post.body.raw.slice(0, 100) };
	}
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
			<div className="max-w-7xl mx-auto grid grid-cols-12 gap-6 ">
				<SectionAuthModal />
				<aside className="hidden md:block md:col-span-3 lg:col-span-2">
					<ModuleSidebar
						chapters={chapters}
						currentLocation={currentLocation}
					/>
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

				<aside className="hidden lg:block lg:col-span-2">
					<TocSidebar headings={section.headings} />
					<NoteList location={currentLocation} />
				</aside>
			</div>

			<Summary />
		</div>
	);
}
