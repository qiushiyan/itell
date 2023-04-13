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
							className={cn("pl-2 py-2 transition ease-in-out duration-200", {
								"rounded-md  hover:bg-gray-100 hover:shadow-md":
									section.section !== undefined,
								"hover:text-blue-600": section.section === undefined,
							})}
							key={section.url}
						>
							<a href={`/${section.url}`}>
								<Typography
									variant={section.section === undefined ? "h6" : "small"}
									className={"m-0 p-0"}
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
