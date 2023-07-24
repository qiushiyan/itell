import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypePrism from "rehype-prism-plus";
import { getHeadingsFromRawBody } from "./src/lib/contentlayer";
const Site = defineDocumentType(() => ({
	name: "Site",
	filePathPattern: "site/**/*.{md,mdx}",
	contentType: "mdx",
	computedFields: {
		slug: {
			type: "string",
			resolve: (doc) => `${doc._raw.flattenedPath.replace("site/", "")}`,
		},
	},
}));

const Chapter = defineDocumentType(() => ({
	name: "Chapter",
	filePathPattern: "chapter/**/*.{md,mdx}",
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
			resolve: (doc) => `${doc._raw.flattenedPath.replace("chapter/", "")}`,
		},
		chapter: {
			type: "number",
			resolve: (doc) => Number(doc._raw.flattenedPath.split("-")[1]),
		},
		headings: {
			type: "json",
			resolve: (doc) => getHeadingsFromRawBody(doc.body.raw),
		},
	},
}));

export default makeSource({
	contentDirPath: "content",
	documentTypes: [Chapter, Site],
	mdx: {
		remarkPlugins: [remarkGfm, remarkMath],
		rehypePlugins: [
			rehypeSlug,
			rehypeAutolinkHeadings,
			rehypeKatex,
			rehypePrism,
		],
	},
	disableImportAliasWarning: true,
});
