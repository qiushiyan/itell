"use client";

import { Provider as BalancerProvider } from "react-wrap-balancer";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import { TRPCProvider } from "@/trpc/trpc-provider";
import { HydrationOverlay } from "@builder.io/react-hydration-overlay";
import { ThemeProvider } from "next-themes";

export const RootProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<HydrationOverlay>
			<SessionProvider>
				<TRPCProvider>
					<BalancerProvider>
						<ThemeProvider attribute="class" defaultTheme="light">
							<Toaster richColors />
							{children}
						</ThemeProvider>
					</BalancerProvider>
				</TRPCProvider>
			</SessionProvider>
		</HydrationOverlay>
	);
};
