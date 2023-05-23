"use client";

import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";

const extensions = [python()];

export default function () {
	const [input, setInput] = useState("");

	return (
		<CodeMirror
			value={input}
			onChange={(val) => {
				setInput(val);
			}}
			height="200px"
		/>
	);
}
