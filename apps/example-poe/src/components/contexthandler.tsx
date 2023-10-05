"use client";

import { createContext, Fragment } from 'react';
import SectionContent from "@/components/section/section-content";
import db from "@/lib/db";
import { SubSection } from '@prisma/client'

export const qContext = createContext<SubSection[]>([]);

export default function ContextHandler ({code, qObj} : {code: any, qObj: any}) {

	return (
		<Fragment>
			<qContext.Provider value={qObj}>
				<SectionContent code={code} />
			</qContext.Provider>
		</Fragment>
	);
}