// src/components/Header/Header.test.tsx

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom/extend-expect'

// import dependencies
import React from 'react'

// import react-testing methods
import { render, screen } from '@testing-library/react'

// the component to test
import { Header } from './Header'

test('renders Header component with name tag', () => {
  render(<Header />)

  const elem = screen.getByText(/joshmu/)
  expect(elem).toBeInTheDocument()
})
