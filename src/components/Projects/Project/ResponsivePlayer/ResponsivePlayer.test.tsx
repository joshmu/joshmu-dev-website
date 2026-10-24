import { render, screen } from "@testing-library/react";

import { ResponsivePlayer } from "./ResponsivePlayer";

const { playerProps, inView } = vi.hoisted(() => ({
  playerProps: vi.fn(),
  inView: { current: false },
}));

vi.mock("./ClientOnlyPlayer", () => ({
  default: (props: { src: string; playing: boolean }) => {
    playerProps(props);
    return <div data-testid="player" />;
  },
}));

vi.mock("react-device-detect", () => ({ isMobile: false }));

vi.mock("react-intersection-observer", () => ({
  useInView: vi.fn(() => [vi.fn(), inView.current]),
}));

const video = { src: "https://assets.example.com/demo.mp4", width: 1200, height: 616 };
const img = { src: "/assets/demo-hero.png", width: 3186, height: 2138 };

const lastPlayerProps = () => playerProps.mock.lastCall?.[0];

beforeEach(() => {
  vi.clearAllMocks();
  inView.current = false;
});

test("does not mount the player before it scrolls into view", () => {
  render(<ResponsivePlayer video={video} img={img} />);

  expect(screen.queryByTestId("player")).not.toBeInTheDocument();
});

test("mounts and plays the video once in view", () => {
  inView.current = true;
  render(<ResponsivePlayer video={video} img={img} />);

  expect(screen.getByTestId("player")).toBeInTheDocument();
  expect(lastPlayerProps()).toMatchObject({ src: video.src, playing: true });
});

test("pauses but stays mounted after scrolling out of view", () => {
  inView.current = true;
  const { rerender } = render(<ResponsivePlayer video={video} img={img} />);

  inView.current = false;
  rerender(<ResponsivePlayer video={video} img={img} />);

  expect(screen.getByTestId("player")).toBeInTheDocument();
  expect(lastPlayerProps()).toMatchObject({ playing: false });
});
