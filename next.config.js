const { withContentlayer } = require("next-contentlayer");

module.exports = withContentlayer({
	experimental: { appDir: true },
	redirects: async () => {
		return [
			{
				source: "/module-1",
				destination: "/module-1/chapter-1",
				permanent: true,
			},
		];
	},
});
