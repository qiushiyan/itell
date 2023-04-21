"use client";

import Modal from "./ui/Modal";
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

export default function SectionModal({ type = "unauthorized" }: Props) {
	const [show, setShow] = useState(false);
	const { data: session } = useSession();

	useEffect(() => {
		setTimeout(() => {
			setShow(true);
		}, 500);
	}, []);

	if (session) return null;

	return (
		<Modal
			open={show && !session}
			onClose={() => {}}
			title={type === "unauthorized" ? "Sign In to Proceed" : "Section Locked"}
		>
			<div className="mt-5">{AuthButtons.google}</div>
		</Modal>
	);
}
