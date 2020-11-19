import cheerio from 'cheerio'
import { NextApiRequest, NextApiResponse } from 'next'

const account = 'joshmu'
const url = `https://github.com/users/${account}/contributions`

export interface CalendarDayInterface {
  date: string
  count: number
  color: string
  grade: COLOR_GRADE
}
enum COLOR_GRADE {
  'var(--color-calendar-graph-day-bg)',
  'var(--color-calendar-graph-day-L1-bg)',
  'var(--color-calendar-graph-day-L2-bg)',
  'var(--color-calendar-graph-day-L3-bg)',
  'var(--color-calendar-graph-day-L4-bg)',
}

const cache: {
  lastFetch: number
  output: CalendarDayInterface[]
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
      const grade = COLOR_GRADE[color]

      // console.log({ date, count, color })
      return { date, count, color, grade }
    }, [])

  cache.lastFetch = Date.now()
  cache.output = output

  return output
}
