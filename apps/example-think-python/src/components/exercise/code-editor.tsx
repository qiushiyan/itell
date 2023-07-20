"use client";

import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { githubDark, githubLight } from "@uiw/codemirror-theme-github";
import { Button } from "../client-components";
import { PlayIcon } from "lucide-react";
import { useState } from "react";
import { usePython } from "react-py";
import Spinner from "../spinner";
import { cn } from "@itell/core/utils";
import { CodeResult } from "./code-result";
import { useTheme } from "next-themes";
import { buttonVariants } from "@itell/ui/server";

type Props = {
	code?: string;
};

export const CodeEditor = (props: Props) => {
	const [value, setValue] = useState(props.code || "");
	const { theme } = useTheme();
	const { runPython, stdout, stderr, isLoading, isRunning } = usePython();
	const isPending = isLoading || isRunning;

	const run = async () => {
		await runPython(value);
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
					value={value}
					onChange={(val) => setValue(val)}
					extensions={[python()]}
					theme={theme === "light" ? githubLight : githubDark}
					basicSetup={{
						lineNumbers: false,
					}}
				/>

				<div className="hidden absolute right-1 bottom-1 group-hover:flex gap-1 lg:gap-2 rounded-md shadow-md bg-foreground">
					<button className={buttonVariants()} onClick={run}>
						<PlayIcon className="w-4 h-4" />
					</button>
				</div>
			</div>

			<CodeResult stderr={stderr} stdout={stdout} />
		</div>
	);
};
