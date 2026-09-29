import { fireEvent, screen } from "@testing-library/react";

import { renderWithProviders } from "../../__test__/renderWithProviders";

import { Hero } from "./Hero";

test("renders Hero component with logo", () => {
  renderWithProviders(<Hero />);

  expect(screen.getByText(/mu/i)).toBeInTheDocument();
});

test("clicking the logo cycles to the next theme", () => {
  renderWithProviders(<Hero />);

  fireEvent.click(screen.getByTestId("heroLogo"));

  expect(document.body.className).toBe("theme-light");
});
