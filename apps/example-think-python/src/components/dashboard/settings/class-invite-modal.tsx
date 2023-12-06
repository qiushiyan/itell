"use client";

import { Spinner } from "@/components/spinner";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { setClassSettings, updateUserClassId } from "@/lib/server-actions";
import { Button } from "@itell/ui/client";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
	user: User;
	teacherToJoin: User | null;
	classId: string;
};

export const ClassInviteModal = ({ user, teacherToJoin, classId }: Props) => {
	const [isOpen, setIsOpen] = useState(true);
	const router = useRouter();
	const [joinClassLoading, setJoinClassLoading] = useState(false);
	const canJoinClass = !user.classId && teacherToJoin;

	const joinClass = async () => {
		setJoinClassLoading(true);
		await updateUserClassId({ userId: user.id, classId });

		setClassSettings(classId);

		setJoinClassLoading(false);

		toast.success("You have joined the class! Redirecting.");
		setTimeout(() => {
			router.push("/dashboard");
		}, 1000);
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Join a class</DialogTitle>
					<DialogDescription>
						{user.classId ? (
							<p>
								It looks like you are trying to join a class with class code{" "}
								<span className="font-semibold">{classId}</span>, but you are
								already in a class. Contact lear.lab.vu@gmail.com if you believe
								this is a mistake.
							</p>
						) : teacherToJoin ? (
							<p>
								You are about to join a class taught by{" "}
								<span className="font-semibold">{teacherToJoin.name}</span>.
								Click the confirm button to join.
							</p>
						) : (
							<p>
								It looks like you are trying to enroll in a class, But{" "}
								<span className="font-semibold">{classId}</span> is not a valid
								class code. Make sure you enter the correct invitation link from
								your teacher.
							</p>
						)}
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button onClick={() => setIsOpen(false)} variant="secondary">
						Cancel
					</Button>
					{canJoinClass && (
						<Button onClick={joinClass} disabled={joinClassLoading}>
							{joinClassLoading && <Spinner className="mr-2 inline" />}
							Confirm
						</Button>
					)}
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
