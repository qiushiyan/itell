"use client";

import { AuthButtons } from "./auth/auth-form";
import { useSession } from "next-auth/react";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
	Dialog,
	DialogContent,
	DialogContentBody,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "./ui-components";
type Props = {
	type?: "unauthorized" | "unlocked";
};

export default function SectionAuthModal({ type = "unauthorized" }: Props) {
	const { data: session, status } = useSession();

	if (status === "loading") return null;

	if (session?.user) return null;

	return (
		<Dialog defaultOpen={true}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Login in view the textbook</DialogTitle>
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
				<DialogContentBody>
					<div className="mt-5">{AuthButtons.google}</div>
				</DialogContentBody>
			</DialogContent>
		</Dialog>
	);
}
