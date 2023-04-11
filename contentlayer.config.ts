import { getLocationFromFlattenedPath } from "./src/lib/location";
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

const Section = defineDocumentType(() => ({
	name: "Section",
	filePathPattern: "**/*.{md,mdx}",
	contentType: "mdx",

	fields: {
		title: {
			type: "string",
			description: "The title of the Section",
			required: true,
		},
	},
	computedFields: {
		url: {
			type: "string",
			resolve: (doc) => `${doc._raw.flattenedPath}`,
		},
		location: {
			type: "json",
			resolve: (doc) => getLocationFromFlattenedPath(doc._raw.flattenedPath),
		},
	},
}));

export default makeSource({
	contentDirPath: "content/section",
	documentTypes: [Section],
	mdx: {
		remarkPlugins: [remarkGfm, remarkMath],
		rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings, rehypeKatex],
	},
});
