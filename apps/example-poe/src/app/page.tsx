import LabIcon from "@/components/lab-icon";
import TextbookNavbar from "@/components/nav/textbook-nav";
import { Typography } from "@itell/ui/server";
import Image from "next/image";
import { Fragment } from "react";

export default function Home() {
	return (
		<Fragment>
			<TextbookNavbar showProgress={false} />
			<div className="px-6 md:px-10 lg:px-16 py-8 mx-auto max-w-3xl">
				<div className="flex justify-center items-center">
					<LabIcon />
				</div>
				<Typography>
					This textbook is adopted from Principles of Macroeconomics 2e
					available at OpenStax. It was redesigned by a team comprised of
					subject matter expert, content and assessment developer, multimedia
					and web developer, and instructional designer from Georgia Tech. We
					would like to thank the authors and contributors of the original
					textbook and OpenStax. We also appreciate Affordable Learning Georgia
					for providing funds to support this project.
				</Typography>
				<Typography variant="h3">About the textbook</Typography>
				<Typography>
					A project by the Language and Educational Analytics Research (Lear)
					Lab.
				</Typography>
			</div>
		</Fragment>
	);
}
