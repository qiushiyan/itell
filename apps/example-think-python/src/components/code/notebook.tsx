import { getCellCodes, readScript } from "@/lib/exercise";
import { Errorbox } from "@itell/ui/server";
import { CellGroup } from "./cell-group";
import { CellMode } from "./types";

type Props =
	| { code: string; mode?: CellMode }
	| { script: string; mode?: CellMode }
	| undefined;

export const Notebook = async (props: Props) => {
	let codes = [""];
	let mode: CellMode = "Script";
	if (props) {
		mode = props.mode || "Script";
		let code = "";
		if ("code" in props) {
			code = props.code;
		} else if ("script" in props) {
			const result = await readScript(props.script);
			if (!result) {
				return <Errorbox>failed to read script {props.script}</Errorbox>;
			}
			code = result.trimEnd();
		}
		codes = getCellCodes(code);
	}

	return (
		<div className="notebook">
			<CellGroup codes={codes} mode={mode} />
		</div>
	);
};
