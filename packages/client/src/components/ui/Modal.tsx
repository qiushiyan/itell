"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";
import { Button } from "../material-tailwind";
import { Card } from "@material-tailwind/react";

type Props = {
	open: boolean;
	onClose?: () => void;
	children: React.ReactNode;
};

export default function Modal({ open, onClose, children }: Props) {
	if (!open) {
		return null;
	}

	const handleClose = () => {
		if (onClose) {
			onClose();
		}
	};

	return (
		<Transition
			show={open}
			enter="transition duration-100 ease-out"
			enterFrom="transform scale-95 opacity-0"
			enterTo="transform scale-100 opacity-100"
			leave="transition duration-75 ease-out"
			leaveFrom="transform scale-100 opacity-100"
			leaveTo="transform scale-95 opacity-0"
			as={Fragment}
		>
			<Dialog
				open={open}
				// disable the backdrop click to close
				onClose={handleClose}
				className="relative z-50"
			>
				{/* The backdrop, rendered as a fixed sibling to the panel container */}
				<div className="fixed inset-0 bg-black/30" aria-hidden="true" />

				{/* Full-screen scrollable container */}
				<div className="fixed inset-0 overflow-y-auto">
					{/* Container to center the panel */}
					<div className="flex min-h-full items-center justify-center p-4">
						{/* The actual dialog panel  */}
						<Dialog.Panel className="mx-auto min-w-[400px] max-w-2xl rounded-md  bg-white shadow-md">
							{children}
						</Dialog.Panel>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
}
