"use client";

import { signIn, signOut } from "next-auth/react";
import { Button } from "../ui-components";
import { LogOutIcon } from "lucide-react";
import { useState } from "react";
import Spinner from "../spinner";

const AuthButton = ({
	icon,
	text,
	action,
	...rest
}: {
	icon: React.ReactNode;
	text: string;
	action: () => Promise<void>;
} & React.ComponentPropsWithoutRef<typeof Button>) => {
	const [loading, setLoading] = useState(false);
	return (
		<Button
			onClick={async () => {
				setLoading(true);
				await action();
				setLoading(false);
			}}
			disabled={loading}
			{...rest}
		>
			{loading ? <Spinner className="mr-2 h-4 w-4" /> : icon}
			{text}
		</Button>
	);
};

export const LogoutButton = () => (
	<AuthButton
		icon={<LogOutIcon className="mr-2 h-4 w-4" />}
		text="Logout"
		action={signOut}
	/>
);

export const LoginGoogle = () => (
	<AuthButton
		text="Login with Google"
		action={signIn}
		variant="secondary"
		icon={
			<img src="/icons/google.svg" alt="metamask" className="h-4 w-4 mr-2" />
		}
	/>
);
