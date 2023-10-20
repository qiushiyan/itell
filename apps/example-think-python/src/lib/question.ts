import db from "./db";

export const getPageQuestions = async (pageId: string)  => {
	return await db.subSection.findMany({
		where: {
			sectionId: pageId,
			NOT: {
				question: {
					equals: null,
				},
			},
		},
		select: {
			sectionId: true,
			subsection: true,
			question: true,
		},
	});
}
