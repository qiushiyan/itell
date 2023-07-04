import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import GithubSlugger from "github-slugger";

const parseLocation = (x: string, defaultVal: number | undefined = undefined) =>
	x ? parseInt(x.split("-")[1]) : defaultVal;

const getLocationFromFlattenedPath = (path: string) => {
	const slugSplit = path.substring(1).split("/");
	const [_, module, chapter, section] = slugSplit;
	return {
		module: parseLocation(module),
		chapter: parseLocation(chapter),
		section: parseLocation(section, 0),
	};
};

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

const Section = defineDocumentType(() => ({
	name: "Section",
	filePathPattern: "section/**/*.{md,mdx}",
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
			resolve: (doc) => `${doc._raw.flattenedPath.replace("section/", "")}`,
		},
		location: {
			type: "json",
			resolve: (doc) => getLocationFromFlattenedPath(doc._raw.flattenedPath),
		},
		headings: {
			type: "json",
			resolve: async (doc) => {
				const regXHeader = /\n(?<flag>#{1,6})\s+(?<content>.+)/g;
				const slugger = new GithubSlugger();
				const headings = Array.from(doc.body.raw.matchAll(regXHeader)).map(
					({ groups }: any) => {
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
	documentTypes: [Section, Site],
	mdx: {
		remarkPlugins: [remarkGfm, remarkMath],
		rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings, rehypeKatex],
	},
	disableImportAliasWarning: true,
});
