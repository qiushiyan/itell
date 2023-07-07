"use client";

import { Typography } from "@itell/ui/server";
import { Button } from "@/components/client-components";
import { Command } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LoginGoogle } from "./auth-buttons";
import { toast } from "sonner";

export const AuthButtons = {
	google: (
		<Button
			variant="secondary"
			color="blue-gray"
			className="flex items-center gap-3 w-60 mx-auto my-2"
			onClick={(e) => {
				e.preventDefault();
				signIn("google");
			}}
		>
			<img src="/icons/google.svg" alt="metamask" className="h-6 w-6" />
			Continue with Google
		</Button>
	),
};

export default function AuthForm() {
	const { data: session } = useSession();
	const router = useRouter();

	if (session?.user) {
		toast.success(
			"You are already logged in, re-directing to the previous page.",
		);
		router.push("/");
	}

	return (
		<div>
			<form className="w-80 max-w-screen-lg sm:w-96 flex flex-col items-center">
				<Command className="mx-auto h-6 w-6" />
				<Typography variant="h4" color="blue-gray" className="mt-4">
					Get your account
				</Typography>
				<Typography variant="small">
					Use your social accounts to register
				</Typography>
				<div className="mt-2 space-y-2">
					<LoginGoogle />
				</div>
			</form>
		</div>
	);
}
