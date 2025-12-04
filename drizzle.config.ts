import { defineConfig } from "drizzle-kit";

export default defineConfig({
  url: process.env.DB_FILE_NAME!,
  dialect: "sqlite",
  schema: "./database/schema.ts",
  out: "./drizzle",
});
