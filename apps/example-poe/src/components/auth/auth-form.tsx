"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { GoogleLoginButton } from "./login-button";
import { z } from "zod";
import { useEffect } from "react";

const userAuthSchema = z.object({
	email: z.string().email(),
});

type FormData = z.infer<typeof userAuthSchema>;

export const AuthForm = () => {
	const { data: session } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (session?.user) {
			toast.success("You are already logged in.");
			router.push("/");
		}
	}, [session]);

	return (
		<div className="grid gap-6">
			{/* <form onSubmit={handleSubmit(onSubmit)}>
				<div className="grid gap-2">
					<div className="grid gap-1">
						<Label className="sr-only" htmlFor="email">
							Email
						</Label>
						<Input
							id="email"
							placeholder="not supported yet"
							type="email"
							autoCapitalize="none"
							autoComplete="email"
							autoCorrect="off"
							disabled={true || isLoading}
							{...register("email")}
						/>
						{errors?.email && (
							<p className="px-1 text-xs text-red-600">
								{errors.email.message}
							</p>
						)}
					</div>
					<button className={cn(buttonVariants())} disabled={isLoading}>
						{isLoading && <Spinner className="mr-2" />}
						Sign In with Email
					</button>
				</div>
			</form> */}
			<div className="relative">
				<div className="relative flex justify-center text-xs uppercase">
					<span className="bg-background px-2 text-muted-foreground">
						Sign in with Google
					</span>
				</div>
			</div>
			<GoogleLoginButton />
		</div>
	);
};
