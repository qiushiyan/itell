import db from "@/lib/db";

export async function POST(request: Request) {
	const data = (await request.json()) as { id: string };
	return await db.note.delete({
		where: {
			id: data.id,
		},
	});
}
