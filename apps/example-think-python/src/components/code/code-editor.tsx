"use client";

import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { githubDark, githubLight } from "@uiw/codemirror-theme-github";
import { PlayIcon } from "lucide-react";
import { useState } from "react";
import Spinner from "../spinner";
import { cn } from "@itell/core/utils";
import { useTheme } from "next-themes";
import { buttonVariants } from "@itell/ui/server";
import { usePython } from "@webpy/react";
import { EditorView } from "@codemirror/view";
import { PythonResult, extensions } from "./editor";

type Props = {
	code?: string;
};

export const CodeEditor = (props: Props) => {
	const [result, setResult] = useState<PythonResult | null>(null);
	const [input, setInput] = useState(props.code || "");
	const { theme } = useTheme();
	const { runPython, isLoading, isRunning } = usePython();

	const run = async () => {
		const result = await runPython(input);
		console.log(result);
		setResult(result);
	};

	return (
		<div>
			<div className="relative group">
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
				<CodeMirror
					value={input}
					onChange={(val) => setInput(val)}
					extensions={extensions}
					theme={theme === "light" ? githubLight : githubDark}
					basicSetup={{
						lineNumbers: false,
					}}
				/>

				<div className="hidden absolute right-1 bottom-1 group-hover:flex gap-1 lg:gap-2 rounded-md shadow-md bg-foreground">
					<button
						className={buttonVariants()}
						onClick={run}
						disabled={isLoading}
					>
						{isRunning ? <Spinner /> : <PlayIcon className="w-4 h-4" />}
					</button>
				</div>
			</div>

			{result?.output && <pre>{result.output}</pre>}
			{result?.error && <pre className="text-destructive">{result.error}</pre>}

			{/* {isDisplayResult && <CodeResult stderr={stderr} stdout={stdout} />} */}
		</div>
	);
};
