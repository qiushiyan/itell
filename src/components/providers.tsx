"use client";

import { Provider as BalancerProvider } from "react-wrap-balancer";
import { ThemeProvider } from "@material-tailwind/react";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

export default function AppProvider({
	children,
}: { children: React.ReactNode }) {
	return (
		<SessionProvider>
			<ThemeProvider>
				<BalancerProvider>
					<Toaster richColors />
					{children}
				</BalancerProvider>
			</ThemeProvider>
		</SessionProvider>
	);
}
