"use client";

import { PythonProvider as WebpyProvider } from "@webpy/react";

const pythonSetupCode = `
import io
import contextlib
`;

export const PythonProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<WebpyProvider options={{ setUpCode: pythonSetupCode }}>
			{children}
		</WebpyProvider>
	);
};
