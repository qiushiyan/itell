import "../styles/globals.css";

import { Metadata } from "next";
import { ThemeProvider } from "@/components/material-tailwind";
import SiteHeader from "@/components/SiteHeader";
import { env } from "@/env.mjs";

export const metadata: Metadata = {
	title: env.NEXT_PUBLIC_SITE_TITLE,
	description: env.NEXT_PUBLIC_SITE_DESCRIPTION,
};

export default function RootLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" type="image/x-icon" href="/favicon.png" />
				<link
					rel="stylesheet"
					href="https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css"
					integrity="sha384-Xi8rHCmBmhbuyyhbI88391ZKP2dmfnOl4rT9ZfRI7mLTdk1wblIUnrIq35nqwEvC"
					crossOrigin="anonymous"
				/>
			</head>
			<body>
				<SiteHeader />
				<main className="px-6 md:px-10 lg:px-16">
					<ThemeProvider>{children}</ThemeProvider>
				</main>
			</body>
		</html>
	);
}
