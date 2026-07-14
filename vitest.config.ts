import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
	test: {
		environment: "node",
		include: ["src/**/*.test.ts", "docs/api/master/**/*.test.ts"],
		// Module captures these at import time — fix them so cookie names / base URL are deterministic.
		env: {
			APPWRITE_URL: "http://appwrite.test",
			APPWRITE_PROJECT_ID: "proj123",
		},
	},
});
