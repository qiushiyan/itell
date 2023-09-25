"use client";

import { User } from "@prisma/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ClassRegister } from "./class-register";

export const ClassInfo = async ({ teacher }: { teacher: User | null }) => {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	if (!teacher) {
		return <ClassRegister />;
	}

	return (
		<div>
			<h3 className="mb-4 text-lg font-semibold leading-relaxed">
				Class Information
			</h3>
			<p className="text-muted-foreground text-sm max-w-lg">
				You are enrolled in a class taught by {teacher.name}.
			</p>
			{/* disable quitting class for now */}
			{/* <div className="mt-4 flex">
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
								className="bg-red-600 focus:ring-red-600"
							>
								{isLoading ? <Spinner /> : <span>Confirm</span>}
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</div> */}
		</div>
	);
};
