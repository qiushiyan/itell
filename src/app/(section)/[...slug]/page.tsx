import { allSections } from "contentlayer/generated";
import { getMDXComponent } from "next-contentlayer/hooks";
import { Typography } from "@/components/material-tailwind";
import Balancer from "react-wrap-balancer";
import { Mdx } from "@/components/mdx";
import Summary from "@/components/summary";
import { notFound } from "next/navigation";
import { groupby } from "@/lib/utils";
import { getLocationFromFlattenedPath } from "@/lib/location";
import getModuleSections from "@/lib/section-sidebar";
import { ILocation } from "@/types/location";
import { SidebarSection } from "@/types/section";
import { Fragment } from "react";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";

export const generateStaticParams = async () => {
	return allSections.map((section) => {
		return { slug: section._raw.flattenedPath };
	});
};

export const generateMetadata = ({ params }) => {
	const post = allSections.find(
		(post) => post._raw.flattenedPath === params.slug.join("/"),
	);
	if (post) {
		return { title: post.title };
	}
};

const PostLayout = async ({ params }: { params: { slug: string[] } }) => {
	const section = allSections.find(
		(section) => section._raw.flattenedPath === params.slug.join("/"),
	);

	if (!section) {
		return notFound();
	}

	const currentLocation = section.location as ILocation;
	const moduleSections = await getModuleSections({
		module: currentLocation.module,
		allSections,
	});

	return (
		<Fragment>
			<div className="max-w-7xl mx-auto grid grid-cols-12 gap-4">
				<aside className="hidden md:block md:col-span-3 lg:col-span-2">
					<LeftSidebar moduleSections={moduleSections} />
				</aside>

				<section className="col-span-12 md:col-span-9 lg:col-span-8">
					<div className="mb-8 text-center">
						<Typography variant="h1">
							<Balancer>{section.title}</Balancer>
						</Typography>
					</div>
					<Mdx code={section.body.code} />
				</section>

				<aside className="hidden lg:block lg:col-span-2">
					<Typography variant="lead">Table of Contents</Typography>
				</aside>
			</div>

			<Summary />
		</Fragment>
	);
};

export default PostLayout;
