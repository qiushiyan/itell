import TextbookNavbar from "@/components/nav/textbook-nav";
import { PythonProvider } from "@/components/provider/python-provider";
import "@/styles/prism-one-dark.css";
export default async function SectionLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<PythonProvider>
			<TextbookNavbar dashboardLink={true} />
			<div className="max-w-screen-2xl mx-auto p-8 lg:p-12">{children}</div>
		</PythonProvider>
	);
}
