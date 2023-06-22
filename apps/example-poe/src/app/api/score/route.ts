import { env } from "@/env.mjs";
import { SectionLocation } from "@/types/location";
import { NextResponse } from "next/server";

type ScoreRequestBody = {
	summary: string;
	chapter_index: number;
	section_index: number;
};

export async function POST(req: Request) {
	const body = (await req.json()) as ScoreRequestBody;
	const { summary, chapter_index, section_index } = body;
	const res = await fetch(env.SCORE_API_URL, {
		method: "POST",
		body: JSON.stringify({
			summary,
			chapter_index,
			section_index,
		}),
		headers: {
			"Content-Type": "application/json",
		},
	});
	const data = await res.json();

	return NextResponse.json(data);
}
