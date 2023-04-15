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
		<Modal open={show && !session} onClose={() => {}}>
			<Card className="w-full px-6 py-4">
				<CardHeader
					variant="gradient"
					className="mb-4 flex h-20 justify-center items-center gap-2 bg-gray-200"
				>
					<Typography variant="h5" color="blue-gray">
						{type === "unauthorized" ? "Sign In to Proceed" : "Section Locked"}
					</Typography>
					{type === "unauthorized" ? (
						<UserPlusIcon className="w-5 h-5" />
					) : (
						<LockIcon />
					)}
				</CardHeader>
				<CardBody className="flex flex-col gap-4 justify-center">
					{AuthButtons.google}
				</CardBody>
			</Card>
		</Modal>
	);
}
