import { render, screen } from "@testing-library/react";
import Range from "./Range";

test("renders Min and Max Values, Line and Bullets correctly", () => {
  render(<Range min={0} max={100} />);
  const minValueElement = screen.getByTestId("range-value-min");
  const maxValueElement = screen.getByTestId("range-value-max");
  const lineElement = screen.getByTestId("range-line");
  const bulletMin = screen.getByTestId("range-bullet-min");
  const bulletMax = screen.getByTestId("range-bullet-max");
  expect(minValueElement).toBeInTheDocument();
  expect(maxValueElement).toBeInTheDocument();
  expect(lineElement).toBeInTheDocument();
  expect(bulletMin).toBeInTheDocument();
  expect(bulletMax).toBeInTheDocument();
});
