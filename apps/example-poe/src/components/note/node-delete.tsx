"use client";
import { TrashIcon } from "lucide-react";
import {
	Button,
	Dialog,
	DialogTrigger,
	DialogHeader,
	DialogContent,
	DialogTitle,
	DialogContentBody,
	DialogFooter,
} from "../ui-components";
import { useState } from "react";

type Props = {
	onDelete: () => Promise<void>;
};

export default function NoteDeleteModal({ onDelete }: Props) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="ghost" size="sm">
					<TrashIcon className="w-4 h-4" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Delete this Note?</DialogTitle>
				</DialogHeader>
				<DialogFooter>
					<Button type="submit" onClick={onDelete}>
						Yes
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
