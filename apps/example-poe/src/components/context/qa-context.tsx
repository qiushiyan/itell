import React, { useCallback, useState } from "react";
import { FeedbackModal } from "../question/feedback-modal";

type QAContextType = {
	currentChunk: number;
	goToNextChunk: () => void;
};

const QAContext = React.createContext<QAContextType>({} as QAContextType);
export const useQA = () => React.useContext(QAContext);

export const QAProvider = ({ children }: { children: React.ReactNode }) => {
	const [currentChunk, setCurrentChunk] = useState(0);

	const goToNextChunk = useCallback(() => {
		console.log("go to next!");
		setCurrentChunk((val) => val + 1);
	}, []);

	return (
		<QAContext.Provider
			value={{
				currentChunk,
				goToNextChunk,
			}}
		>
			{children}
		</QAContext.Provider>
	);
};
