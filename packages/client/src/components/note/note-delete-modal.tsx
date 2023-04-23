"use client";
import { Button, Card, CardHeader, Typography } from "@material-tailwind/react";
import Modal from "../ui/Modal";

type Props = {
	show: boolean;
	onClose: () => void;
	onDelete: () => void;
};

export default function NoteDeleteModal({ show, onClose, onDelete }: Props) {
	return (
		<Modal open={show} onClose={onClose} title="Delete this note?">
			<div className="flex justify-end">
				<Button variant="filled" size="md" onClick={onDelete}>
					Yes
				</Button>
			</div>
		</Modal>
	);
}
