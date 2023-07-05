import AuthForm from "@/components/auth/auth-form";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Sign In/Register",
	description: "Sign in or register for an account",
};

export default function AuthPage() {
	return <AuthForm />;
}
