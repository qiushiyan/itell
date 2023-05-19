import { Metadata } from "next";

import "@/styles/globals.css";
import AppProvider from "@/components/providers";
import { siteConfig } from "@/config/site";
import ShowToast from "@/components/toast";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: {
		default: siteConfig.title,
		template: `%s | ${siteConfig.title}`,
	},
	description: siteConfig.description,
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
				<AppProvider>
					<Suspense fallback={null}>
						<ShowToast />
					</Suspense>
					<main>{children}</main>
				</AppProvider>
			</body>
		</html>
	);
}
