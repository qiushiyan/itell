"use client";

import { useState } from "react";
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
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/client-components";
import { Input } from "@itell/ui/server";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
	getTeacherWithClassId,
	updateUserWithClassId,
} from "@/lib/server-actions";
import { useSession } from "next-auth/react";

export const JoinClassForm = () => {
	const router = useRouter();
	const { data: session } = useSession();
	const [joinClassModalOpen, setJoinClassModalOpen] = useState(false);
	const [teacherName, setTeacherName] = useState("");

	const formSchema = z.object({
		code: z.string().refine(async (classId) => {
			const teacher = await getTeacherWithClassId(classId);
			if (!teacher) {
				return false;
			}
			setTeacherName(teacher.name || "unknown");

			return classId;
		}, "Invalid class code"),
	});

	const [code, setCode] = useState("");
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			code: "",
		},
		reValidateMode: "onSubmit",
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		setCode(values.code);

		setJoinClassModalOpen(true);
	}

	const [joinClassLoading, setJoinClassLoading] = useState(false);

	return (
		<div className="space-y-4">
			<p className="text-muted-foreground text-sm">
				Enter your class code here to join a class
			</p>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="code"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Class Code</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit" disabled={form.formState.isSubmitting}>
						{form.formState.isSubmitting ? <Spinner /> : "Join"}
					</Button>
				</form>
			</Form>
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

								if (session?.user) {
									await updateUserWithClassId({
										userId: session.user.id,
										classId: code,
									});

									setJoinClassLoading(false);
									setJoinClassModalOpen(false);
									toast.success(
										"You are now added to class. Go to the statistics page to compare your progress with your classmates.",
									);

									router.refresh();
								}
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
