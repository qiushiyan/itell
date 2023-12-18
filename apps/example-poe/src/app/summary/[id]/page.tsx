import SummaryOperations from "@/components/dashboard/summary-operations";
import { ScoreBadge } from "@/components/score/badge";
import { TextbookPageModal } from "@/components/textbook-page-modal";
import { SummaryBackButton } from "@/components/summary/summary-back-button";
import { getCurrentUser } from "@/lib/auth";
import { PAGE_SUMMARY_THRESHOLD, ScoreType } from "@/lib/constants";
import db from "@/lib/db";
import { allSectionsSorted } from "@/lib/sections";
import { cn, relativeDate } from "@itell/core/utils";
import { Badge, buttonVariants } from "@itell/ui/server";
import { Summary, User } from "@prisma/client";
import { notFound, redirect } from "next/navigation";
import {
	ErrorType,
	SummaryFormState,
	getFeedback,
	validateSummary,
} from "@itell/core/summary";
import { getScore } from "@/lib/score";
import {
	getUserLocationSummaryCount,
	incrementUserLocation,
	updateSummary,
} from "@/lib/server-actions";
import { revalidatePath } from "next/cache";
import { isLastLocation } from "@/lib/location";
import { SectionLocation } from "@/types/location";
import Link from "next/link";
import { makeLocationHref } from "@/lib/utils";
import { SummaryForm } from "@/components/summary/summary-form";

async function getSummaryForUser(summaryId: Summary["id"], userId: User["id"]) {
	return await db.summary.findFirst({
		where: {
			id: summaryId,
			userId: userId,
		},
	});
}

interface PageProps {
	params: {
		id: string;
	};
}

export default async function ({ params }: PageProps) {
	const user = await getCurrentUser();
	if (!user) {
		return redirect("/auth");
	}
	const summary = await getSummaryForUser(params.id, user.id);

	if (!summary) {
		return notFound();
	}

	const section = allSectionsSorted.find(
		(section) =>
			section.location.chapter === summary.chapter &&
			section.location.section === summary.section,
	);
	if (!section) {
		return notFound();
	}

	const location = section.location as SectionLocation;

	const onSubmit = async (
		prevState: SummaryFormState,
		formData: FormData,
	): Promise<SummaryFormState> => {
		"use server";
		const input = formData.get("input") as string;

		const error = await validateSummary(input);
		if (error) {
			return { error, canProceed: false, response: null, feedback: null };
		}
		const response = await getScore({ input, location });

		if (!response.success) {
			return {
				// response parsing error
				error: ErrorType.INTERNAL,
				canProceed: false,
				response: null,
				feedback: null,
			};
		}

		const feedback = getFeedback(response.data);

		await updateSummary(params.id, {
			text: input,
			isPassed: feedback.isPassed,
			containmentScore: response.data.containment,
			similarityScore: response.data.similarity,
			wordingScore: response.data.wording,
			contentScore: response.data.content,
		});

		revalidatePath(`/summary/${params.id}`);

		if (feedback.isPassed) {
			await incrementUserLocation(user.id, location);

			return {
				canProceed: !isLastLocation(location),
				response: response.data,
				feedback,
				error: null,
			};
		}

		const summaryCount = await getUserLocationSummaryCount(user.id, location);
		if (summaryCount >= PAGE_SUMMARY_THRESHOLD) {
			await incrementUserLocation(user.id, location);
			return {
				canProceed: !isLastLocation(location),
				response: response.data,
				feedback,
				error: null,
			};
		}

		return {
			canProceed: false,
			response: null,
			feedback,
			error: null,
		};
	};

	return (
		<div className="px-32 py-4">
			<div className="flex w-full items-center justify-between">
				<div className="flex items-center space-x-10">
					<SummaryBackButton />
					<p className="text-sm text-muted-foreground">
						{`Created at ${relativeDate(summary.created_at)}`}
					</p>
				</div>
				<SummaryOperations summary={summary} />
			</div>
			<div className="grid gap-12 md:grid-cols-[200px_1fr] mt-4">
				<aside className="hidden w-[200px] flex-col md:flex space-y-4">
					<div className="flex items-center justify-center">
						<Badge variant={summary.isPassed ? "default" : "destructive"}>
							{summary.isPassed ? "Passed" : "Failed"}
						</Badge>
					</div>
					<p className="tracking-tight text-sm text-muted-foreground">
						Revise your summary here. After getting a new score, you can choose
						to update the old summary.
					</p>
					<p className="tracking-tight text-sm text-muted-foreground">
						Click on the title to review this section's content.
					</p>
					<div className="flex flex-col gap-2">
						<ScoreBadge
							type={ScoreType.containment}
							score={summary.containmentScore}
						/>
						<ScoreBadge
							type={ScoreType.similarity}
							score={summary.similarityScore}
						/>
						<ScoreBadge type={ScoreType.wording} score={summary.wordingScore} />
						<ScoreBadge type={ScoreType.content} score={summary.contentScore} />
					</div>
				</aside>
				<div className="space-y-2">
					<TextbookPageModal page={section} />

					<Link
						href={makeLocationHref(location)}
						className={cn(
							buttonVariants({ variant: "link" }),
							"block text-xl font-semibold text-center underline",
						)}
					>
						{section.title}
					</Link>
					<p className="text-sm text-muted-foreground text-center">
						{`Last updated at ${relativeDate(summary.updated_at)}`}
					</p>
					<div className="max-w-2xl mx-auto">
						<SummaryForm
							location={location}
							onSubmit={onSubmit}
							textareaClassName="min-h-[400px]"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
