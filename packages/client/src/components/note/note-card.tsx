"use client";

import { FormEvent, Fragment, useEffect, useRef } from "react";
import TextArea from "../ui/textarea";
import { DeleteIcon, EditIcon } from "lucide-react";
import { NoteCard } from "@/types/note";
import { useClickOutside, useNotes } from "@/lib/hooks";
import { trpc } from "@/trpc/trpc-provider";
import { SectionLocation } from "@/types/location";
import NoteDeleteModal from "./note-delete-modal";
import { emphasizeText, unHighlightText, unemphasizeText } from "@/lib/note";
import { cn, relativeDate } from "@/lib/utils";
import { ForwardIcon } from "lucide-react";
import Spinner from "../spinner";
import Xarrow, { xarrowPropsType } from "react-xarrows";
import { useImmerReducer } from "use-immer";
import NoteColorPicker from "./note-color-picker";

interface Props extends NoteCard {
	location: SectionLocation;
}

type EditState = {
	input: string;
	color: string;
	editing: boolean;
	collapsed: boolean;
	showEdit: boolean;
	showArrow: boolean;
	showDeleteModal: boolean;
	showColorPicker: boolean;
};

type EditDispatch =
	| { type: "set_input"; payload: string }
	| { type: "collapse_note" }
	| { type: "toggle_collapsed" }
	| { type: "toggle_editing" }
	| { type: "set_show_edit"; payload: boolean }
	| { type: "set_editing"; payload: boolean }
	| { type: "set_arrow"; payload: boolean }
	| { type: "toggle_delete_modal" }
	| { type: "finish_delete" }
	| { type: "set_color"; payload: string };

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
	color,
}: Props) {
	const [editState, dispatch] = useImmerReducer<EditState, EditDispatch>(
		(draft, action) => {
			switch (action.type) {
				case "set_input":
					draft.input = action.payload;
					break;
				case "collapse_note":
					draft.collapsed = true;
					draft.editing = false;
					draft.showArrow = false;
					break;
				case "toggle_collapsed":
					draft.collapsed = !draft.collapsed;
					break;
				case "toggle_editing":
					draft.editing = !draft.editing;
					break;
				case "set_show_edit":
					draft.showEdit = action.payload;
					break;
				case "set_editing":
					draft.editing = action.payload;
					break;
				case "set_arrow":
					draft.showArrow = action.payload;
					break;
				case "toggle_delete_modal":
					draft.showDeleteModal = !draft.showDeleteModal;
					break;
				case "finish_delete":
					draft.showDeleteModal = false;
					draft.editing = false;
					draft.showArrow = false;
					break;
				case "set_color":
					draft.color = action.payload;
					break;
			}
		},
		{
			input: noteText, // textarea input
			color, // border color: ;
			editing: !id, // true: show textarea, false: show noteText
			collapsed: !!id, // if the note card is expanded
			showArrow: false, // show arrow connecting note card and highlighted text
			showDeleteModal: false, // show delete modal
			showColorPicker: false, // show color picker
			showEdit: false, // show edit overlay
		},
	);
	const arrowStyle: Partial<xarrowPropsType> = {
		strokeWidth: 2,
		headColor: editState.color,
		lineColor: editState.color,
	};
	const sectionContentRef = useRef<HTMLElement>();
	const { deleteNote: deleteContextNote, highlightNote } = useNotes();
	const updateNote = trpc.note.update.useMutation({
		onSuccess: () => {
			dispatch({ type: "set_editing", payload: false });
			dispatch({ type: "set_arrow", payload: false });
		},
	});
	const createNote = trpc.note.create.useMutation({
		onSuccess: () => {
			dispatch({ type: "set_editing", payload: false });
			dispatch({ type: "set_arrow", payload: false });
		},
	});
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
				color: editState.color,
			});
		}
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
				dispatch({ type: "set_arrow", payload: true });
				if (editState.collapsed) {
					dispatch({ type: "set_show_edit", payload: true });
				}
				emphasizeText(sectionContentRef.current, highlightedText);
			}
		},
		onMouseLeave: () => {
			if (sectionContentRef.current) {
				dispatch({ type: "set_arrow", payload: false });
				dispatch({ type: "set_show_edit", payload: false });

				unemphasizeText(sectionContentRef.current, highlightedText);
			}
		},
	};

	return (
		<Fragment>
			<div
				className={cn("absolute z-10 w-64 rounded-md border-2 bg-white", {
					"z-50": editState.editing,
				})}
				style={{ top: y, borderColor: editState.color }}
				ref={containerRef}
				{...triggers}
			>
				{editState.showArrow && (
					<Xarrow end={"emphasized"} start={containerRef} {...arrowStyle} />
				)}
				<div className="font-light tracking-tight text-sm relative px-1 py-2">
					{editState.showEdit && (
						<>
							<button
								className="absolute inset-0 z-10 w-full flex rounded-md justify-center items-center bg-gray-200/50"
								onClick={() => {
									dispatch({ type: "toggle_collapsed" });
									dispatch({ type: "set_show_edit", payload: false });
									// this is needed when a note is not saved
									// and the user clicked outside and clicked back again
									if (!id) {
										dispatch({ type: "set_editing", payload: true });
									} else {
										dispatch({ type: "set_editing", payload: false });
									}
								}}
							>
								<EditIcon />
							</button>
						</>
					)}
					{editState.collapsed && (
						<p className="line-clamp-3 px-1 text-sm mb-0">
							{editState.input || "Note"}
						</p>
					)}

					{!editState.collapsed && (
						<div className="px-2 mt-1 text-sm text-gray-800">
							<NoteColorPicker
								color={editState.color}
								onChange={(color) => {
									dispatch({ type: "set_color", payload: color });
									highlightNote(highlightedText, color);
									if (id) {
										updateNote.mutate({ id, color });
									}
								}}
							/>

							{editState.editing ? (
								<form>
									<TextArea
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
												className="flex items-center gap-1 "
												onClick={(e) => {
													e.preventDefault();
													dispatch({ type: "toggle_delete_modal" });
												}}
											>
												<DeleteIcon />
											</button>
										)}
										{isUnsaved && <span className="text-xs mb-0">unsaved</span>}
										<button
											type="submit"
											disabled={isLoading}
											className={cn("flex items-center  p-2 rounded-md")}
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
								<button
									onClick={() =>
										dispatch({ type: "set_editing", payload: true })
									}
									className="flex w-full text-left hover:bg-gray-200/50 px-1 py-2  rounded-md"
								>
									<span className="mb-0">
										{editState.input || <EditIcon className="w-4 h-4" />}
									</span>
								</button>
							)}
							{(updated_at || created_at) && (
								<p className="text-xs  text-gray-500 text-right mt-2 mb-0">
									updated at {relativeDate((updated_at || created_at) as Date)}
								</p>
							)}
						</div>
					)}
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
