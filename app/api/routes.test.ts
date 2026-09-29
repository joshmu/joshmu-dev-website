import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const apiDir = dirname(fileURLToPath(import.meta.url));

test("does not serve the scaffolding hello route", () => {
  expect(existsSync(join(apiDir, "hello/route.ts"))).toBe(false);
});
