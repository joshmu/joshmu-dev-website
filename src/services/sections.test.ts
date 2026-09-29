import { readdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";

import { scroller } from "react-scroll";

import { NAV_SECTIONS, SECTION, scrollToSection } from "./sections";

vi.mock("react-scroll", () => ({ scroller: { scrollTo: vi.fn() } }));

const srcDir = resolve(import.meta.dirname, "..");

function sourceFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return sourceFiles(path);
    return /\.(ts|tsx)$/.test(entry.name) ? [path] : [];
  });
}

beforeEach(() => {
  vi.mocked(scroller.scrollTo).mockClear();
});

test("section ids match the DOM ids the page renders", () => {
  expect(SECTION).toEqual({
    hero: "hero",
    banner: "banner",
    projects: "projects",
    contact: "contact",
  });
});

test("the nav lists projects then contact", () => {
  expect(NAV_SECTIONS).toEqual(["projects", "contact"]);
});

test("scrollToSection scrolls with the site's default settings", () => {
  scrollToSection(SECTION.banner);

  expect(scroller.scrollTo).toHaveBeenCalledExactlyOnceWith("banner", {
    duration: 800,
    delay: 0,
    smooth: "easeInOutQuart",
    offset: -40,
  });
});

test("per-call config is merged over the defaults", () => {
  scrollToSection(SECTION.hero, { duration: 0 });

  expect(scroller.scrollTo).toHaveBeenCalledExactlyOnceWith("hero", {
    duration: 0,
    delay: 0,
    smooth: "easeInOutQuart",
    offset: -40,
  });
});

test("scrollToSection rejects an unknown section id at compile time", () => {
  // @ts-expect-error "about" is not a section
  scrollToSection("about");

  expect(scroller.scrollTo).toHaveBeenCalledOnce();
});

test("sections.ts is the only module that imports react-scroll", () => {
  const importers = sourceFiles(srcDir).filter(
    (file) =>
      !file.endsWith(".test.ts") &&
      !file.endsWith(".test.tsx") &&
      /from\s+["']react-scroll["']/.test(readFileSync(file, "utf8")),
  );

  expect(importers).toEqual([join(srcDir, "services/sections.ts")]);
});
