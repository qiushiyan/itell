import { getCellCodes, readScript } from "@/lib/exercise";
import { Errorbox } from "@itell/ui/server";
import { CellGroup } from "./cell-group";
import { CellMode } from "./types";
import React from "react";

type Props =
	| { code: string | string[]; mode?: CellMode }
	| { script: string; mode?: CellMode }
	| { children: React.ReactNode; mode?: CellMode }
	| undefined;

export const Notebook = async (props: Props) => {
	let codes = [""];
	let mode: CellMode = "script";
	if (props) {
		mode = props.mode || "script";
		let code: string | string[] = "";
		if ("code" in props) {
			// append a new line if not present
			if (typeof props.code === "object") {
				code = props.code;
			} else {
				code = props.code.endsWith("\n") ? props.code : `${props.code}\n`;
			}
		} else if ("script" in props) {
			const result = await readScript(props.script);
			if (!result) {
				return <Errorbox>failed to read script {props.script}</Errorbox>;
			}
			code = result.trimEnd();
		} else if (props.children) {
			code = React.Children.toArray(props.children)
				// @ts-ignore
				.map((item) => item.props.children);
		}
		codes = getCellCodes(code);
	}

	return (
		<div className="notebook">
			<CellGroup codes={codes} mode={mode} />
		</div>
	);
};
