import { cn } from "@itell/core";
import { Loader2 } from "lucide-react";

type Props = {
	className?: string;
};

export default function Spinner({ className }: Props) {
	return <Loader2 className={cn("mr-2 h-4 w-4 animate-spin", className)} />;
}
