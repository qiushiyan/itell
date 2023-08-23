import { getCellCodes, readScript } from "@/lib/exercise";
import { Errorbox } from "@itell/ui/server";
import { CellGroup } from "./cell-group";

type Props = { code: string } | { script: string };

export const Notebook = async (props: Props) => {
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
	const codes = getCellCodes(code);

	return (
		<div className="notebook">
			<CellGroup codes={codes} />
		</div>
	);
};
