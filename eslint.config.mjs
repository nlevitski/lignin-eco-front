import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const nextPlugin = await import("@next/eslint-plugin-next");
const nextConfig = await import("eslint-config-next");

const eslintConfig = [
  nextPlugin.default.configs["core-web-vitals"],
  nextConfig.default.find((config) => config.name === "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
];

export default eslintConfig;
