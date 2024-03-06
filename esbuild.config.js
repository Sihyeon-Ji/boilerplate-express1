import { build } from "esbuild";
import { clean } from "esbuild-plugin-clean";
// import copyStaticFiles from "esbuild-copy-static-files";
import { dotenvRun } from "@dotenv-run/esbuild";

await build({
	plugins: [
		// copyStaticFiles({
		// 	src: "./static",
		// 	dest: "./dist/static",
		// 	dereference: true,
		// 	errorOnExist: false,
		// 	filter: () => true,
		// 	preserveTimestamps: true,
		// 	recursive: true,
		// }),
		clean({
			patterns: ["./dist/*"],
			verbose: true,
		}),
		dotenvRun({
			verbose: false,
			files: [
				process.env.NODE_ENV === "production"
					? ".env.prod"
					: process.env.NODE_ENV === "development"
					? ".env.dev"
					: ".env.local",
			],
			prefix: "^API_",
		}),
	],
	bundle: true,
	minify: true,
	platform: "node",
	entryPoints: ["./src/index.ts"],
	outfile: "./dist/index.cjs",
	format: "cjs",
	target: "es2022",
	tsconfig: "./tsconfig.json",
	// chunkNames: "chunks/[ext]/[name]-[hash]]",
	// loader: { ".xlsx": "file" }, // 정적 파일도 같이 할 빌드할 경우
}).catch((e) => {
	console.log("Build not successful", e.message);
	process.exit(1);
});

// const define = {};
// for (const k in process.env) {
// 	define[`process.env.${k}`] = JSON.stringify(process.env[k]);
// }
// console.log(define);
