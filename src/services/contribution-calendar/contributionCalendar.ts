import type { ContributionDay, Grade } from "./types";

const CACHE_TTL_MS = 30 * 60 * 1000;

type RawDay = { date?: unknown; contributionCount?: unknown } | null;
type RawWeek = { contributionDays?: unknown } | null;

function gradeFor(count: number): Grade {
  if (count >= 21) return 4;
  if (count >= 14) return 3;
  if (count >= 7) return 2;
  if (count >= 1) return 1;
  return 0;
}

function toDays(weeks: unknown): ContributionDay[] {
  if (!Array.isArray(weeks)) throw new Error("Malformed contribution calendar: weeks");

  const days = (weeks as RawWeek[]).flatMap((week) => {
    if (!Array.isArray(week?.contributionDays)) {
      throw new Error("Malformed contribution calendar: contributionDays");
    }
    return (week.contributionDays as RawDay[]).map((day) => {
      if (typeof day?.date !== "string" || typeof day.contributionCount !== "number") {
        throw new Error("Malformed contribution calendar: day");
      }
      return { date: day.date, grade: gradeFor(day.contributionCount) };
    });
  });

  if (days.length === 0) throw new Error("Empty contribution calendar");
  return days;
}

export function createContributionCalendar({
  fetcher,
  now,
}: {
  fetcher: () => Promise<unknown>;
  now: () => number;
}) {
  let cache: { fetchedAt: number; days: ContributionDay[] } | null = null;

  return {
    async get(): Promise<ContributionDay[]> {
      const time = now();
      if (cache && time - cache.fetchedAt <= CACHE_TTL_MS) return cache.days;

      const days = toDays(await fetcher());
      cache = { fetchedAt: time, days };
      return days;
    },
  };
}
