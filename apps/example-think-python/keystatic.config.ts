import { config, fields, singleton } from "@keystatic/core";

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

				favicon: fields.image({
					label: "Favicon",
					directory: "public/images/avatars",
					publicPath: "/images/avatars/",
				}),
			},
		}),
	},
});
