import { createContributionCalendar } from "./contributionCalendar";

const MINUTE = 60 * 1000;

function weeksOf(...weeks: [date: string, contributionCount: number][][]) {
  return weeks.map((days) => ({
    contributionDays: days.map(([date, contributionCount]) => ({ date, contributionCount })),
  }));
}

function clock(start = 1_000_000) {
  let time = start;
  return {
    now: () => time,
    advance: (ms: number) => {
      time += ms;
    },
  };
}

test("flattens weeks in order and grades each day at the boundaries", async () => {
  const fetcher = vi.fn(async () =>
    weeksOf(
      [
        ["2026-09-01", 0],
        ["2026-09-02", 1],
        ["2026-09-03", 6],
        ["2026-09-04", 7],
      ],
      [
        ["2026-09-05", 13],
        ["2026-09-06", 14],
        ["2026-09-07", 20],
        ["2026-09-08", 21],
      ],
    ),
  );
  const calendar = createContributionCalendar({ fetcher, now: clock().now });

  expect(await calendar.get()).toEqual([
    { date: "2026-09-01", grade: 0 },
    { date: "2026-09-02", grade: 1 },
    { date: "2026-09-03", grade: 1 },
    { date: "2026-09-04", grade: 2 },
    { date: "2026-09-05", grade: 2 },
    { date: "2026-09-06", grade: 3 },
    { date: "2026-09-07", grade: 3 },
    { date: "2026-09-08", grade: 4 },
  ]);
});

test("serves from cache within 30 minutes", async () => {
  const time = clock();
  const fetcher = vi.fn(async () => weeksOf([["2026-09-01", 3]]));
  const calendar = createContributionCalendar({ fetcher, now: time.now });

  const first = await calendar.get();
  time.advance(30 * MINUTE - 1);
  const second = await calendar.get();

  expect(fetcher).toHaveBeenCalledTimes(1);
  expect(second).toEqual(first);
});

test("refetches once the cache has expired", async () => {
  const time = clock();
  const fetcher = vi
    .fn()
    .mockResolvedValueOnce(weeksOf([["2026-09-01", 0]]))
    .mockResolvedValueOnce(weeksOf([["2026-09-01", 21]]));
  const calendar = createContributionCalendar({ fetcher, now: time.now });

  await calendar.get();
  time.advance(30 * MINUTE + 1);

  expect(await calendar.get()).toEqual([{ date: "2026-09-01", grade: 4 }]);
  expect(fetcher).toHaveBeenCalledTimes(2);
});

test("does not cache a failure", async () => {
  const fetcher = vi
    .fn()
    .mockRejectedValueOnce(new Error("GitHub down"))
    .mockResolvedValueOnce(weeksOf([["2026-09-01", 7]]));
  const calendar = createContributionCalendar({ fetcher, now: clock().now });

  await expect(calendar.get()).rejects.toThrow("GitHub down");
  expect(await calendar.get()).toEqual([{ date: "2026-09-01", grade: 2 }]);
});

test.each([
  ["a non-array payload", { weeks: [] }],
  ["an empty calendar", []],
  ["weeks with no days", weeksOf([])],
  ["a week without contributionDays", [{}]],
  ["a day with a non-numeric count", [{ contributionDays: [{ date: "2026-09-01" }] }]],
  ["a day without a date", [{ contributionDays: [{ contributionCount: 1 }] }]],
])("throws on %s and does not cache it", async (_label, payload) => {
  const fetcher = vi
    .fn()
    .mockResolvedValueOnce(payload)
    .mockResolvedValueOnce(weeksOf([["2026-09-01", 1]]));
  const calendar = createContributionCalendar({ fetcher, now: clock().now });

  await expect(calendar.get()).rejects.toThrow();
  expect(await calendar.get()).toEqual([{ date: "2026-09-01", grade: 1 }]);
});
