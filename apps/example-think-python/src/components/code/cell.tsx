"use client";

import CodeMirror, { ReactCodeMirrorRef } from "@uiw/react-codemirror";
import { githubDark, githubLight } from "@uiw/codemirror-theme-github";
import { PlayIcon, PlusIcon, RotateCcwIcon, XIcon } from "lucide-react";
import { useRef, useState } from "react";
import Spinner from "../spinner";
import { cn } from "@itell/core/utils";
import { useTheme } from "next-themes";
import { PythonResult, extensions } from "./editor-config";
import { Button } from "../client-components";
import { usePython } from "@/lib/hooks/ues-python";
import { memo } from "react";

type CellData = {
	id: string;
	code: string;
	deletable: boolean;
	addCell: () => void;
	deleteCell: (id: string) => void;
};

type CellStatus = "success" | "error" | undefined;

const printRegex = /print\((.*?)\)/;

export const Cell = memo(
	({ id, deleteCell, deletable, code, addCell }: CellData) => {
		const [result, setResult] = useState<PythonResult | null>(null);
		const [status, setStatus] = useState<CellStatus>(undefined);
		const [input, setInput] = useState(code || "");
		const { theme } = useTheme();
		const { runPython, isLoading, isRunning } = usePython();
		const editorRef = useRef<ReactCodeMirrorRef>(null);

		const run = async () => {
			setResult(null);
			const code = input.trim().split("\n");
			const lastLine = code.at(-1);

			if (lastLine) {
				const match = lastLine.match(printRegex);
				if (match?.[1]) {
					const result = match[1].trim().replace(/\s*,\s*/g, " + ");
					code[code.length - 1] = result;
				}
			}
			const result = await runPython(code.join("\n"));
			if (result.error) {
				setStatus("error");
			} else {
				setStatus("success");
			}
			setResult(result);
		};

		const reset = () => {
			setInput(code || "");
			setStatus(undefined);
			setResult(null);
			if (editorRef.current) {
				editorRef.current.view?.focus();
			}
		};

		return (
			<div
				className={cn("cell shadow-md border relative group", {
					"border-info": status === "success",
					"border-destructive": status === "error",
					"animate-border-color": isRunning,
				})}
			>
				{/* overlay when loading */}

				{/* <header className="flex items-center border gap-1">
					<Button size="sm" variant="ghost" onClick={run}>
						{isRunning ? (
							<Spinner className="w-4 h-4 mr-2" />
						) : (
							<PlayIcon className="w-4 h-4 mr-2" />
						)}
						Run
					</Button>
					<Button size="sm" variant="ghost" onClick={reset}>
						<RotateCcwIcon className="w-4 h-4 mr-2" /> Reset
					</Button>
					<Button size="sm" variant="ghost" onClick={reset}>
						<BanIcon className="w-4 h-4 mr-2" /> Cancel
					</Button>
				</header> */}
				<div className="flex">
					<div className="w-fit">
						<Button size="sm" variant="ghost" onClick={run}>
							{isRunning ? (
								<Spinner className="w-4 h-4" />
							) : (
								<PlayIcon className="w-4 h-4" />
							)}
						</Button>
					</div>

					<div className="flex-1 border-l">
						<CodeMirror
							value={input}
							onChange={(val) => setInput(val)}
							extensions={extensions}
							theme={theme === "light" ? githubLight : githubDark}
							basicSetup={{
								lineNumbers: false,
							}}
							ref={editorRef}
						/>
						{result?.output && result.output !== "undefined" && (
							<pre className="my-1 py-1">{result.output}</pre>
						)}
						{result?.error && (
							<pre className="my-1 py-1 text-red-500">{result.error}</pre>
						)}
					</div>
				</div>
				<div className="add-cell h-3 flex self-center items-center flex-col ">
					<div className="add-cell-buttons flex flex-column gap-2 opacity-0 group-hover:opacity-100 transition-opacity ease-linear duration-100">
						<Button size={"sm"} variant={"outline"}>
							<PlusIcon className="w-4 h-4" onClick={addCell} />
						</Button>
						{deletable && (
							<Button size={"sm"} variant={"outline"}>
								<XIcon className="w-4 h-4" onClick={() => deleteCell(id)} />
							</Button>
						)}
						<Button size={"sm"} variant={"outline"}>
							<RotateCcwIcon className="w-4 h-4" onClick={reset} />
						</Button>
					</div>
				</div>
			</div>
		);
	},
);
