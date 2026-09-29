import { render, screen } from "@testing-library/react";
import type { Variant } from "framer-motion";

import { RevealInView } from "./RevealInView";

const { motionDivProps, start, inView } = vi.hoisted(() => ({
  motionDivProps: vi.fn(),
  start: vi.fn(),
  inView: { current: false },
}));

vi.mock("framer-motion", () => ({
  motion: {
    div: (props: { children?: React.ReactNode; className?: string }) => {
      motionDivProps(props);
      return <div className={props.className}>{props.children}</div>;
    },
  },
  useAnimation: () => ({ start }),
}));

vi.mock("react-intersection-observer", () => ({
  useInView: vi.fn(() => [vi.fn(), inView.current]),
}));

const { useInView } = await import("react-intersection-observer");

const lastMotionProps = () => motionDivProps.mock.lastCall?.[0];

beforeEach(() => {
  vi.clearAllMocks();
  inView.current = false;
});

test("reveals once by default, staggered by custom", () => {
  render(<RevealInView>hello</RevealInView>);

  expect(screen.getByText("hello")).toBeInTheDocument();
  expect(useInView).toHaveBeenCalledWith({ triggerOnce: true, threshold: 0.15 });

  const props = lastMotionProps();
  expect(props).toMatchObject({
    custom: 1,
    initial: "initial",
    style: { display: "inline-block" },
  });
  expect(props.variants.initial).toEqual({ opacity: 0, y: 25 });
  expect((props.variants.animate as (custom: number) => Variant)(2)).toEqual({
    opacity: 1,
    y: 0,
    transition: { delay: 0.4, ease: [0.6, 0.05, -0.01, 0.9] },
  });
});

test("passes custom and triggerOnce through", () => {
  render(
    <RevealInView custom={3} triggerOnce={false}>
      hello
    </RevealInView>,
  );

  expect(useInView).toHaveBeenCalledWith({ triggerOnce: false, threshold: 0.15 });
  expect(lastMotionProps().custom).toBe(3);
});

test("animates in when in view and back out when not", () => {
  inView.current = true;
  const { rerender } = render(<RevealInView>hello</RevealInView>);
  expect(start).toHaveBeenLastCalledWith("animate");

  inView.current = false;
  rerender(<RevealInView>hello again</RevealInView>);
  expect(start).toHaveBeenLastCalledWith("initial");
});

test("forwards motion div props", () => {
  render(<RevealInView className="tagline">hello</RevealInView>);

  expect(screen.getByText("hello")).toHaveClass("tagline");
});

test("does not accept a delay prop", () => {
  // @ts-expect-error delay is not a RevealInView prop
  render(<RevealInView delay={1}>hello</RevealInView>);
});
