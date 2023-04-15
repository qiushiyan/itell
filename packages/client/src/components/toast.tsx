"use client";

import { useSession } from "next-auth/react";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Toaster, toast } from "sonner";
export default function ShowToast() {
	const searchParams = useSearchParams();
	const { data: session } = useSession();

	useEffect(() => {
		if (searchParams) {
			const authRedirect = searchParams.get("auth-redirect");
			if (session && authRedirect) {
				toast.success("Successfully signed in!");
			}

			if (!session && authRedirect) {
				toast.success("You are now logged out.");
			}
		}
	}, [searchParams, session]);

	return null;
}
