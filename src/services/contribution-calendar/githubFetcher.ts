const QUERY = `
  query ($userName: String!) {
    user(login: $userName) {
      contributionsCollection {
        contributionCalendar {
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`;

type GraphqlResponse = {
  errors?: { message: string }[];
  data?: {
    user?: {
      contributionsCollection?: { contributionCalendar?: { weeks?: unknown } };
    } | null;
  } | null;
};

export async function fetchGithubContributionWeeks({
  token,
  userName,
}: {
  token: string | undefined;
  userName: string;
}): Promise<unknown> {
  if (!token) throw new Error("GITHUB_TOKEN is not set");

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query: QUERY, variables: { userName } }),
  });

  if (!response.ok) {
    throw new Error(`GitHub API request failed: ${response.status}`);
  }

  const body = (await response.json()) as GraphqlResponse;

  if (body.errors?.length) {
    throw new Error(`GitHub GraphQL errors: ${body.errors.map((e) => e.message).join("; ")}`);
  }

  const user = body.data?.user;
  if (!user) throw new Error(`GitHub user not found: ${userName}`);

  return user.contributionsCollection?.contributionCalendar?.weeks;
}
