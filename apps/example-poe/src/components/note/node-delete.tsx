"use client";
import { TrashIcon } from "lucide-react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui-components";

import { Button } from "../ui-components";
import { useEffect, useState } from "react";
import Spinner from "../spinner";
import { delay } from "@/lib/utils";

type Props = {
	onDelete: () => Promise<void>;
	onOpen: () => void;
};

export default function NoteDeleteModal({ onDelete, onOpen }: Props) {
	useEffect(() => {
		onOpen();
	}, []);

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant="outline">
					<TrashIcon className="w-4 h-4" />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="z-50">
				<AlertDialogHeader>
					<AlertDialogTitle>Delete this Note</AlertDialogTitle>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						onClick={async () => {
							await onDelete();
						}}
						className="bg-red-600 focus:ring-red-600"
					>
						<span>Delete</span>
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
