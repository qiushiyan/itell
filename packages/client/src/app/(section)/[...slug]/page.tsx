import { allSections } from "contentlayer/generated";
import { Typography } from "@/components/material-tailwind";
import Balancer from "react-wrap-balancer";
import { Mdx } from "@/components/mdx";
import Summary from "@/components/summary";
import { notFound } from "next/navigation";
import { SectionLocation } from "@/types/location";
import { Fragment } from "react";
import { ModuleSidebar, TocSidebar } from "@/components/textbook-sidebar";
import getChapters from "@/lib/section-sidebar";
import SectionModal from "@/components/section-modal";
import Link from "next/link";
import { getServerAuthSession } from "@/lib/auth";
import SectionPager from "@/components/section-pager";
import { getPagerForSection } from "@/lib/pager";
import HighlightToolbar from "@/components/highlight-toolbar";
import Spinner from "@/components/spinner";

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
		<Fragment>
			<div className="max-w-7xl mx-auto grid grid-cols-12 gap-6 ">
				<SectionModal />
				<aside className="hidden md:block md:col-span-3 lg:col-span-2">
					<ModuleSidebar chapters={chapters} />
				</aside>

				<section
					className="col-span-12 md:col-span-9 lg:col-span-8"
					id="section-content"
				>
					<div className="mb-4 text-center" id="section-title">
						<Typography variant="h1">
							<Balancer className="text-3xl">{section.title}</Balancer>
						</Typography>
					</div>

					<Mdx code={section.body.code} />
					<HighlightToolbar />
					<SectionPager pager={pager} />
				</section>

				<aside className="hidden lg:block lg:col-span-2">
					<TocSidebar headings={section.headings} />
				</aside>
			</div>

			<Summary />
		</Fragment>
	);
}
