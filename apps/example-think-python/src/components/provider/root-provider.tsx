"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { Provider as BalancerProvider } from "react-wrap-balancer";
import { Toaster } from "sonner";

export const RootProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<SessionProvider>
			<BalancerProvider>
				<ThemeProvider attribute="class" defaultTheme="light">
					<Toaster richColors />
					{children}
				</ThemeProvider>
			</BalancerProvider>
		</SessionProvider>
	);
};
