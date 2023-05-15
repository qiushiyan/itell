import path from "node:path";
import dts from "vite-plugin-dts";
import { UserConfigExport, defineConfig } from "vite";

const app = async (): Promise<UserConfigExport> => {
	return defineConfig({
		plugins: [
			dts({
				insertTypesEntry: true,
			}),
		],
		build: {
			lib: {
				entry: path.resolve(__dirname, "src/index.ts"),
				name: "ui",
				formats: ["es", "cjs"],
				fileName: (format) => `index.${format}.js`,
			},
			emptyOutDir: true,
		},
	});
};
// https://vitejs.dev/config/
export default app;
