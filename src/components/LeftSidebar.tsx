import { ILocation } from "@/types/location";
import { SidebarSection } from "@/types/section";
import { Typography } from "@/components/material-tailwind";
import Balancer from "react-wrap-balancer";
import { cn } from "@/lib/utils";

type Props = {
	moduleSections: SidebarSection[];
};

export default function LeftSidebar({ moduleSections }: Props) {
	return (
		<nav>
			<ul>
				{moduleSections.map((section) => {
					return (
						<li
							className={cn("p-2 duration-100 transition-all", {
								"rounded-md hover:bg-gray-100 hover:shadow-md":
									section.section !== undefined,
								"hover:text-blue-600": section.section === undefined,
							})}
							key={section.url}
						>
							<a href={`/${section.url}`}>
								<Typography
									variant={section.section === undefined ? "h6" : "small"}
									className={cn("m-0 p-0", {
										"pl-2": section.section !== undefined,
									})}
								>
									<Balancer>
										{section.section
											? section.title
											: `Chapter ${section.chapter}: ${section.title}`}
									</Balancer>
								</Typography>
							</a>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}
