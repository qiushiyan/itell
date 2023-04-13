import TextbookNavbar from "@/components/TextbookNavbar";
import { Fragment } from "react";

export default function SectionLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<>
			<TextbookNavbar showProgress />
			<div className="max-w-6xl mx-auto py-8 px-4">{children}</div>
		</>
	);
}
