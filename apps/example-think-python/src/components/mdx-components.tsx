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
import { CodeExample } from "@/components/code/code-example";
import { CodeRepl } from "@/components/code/code-repl-wrapper";
import { YoutubeVideo } from "@/components/ui/youtube";
import { Image } from "./ui/image";

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
	CodeExample,
	CodeRepl,
	YoutubeVideo,
	Image,
};
