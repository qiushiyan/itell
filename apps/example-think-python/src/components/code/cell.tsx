"use client";

import CodeMirror, { ReactCodeMirrorRef } from "@uiw/react-codemirror";
import { githubDark, githubLight } from "@uiw/codemirror-theme-github";
import {
	PlayIcon,
	PlusIcon,
	RotateCcwIcon,
	XIcon,
	SquareIcon,
} from "lucide-react";
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
		const [input, setInput] = useState(code);
		const [result, setResult] = useState<PythonResult | null>(null);
		const [status, setStatus] = useState<CellStatus>(undefined);
		const { theme } = useTheme();
		const [isCellRunning, setIsCellRunning] = useState(false);
		const { runPython, isRunning, interruptExecution } = usePython();
		const editorRef = useRef<ReactCodeMirrorRef>(null);

		const run = async () => {
			setIsCellRunning(true);
			setResult(null);
			const lines = input.trim().split("\n");
			const lastLine = lines.at(-1);

			// a hack to support print for now
			// if the last line is print(<something>)
			// replace it with <something>
			if (lastLine) {
				const match = lastLine.match(printRegex);
				if (match?.[1]) {
					const innerPrint = match[1].trim().replace(/\s*,\s*/g, " + ");
					lines.push(innerPrint);
				}
			}
			const result = await runPython(lines.join("\n"));
			if (result.error) {
				setStatus("error");
			} else {
				setStatus("success");
			}
			setIsCellRunning(false);
			setResult(result);
		};

		const reset = () => {
			setInput(code);
			setStatus(undefined);
			setResult(null);
			if (editorRef.current) {
				editorRef.current.view?.focus();
			}
		};

		const cancel = async () => {
			await interruptExecution();
			setIsCellRunning(false);
		};

		return (
			<div
				className={cn("cell shadow-md border relative group", {
					"border-info": status === "success",
					"border-destructive": status === "error",
					"animate-border-color": isCellRunning,
				})}
			>
				<div className="grid grid-cols-[40px_1fr] gap-4">
					<div className="border-r">
						<Button
							size="sm"
							variant="ghost"
							onClick={async () => {
								if (isRunning) {
									await cancel();
								} else {
									await run();
								}
							}}
						>
							{isRunning ? (
								<SquareIcon className="w-4 h-4" />
							) : (
								<PlayIcon className="w-4 h-4" />
							)}
						</Button>
					</div>

					<div>
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
							<pre className="my-1 py-2">{result.output}</pre>
						)}
						{result?.error && (
							<pre className="my-1 py-2 text-red-500">{result.error}</pre>
						)}
					</div>
				</div>
				<div className="add-cell h-3 flex self-center items-center flex-col ">
					<div className="add-cell-buttons flex flex-column gap-2 opacity-0 group-hover:opacity-100 transition-opacity ease-linear duration-100">
						<Button size={"sm"} variant={"outline"} onClick={addCell}>
							<PlusIcon className="w-4 h-4" />
						</Button>
						{deletable && (
							<Button
								size={"sm"}
								variant={"outline"}
								onClick={() => deleteCell(id)}
							>
								<XIcon className="w-4 h-4" />
							</Button>
						)}
						<Button size={"sm"} variant={"outline"} onClick={reset}>
							<RotateCcwIcon className="w-4 h-4" />
						</Button>
					</div>
				</div>
			</div>
		);
	},
);
