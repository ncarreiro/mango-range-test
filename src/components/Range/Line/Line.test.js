import { render, screen } from "@testing-library/react";
import Line from "./Line";

test("renders Line", () => {
  render(<Line />);
  const lineElement = screen.getByTestId("range-line");
  expect(lineElement).toBeInTheDocument();
});
