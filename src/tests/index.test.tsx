import { axe, toHaveNoViolations } from 'jest-axe'

import { render } from '@testing-library/react'

import App from '../../pages/index'

expect.extend(toHaveNoViolations)

describe('App', () => {
  test('should have no accessibility violations', async () => {
    const { container } = render(<App />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
