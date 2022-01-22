/**
 * @path /pages/api/github.ts
 *
 * @project joshmu-dev-website
 * @file github.ts
 *
 * @author Josh Mu <hello@joshmu.dev>
 * @created Thursday, 19th November 2020
 * @modified Saturday, 22nd January 2022 9:08:43 pm
 * @copyright © 2020 - 2020 MU
 */

import cheerio from 'cheerio'
import { NextApiRequest, NextApiResponse } from 'next'

const account = 'joshmu'
const url = `https://github.com/users/${account}/contributions`

export interface ActivityDayInterface {
  date: string
  count: number
  color: string
  grade: number
  gradeFromColor: COLOR_GRADE
}
enum COLOR_GRADE {
  'var(--color-calendar-graph-day-bg)',
  'var(--color-calendar-graph-day-L1-bg)',
  'var(--color-calendar-graph-day-L2-bg)',
  'var(--color-calendar-graph-day-L3-bg)',
  'var(--color-calendar-graph-day-L4-bg)',
}
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
    console.log('using cache')
    return cache.output
  }

  const body = await fetch(url)
  const html = await body.text()

  const $ = cheerio.load(html)
  const $calendar = $('.js-calendar-graph-svg')
  const output = $calendar
    .find('g > g > rect')
    .toArray()
    .map(day => {
      const $day = $(day)
      const date = $day.data('date')
      const count = $day.data('count')
      const color = $day.attr('fill')
      const grade = calcGrade(count)
      const gradeFromColor = COLOR_GRADE[color]

      // console.log({ date, count, color, grade, gradeFromColor })
      return { date, count, color, grade, gradeFromColor }
    }, [])

  cache.lastFetch = Date.now()
  cache.output = output

  return output
}
