import TextbookNavbar from "@/components/textbook-navbar";
import { getServerAuthSession } from "@/lib/auth";
import Link from "next/link";
import { Fragment } from "react";

export default async function SectionLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<TextbookNavbar showProgress />
			<div className="max-w-7xl mx-auto py-8 px-8">{children}</div>
		</>
	);
}
