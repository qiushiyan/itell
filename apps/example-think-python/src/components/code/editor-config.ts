import { EditorView } from "@codemirror/view";
import { python } from "@codemirror/lang-python";

export type PythonResult = {
	output: string | null;
	error: string | null;
};

export const BaseEditorTheme = EditorView.baseTheme({
	"&": {
		padding: "8px",
		height: "auto",
	},
	".cm-content": {
		fontFamily: "Fira Code, monospace",
		fontSize: "16px",
		lineHeight: "2rem",
	},
	".cm-gutters": {
		display: "none",
	},
});

export const extensions = [python(), BaseEditorTheme];
