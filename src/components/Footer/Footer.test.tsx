// src/components/Footer/Footer.test.js

// setupTests.tsx

// import react-testing methods
import { render, screen } from "@testing-library/react";

// the component to test
import { Footer } from "./Footer";

test("renders Footer component with current year", () => {
  render(<Footer />);
  const currentYear = new Date().getFullYear().toString();
  expect(screen.getByText(new RegExp(currentYear))).toBeInTheDocument();
  // const linkDom = screen.getByText(/hello@joshmu.dev/)
  // expect(linkDom).toHaveAttribute('href', 'mailto:hello@joshmu.dev')
});

test("Footer contains button", () => {
  render(<Footer />);
  expect(screen.getByRole("button")).toBeDefined();
});
