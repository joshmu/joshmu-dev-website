import { act, renderHook } from "@testing-library/react";
import { MotionValue, motionValue, useScroll } from "framer-motion";

import { useHasScrolled } from "./useHasScrolled";

vi.mock("framer-motion", async (importOriginal) => ({
  ...(await importOriginal<typeof import("framer-motion")>()),
  useScroll: vi.fn(),
}));

let progress: MotionValue<number>;

beforeEach(() => {
  progress = motionValue(0);
  vi.mocked(useScroll).mockReturnValue({ scrollYProgress: progress } as ReturnType<
    typeof useScroll
  >);
});

test("is false at the top of the page", () => {
  const { result } = renderHook(() => useHasScrolled());

  expect(result.current).toBe(false);
});

test("reads the current progress on mount", () => {
  progress.set(0.4);

  const { result } = renderHook(() => useHasScrolled());

  expect(result.current).toBe(true);
});

test("flips to true once scrolled and back to false at the top", () => {
  const { result } = renderHook(() => useHasScrolled());

  act(() => progress.set(0.1));
  expect(result.current).toBe(true);

  act(() => progress.set(0));
  expect(result.current).toBe(false);
});

test("only re-renders when the answer flips", () => {
  let renders = 0;
  renderHook(() => {
    renders++;
    return useHasScrolled();
  });
  const afterMount = renders;

  act(() => progress.set(0.1));
  act(() => progress.set(0.2));
  act(() => progress.set(0.3));
  expect(renders).toBe(afterMount + 1);

  act(() => progress.set(0));
  act(() => progress.set(0));
  expect(renders).toBe(afterMount + 2);
});
