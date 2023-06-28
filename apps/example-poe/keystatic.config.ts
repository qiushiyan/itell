import { config, fields, singleton } from "@keystatic/core";

export default config({
	storage: {
		kind: "local",
	},
	collections: {
		sections: {
			label: "Textbook",
			path: "content/section/*",
			format: { contentField: "content" },
			schema: {
				title: fields.slug({ name: { label: "Title" } }),
				content: fields.document({
					label: "Content",
					formatting: true,
					links: true,
					images: true,
				}),
			},
			slugField: "title",
		},
	},
	singletons: {
		config: singleton({
			label: "Site Configuration",
			path: "config/site",
			schema: {
				title: fields.text({ label: "Title" }),
				description: fields.text({ label: "Description", multiline: true }),
				footer: fields.text({ label: "Footer", multiline: true }),
				latex: fields.checkbox({
					label: "Enable LaTeX",
					defaultValue: true,
					description:
						"Enable LaTeX to support math expressions in the textbook",
				}),
			},
		}),
	},
});
