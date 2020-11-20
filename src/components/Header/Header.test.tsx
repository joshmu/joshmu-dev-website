/**
 * @project joshmu-dev-website
 * @file Header.test.tsx
 *
 * @author Josh Mu <hello@joshmu.dev>
 * @created Monday, 16th November 2020 1:31:05 pm
 * @modified Friday, 20th November 2020 4:35:37 pm
 * @copyright © 2020 - 2020 MU
 */

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
