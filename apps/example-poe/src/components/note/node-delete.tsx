"use client";
import { TrashIcon } from "lucide-react";
import {
	Dialog,
	DialogTrigger,
	DialogHeader,
	DialogContent,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "../ui-components";

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
					<Button onClick={onDelete}>Yes</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
