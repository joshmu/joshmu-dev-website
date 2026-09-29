import { useEffect, useState } from "react";

import type { ContributionDay } from "@/services/contribution-calendar/types";

type ContributionCalendarState =
  | { status: "loading" }
  | { status: "ready"; days: ContributionDay[] }
  | { status: "error" };

export function useContributionCalendar(): ContributionCalendarState {
  const [state, setState] = useState<ContributionCalendarState>({ status: "loading" });

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/github", { signal: controller.signal })
      .then(async (res) => {
        if (!res.ok) throw new Error(`Contribution calendar request failed: ${res.status}`);
        const body: unknown = await res.json();
        if (!Array.isArray(body)) throw new Error("Contribution calendar body is not an array");
        return body as ContributionDay[];
      })
      .then(
        (days) => {
          if (!controller.signal.aborted) setState({ status: "ready", days });
        },
        () => {
          if (!controller.signal.aborted) setState({ status: "error" });
        },
      );

    return () => controller.abort();
  }, []);

  return state;
}
