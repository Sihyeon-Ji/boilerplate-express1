import path from "path";
import dotenv from "dotenv";

const __dirname = path.resolve();

export const loadEnv = () => {
	if (process.env.NODE_ENV === "production") {
		dotenv.config({ path: path.join(__dirname, ".env.prod") });
	} else if (process.env.NODE_ENV === "development") {
		dotenv.config({ path: path.join(__dirname, ".env.dev") });
	} else {
		dotenv.config({ path: path.join(__dirname, ".env.local") });
	}
};
