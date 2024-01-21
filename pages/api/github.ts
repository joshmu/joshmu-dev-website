/** @see https://medium.com/@yuichkun/how-to-retrieve-contribution-graph-data-from-the-github-api-dc3a151b4af */

import { NextApiRequest, NextApiResponse } from "next"

export interface ActivityDayInterface {
  date: string
  count: number
  color: string
  grade: number
}
enum COLOR_GRADE {
  'var(--color-calendar-graph-day-bg)',
  'var(--color-calendar-graph-day-L1-bg)',
  'var(--color-calendar-graph-day-L2-bg)',
  'var(--color-calendar-graph-day-L3-bg)',
  'var(--color-calendar-graph-day-L4-bg)',
}
// swap this to use github green activity color
// enum COLOR_GRADE {
//   '#ebedf0',
//   '#9be9a8',
//   '#40c463',
//   '#30a14e',
//   '#216e39',
// }

// slightly estimating this...
const calcGrade = count => {
  let grade = 0
  if (count >= 1 && count < 7) {
    grade = 1
  } else if (count >= 7 && count < 14) {
    grade = 2
  } else if (count >= 14 && count < 21) {
    grade = 3
  } else if (count >= 21) {
    grade = 4
  }
  return grade
}

const cache: {
  lastFetch: number
  output: ActivityDayInterface[]
} = {
  lastFetch: 0,
  output: [],
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const output = await getGithubActivity()
  res.status(200).json(output)
}

async function getGithubActivity() {
  const timeSinceLastFetch = Date.now() - cache.lastFetch
  // 30 minutes
  const cacheDuration = 1800000
  if (timeSinceLastFetch <= cacheDuration) {
    console.log('github activity api: using cache')
    return cache.output
  }

  const response = await fetchGithubActivity()

  const output = response.data?.user?.contributionsCollection?.contributionCalendar?.weeks?.map( week => {
    return week.contributionDays?.map( day => {
      const grade = calcGrade(day.contributionCount)
      const color = COLOR_GRADE[grade]

      return {
        date: day.date,
        count: day.contributionCount,
        color,
        grade,
      } as ActivityDayInterface
    })
  }).flat(1) || []

  cache.lastFetch = Date.now()
  cache.output = output

  return output
}

type GithubActivityResponse = {
  data: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number
          weeks: {
            contributionDays: {
              contributionCount: number
              date: string
            }[]
          }[]
        }
      }
    }
  }
}

async function fetchGithubActivity({userName = 'joshmu'} = {}): Promise<GithubActivityResponse> {
  const graphqlQuery = {
    query: `
      query ($userName: String!) {
        user(login: $userName) {
          contributionsCollection {
            contributionCalendar {
              totalContributions
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
    `,
    variables: {
      userName
    }
  };

  return fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
    },
    body: JSON.stringify(graphqlQuery),
  })
  .then(response => response.json())
  .catch(error => console.error('Error:', error));
}