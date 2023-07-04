"use client";

import { AuthButtons } from "./auth/auth-form";
import {
	Button,
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
	DialogFooter,
} from "./client-components";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import Link from "next/link";
import { makeLocationHref } from "@/lib/utils";
import { useSectionStatus } from "@/lib/hooks/use-section-status";

export default function SectionAuthModal() {
	const { status, userLocation } = useSectionStatus();
	const [open, setOpen] = useState(true);

	if (status === undefined || status === "unlocked" || !userLocation)
		return null;

	if (status === "unauthorized") {
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
									We collects anonymous data to improve learning experience. See{" "}
									<span className="underline">here</span> for more details.
								</CollapsibleContent>
							</Collapsible>
						</DialogDescription>
					</DialogHeader>
					<div className="mt-5">{AuthButtons.google}</div>
				</DialogContent>
			</Dialog>
		);
	}

	if (status === "locked") {
		const href = makeLocationHref(userLocation);
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
					<div>
						Submit a passing summary for
						<Link href={href}>
							<span className="font-medium underline">
								{` Chapter ${userLocation.chapter} Section ${userLocation.section} `}
							</span>
						</Link>
						first.
					</div>
					<DialogFooter>
						<Button>
							<Link href={href}>Go to section</Link>
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		);
	}

	return null;
}
