import { NextResponse } from "next/server";

import { createContributionCalendar } from "@/services/contribution-calendar/contributionCalendar";
import { fetchGithubContributionWeeks } from "@/services/contribution-calendar/githubFetcher";

export const dynamic = "force-dynamic";

const calendar = createContributionCalendar({
  fetcher: () =>
    fetchGithubContributionWeeks({ token: process.env.GITHUB_TOKEN, userName: "joshmu" }),
  now: Date.now,
});

export async function GET() {
  try {
    return NextResponse.json(await calendar.get());
  } catch (error) {
    console.error("Error fetching GitHub activity:", error);
    return NextResponse.json({ error: "Failed to fetch GitHub activity" }, { status: 502 });
  }
}
