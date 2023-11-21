"use client";

import { getCurrentChunkLocal, useCurrentChunkLocal } from "@/lib/hooks/utils";
import React, { useState } from "react";

type QAContextType = {
	chunks: HTMLDivElement[] | undefined;
	setChunks: React.Dispatch<React.SetStateAction<HTMLDivElement[] | undefined>>;
	currentChunk: number;
	setCurrentChunk: (index: number) => void;
};

const QAContext = React.createContext<QAContextType>({} as QAContextType);
export const useQA = () => React.useContext(QAContext);

export const QAProvider = ({ children }: { children: React.ReactNode }) => {
	const [currentChunk, setCurrentChunk] = useState(getCurrentChunkLocal());
	const [chunks, setChunks] = useState<HTMLDivElement[]>();

	return (
		<QAContext.Provider
			value={{
				chunks,
				setChunks,
				currentChunk,
				setCurrentChunk,
			}}
		>
			{children}
		</QAContext.Provider>
	);
};
