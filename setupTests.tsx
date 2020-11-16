export const setup = () => {
  console.log(`============ testSetupFile Loaded ===========`)

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
      div: jest.fn(({ children, ...props }) => (
        <div {...props}>{children}</div>
      )),
      span: jest.fn(({ children, ...props }) => (
        <span {...props}>{children}</span>
      )),
      svg: jest.fn(({ children, ...props }) => (
        <svg {...props}>{children}</svg>
      )),
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
}

setup()
