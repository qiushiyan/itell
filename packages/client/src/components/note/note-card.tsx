"use client";

import { Button } from "@material-tailwind/react";
import { FormEvent, Fragment, useEffect, useRef, useState } from "react";
import TextArea from "../ui/TextArea";
import { ChevronUpIcon, DeleteIcon } from "lucide-react";
import { NoteCard } from "@/types/note";
import { useClickOutside, useNotes } from "@/lib/hooks";
import { trpc } from "@/trpc/trpc-provider";
import { SectionLocation } from "@/types/location";
import NoteDeleteModal from "./note-delete-modal";
import { emphasizeText, unHighlightText, unemphasizeText } from "@/lib/note";
import { cn, relativeDate } from "@/lib/utils";
import { ForwardIcon } from "lucide-react";
import Spinner from "../spinner";
import { Transition } from "@headlessui/react";
import Xarrow, { xarrowPropsType } from "react-xarrows";
import { useImmerReducer } from "use-immer";

const arrowStyle: Partial<xarrowPropsType> = {
	strokeWidth: 2,
	headColor: "#c084fc",
	lineColor: "#c084fc",
};

interface Props extends NoteCard {
	location: SectionLocation;
}

type EditState = {
	input: string;
	editting: boolean;
	collapsed: boolean;
	showArrow: boolean;
	showDeleteModal: boolean;
};

type EditDispatch =
	| { type: "set_input"; payload: string }
	| { type: "collapse_note" }
	| { type: "toggle_collapsed" }
	| { type: "toggle_editting" }
	| { type: "set_editting"; payload: boolean }
	| { type: "toggle_arrow" }
	| { type: "toggle_delete_modal" }
	| { type: "finish_delete" };

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
	const [editState, dispatch] = useImmerReducer<EditState, EditDispatch>(
		(draft, action) => {
			switch (action.type) {
				case "set_input":
					draft.input = action.payload;
					break;
				case "collapse_note":
					draft.collapsed = true;
					draft.editting = false;
					break;
				case "toggle_collapsed":
					draft.collapsed = !draft.collapsed;
					break;
				case "toggle_editting":
					draft.editting = !draft.editting;
					break;
				case "set_editting":
					draft.editting = action.payload;
					break;
				case "toggle_arrow":
					draft.showArrow = !draft.showArrow;
					break;
				case "toggle_delete_modal":
					draft.showDeleteModal = !draft.showDeleteModal;
					break;
				case "finish_delete":
					draft.showDeleteModal = false;
					draft.editting = false;
					draft.showArrow = false;
					break;
			}
		},
		{
			input: noteText, // textarea input
			editting: !id, // true: show textarea, false: show noteText
			collapsed: !!id, // if the note card is expanded
			showArrow: false, // show arrow connecting note card and highlighted text
			showDeleteModal: false, // show delete modal
		},
	);
	const sectionContentRef = useRef<HTMLElement>();
	const { deleteNote: deleteContextNote } = useNotes();
	const updateNote = trpc.note.update.useMutation();
	const createNote = trpc.note.create.useMutation();
	const deleteNote = trpc.note.delete.useMutation();
	const containerRef = useClickOutside<HTMLDivElement>(() => {
		dispatch({ type: "collapse_note" });
	});

	useEffect(() => {
		const t = document.querySelector("#section-content") as HTMLElement;
		if (t) {
			sectionContentRef.current = t;
		}
	}, []);

	const isUnsaved = !id || editState.input !== noteText;
	const isLoading =
		updateNote.isLoading || createNote.isLoading || deleteNote.isLoading;

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (id) {
			// edit existing note
			await updateNote.mutateAsync({
				id,
				noteText: editState.input,
			});
		} else {
			// create new note
			await createNote.mutateAsync({
				y,
				noteText: editState.input,
				highlightedText,
				location,
			});
		}

		dispatch({ type: "set_editting", payload: false });
	};

	const handleDelete = async () => {
		if (id) {
			deleteContextNote(id);
			await deleteNote.mutateAsync({ id });
			if (sectionContentRef.current) {
				unHighlightText(sectionContentRef.current, highlightedText);
			}
			dispatch({ type: "finish_delete" });
		}
	};

	const triggers = {
		onMouseEnter: () => {
			if (sectionContentRef.current) {
				dispatch({ type: "toggle_arrow" });
				emphasizeText(sectionContentRef.current, highlightedText);
			}
		},
		onMouseLeave: () => {
			if (sectionContentRef.current) {
				dispatch({ type: "toggle_arrow" });
				unemphasizeText(sectionContentRef.current, highlightedText);
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
				ref={containerRef}
				{...triggers}
			>
				{editState.showArrow && (
					<Xarrow end={"emphasized"} start={containerRef} {...arrowStyle} />
				)}
				<div>
					<button
						className="flex w-full rounded-md text-xs normal-case justify-between px-4 py-2 text-left font-medium text-purple-900 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
						onClick={() => {
							dispatch({ type: "toggle_collapsed" });
							// if (!id) {
							// 	dispatch({ type: "set_editting", payload: true });
							// } else {
							// 	dispatch({ type: "set_editting", payload: false });
							// }
						}}
					>
						<span className=" line-clamp-1">{editState.input || "Note"}</span>
						<ChevronUpIcon
							className={`${
								editState.collapsed ? "rotate-180 transform" : ""
							} h-5 w-5 text-purple-500`}
						/>
					</button>
					<Transition
						show={!editState.collapsed}
						enter="transition duration-100 ease-out"
						enterFrom="transform scale-95 opacity-0"
						enterTo="transform scale-100 opacity-100"
						leave="transition duration-75 ease-out"
						leaveFrom="transform scale-100 opacity-100"
						leaveTo="transform scale-95 opacity-0"
					>
						<div className="px-4 text-sm mt-1 text-gray-800">
							{editState.editting ? (
								<form>
									<TextArea
										className="text-sm"
										placeholder="leave a note here"
										rows={6}
										value={editState.input}
										setValue={(val) =>
											dispatch({ type: "set_input", payload: val })
										}
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
													dispatch({ type: "toggle_delete_modal" });
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
									onClick={() =>
										dispatch({ type: "set_editting", payload: true })
									}
									fullWidth
									className="text-left font-normal text-xs text-black py-4 px-2 normal-case hover:bg-purple-50"
								>
									<p className="mb-0 tracking-tight">{editState.input}</p>
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
				show={editState.showDeleteModal}
				onClose={() => dispatch({ type: "toggle_delete_modal" })}
				onDelete={handleDelete}
			/>
		</Fragment>
	);
}
