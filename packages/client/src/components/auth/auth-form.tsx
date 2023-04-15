"use client";

import {
	Card,
	Input,
	Checkbox,
	Button,
	Typography,
} from "@material-tailwind/react";
import { Command } from "lucide-react";
import { signIn } from "next-auth/react";

export const AuthButtons = {
	google: (
		<Button
			size="md"
			variant="outlined"
			color="blue-gray"
			className="flex items-center gap-3 w-60 mx-auto"
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
	return (
		<Card color="transparent" shadow={false}>
			<form className="w-80 max-w-screen-lg sm:w-96 flex flex-col items-center">
				<Command className="mx-auto h-6 w-6" />
				<Typography variant="h4" color="blue-gray" className="mt-4">
					Get your account
				</Typography>
				<Typography variant="small">
					Use your social accounts to register
				</Typography>
				{AuthButtons.google}
			</form>
		</Card>
	);
}
