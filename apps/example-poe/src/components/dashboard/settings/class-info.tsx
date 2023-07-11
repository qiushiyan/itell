"use client";

import { AlertDialogDescription, Button } from "@/components/client-components";
import { User } from "@prisma/client";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/client-components";
import { useState } from "react";
import { trpc } from "@/trpc/trpc-provider";
import Spinner from "@/components/spinner";
import { useRouter } from "next/navigation";
import { ClassRegister } from "./class-register";
import { env } from "@/env.mjs";

export const ClassInfo = async ({ teacher }: { teacher: User | null }) => {
	const [isLoading, setIsLoading] = useState(false);
	const quitClass = trpc.class.quitClass.useMutation();
	const router = useRouter();

	if (!teacher) {
		return <ClassRegister />;
	}

	return (
		<div>
			<h3 className="mb-4 text-lg font-medium">Class Information</h3>
			<p className="text-muted-foreground text-sm max-w-lg">
				You are enrolled in a class taught by {teacher.name}.
			</p>
			{process.env.NODE_ENV === "development" && (
				<div className="mt-4 flex">
					<AlertDialog>
						<AlertDialogTrigger>
							<Button variant="destructive">Quit Class</Button>
						</AlertDialogTrigger>
						<AlertDialogContent className="z-50">
							<AlertDialogHeader>
								<AlertDialogTitle>
									Are you sure you want to leave the class?
								</AlertDialogTitle>
								<AlertDialogDescription>
									You will no longer receive class-based feedback.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancel</AlertDialogCancel>
								<AlertDialogAction
									disabled={isLoading}
									onClick={async () => {
										setIsLoading(true);
										await quitClass.mutateAsync();

										setIsLoading(false);
										router.refresh();
									}}
								>
									{isLoading ? <Spinner /> : <span>Confirm</span>}
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</div>
			)}
		</div>
	);
};
