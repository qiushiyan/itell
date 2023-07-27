"use client";

import { useEffect, useState } from "react";
import { usePythonConsole } from "react-py";
import { ConsoleState } from "react-py/dist/types/Console";

type Command = {
	code: string;
	result: string | undefined;
};

export const Repl = () => {
	const [commands, setCommands] = useState<Command[]>([
		{
			code: "",
			result: undefined,
		},
	]);
	const [input, setInput] = useState("");
	const [output, setOutput] = useState("");

	const {
		runPython,
		stdout,
		stderr,
		isLoading,
		isRunning,
		banner,
		consoleState,
	} = usePythonConsole();

	useEffect(() => {
		console.log(stdout);
	}, [stdout]);

	useEffect(() => {
		console.log(stderr);
	}, [stderr]);

	const prompt = consoleState === ConsoleState.incomplete ? "... " : ">>>";

	function run() {
		runPython(input);
	}

	return (
		<>
			<pre>{isLoading ? "loading" : banner}</pre>
			<pre>
				{commands.map((command) => (
					<div className="flex gap-2">
						{prompt}
						<input
							className="flex-1 bg-background"
							onChange={(e) => setInput(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									e.preventDefault();
									setCommands((prev) => [
										...prev,
										{
											code: input,
											result: undefined,
										},
									]);
									run();
								}
							}}
							placeholder="Enter your code here"
						/>
					</div>
				))}
			</pre>
		</>
	);
};
