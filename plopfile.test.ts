import { existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

type Action = { templateFile: string };
type Generator = { actions: Action[] };

const root = dirname(fileURLToPath(import.meta.url));

function loadGenerators() {
  const generators: Record<string, Generator> = {};
  const registerPlopfile = createRequire(import.meta.url)("./plopfile.js");
  registerPlopfile({
    setGenerator: (name: string, config: Generator) => {
      generators[name] = config;
    },
    setHelper: () => {},
  });
  return generators;
}

test("registers only the component generator", () => {
  expect(Object.keys(loadGenerators())).toEqual(["component"]);
});

test("every generator action points at an existing template", () => {
  const templates = Object.values(loadGenerators()).flatMap((generator) =>
    generator.actions.map((action) => action.templateFile),
  );

  for (const template of templates) {
    expect(existsSync(join(root, template))).toBe(true);
  }
});

test("the component test template uses test(), not it()", () => {
  const template = readFileSync(join(root, "plop-templates/component.test.hbs"), "utf8");

  expect(template).toMatch(/^test\(/m);
  expect(template).not.toMatch(/^\s*it\(/m);
});
