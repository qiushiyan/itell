"use client";

import { AuthButtons } from "./auth/auth-form";
import { useSession } from "next-auth/react";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "./client-components";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useLocation } from "@/lib/hooks/utils";
import { trpc } from "@/trpc/trpc-provider";
import { allSectionsSorted } from "@/lib/sections";
import Link from "next/link";
import { makeLocationHref } from "@/lib/utils";
import { SectionLocation } from "@/types/location";
type Props = {
	type?: "unauthorized" | "unlocked";
};

export default function SectionAuthModal() {
	const { data: session, status } = useSession();
	const { data: userLocation } = trpc.user.getLocation.useQuery();
	const location = useLocation();
	const [open, setOpen] = useState(true);

	if (status === "loading") return null;

	// for visitors, only the chapter-1/section-1 is visible
	if (!session) {
		if (location && (location.chapter > 1 || location.section > 0)) {
			return (
				<Dialog
					open={open}
					onOpenChange={() => {
						if (process.env.NODE_ENV === "development") {
							setOpen(false);
						}
					}}
				>
					<DialogContent canClose={false}>
						<DialogHeader>
							<DialogTitle>Login in to view the textbook</DialogTitle>
							<DialogDescription>
								<Collapsible>
									<CollapsibleTrigger className="m-0 p-0">
										Why do I need to have an account?
									</CollapsibleTrigger>
									<CollapsibleContent>
										We collects anonymous data to improve learning experience.
										See <span className="underline">here</span> for more
										details.
									</CollapsibleContent>
								</Collapsible>
							</DialogDescription>
						</DialogHeader>
						<div className="mt-5">{AuthButtons.google}</div>
					</DialogContent>
				</Dialog>
			);
		}
	}

	// for logged-in users, if their current location is smaller than the current section
	// then they can't access it
	if (session?.user && location && userLocation) {
		const currentIndex = allSectionsSorted.findIndex(
			(s) =>
				s.location.chapter === location.chapter &&
				s.location.section === location.section,
		);
		const userIndex = allSectionsSorted.findIndex(
			(s) =>
				s.location.chapter === userLocation.chapter &&
				s.location.section === userLocation.section,
		);

		if (userIndex < currentIndex) {
			return (
				<Dialog
					open={open}
					onOpenChange={() => {
						if (process.env.NODE_ENV === "development") {
							setOpen(false);
						}
					}}
				>
					<DialogContent canClose={false}>
						<DialogHeader>
							<DialogTitle>You haven't unlocked this section yet</DialogTitle>
						</DialogHeader>
						<p>
							You need to submit a passing summary for
							<Link href={makeLocationHref(userLocation as SectionLocation)}>
								<span className="font-medium underline">
									{` Chapter ${userLocation.chapter} Section ${userLocation.section} `}
								</span>
							</Link>
							first.
						</p>
					</DialogContent>
				</Dialog>
			);
		}
	}

	return null;
}
