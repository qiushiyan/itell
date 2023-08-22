import {
	Info,
	Warning,
	Keyterm,
	Callout,
	Caption,
	Typography,
	Blockquote,
	Definition,
} from "@itell/ui/server";
import { Exercise } from "./exercise";
import { CodeEditor } from "@/components/code/code-editor";
import { CodeRepl } from "@/components/code/code-repl-wrapper";
import { YoutubeVideo } from "@/components/ui/youtube";
import { Image } from "./ui/image";
import { CodingTime } from "@/components/code/coding-time";

export const MdxComponents = {
	// YoutubeVideo,
	Blockquote,
	Info,
	Warning,
	Keyterm,
	Callout,
	Caption,
	Definition,
	Typography,
	// exercise related
	Exercise,
	CodeEditor,
	CodeRepl,
	YoutubeVideo,
	Image,
	CodingTime,
};
