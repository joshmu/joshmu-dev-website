import { act, render, screen, waitFor } from "@testing-library/react";
import { Component, type ReactNode } from "react";

import { Activity } from "./Activity";

class CrashBoundary extends Component<{ children: ReactNode }, { crashed: boolean }> {
  state = { crashed: false };

  static getDerivedStateFromError() {
    return { crashed: true };
  }

  render() {
    return this.state.crashed ? <p>crashed</p> : this.props.children;
  }
}

function stubFetch(response: Response) {
  const fetchMock = vi.fn(async () => response);
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

afterEach(() => {
  vi.unstubAllGlobals();
});

test("renders nothing when the API returns a 500 error body", async () => {
  const fetchMock = stubFetch(Response.json({ error: "Failed" }, { status: 500 }));

  const { container } = render(
    <CrashBoundary>
      <Activity />
    </CrashBoundary>,
  );

  await waitFor(() => expect(fetchMock).toHaveBeenCalled());
  await act(() => new Promise((resolve) => setTimeout(resolve, 0)));
  expect(screen.queryByText("crashed")).not.toBeInTheDocument();
  expect(container).toBeEmptyDOMElement();
});

test("renders one cell per day with grade-based opacity", async () => {
  stubFetch(
    Response.json([
      { date: "2026-09-27", grade: 0 },
      { date: "2026-09-28", grade: 2 },
      { date: "2026-09-29", grade: 4 },
    ]),
  );

  const { container } = render(<Activity />);

  await waitFor(() => expect(container.querySelectorAll(".bg-themeText")).toHaveLength(3));
  const opacities = Array.from(container.querySelectorAll<HTMLElement>(".bg-themeText")).map(
    (cell) => cell.style.opacity,
  );
  expect(opacities).toEqual(["0", "0.24", "0.48"]);
});
