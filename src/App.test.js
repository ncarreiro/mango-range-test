import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Range component", () => {
  render(<App />);
  const rangeElement = screen.getByTestId("mango-range-app");
  expect(rangeElement).toBeInTheDocument();
});
