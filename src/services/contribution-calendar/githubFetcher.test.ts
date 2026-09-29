import { fetchGithubContributionWeeks } from "./githubFetcher";

const weeks = [{ contributionDays: [{ date: "2026-09-01", contributionCount: 2 }] }];

function stubFetch(response: Response) {
  const fetchMock = vi.fn(async (_url: string, _init: RequestInit) => response);
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

afterEach(() => {
  vi.unstubAllGlobals();
});

test("posts the GraphQL query with the token and returns the calendar weeks", async () => {
  const fetchMock = stubFetch(
    Response.json({
      data: { user: { contributionsCollection: { contributionCalendar: { weeks } } } },
    }),
  );

  const result = await fetchGithubContributionWeeks({ token: "t0ken", userName: "octocat" });

  expect(result).toEqual(weeks);
  const [url, init] = fetchMock.mock.calls[0];
  expect(url).toBe("https://api.github.com/graphql");
  expect(init.method).toBe("POST");
  expect(new Headers(init.headers).get("Authorization")).toBe("Bearer t0ken");
  expect(JSON.parse(init.body as string).variables).toEqual({ userName: "octocat" });
});

test("throws when the response is not ok", async () => {
  stubFetch(new Response("bad credentials", { status: 401 }));

  await expect(
    fetchGithubContributionWeeks({ token: "t0ken", userName: "octocat" }),
  ).rejects.toThrow("401");
});

test("throws when GraphQL returns errors with a 200", async () => {
  stubFetch(
    Response.json({ data: null, errors: [{ message: "Something went wrong while executing" }] }),
  );

  await expect(
    fetchGithubContributionWeeks({ token: "t0ken", userName: "octocat" }),
  ).rejects.toThrow("Something went wrong while executing");
});

test("throws when the user is null", async () => {
  stubFetch(Response.json({ data: { user: null } }));

  await expect(
    fetchGithubContributionWeeks({ token: "t0ken", userName: "nobody" }),
  ).rejects.toThrow("nobody");
});

test("throws without calling GitHub when the token is missing", async () => {
  const fetchMock = stubFetch(Response.json({}));

  await expect(
    fetchGithubContributionWeeks({ token: undefined, userName: "octocat" }),
  ).rejects.toThrow("GITHUB_TOKEN");
  expect(fetchMock).not.toHaveBeenCalled();
});
