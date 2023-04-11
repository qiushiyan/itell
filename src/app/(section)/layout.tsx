import { Typography } from "@/components/material-tailwind";
import { Mdx } from "@/components/mdx";

export default function SectionLayout({
	children,
}: { children: React.ReactNode }) {
	return <div className="py-8 mx-auto max-w-7xl">{children}</div>;
}
