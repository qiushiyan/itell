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
import { CodeExample } from "@/components/exercise/code-example";
import { useMDXComponent } from "next-contentlayer/hooks";
import { YoutubeVideo, Image } from "./client-components";
import { TextOverImage } from "./ui/text-over-image";
import { Exercise } from "./exercise";

const MdxComponents = {
	YoutubeVideo,
	Image,
	Blockquote,

	TextOverImage,
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
};
interface MdxProps {
	code: string;
}

export function Mdx({ code }: MdxProps) {
	const Component = useMDXComponent(code);

	// @ts-ignore
	return <Component components={MdxComponents} />;
}
