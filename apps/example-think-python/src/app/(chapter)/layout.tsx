import TextbookNavbar from "@/components/nav/textbook-nav";
import "@/styles/prism-one-dark.css";
export default async function SectionLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<TextbookNavbar />
			<div className="max-w-screen-2xl mx-auto p-8 lg:p-12">{children}</div>
		</>
	);
}
