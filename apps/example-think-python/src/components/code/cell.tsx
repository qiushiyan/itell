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
import { cn } from "@itell/core/utils";
import { useTheme } from "next-themes";
import { PythonResult, baseExtensions, createShortcuts } from "./editor-config";
import {
	Button,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../client-components";
import { usePython } from "@/lib/hooks/ues-python";
import { memo } from "react";
import { CellData, CellMode, CellStatus } from "./types";

// io and contextlib is imported as setup code in providers
const codeWithStd = (code: string) => {
	const lines = code.split("\n");
	const indentedCode = lines.map((line) => `\t${line}`).join("\n");
	const output = `
with contextlib.redirect_stdout(io.StringIO()) as f:
${indentedCode}
	s = f.getvalue()
s
`;

	return output.trim();
};

export const Cell = memo(
	({ id, deleteCell, deletable, code, addCell, mode = "script" }: CellData) => {
		const extensions = [
			...baseExtensions,
			createShortcuts([
				{
					key: "Shift-Enter",
					run: (view) => {
						run();
						return true;
					},
					preventDefault: true,
				},
			]),
		];

		const [input, setInput] = useState(code);
		const [cellMode, setCellMode] = useState<CellMode>(mode);
		const [result, setResult] = useState<PythonResult | null>(null);
		const [status, setStatus] = useState<CellStatus>(undefined);
		const { theme } = useTheme();
		const [isCellRunning, setIsCellRunning] = useState(false);
		const { runPython, isRunning } = usePython();
		const editorRef = useRef<ReactCodeMirrorRef>(null);

		const run = async () => {
			setIsCellRunning(true);
			setResult(null);
			const result = await runPython(
				cellMode === "script" ? codeWithStd(input) : input,
			);
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
			// do not use interrupt buffer as it requires strict domain policy
			// await interruptExecution();
			// setIsCellRunning(false);
		};

		return (
			<div
				className={cn("cell shadow-md border relative group", {
					"border-info": status === "success",
					"border-destructive": status === "error",
					"animate-border-color": isCellRunning,
				})}
			>
				<div className="absolute top-2 right-2 z-10">
					<Select
						value={cellMode}
						onValueChange={(val) => setCellMode(val as CellMode)}
					>
						<SelectTrigger className="w-[90px]">
							<SelectValue placeholder="Mode" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="script">Script</SelectItem>
							<SelectItem value="repl">REPL</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div className="grid grid-cols-[40px_1fr] gap-4">
					<div className="border-r flex flex-col gap-1">
						<Button
							size="sm"
							variant="ghost"
							disabled={isRunning}
							onClick={async () => {
								if (!isRunning) {
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
						<Button size={"sm"} variant={"ghost"} onClick={reset}>
							<RotateCcwIcon className="w-4 h-4" />
						</Button>
					</div>

					<div>
						<CodeMirror
							value={input}
							onChange={setInput}
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
					</div>
				</div>
			</div>
		);
	},
);
