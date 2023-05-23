import LabIcon from "@/components/lab-icon";
import TextbookNavbar from "@/components/nav/textbook-nav";
import { siteConfig } from "@/config/site";
import { cn } from "@itell/core";
import { buttonVariants } from "@itell/ui/server";
import Link from "next/link";
import { Fragment } from "react";

const ExternalLink = ({
	children,
	href,
}: { children: React.ReactNode; href: string }) => {
	return (
		<a href={href} className="underline">
			{children}
		</a>
	);
};

export default function Home() {
	return (
		<Fragment>
			<TextbookNavbar showProgress={false} />
			<div className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
				<div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
					<section>
						<h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-5xl">
							An example computer science textbook built with the{" "}
							<ExternalLink href={siteConfig.links.github}>ITELL</ExternalLink>{" "}
							framework
						</h1>
					</section>
					<p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
						Developed by{" "}
						<ExternalLink href={siteConfig.links.thinkPython}>
							LearLab
						</ExternalLink>
						. Content adopted from{" "}
						<ExternalLink href={siteConfig.links.thinkPython}>
							Think Python 2nd edition
						</ExternalLink>
					</p>
					<div className="space-x-4">
						<Link
							href="/chapter-0"
							className={cn(buttonVariants({ size: "lg" }))}
						>
							Start reading
						</Link>
						<Link
							href={siteConfig.links.docs}
							target="_blank"
							rel="noreferrer"
							className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
						>
							Build your own textbook
						</Link>
					</div>
					<section className="flex justify-center items-center">
						<LabIcon />
					</section>
				</div>
			</div>
		</Fragment>
	);
}
