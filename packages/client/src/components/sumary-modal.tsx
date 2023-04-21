"use client";

import { useState } from "react";
import Modal from "./ui/Modal";
import { Summary } from "@prisma/client";
import { formatRelative } from "date-fns";
import { Button, Typography } from "@/components/material-tailwind";
import Link from "next/link";
import { relativeDate } from "@/lib/utils";

type Props = {
	summary: Summary;
	open: boolean;
	handleClose: () => void;
};

export default function SummaryModal({ summary, open, handleClose }: Props) {
	return (
		<Modal open={open} onClose={handleClose} className="w-[800px]">
			<div className="p-8 lg:p-4">
				<div className="rounded-md px-2 py-1 tracking-tighter flex items-center justify-between">
					<Link
						href={`/module-${summary.module}/chapter-${summary.chapter}/section-${summary.section}`}
						className="underline"
					>
						<Typography variant="h6">
							Chapter {summary.chapter}, Section {summary.section}
						</Typography>
					</Link>
					<Typography variant="small">
						updated at{" "}
						<span className="font-semibold">
							{relativeDate(summary.updated_at)}
						</span>
					</Typography>
				</div>
				<textarea
					rows={10}
					className="resize-none rounded-md shadow-md p-4 w-full border-2 border-indigo-600"
				>
					{summary.text}
				</textarea>
				<footer className="flex justify-end">
					<Button>Update</Button>
				</footer>
			</div>
		</Modal>
	);
}
