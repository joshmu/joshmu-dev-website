/**
 * @path /src/context/themeContext.tsx
 *
 * @project joshmu-dev-website
 * @file themeContext.tsx
 *
 * @author Josh Mu <hello@joshmu.dev>
 * @created Friday, 13th November 2020 3:44:50 pm
 * @modified Sunday, 10th October 2021 3:39:01 pm
 * @copyright © 2020 - 2020 MU
 */

import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { IconType } from "react-icons";
import {
  BsDropletFill as DropletIcon,
  BsLightningFill as LightningIcon,
  BsMoonFill as MoonIcon,
  BsSunFill as SunIcon,
} from "react-icons/bs";

type Theme = { id: string; icon: IconType; label: string };

const STORAGE_KEY = "joshmu.dev:theme";

// Cycle order; the first entry is the default.
const THEMES: readonly Theme[] = [
  { id: "theme-dark", icon: MoonIcon, label: "theme-dark theme toggle" },
  { id: "theme-light", icon: SunIcon, label: "theme-light theme toggle" },
  { id: "theme-alt", icon: DropletIcon, label: "theme-alt theme toggle" },
  { id: "theme-alt2", icon: LightningIcon, label: "theme-alt2 theme toggle" },
];

type ThemeContextValue = { theme: Theme; cycleTheme: () => void };

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState(THEMES[0]);

  useEffect(() => {
    const saved = THEMES.find(({ id }) => id === window.localStorage.getItem(STORAGE_KEY));
    if (saved) setTheme(saved);
    else window.localStorage.setItem(STORAGE_KEY, THEMES[0].id);
  }, []);

  useEffect(() => {
    document.body.classList.remove(...THEMES.map(({ id }) => id));
    document.body.classList.add(theme.id);
  }, [theme]);

  const cycleTheme = () => {
    const next = THEMES[(THEMES.indexOf(theme) + 1) % THEMES.length];
    setTheme(next);
    window.localStorage.setItem(STORAGE_KEY, next.id);
  };

  return <ThemeContext.Provider value={{ theme, cycleTheme }}>{children}</ThemeContext.Provider>;
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useThemeContext must be used within a ThemeProvider");
  return context;
};
