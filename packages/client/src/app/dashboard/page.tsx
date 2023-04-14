import { Typography } from "@/components/material-tailwind";
import { delay } from "@/lib/utils";

export default async function Dashboard() {
	await delay(2000);

	return <Typography>A good looking dashboard</Typography>;
}
