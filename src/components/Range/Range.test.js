import { render, screen } from "@testing-library/react";
import Range from "./Range";

test("renders Min and Max Values", () => {
  render(<Range />);
  const minValueElement = screen.getByTestId("range-value-min");
  const maxValueElement = screen.getByTestId("range-value-max");
  expect(minValueElement).toBeInTheDocument();
  expect(maxValueElement).toBeInTheDocument();
});

test("renders Line", () => {
  render(<Range />);
  const lineElement = screen.getByTestId("range-line");
  expect(lineElement).toBeInTheDocument();
});
