"use client";

import { useState } from "react";
import { GoogleLoginButton } from "../auth/login-buttons";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { isProduction } from "@/lib/constants";

export const PageUnauthorizedModal = () => {
	const [open, setOpen] = useState(true);

	return (
		<Dialog
			open={open}
			onOpenChange={() => {
				if (!isProduction) {
					setOpen(false);
				}
			}}
		>
			<DialogContent canClose={!isProduction}>
				<DialogHeader>
					<DialogTitle>Login in to view the textbook</DialogTitle>
					<DialogDescription>
						We collects anonymous data to improve learning experience. See{" "}
						<span className="underline">here</span> for more details.
					</DialogDescription>
				</DialogHeader>
				<div className="mt-6">
					<GoogleLoginButton />
				</div>
			</DialogContent>
		</Dialog>
	);
};
