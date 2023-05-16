import react from "@vitejs/plugin-react";
import path from "node:path";
import dts from "vite-plugin-dts";
import tailwindcss from "tailwindcss";
import { UserConfigExport, defineConfig } from "vite";

const app = async (): Promise<UserConfigExport> => {
	return defineConfig({
		plugins: [
			react(),
			dts({
				insertTypesEntry: true,
			}),
		],
		css: {
			postcss: {
				plugins: [tailwindcss],
			},
		},
		build: {
			lib: {
				entry: {
					index: path.resolve(__dirname, "src/index.ts"),
					mdx: path.resolve(__dirname, "src/mdx/index.ts"),
				},
				name: "ui",
				formats: ["es", "cjs"],
				fileName: (format, name) => `${name}.${format}.js`,
			},
			emptyOutDir: true,
			rollupOptions: {
				external: ["react", "react-dom", "tailwindcss"],
				output: {
					globals: {
						react: "React",
						"react-dom": "ReactDOM",
						tailwindcss: "tailwindcss",
					},
				},
			},
		},
	});
};
// https://vitejs.dev/config/
export default app;
