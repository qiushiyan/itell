import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@itell/ui/server";
import { LogoutButton } from "../auth/auth-buttons";
import { ClassRegisterForm } from "./class-register-form";

export const Settings = () => {
	return (
		<Card>
			<CardHeader>
				<div className="flex flex-col sm:flex-row justify-between items-center gap-2">
					<div>
						<CardTitle>Edit your settings</CardTitle>
						<CardDescription>description</CardDescription>
					</div>
					<LogoutButton />
				</div>
			</CardHeader>
			<CardContent>
				<ClassRegisterForm />
			</CardContent>
		</Card>
	);
};
