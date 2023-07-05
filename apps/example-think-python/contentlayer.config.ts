import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypePrism from "rehype-prism-plus";
import GithubSlugger from "github-slugger";

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
			resolve: async (doc) => {
				const regXHeader = /(?<!`|\w+)\n(?<flag>#{2,6})\s+(?<content>.+)/g;
				const slugger = new GithubSlugger();
				const headings = Array.from(doc.body.raw.matchAll(regXHeader)).map(
					({ groups }) => {
						const flag = groups?.flag;
						const content = groups?.content;
						return {
							level:
								flag?.length === 1
									? "one"
									: flag?.length === 2
									? "two"
									: "three",
							text: content,
							slug: content ? slugger.slug(content) : undefined,
						};
					},
				);
				return headings;
			},
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
