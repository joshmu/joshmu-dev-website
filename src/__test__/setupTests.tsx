import "@testing-library/jest-dom/vitest";

import React from "react";
import { vi } from "vitest";

// REACT-PLAYER MOCK (dynamic imports not supported in test env)
vi.mock("react-player", () => ({
  default: function MockReactPlayer({ url }: { url: string }) {
    return <div data-testid="react-player" data-url={url} />;
  },
}));
vi.mock("react-player/lazy", () => ({
  default: function MockReactPlayerLazy({ url }: { url: string }) {
    return <div data-testid="react-player" data-url={url} />;
  },
}));

// INTERSECTION OBSERVER MOCK
class MockIntersectionObserver {
  observe() {
    return null;
  }
  disconnect() {
    return null;
  }
  unobserve() {
    return null;
  }
}
window.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;

// REACT-GA
vi.mock("react-ga", () => ({
  initialize: vi.fn(),
  set: vi.fn(),
  pageview: vi.fn(),
}));

// FRAMER MOTION MOCK
vi.mock("framer-motion", () => {
  const toLowerCaseList = ["whileHover"];
  function attrsToLowerCase(props: Record<string, unknown>): Record<string, unknown> {
    return Object.entries(props).reduce((acc: Record<string, unknown>, [key, val]) => {
      key = toLowerCaseList.includes(key) ? key.toLowerCase() : key;
      acc[key] = val;
      return acc;
    }, {});
  }

  function AnimatePresence({ children }: { children: React.ReactNode }) {
    return children;
  }
  const motion = {
    div: function MockDiv({
      children,
      ...props
    }: { children?: React.ReactNode } & Record<string, unknown>) {
      return <div {...attrsToLowerCase(props)}>{children}</div>;
    },
    span: function MockSpan({
      children,
      ...props
    }: { children?: React.ReactNode } & Record<string, unknown>) {
      return <span {...attrsToLowerCase(props)}>{children}</span>;
    },
    svg: function MockSvg({
      children,
      ...props
    }: { children?: React.ReactNode } & Record<string, unknown>) {
      return <svg {...attrsToLowerCase(props)}>{children}</svg>;
    },
    path: function MockPath({
      children,
      ...props
    }: { children?: React.ReactNode } & Record<string, unknown>) {
      return <path {...attrsToLowerCase(props)}>{children}</path>;
    },
    button: function MockButton({
      children,
      ...props
    }: { children?: React.ReactNode } & Record<string, unknown>) {
      return <button {...attrsToLowerCase(props)}>{children}</button>;
    },
    ul: function MockUl({
      children,
      ...props
    }: { children?: React.ReactNode } & Record<string, unknown>) {
      return <ul {...attrsToLowerCase(props)}>{children}</ul>;
    },
  };
  return {
    AnimatePresence,
    motion,
    useTransform: vi.fn(() => null),
    useSpring: vi.fn(() => null),
    useAnimation: vi.fn(() => ({ start: () => null })),
    useScroll: vi.fn(() => ({ scrollYProgress: vi.fn(() => 0) })),
  };
});

// GLOBAL CONTEXT
vi.mock("@/context/globalContext", () => {
  const scrollProgress = 0;
  const values = { scrollProgress };
  return { useGlobalContext: vi.fn(() => values) };
});

// THEME CONTEXT
vi.mock("@/context/themeContext", () => {
  const toggleTheme = vi.fn();
  const THEME_TYPE = {
    dark: "theme-dark",
    light: "theme-light",
    alt: "theme-alt",
    alt2: "theme-alt2",
  };
  const values = { toggleTheme, theme: "theme-dark", THEME_TYPE };
  return {
    useThemeContext: vi.fn(() => values),
    ThemeProvider: function MockThemeProvider({ children }: { children: React.ReactNode }) {
      return children;
    },
  };
});
