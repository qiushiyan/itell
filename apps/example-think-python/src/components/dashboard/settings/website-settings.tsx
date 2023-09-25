"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
	Button,
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/client-components";
import { toast } from "sonner";
import { User } from "@prisma/client";
import { DEFAULT_TIME_ZONE } from "@/lib/constants";
import { trpc } from "@/trpc/trpc-provider";
import { useState } from "react";
import Spinner from "@/components/spinner";
import { Skeleton } from "@itell/ui/server";

const timeZoneData = [
	"America/Los_Angeles", // Pacific Time Zone
	"America/Denver", // Mountain Time Zone
	"America/Chicago", // Central Time Zone
	"America/New_York", // Eastern Time Zone
	"America/Anchorage", // Alaska Time Zone
	"Pacific/Honolulu", // Hawaii-Aleutian Time Zone
	"Pacific/Pago_Pago", // Samoa Time Zone
	"Pacific/Saipan", // Chamorro Time Zone
];

export const WebsiteSettings = ({ user }: { user: User }) => {
	const [isSaving, setIsSaving] = useState(false);
	const updateUser = trpc.user.update.useMutation();
	const FormSchema = z.object({
		timeZone: z.string({
			required_error: "Please set a time zone to display.",
		}),
	});

	const form = useForm<z.infer<typeof FormSchema>>({
		// @ts-ignore https://github.com/colinhacks/zod/issues/2663
		resolver: zodResolver(FormSchema),
		defaultValues: {
			timeZone: user.timeZone || DEFAULT_TIME_ZONE,
		},
	});

	const onSubmit = async (data: z.infer<typeof FormSchema>) => {
		setIsSaving(true);
		// for now, there is only time zone to configure
		await updateUser.mutateAsync({
			timeZone: data.timeZone,
		});

		setIsSaving(false);

		toast.success("You settings have been saved.");
	};

	return (
		<div className="space-y-4">
			<h3 className="mb-4 text-lg font-semibold leading-relaxed">
				Website Settings
			</h3>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="w-2/3 space-y-6"
				>
					<FormField
						control={form.control}
						name="timeZone"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Time Zone</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select a verified email to display" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{timeZoneData.map((timeZone, i) => (
											// rome-ignore lint/suspicious/noArrayIndexKey: <explanation>
											<SelectItem value={timeZone} key={i}>
												{timeZone}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormDescription>Affects how time is displayed</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit" disabled={isSaving}>
						{isSaving && <Spinner className="w-4 h-4 mr-2" />}Save
					</Button>
				</form>
			</Form>
		</div>
	);
};
