import SummaryEditor from "@/components/dashboard/summary-editor";
import { ScoreBadge } from "@/components/score/badge";
import SectionDialog from "@/components/section-dialog";
import { Button } from "@/components/ui-components";
import { getCurrentUser } from "@/lib/auth";
import { ScoreType } from "@/lib/constants";
import db from "@/lib/db";
import { allSectionsSorted } from "@/lib/sections";
import { delay, relativeDate } from "@/lib/utils";
import { cn } from "@itell/core";
import { Badge, buttonVariants } from "@itell/ui/server";
import { Summary, User } from "@prisma/client";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

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

	const sectionHref = `/module-${summary.module}/chapter-${summary.chapter}/section-${summary.section}`;

	return (
		<div className="max-w-3xl mx-auto">
			<div className="flex w-full items-center justify-between">
				<div className="flex items-center space-x-10">
					<Link
						href="/dashboard"
						className={cn(buttonVariants({ variant: "ghost" }))}
					>
						<>
							<ChevronLeft className="mr-2 h-4 w-4" />
							Back
						</>
					</Link>
					<p className="text-sm text-muted-foreground">
						{`Created at ${relativeDate(summary.created_at)} for Chapter ${
							summary.chapter
						} Section ${summary.section}`}
					</p>
				</div>
				<Link href={sectionHref} className="mr-2">
					<Button variant="ghost">Jump to Section</Button>
				</Link>
			</div>
			<div className="w-[800px] mx-auto mt-4 space-y-2 text-center">
				<SectionDialog section={section} />

				<div className="flex items-center justify-center">
					<Badge variant={summary.isPassed ? "default" : "destructive"}>
						{summary.isPassed ? "Passed" : "Failed"}
					</Badge>
				</div>

				<div className="flex justify-center gap-2 items-center">
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
				<p className="text-sm text-muted-foreground">
					{`Last updated at ${relativeDate(summary.updated_at)}`}
				</p>
				<SummaryEditor published summary={summary} />
			</div>
		</div>
	);
}
