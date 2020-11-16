// src/components/Header/Header.test.tsx

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom/extend-expect'

// import dependencies
import React from 'react'

// import react-testing methods
import { render, screen } from '@testing-library/react'

// the component to test
import { Header } from './Header'

// logo
test('renders Header component with logo', () => {
  render(<Header />)
  const logo = screen.getByTestId('logoTitle')

  expect(logo.textContent).toEqual('josh mu')
})

// menu
// include as many test cases as you want here
const links = ['projects', 'contact']

// I use test.each to iterate the test cases above
test.each(links)('Check if Header menu contains "%s" link.', link => {
  render(<Header />)
  expect(screen.getByText(link)).toBeInTheDocument()
})
