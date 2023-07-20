import "server-only";

import path from "path";
import { readFile } from "fs/promises";

export const scriptPath = (script: string) => {
	return path.join(process.cwd(), "exercise", script);
};

export const readScript = async (script: string) => {
	const p = scriptPath(script);
	try {
		const content = (await readFile(p, "utf-8")).toString();
		return content;
	} catch (err) {
		return null;
	}
};
