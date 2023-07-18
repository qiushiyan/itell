import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const data = (await request.json()) as { id: string };
	await db.note.delete({
		where: {
			id: data.id,
		},
	});
	return;
}
