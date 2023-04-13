import { Typography } from "@/components/material-tailwind";

type Heading = {
	level: "one" | "two" | "three";
	text: string | undefined;
	slug: string | undefined;
};
type Props = {
	headings: Heading[];
};

export default function RightSidebar({ headings }: Props) {
	return (
		<div className="sticky top-20">
			<Typography variant="small">ON THIS PAGE</Typography>
			<ul className="space-y-2">
				{headings.map((heading) => (
					<li key={heading.slug}>
						<a
							data-level={heading.level}
							href={`#${heading.slug}`}
							className="font-light text-sm hover:underline inline-flex"
						>
							{heading.text}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
}
