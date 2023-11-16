"use client";

import { useState } from "react";
import { GoogleLoginButton } from "../auth/login-buttons";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";
import { makeChapterHref } from "@/lib/utils";
import { Button } from "../client-components";

type Props = {
	userChapter: number;
};

export const PageLockedModal = ({ userChapter }: Props) => {
	const isDev = process.env.NODE_ENV === "development";
	const [open, setOpen] = useState(true);
	const href = makeChapterHref(userChapter);
	return (
		<Dialog
			open={open}
			onOpenChange={() => {
				if (isDev) {
					setOpen(false);
				}
			}}
		>
			<DialogContent canClose={isDev}>
				<DialogHeader>
					<DialogTitle>You haven't unlocked this chapter yet</DialogTitle>
				</DialogHeader>
				<div>
					Submit a passing summary for
					<Link href={href}>
						<span className="font-medium underline">
							{` Chapter ${userChapter} `}
						</span>
					</Link>
					first.
				</div>
				<DialogFooter>
					<Button>
						<Link href={href}>Go to chapter</Link>
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
