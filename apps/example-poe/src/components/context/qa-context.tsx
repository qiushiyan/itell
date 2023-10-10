import React, { useState } from "react";
import { FeedbackModal } from "../question/feedback-modal";

type QAContextType = {
	currentChunk: number;
	setCurrentChunk: React.Dispatch<React.SetStateAction<number>>;
};

const QAContext = React.createContext<QAContextType>({} as QAContextType);
export const useQA = () => React.useContext(QAContext);

export const QAProvider = ({ children }: { children: React.ReactNode }) => {
	const [currentChunk, setCurrentChunk] = useState(0);

	return (
		<QAContext.Provider
			value={{
				currentChunk,
				setCurrentChunk,
			}}
		>
			{children}
		</QAContext.Provider>
	);
};
