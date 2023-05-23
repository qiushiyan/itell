import { Metadata } from "next";
import { Raleway as FontSans } from "next/font/google";
import { Space_Mono as FontMono } from "next/font/google";

import "@/styles/globals.css";
import AppProvider from "@/components/providers";
import { siteConfig } from "@/config/site";
import ShowToast from "@/components/toast";
import { Suspense } from "react";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { cn } from "@itell/core";

export const metadata: Metadata = {
	title: {
		default: siteConfig.title,
		template: `%s | ${siteConfig.title}`,
	},
	description: siteConfig.description,
	authors: siteConfig.authors,
};

const fontSans = FontSans({
	subsets: ["latin"],
	weight: ["300", "600"],
	variable: "--font-sans",
});

const fontMono = FontMono({
	subsets: ["latin"],
	weight: ["400", "700"],
	variable: "--font-mono",
});

export default function RootLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<link rel="icon" type="image/x-icon" href="/favicon.png" />
			</head>
			<body
				className={cn(
					"min-h-screen bg-background font-sans antialiased",
					fontSans.variable,
				)}
			>
				<AppProvider>
					<Suspense fallback={null}>
						<ShowToast />
					</Suspense>
					<TailwindIndicator />
					<main>{children}</main>
				</AppProvider>
			</body>
		</html>
	);
}
