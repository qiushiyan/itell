import LabIcon from "@/components/lab-icon";
import TextbookNavbar from "@/components/nav/textbook-nav";
import { Site, allSites } from "contentlayer/generated";
import { Mdx } from "@/components/mdx";
import { SiteFooter } from "@/components/site-footer";

const home = allSites.find((doc) => doc.slug === "home") as Site;

export default async function Home() {
	return (
		<section className="h-screen flex flex-col">
			{/* @ts-ignore */}
			<TextbookNavbar />
			<div className="flex-1">
				<div className="px-6 md:px-10 lg:px-16 py-8 mx-auto max-w-3xl">
					<div className="flex justify-center items-center">
						<LabIcon />
					</div>
					<Mdx code={home.body.code} />
				</div>
			</div>
			{/* @ts-ignore */}
			<SiteFooter />
		</section>
	);
}
