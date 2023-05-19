import TextbookNavbar from "@/components/nav/textbook-nav";

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
