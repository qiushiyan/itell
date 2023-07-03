import db from "../src/lib/db";

const main = async () => {
	const result = await db.user.findMany({
		include: {
			summaries: {
				orderBy: {
					chapter: "desc",
					section: "desc",
				},
				where: {
					isPassed: true,
				},
			},
		},
	});
	console.log(result);
};

main();
