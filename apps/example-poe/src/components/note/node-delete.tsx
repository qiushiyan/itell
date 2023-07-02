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
} from "@/components/client-components";

import { Button } from "../client-components";
import { useEffect } from "react";

type Props = {
	onDelete: () => Promise<void>;
	onOpen: () => void;
};

export default function NoteDeleteModal({ onDelete, onOpen }: Props) {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild onClick={onOpen}>
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
