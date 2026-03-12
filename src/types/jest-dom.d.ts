import '@testing-library/jest-dom'

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R
      toHaveAttribute(attr: string, value?: string): R
      toHaveTextContent(text: string | RegExp): R
      toBeVisible(): R
      toBeDisabled(): R
      toBeEnabled(): R
      toHaveClass(...classNames: string[]): R
      toHaveStyle(css: string | Record<string, unknown>): R
      toHaveFocus(): R
      toContainElement(element: HTMLElement | null): R
      toContainHTML(htmlText: string): R
      toHaveValue(value?: string | string[] | number | null): R
      toBeChecked(): R
      toBeEmpty(): R
      toBeEmptyDOMElement(): R
      toBeRequired(): R
      toBeValid(): R
      toBeInvalid(): R
      toHaveDescription(text?: string | RegExp): R
      toHaveDisplayValue(value: string | RegExp | Array<string | RegExp>): R
      toHaveErrorMessage(text?: string | RegExp): R
      toHaveFormValues(expectedValues: Record<string, unknown>): R
      toHaveAccessibleDescription(text?: string | RegExp): R
      toHaveAccessibleName(text?: string | RegExp): R
      toHaveRole(role: string): R
    }
  }
}
