import { renderHook, waitFor } from "@testing-library/react";

import { useContributionCalendar } from "./useContributionCalendar";

const days = [{ date: "2026-09-29", grade: 3 }];

afterEach(() => {
  vi.unstubAllGlobals();
});

test("starts loading, then exposes the days", async () => {
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => Response.json(days)),
  );

  const { result } = renderHook(() => useContributionCalendar());

  expect(result.current).toEqual({ status: "loading" });
  await waitFor(() => expect(result.current).toEqual({ status: "ready", days }));
  expect(fetch).toHaveBeenCalledWith("/api/github", expect.anything());
});

test.each([
  ["a non-ok response", () => Promise.resolve(Response.json({ error: "x" }, { status: 502 }))],
  ["a rejected fetch", () => Promise.reject(new TypeError("Failed to fetch"))],
  ["a non-array body", () => Promise.resolve(Response.json({ error: "x" }))],
  ["an invalid JSON body", () => Promise.resolve(new Response("<html>"))],
])("reports an error for %s", async (_label, respond) => {
  vi.stubGlobal("fetch", vi.fn(respond));

  const { result } = renderHook(() => useContributionCalendar());

  await waitFor(() => expect(result.current).toEqual({ status: "error" }));
});

test("aborts the request on unmount and ignores the late response", async () => {
  let resolveResponse: (response: Response) => void = () => {};
  const fetchMock = vi.fn(
    (_url: string, _init: RequestInit) =>
      new Promise<Response>((resolve) => {
        resolveResponse = resolve;
      }),
  );
  vi.stubGlobal("fetch", fetchMock);

  const { result, unmount } = renderHook(() => useContributionCalendar());
  unmount();
  resolveResponse(Response.json(days));
  await new Promise((resolve) => setTimeout(resolve, 0));

  expect(fetchMock.mock.calls[0][1].signal?.aborted).toBe(true);
  expect(result.current).toEqual({ status: "loading" });
});
