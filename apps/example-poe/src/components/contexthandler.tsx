"use client";

import { createContext, Fragment } from "react";
import { SubSection } from "@prisma/client";
import { PageContent } from "./section/page-content";

export const qContext = createContext<SubSection[]>([]);

type Question = {
	sectionId: string;
	subsection: number;
	question: string;
};

export default function ContextHandler({
	code,
	qObj,
}: { code: string; qObj: any }) {
	return (
		<Fragment>
			<qContext.Provider value={qObj}>
				<PageContent code={code} />
			</qContext.Provider>
		</Fragment>
	);
}
