import { useCurrentChunkLocal } from "@/lib/hooks/utils";
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
	if (typeof window === "undefined") {
		return null;
	}

	const [currentChunkLocal, _] = useCurrentChunkLocal();
	const [currentChunk, setCurrentChunk] = useState(currentChunkLocal);
	const [chunks, setChunks] = useState<HTMLDivElement[]>();

	// useEffect(() => {
	// 	const els = document.querySelectorAll(".content-chunk");
	// 	if (els.length > 0) {
	// 		setChunks(Array.from(els) as HTMLDivElement[]);
	// 	}
	// }, [pathname]);

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
