"use client";

import { Button } from "@material-tailwind/react";
import { FormEvent, Fragment, useEffect, useRef, useState } from "react";
import TextArea from "./ui/TextArea";
import { ChevronUpIcon, DeleteIcon } from "lucide-react";
import { NoteCard } from "@/types/note";
import { useClickOutside, useNotes } from "@/lib/hooks";
import { trpc } from "@/trpc/trpc-provider";
import { SectionLocation } from "@/types/location";
import NoteDeleteModal from "./note-delete-modal";
import { emphasizeText, unHighlightText, unemphasizeText } from "@/lib/note";
import { cn, relativeDate } from "@/lib/utils";
import { ForwardIcon } from "lucide-react";
import Spinner from "./spinner";
import { Transition } from "@headlessui/react";
import Xarrow, { xarrowPropsType } from "react-xarrows";

const arrowStyle: Partial<xarrowPropsType> = {
	strokeWidth: 2,
	headColor: "#c084fc",
	lineColor: "#c084fc",
};

interface Props extends NoteCard {
	location: SectionLocation;
}

// existing notes are wrapped in <mark class = "highlight"> </mark>
// on mouse enter, add class = "emphasize"
// on delete add class = "unhighlighted"
// styles are in global.css
export default function NoteCard({
	id,
	y,
	highlightedText,
	noteText,
	location,
	updated_at,
	created_at,
}: Props) {
	const target = useRef<HTMLElement>();
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const { deleteNote: deleteContextNote } = useNotes();
	const [showArrow, setShowArrow] = useState(false);
	const [collapsed, setCollapsed] = useState(true);
	const [editting, setEditting] = useState(!id);
	const [text, setText] = useState(noteText);
	const updateNote = trpc.note.update.useMutation();
	const createNote = trpc.note.create.useMutation();
	const deleteNote = trpc.note.delete.useMutation();
	const outsideRef = useClickOutside<HTMLDivElement>(() => {
		setEditting(false);
		setCollapsed(true);
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

	const handleDelete = async () => {
		if (id) {
			deleteContextNote(id);
			await deleteNote.mutateAsync({ id });
			if (target.current) {
				unHighlightText(target.current, highlightedText);
			}
			setShowDeleteModal(false);
			setEditting(false);
			setShowArrow(false);
		}
	};

	const triggers = {
		onMouseEnter: () => {
			if (target.current) {
				setShowArrow(true);
				emphasizeText(target.current, highlightedText);
			}
		},
		onMouseLeave: () => {
			if (target.current) {
				setShowArrow(false);
				unemphasizeText(target.current, highlightedText);
			}
		},
	};

	return (
		<Fragment>
			<div
				className={
					"absolute z-10 w-64 rounded-md border border-purple-500 bg-white"
				}
				style={{ top: y }}
				ref={outsideRef}
				{...triggers}
			>
				{showArrow && (
					<Xarrow end={"emphasized"} start={outsideRef} {...arrowStyle} />
				)}
				<div>
					<button
						className="flex w-full rounded-md text-xs normal-case justify-between px-4 py-2 text-left font-medium text-purple-900 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
						onClick={() => {
							setCollapsed((c) => !c);
							if (!id) {
								setEditting(true);
							} else {
								setEditting(false);
							}
						}}
					>
						<span className=" line-clamp-1">{text || "Note"}</span>
						<ChevronUpIcon
							className={`${
								collapsed ? "rotate-180 transform" : ""
							} h-5 w-5 text-purple-500`}
						/>
					</button>
					<Transition
						show={!collapsed}
						enter="transition duration-100 ease-out"
						enterFrom="transform scale-95 opacity-0"
						enterTo="transform scale-100 opacity-100"
						leave="transition duration-75 ease-out"
						leaveFrom="transform scale-100 opacity-100"
						leaveTo="transform scale-95 opacity-0"
					>
						<div className="px-4 text-sm mt-1 text-gray-800">
							{editting ? (
								<form>
									<TextArea
										className="text-sm"
										placeholder="leave a note here"
										rows={6}
										value={text}
										setValue={(val) => setText(val)}
										autoFocus
									/>
									<footer className="flex justify-between items-center gap-1">
										{id && (
											<button
												type="submit"
												disabled={isLoading}
												className="flex items-center gap-1 text-purple-400 hover:text-purple-800"
												onClick={(e) => {
													e.preventDefault();
													setShowDeleteModal(true);
												}}
											>
												<DeleteIcon />
											</button>
										)}
										{isUnsaved && (
											<span className="text-xs tracking-tight mb-0">
												unsaved
											</span>
										)}
										<button
											type="submit"
											disabled={isLoading}
											className={cn(
												"flex items-center text-purple-400 p-2 rounded-md",
												"hover:text-purple-800",
											)}
											onClick={handleSubmit}
										>
											{updateNote.isLoading || createNote.isLoading ? (
												<Spinner className="w-5 h-5" />
											) : (
												<ForwardIcon />
											)}
										</button>
									</footer>
								</form>
							) : (
								<Button
									variant="text"
									onClick={() => setEditting(true)}
									fullWidth
									className="text-left font-normal text-xs text-black py-4 px-2 normal-case hover:bg-purple-50"
								>
									<p className="mb-0 tracking-tight">{text}</p>
								</Button>
							)}
							{(updated_at || created_at) && (
								<p className="text-xs tracking-tight text-gray-500 text-right mt-2">
									updated at {relativeDate((updated_at || created_at) as Date)}
								</p>
							)}
						</div>
					</Transition>
				</div>
			</div>
			<NoteDeleteModal
				show={showDeleteModal}
				onClose={() => setShowDeleteModal(false)}
				onDelete={handleDelete}
			/>
		</Fragment>
	);
}
