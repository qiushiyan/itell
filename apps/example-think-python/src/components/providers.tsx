"use client";

import { Provider as BalancerProvider } from "react-wrap-balancer";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import { TRPCProvider } from "@/trpc/trpc-provider";
import { ThemeProvider } from "./theme/theme-provider";
import { PythonProvider } from "react-py";

export default function AppProvider({
	children,
}: { children: React.ReactNode }) {
	return (
		<SessionProvider>
			<TRPCProvider>
				<BalancerProvider>
					<ThemeProvider attribute="class" defaultTheme="light">
						<PythonProvider>
							{children}
							<Toaster richColors visibleToasts={1} />
						</PythonProvider>
					</ThemeProvider>
				</BalancerProvider>
			</TRPCProvider>
		</SessionProvider>
	);
}
