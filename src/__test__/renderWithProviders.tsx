import { render } from "@testing-library/react";
import type { ReactElement } from "react";

import { ThemeProvider } from "@/context/themeContext";

const THEME_STORAGE_KEY = "joshmu.dev:theme";

type Options = { savedTheme?: string };

export function renderWithProviders(ui: ReactElement, { savedTheme }: Options = {}) {
  window.localStorage.clear();
  document.body.className = "";
  if (savedTheme !== undefined) window.localStorage.setItem(THEME_STORAGE_KEY, savedTheme);

  return render(<ThemeProvider>{ui}</ThemeProvider>);
}
