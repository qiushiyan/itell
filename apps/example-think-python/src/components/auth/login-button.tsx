"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Spinner from "../spinner";
import Image from "next/image";
import { Button } from "../client-components";
import { Warning } from "@itell/ui/server";

type Props = {
	provider: Parameters<typeof signIn>[0];
	title: string;
	icon: React.ReactNode;
};

export const CreateLoginButton = ({ provider, icon, title }: Props) => {
	return () => {
		const [isPending, setIsPending] = useState(false);
		return (
			<Button
				variant={"outline"}
				onClick={() => {
					setIsPending(true);
					signIn(provider);
				}}
				disabled={isPending}
			>
				{isPending ? <Spinner className="mr-2" /> : icon}
				{title}
			</Button>
		);
	};
};

export const GoogleLoginButton = CreateLoginButton({
	provider: "google",
	icon: (
		<Image
			alt="Google"
			src="/icons/google.png"
			width={18}
			height={16}
			className="mr-2"
		/>
	),
	title: "Google",
});

export const OutlookLoginButton = CreateLoginButton({
	provider: "azure-ad",
	icon: (
		<Image
			alt="Google"
			src="/icons/outlook.png"
			width={32}
			height={32}
			className="mr-2"
		/>
	),
	title: "Outlook",
});
