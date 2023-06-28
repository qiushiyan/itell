import { component, config, fields, singleton } from "@keystatic/core";

export default config({
	storage: {
		kind: "github",
		repo: {
			owner: "learlab",
			name: "itell",
		},
	},
	singletons: {
		config: singleton({
			label: "Site Configuration",
			path: "config/site",
			format: "yaml",
			schema: {
				title: fields.text({ label: "Title" }),
				description: fields.text({ label: "Description", multiline: true }),
				footer: fields.text({ label: "Footer", multiline: true }),
				latex: fields.checkbox({
					label: "Enable LaTeX",
					defaultValue: false,
					description:
						"Enable LaTeX to support math expressions in the textbook",
				}),
				favicon: fields.image({
					label: "Favicon",
					directory: "public/images/avatars",
					publicPath: "/images/avatars/",
				}),
			},
		}),
	},
});
