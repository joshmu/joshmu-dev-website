import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));

test(".lintstagedrc.json is the only lint-staged config", () => {
  expect(existsSync(join(root, "lint-staged.config.mjs"))).toBe(false);
});

test("staged markdown is formatted, then linted", () => {
  const config = JSON.parse(readFileSync(join(root, ".lintstagedrc.json"), "utf8"));

  expect(config["*.md"]).toEqual(["oxfmt --write", "markdownlint-cli2"]);
});
