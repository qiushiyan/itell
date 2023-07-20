import { CodeEditor } from "./code-editor";
import { readScript } from "@/lib/exercise";
import { Errorbox } from "@itell/ui/server";

type Props = { code: string } | { script: string };

export const CodeExample = async (props: Props) => {
	let code = "";
	if ("code" in props) {
		code = props.code;
	} else {
		const result = await readScript(props.script);
		if (!result) {
			return <Errorbox>failed to read script {props.script}</Errorbox>;
		}
		code = result;
	}

	return <CodeEditor code={code} />;
};
