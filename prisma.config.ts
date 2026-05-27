import { defineConfig } from "prisma/config";
import path from "node:path";
import { config } from "dotenv";

// Load .env.local which contains DATABASE_URL
config({ path: path.resolve(process.cwd(), ".env.local") });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env["DATABASE_URL"],
  },
});
