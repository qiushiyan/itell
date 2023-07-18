import { getCurrentUser } from "@/lib/auth";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	const user = await getCurrentUser();
	console.log(user);
	return NextResponse.json({
		user,
	});
}
