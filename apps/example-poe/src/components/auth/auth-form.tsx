"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { GoogleLoginButton, OutlookLoginButton } from "./login-button";

export const AuthForm = () => {
	const { data: session } = useSession();
	const router = useRouter();

	if (session?.user) {
		toast.success("You are already logged in.");
		router.push("/");
	}

	return (
		<div className="grid gap-6">
			<div className="relative">
				{/* <div className="absolute inset-0 flex items-center">
					<span className="w-full border-t" />
				</div> */}
				<div className="relative flex justify-center text-xs uppercase">
					<span className="bg-background px-2 text-muted-foreground">
						Log in via one of the options below
					</span>
				</div>
			</div>
			<div className="flex flex-col gap-2">
				<GoogleLoginButton />
				<OutlookLoginButton />
			</div>
		</div>
	);
};
