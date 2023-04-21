"use client";

import { Provider as BalancerProvider } from "react-wrap-balancer";
import { ThemeProvider } from "@material-tailwind/react";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import { TRPCProvider } from "@/trpc/trpc-provider";
import NoteProvider from "@/contexts/note";

export default function AppProvider({
	children,
}: { children: React.ReactNode }) {
	return (
		<SessionProvider>
			<TRPCProvider>
				<ThemeProvider>
					<BalancerProvider>
						<NoteProvider>
							{children}
							<Toaster richColors visibleToasts={1} />
						</NoteProvider>
					</BalancerProvider>
				</ThemeProvider>
			</TRPCProvider>
		</SessionProvider>
	);
}
