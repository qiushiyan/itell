import { Editor } from "./editor";
import { readScript } from "@/lib/exercise";
import { Errorbox } from "@itell/ui/server";

type Props = { code: string } | { script: string };

export const CodeEditor = async (props: Props) => {
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
	return <Editor code={code} />;
};
