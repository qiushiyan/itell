"use client";

import { Provider as BalancerProvider } from "react-wrap-balancer";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import { TRPCProvider } from "@/trpc/trpc-provider";
import NoteProvider from "@/contexts/note-highlight";

export default function AppProvider({
	children,
}: { children: React.ReactNode }) {
	return (
		<SessionProvider>
			<TRPCProvider>
				<BalancerProvider>
					<NoteProvider>
						{children}
						<Toaster richColors visibleToasts={1} />
					</NoteProvider>
				</BalancerProvider>
			</TRPCProvider>
		</SessionProvider>
	);
}
