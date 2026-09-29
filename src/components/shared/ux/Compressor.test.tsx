import { render, screen } from "@testing-library/react";
import { useAnimation } from "framer-motion";

import { useHasScrolled } from "@/hooks/useHasScrolled";

import { Compressor } from "./Compressor";

vi.mock("@/hooks/useHasScrolled", () => ({ useHasScrolled: vi.fn(() => false) }));

const start = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(useAnimation).mockReturnValue({ start } as unknown as ReturnType<typeof useAnimation>);
});

test("shows the hidden part at the top of the page", () => {
  render(<Compressor text="josh mu" hide="osh " />);

  expect(screen.getByText("osh")).toBeInTheDocument();
  expect(start).toHaveBeenLastCalledWith("show");
});

test("hides it once the page has scrolled, and shows it again at the top", () => {
  vi.mocked(useHasScrolled).mockReturnValue(true);
  const { rerender } = render(<Compressor text="josh mu" hide="osh " />);
  expect(start).toHaveBeenLastCalledWith("hide");

  vi.mocked(useHasScrolled).mockReturnValue(false);
  rerender(<Compressor text="josh mu" hide="osh " />);
  expect(start).toHaveBeenLastCalledWith("show");
});
