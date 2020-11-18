// src/tests/index.test.tsx

import { axe, toHaveNoViolations } from 'jest-axe'

import IndexPage from '@/pages/index'
import { render } from '@testing-library/react'

expect.extend(toHaveNoViolations)

describe('Index page', () => {
  test('should have no accessibility violations', async () => {
    const { container } = render(<IndexPage />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  test('matches snapshot', () => {
    const { asFragment } = render(<IndexPage />)
    expect(asFragment()).toMatchSnapshot()
  })
})
