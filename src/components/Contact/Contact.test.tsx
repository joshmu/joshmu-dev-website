// src/components/Contact/Contact.test.js

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom/extend-expect'

// import dependencies
import React from 'react'

// import react-testing methods
import { render, screen } from '@testing-library/react'

// the component to test
import { Contact } from './Contact'

// required mocks
// INTERSECTION OBSERVER MOCK
const intersectionObserverMock = () => ({
  observe: () => null,
  disconnect: () => null,
  unobserve: () => null,
})
window.IntersectionObserver = jest
  .fn()
  .mockImplementation(intersectionObserverMock)

// FRAMER MOTION MOCK
jest.mock('framer-motion', () => {
  const AnimatePresence = jest.fn(({ children }) => children)
  const motion = {
    div: jest.fn(({ children, ...props }) => <div {...props}>{children}</div>),
    span: jest.fn(({ children, ...props }) => (
      <span {...props}>{children}</span>
    )),
    svg: jest.fn(({ children, ...props }) => <svg {...props}>{children}</svg>),
    path: jest.fn(({ children, ...props }) => (
      <path {...props}>{children}</path>
    )),
  }
  const useAnimation = jest.fn(() => ({ start: () => null }))
  return {
    AnimatePresence,
    motion,
    useAnimation,
  }
})

test('renders Contact component with hello@joshmu.dev link', () => {
  render(<Contact />)

  const linkDom = screen.getByText(/hello@joshmu.dev/)
  expect(linkDom).toBeInTheDocument()
  expect(linkDom).toHaveAttribute('href', 'mailto:hello@joshmu.dev')
})
