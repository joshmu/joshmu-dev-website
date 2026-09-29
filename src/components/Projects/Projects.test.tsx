import { render, screen } from "@testing-library/react";

import { Projects } from "./Projects";
import { PROJECTS } from "./catalogue";

const linkHrefs = () => screen.getAllByRole("link").map((link) => link.getAttribute("href"));

test("the catalogue keeps its order", () => {
  expect(PROJECTS.map((project) => project.title)).toEqual([
    "VideoNote",
    "joshmu.com",
    "AID Online",
  ]);
});

test("renders VideoNote with its website and GitHub links", () => {
  render(<Projects />);

  expect(screen.getByRole("heading", { level: 1, name: "VideoNote" })).toBeInTheDocument();
  expect(linkHrefs()).toContain("https://videonote.app");
  expect(linkHrefs()).toContain("https://github.com/joshmu/videonote");
});

test.each(PROJECTS)("renders the $title title", (project) => {
  render(<Projects />);

  expect(screen.getByRole("heading", { level: 1, name: project.title })).toBeInTheDocument();
});

test.each(PROJECTS)("links $title to its website", (project) => {
  render(<Projects />);

  expect(linkHrefs()).toContain(project.website);
});

test.each(PROJECTS)("links $title to its GitHub repo", (project) => {
  render(<Projects />);

  expect(linkHrefs()).toContain(`https://${project.github}`);
});
