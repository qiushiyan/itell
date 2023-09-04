import {
	Info,
	Warning,
	Keyterm,
	Callout,
	Caption,
	Typography,
	Blockquote,
	Definition,
	Steps,
} from "@itell/ui/server";
import { Exercise } from "./exercise";
import { Notebook } from "@/components/code/notebook";
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
	Steps,
	// exercise related
	Exercise,
	Notebook,
	CodeRepl,
	YoutubeVideo,
	Image,
	CodingTime,
};
