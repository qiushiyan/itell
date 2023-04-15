import { delay } from "@/lib/utils";

export default async function () {
	await delay(3000);
	return <p>you are a teacher</p>;
}
