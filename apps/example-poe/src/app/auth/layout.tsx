import { cn } from "@itell/core";
import Link from "next/link";
import { ChevronLeftIcon } from "lucide-react";
import { Button } from "@/components/ui-components";
import FlipCard from "@/components/flip-card";

export default async function AuthLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<div className="w-screen h-screen grid flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
			<Link href="/" className={"absolute top-4 left-4 md:top-8 md:left-8"}>
				<Button>
					<ChevronLeftIcon />
					Home
				</Button>
			</Link>
			<div className="lg:p-8">
				<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
					<div className="flex flex-col space-y-2 text-center">{children}</div>
				</div>
			</div>
			<div className="h-full bg-gray-100">
				<FlipCard />
			</div>
		</div>
	);
}
