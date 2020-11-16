// src/components/Contact/Contact.test.js

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom/extend-expect'

// import dependencies
import React from 'react'

// import react-testing methods
import { render, screen } from '@testing-library/react'

// the component to test
import { Contact } from './Contact'

test('renders Contact component with hello@joshmu.dev link', () => {
  render(<Contact />)

  const linkDom = screen.getByText(/hello@joshmu.dev/)
  expect(linkDom).toBeInTheDocument()
  expect(linkDom).toHaveAttribute('href', 'mailto:hello@joshmu.dev')
})
