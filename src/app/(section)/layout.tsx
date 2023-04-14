import TextbookNavbar from "@/components/TextbookNavbar";
import { Fragment } from "react";

export default function SectionLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<>
			<TextbookNavbar showProgress />
			<div className="max-w-7xl mx-auto py-8 px-8">{children}</div>
		</>
	);
}
