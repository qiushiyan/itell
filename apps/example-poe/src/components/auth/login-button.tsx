"use client";

import { cn } from "@itell/core";
import { buttonVariants } from "@itell/ui/server";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Spinner from "../spinner";
import Image from "next/image";

export const GoogleLoginButton = () => {
	const router = useRouter();

	const [isGoogleLoading, setIsGoogleLoading] = useState(false);
	return (
		<button
			type="button"
			className={cn(buttonVariants({ variant: "outline" }))}
			onClick={() => {
				setIsGoogleLoading(true);
				signIn("google");
			}}
			disabled={isGoogleLoading}
		>
			{isGoogleLoading ? (
				<Spinner />
			) : (
				<Image
					alt="Google"
					src="/icons/google.png"
					width={18}
					height={16}
					className="mr-2"
				/>
			)}
			Google
		</button>
	);
};
