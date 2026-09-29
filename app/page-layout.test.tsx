import { render, screen } from "@testing-library/react";

import { PageLayout } from "./page-layout";

test("renders its children without adding tracking globals to window", () => {
  const globalsBefore = new Set(Object.keys(window));

  render(
    <PageLayout>
      <p>page content</p>
    </PageLayout>,
  );

  expect(screen.getByText("page content")).toBeInTheDocument();
  expect(Object.keys(window).filter((key) => !globalsBefore.has(key))).toEqual([]);
});
