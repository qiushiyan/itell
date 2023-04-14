import { allSections } from "contentlayer/generated";
import { Typography } from "@/components/material-tailwind";
import Balancer from "react-wrap-balancer";
import { Mdx } from "@/components/mdx";
import Summary from "@/components/summary";
import { notFound } from "next/navigation";
import getModuleSections from "@/lib/section-sidebar";
import { ILocation } from "@/types/location";
import { Fragment } from "react";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import { motion } from "framer-motion";
import getChapters from "@/lib/section-sidebar";

export const generateStaticParams = async () => {
	return allSections.map((section) => {
		return { slug: section._raw.flattenedPath.split("/") };
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
	const section = allSections.find(
		(section) => section._raw.flattenedPath === params.slug.join("/"),
	);

	if (!section) {
		return notFound();
	}

	const currentLocation = section.location as ILocation;
	const chapters = await getChapters({
		module: currentLocation.module,
		allSections,
	});

	return (
		<Fragment>
			<div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">
				<aside className="hidden md:block md:col-span-3 lg:col-span-2">
					<LeftSidebar chapters={chapters} />
				</aside>

				<section className="col-span-12 md:col-span-9 lg:col-span-8">
					<div className="mb-4 text-center">
						<Typography variant="h1">
							<Balancer className="text-3xl">{section.title}</Balancer>
						</Typography>
					</div>

					<Mdx code={section.body.code} />
				</section>

				<aside className="hidden lg:block lg:col-span-2">
					<RightSidebar headings={section.headings} />
				</aside>
			</div>

			<Summary />
		</Fragment>
	);
}
