import { dynamic, GET } from "./route";

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

test("is always rendered at request time", () => {
  expect(dynamic).toBe("force-dynamic");
});

test("returns 502 when GitHub fails", async () => {
  vi.spyOn(console, "error").mockImplementation(() => {});
  vi.stubEnv("GITHUB_TOKEN", "t0ken");
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => Response.json({ data: { user: null } })),
  );

  const response = await GET();

  expect(response.status).toBe(502);
  expect(await response.json()).toEqual({ error: "Failed to fetch GitHub activity" });
});

test("returns 502 without calling GitHub when the token is missing", async () => {
  vi.spyOn(console, "error").mockImplementation(() => {});
  vi.stubEnv("GITHUB_TOKEN", "");
  const fetchMock = vi.fn();
  vi.stubGlobal("fetch", fetchMock);

  const response = await GET();

  expect(response.status).toBe(502);
  expect(fetchMock).not.toHaveBeenCalled();
});
