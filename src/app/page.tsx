import Link from "next/link";
import { compareDesc, format, parseISO } from "date-fns";
import { Section, allSections } from "contentlayer/generated";
import { getMDXComponent } from "next-contentlayer/hooks";
import { Typography } from "@/components/material-tailwind";
import Image from "next/image";
import Balancer from "react-wrap-balancer";

export default function Home() {
	return (
		<div className="py-8 mx-auto max-w-3xl">
			<div className="flex justify-center items-center">
				<Image
					src="/images/learlab.svg"
					alt="learlab"
					width={600}
					height={400}
				/>
			</div>
			<Typography>
				This textbook is adopted from Principles of Macroeconomics 2e available
				at OpenStax. It was redesigned by a team comprised of subject matter
				expert, content and assessment developer, multimedia and web developer,
				and instructional designer from Georgia Tech. We would like to thank the
				authors and contributors of the original textbook and OpenStax. We also
				appreciate Affordable Learning Georgia for providing funds to support
				this project.
			</Typography>
			<Typography variant="h3">About the textbook</Typography>
			<Typography>
				A project by the Language and Educational Analytics Research (Lear) Lab.
			</Typography>
		</div>
	);
}
