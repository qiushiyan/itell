import LabIcon from "@/components/lab-icon";
import TextbookNavbar from "@/components/nav/textbook-nav";
import { Button } from "@/components/ui-components";
import { Typography } from "@itell/ui/server";
import { Fragment } from "react";
import { Site, allSites } from "contentlayer/generated";
import { Mdx } from "@/components/mdx";

const home = allSites.find((doc) => doc.slug === "home") as Site;

export default function Home() {
	return (
		<Fragment>
			<TextbookNavbar showProgress={false} />

			<div className="px-6 md:px-10 lg:px-16 py-8 mx-auto max-w-3xl">
				<div className="flex justify-center items-center">
					<LabIcon />
				</div>
				<Mdx code={home.body.code} />
			</div>
		</Fragment>
	);
}
