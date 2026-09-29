import { fireEvent, screen } from "@testing-library/react";

import { renderWithProviders } from "../../__test__/renderWithProviders";

import { ThemeToggle } from "./ThemeToggle";

const THEME_STORAGE_KEY = "joshmu.dev:theme";

function currentToggle() {
  return screen.getByRole("button", { name: /theme toggle$/ });
}

test("clicking cycles dark, light, alt, alt2 and back to dark, updating the body and storage", () => {
  renderWithProviders(<ThemeToggle />);

  expect(currentToggle()).toHaveAccessibleName("theme-dark theme toggle");
  expect(document.body).toHaveClass("theme-dark");
  expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe("theme-dark");

  for (const next of ["theme-light", "theme-alt", "theme-alt2", "theme-dark"]) {
    fireEvent.click(currentToggle());

    expect(currentToggle()).toHaveAccessibleName(`${next} theme toggle`);
    expect(document.body.className).toBe(next);
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe(next);
  }
});

test("restores a saved theme on mount", () => {
  renderWithProviders(<ThemeToggle />, { savedTheme: "theme-alt" });

  expect(currentToggle()).toHaveAccessibleName("theme-alt theme toggle");
  expect(document.body.className).toBe("theme-alt");
});

test("falls back to dark when the saved theme is invalid", () => {
  renderWithProviders(<ThemeToggle />, { savedTheme: "theme-neon" });

  expect(currentToggle()).toHaveAccessibleName("theme-dark theme toggle");
  expect(document.body.className).toBe("theme-dark");
  expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe("theme-dark");
});
