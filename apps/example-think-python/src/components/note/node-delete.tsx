"use client";
import { TrashIcon } from "lucide-react";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "../client-components";
import { Spinner } from "../spinner";
import { useState } from "react";
import { flushSync } from "react-dom";

type Props = {
	// need this prop to tell note-card the modal is open
	// otherwise the button becomes unclickable as useClickOutside is triggered
	open: boolean;
	onOpenChange: (val: boolean) => void;
	onDelete: () => Promise<void>;
};

export const NoteDelete = ({ open, onOpenChange, onDelete }: Props) => {
	const [isLoading, setIsLoading] = useState(false);

	return (
		<Dialog
			open={open}
			onOpenChange={(val) => {
				onOpenChange(val);
			}}
		>
			<DialogTrigger asChild>
				<Button variant="ghost" size="sm" type="button">
					<TrashIcon className="w-4 h-4" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Delete this Note?</DialogTitle>
				</DialogHeader>
				<DialogFooter>
					<Button variant="outline" onClick={() => onOpenChange(false)}>
						Cancel
					</Button>
					<Button
						disabled={isLoading}
						onClick={async () => {
							setIsLoading(true);
							await onDelete();
							setIsLoading(false);
						}}
					>
						{isLoading ? <Spinner /> : <span>Delete</span>}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
