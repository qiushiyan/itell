"use client";

import { Button, Typography } from "@material-tailwind/react";
import { FormEvent, Fragment, useEffect, useRef, useState } from "react";
import TextArea from "./ui/TextArea";
import { PencilIcon } from "lucide-react";
import { NoteCard } from "@/types/note";
import { useClickOutside, useNotes } from "@/lib/hooks";
import { trpc } from "@/trpc/trpc-provider";
import { SectionLocation } from "@/types/location";
import NoteDeleteModal from "./note-delete-modal";
import { unHighlightText } from "@/lib/note";
import { relativeDate } from "@/lib/utils";

interface Props extends NoteCard {
	location: SectionLocation;
}

export default function NoteCard({
	id,
	y,
	highlightedText,
	noteText,
	location,
	updated_at,
	created_at,
	open = false,
}: Props) {
	const target = useRef<HTMLElement>();
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const { deleteNote: deleteContextNote } = useNotes();
	const [editting, setEditting] = useState(open);
	const [text, setText] = useState(noteText);
	const updateNote = trpc.note.update.useMutation();
	const createNote = trpc.note.create.useMutation();
	const deleteNote = trpc.note.delete.useMutation();
	const ref = useClickOutside<HTMLDivElement>(() => {
		setEditting(false);
	});

	useEffect(() => {
		const t = document.querySelector("#section-content") as HTMLElement;
		if (t) {
			target.current = t;
		}
	}, []);

	const isUnsaved = !id || text !== noteText;
	const isLoading =
		updateNote.isLoading || createNote.isLoading || deleteNote.isLoading;

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (id) {
			// edit existing note
			await updateNote.mutateAsync({
				id,
				noteText: text,
			});
		} else {
			// create new note
			await createNote.mutateAsync({
				y,
				noteText: text,
				highlightedText,
				location,
			});
		}

		setEditting(false);
	};

	const handleDelete = async (e: FormEvent) => {
		e.preventDefault();
		setShowDeleteModal(true);
	};

	return (
		<Fragment>
			<div
				className={"absolute rounded-lg z-10 w-64 bg-gray-50 border"}
				style={{ top: y }}
				ref={ref}
			>
				{editting ? (
					<div className="p-2">
						{(updated_at || created_at) && (
							<p className="text-xs tracking-tight text-gray-500 mb-1">
								updated at {relativeDate((updated_at || created_at) as Date)}
							</p>
						)}
						<form>
							<TextArea
								placeholder="leave a note here"
								value={text}
								setValue={(val) => setText(val)}
								autoFocus
								autoHeight
							/>
							<footer className="flex justify-between items-center gap-1">
								{id && (
									<Button
										size="sm"
										type="submit"
										disabled={isLoading}
										className="flex items-center gap-1"
										variant="text"
										onClick={handleDelete}
									>
										X
									</Button>
								)}
								{isUnsaved && (
									<p className="text-xs tracking-tight text-gray-400 mb-0">
										unsaved
									</p>
								)}
								<Button
									size="sm"
									type="submit"
									disabled={isLoading}
									className="flex items-center gap-1"
									variant="outlined"
									onClick={handleSubmit}
								>
									{createNote.isLoading || updateNote.isLoading
										? "Saving..."
										: "Save"}
								</Button>
							</footer>
						</form>
					</div>
				) : (
					<Button
						className="flex w-48 justify-between items-center  rounded-lg bg-purple-100/80 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
						onClick={() => setEditting(true)}
					>
						<span className="line-clamp-1 text-xs normal-case">
							{text || "Note"}
						</span>
						<PencilIcon className="h-5 w-5 text-purple-500" />
					</Button>
				)}
			</div>
			<NoteDeleteModal
				show={showDeleteModal}
				onClose={() => setShowDeleteModal(false)}
				onDelete={async () => {
					if (id) {
						deleteContextNote(id);
						await deleteNote.mutateAsync({ id });
						if (target.current) {
							unHighlightText(target.current, highlightedText);
						}
						setShowDeleteModal(false);
						setEditting(false);
					}
				}}
			/>
		</Fragment>
	);
}
