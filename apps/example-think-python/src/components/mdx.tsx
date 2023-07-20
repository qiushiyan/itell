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
import { useMDXComponent } from "next-contentlayer/hooks";
import { Exercise } from "./exercise";
import { CodeExample } from "@/components/exercise/code-example";
import { YoutubeVideo } from "@/components/ui/youtube";
import { Image } from "./ui/image";

const MdxComponents = {
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
	YoutubeVideo,
	Image,
};
interface MdxProps {
	code: string;
}

export function Mdx({ code }: MdxProps) {
	const Component = useMDXComponent(code);

	// @ts-ignore
	return <Component components={MdxComponents} />;
}
