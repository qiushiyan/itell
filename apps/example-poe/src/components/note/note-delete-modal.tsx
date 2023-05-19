"use client";
import { Button } from "../ui-components";
import Modal from "../ui/modal";

type Props = {
	show: boolean;
	onClose: () => void;
	onDelete: () => void;
};

export default function NoteDeleteModal({ show, onClose, onDelete }: Props) {
	return (
		<Modal open={show} onClose={onClose} title="Delete this note?">
			<div className="flex justify-end">
				<Button variant="secondary" onClick={onDelete}>
					Yes
				</Button>
			</div>
		</Modal>
	);
}
