import { render, screen } from "@testing-library/react";
import MangoRangeApp from "./App";

test("renders Range component", () => {
  render(<MangoRangeApp />);
  const rangeElement = screen.getByTestId("mango-range-app");
  expect(rangeElement).toBeInTheDocument();
});
