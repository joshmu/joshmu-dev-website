import { readdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";

const srcDir = resolve(import.meta.dirname, "../..");

function sourceFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return sourceFiles(path);
    return /\.(ts|tsx)$/.test(entry.name) ? [path] : [];
  });
}

test("types.ts has no runtime imports, so the client can import it", () => {
  const source = readFileSync(join(srcDir, "services/contribution-calendar/types.ts"), "utf8");

  expect(source).not.toMatch(/^\s*import\s+(?!type\b)/m);
  expect(source).not.toMatch(/\brequire\(/);
});

test("nothing under src/ imports from app/api", () => {
  const offenders = sourceFiles(srcDir).filter((file) =>
    /from\s+["'][^"']*app\/api\//.test(readFileSync(file, "utf8")),
  );

  expect(offenders).toEqual([]);
});
