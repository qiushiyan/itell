"use client";

import CodeMirror, { ReactCodeMirrorRef } from "@uiw/react-codemirror";
import { githubDark, githubLight } from "@uiw/codemirror-theme-github";
import { PlayIcon, RotateCcwIcon, BanIcon } from "lucide-react";
import { useRef, useState } from "react";
import Spinner from "../spinner";
import { cn } from "@itell/core/utils";
import { useTheme } from "next-themes";
import { buttonVariants } from "@itell/ui/server";
import { usePython } from "@webpy/react";
import { PythonResult, extensions } from "./editor-config";
import { Button } from "../client-components";

type Props = {
	code?: string;
};

type EditorStatus = "success" | "error" | undefined;

const printRegex = /print\((.*?)\)/;

export const Editor = (props: Props) => {
	const [result, setResult] = useState<PythonResult | null>(null);
	const [status, setStatus] = useState<EditorStatus>(undefined);
	const [input, setInput] = useState(props.code || "");
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
		setInput(props.code || "");
		setStatus(undefined);
		setResult(null);
		if (editorRef.current) {
			editorRef.current.view?.focus();
		}
	};

	return (
		<div
			className={cn("code-editor shadow-md border ", {
				"border-info": status === "success",
				"border-destructive": status === "error",
				"animate-border-color": isRunning,
			})}
		>
			<div className="relative group">
				{/* overlay when loading */}
				<div
					className={cn(
						"absolute top-0 left-0 w-full h-full opacity-50 bg-foreground z-10 flex items-center justify-center",
						{ hidden: !isLoading },
					)}
				>
					<div className="rounded-md border-2 p-4 flex gap-2 items-center text-primary-foreground">
						<Spinner />
						Setting up ...
					</div>
				</div>
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
							<pre className="my-2">{result.output}</pre>
						)}
						{result?.error && (
							<pre className="my-2 text-red-500">{result.error}</pre>
						)}
					</div>
				</div>
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
			</div>
		</div>
	);
};
