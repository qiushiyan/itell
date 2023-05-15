"use client";

import Modal from "./ui/modal";
import { LockIcon, UserPlusIcon } from "lucide-react";
import {
	Card,
	CardHeader,
	CardBody,
	Typography,
} from "@material-tailwind/react";
import { AuthButtons } from "./auth/auth-form";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
type Props = {
	type?: "unauthorized" | "unlocked";
};

export default function SectionAuthModal({ type = "unauthorized" }: Props) {
	const [show, setShow] = useState(false);
	const { data: session } = useSession();

	useEffect(() => {
		setTimeout(() => {
			setShow(true);
		}, 500);
	}, []);

	const message =
		type === "unauthorized" ? "Sign In to Proceed" : "Section Locked";

	if (session) return null;

	return (
		<Modal open={show && !session} onClose={() => {}} title={message}>
			<div className="mt-5">{AuthButtons.google}</div>
		</Modal>
	);
}
