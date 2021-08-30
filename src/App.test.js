import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Range component", () => {
  render(<App />);
  const rangeElement = screen.getByTestId("range-container");
  expect(rangeElement).toBeInTheDocument();
});
