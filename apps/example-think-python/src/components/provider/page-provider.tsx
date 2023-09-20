"use client";

import { PythonProvider as WebpyProvider } from "@webpy/react";

const pythonSetupCode = `
import io
import contextlib
`;

export const PageProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<WebpyProvider options={{ setUpCode: pythonSetupCode }}>
			{children}
		</WebpyProvider>
	);
};
