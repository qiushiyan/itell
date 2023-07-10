"use client";

import { FormEvent, useState } from "react";
import { trpc } from "@/trpc/trpc-provider";
import { toast } from "sonner";
import Spinner from "@/components/spinner";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	Button,
	Label,
} from "@/components/client-components";
import { Input } from "@itell/ui/server";
import { useRouter } from "next/navigation";

export const JoinClassForm = () => {
	const router = useRouter();
	const [getTeacherLoading, setGetTeacherLoading] = useState(false);
	const [joinClassLoading, setJoinClassLoading] = useState(false);
	const [joinClassModalOpen, setJoinClassModalOpen] = useState(false);
	const [code, setCode] = useState("");
	const [teacherName, setTeacherName] = useState("");
	const getTeacher = trpc.class.getTeacherWithCode.useMutation();
	const getCurrentClass = trpc.class.getCurrentClass.useMutation();
	const joinClass = trpc.class.joinClass.useMutation({
		onSuccess: () => {
			setJoinClassLoading(false);
			setJoinClassModalOpen(false);
			toast.success(
				"You are now added to class. Go to the statistics page to compare your progress with your classmates.",
			);
		},
	});

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setGetTeacherLoading(true);
		const code = e.currentTarget.code.value;
		const teacher = await getTeacher.mutateAsync({
			code,
		});
		if (!teacher) {
			setGetTeacherLoading(false);
			return toast.error(
				`No teacher found with class code "${code}". Make sure you enter the exact code received from your teacher.`,
			);
		}

		const currentClass = await getCurrentClass.mutateAsync();
		if (currentClass === code) {
			setGetTeacherLoading(false);
			return toast.success("You are already in this class.");
		}

		setTeacherName(teacher.name || "unknown");
		setCode(code);
		setJoinClassModalOpen(true);

		setGetTeacherLoading(false);
	}

	return (
		<div className="space-y-4">
			<p className="text-muted-foreground text-sm">
				Enter your class code here to join a class.
			</p>
			<form className="max-w-lg space-y-4" onSubmit={handleSubmit}>
				<Label htmlFor="code">Code</Label>
				<Input id="code" name="code" />
				<div className="flex justify-end">
					<Button variant="outline" type="submit" disabled={getTeacherLoading}>
						{getTeacherLoading ? <Spinner /> : "Join"}
					</Button>
				</div>
			</form>
			{/* dialog to confirm joining a class */}
			<AlertDialog
				open={joinClassModalOpen}
				onOpenChange={(val) => setJoinClassModalOpen(val)}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Join a Class</AlertDialogTitle>
						<AlertDialogDescription>
							You are about to join a class taught by {teacherName}. Your
							learning data will be shared with your teacher.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							disabled={joinClassLoading}
							className="bg-primary"
							onClick={async (e) => {
								e.preventDefault();
								setJoinClassLoading(true);

								await joinClass.mutateAsync({
									code,
								});

								router.refresh();
							}}
						>
							{joinClassLoading ? <Spinner /> : " Continue"}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
};
