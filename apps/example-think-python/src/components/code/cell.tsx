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
	({ id, deleteCell, deletable, code, addCell, mode = "Script" }: CellData) => {
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
		const { runPython, isRunning, interruptExecution } = usePython();
		const editorRef = useRef<ReactCodeMirrorRef>(null);

		const run = async () => {
			setIsCellRunning(true);
			setResult(null);
			const result = await runPython(
				cellMode === "Script" ? codeWithStd(input) : input,
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
				<div className="absolute top-2 right-2 z-10">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Tabs
									className="hover:shadow-md"
									value={cellMode}
									onValueChange={(val) => setCellMode(val as CellMode)}
								>
									<TabsList>
										<TabsTrigger value="Script">Script</TabsTrigger>
										<TabsTrigger value="REPL">REPL</TabsTrigger>
									</TabsList>
								</Tabs>
							</TooltipTrigger>
							<TooltipContent className="w-80 lg:w-96">
								<p>
									In script mode, you can view code output by{" "}
									<code>print()</code> them.
								</p>
								<p>
									In REPL mode, the result of the last line is automatically
									returned. But <code>print()</code> does not work due to a
									technical limitation.
								</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
				<div className="grid grid-cols-[40px_1fr] gap-4">
					<div className="border-r flex flex-col gap-1">
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
						<Button size={"sm"} variant={"ghost"} onClick={reset}>
							<RotateCcwIcon className="w-4 h-4" />
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
					</div>
				</div>
			</div>
		);
	},
);
