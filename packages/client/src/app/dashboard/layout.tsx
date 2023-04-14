import TextbookNavbar from "@/components/textbook-navbar";

export default function DashboardLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<>
			<TextbookNavbar />
			<div className="max-w-5xl mx-auto py-8 px-4">{children}</div>
		</>
	);
}
