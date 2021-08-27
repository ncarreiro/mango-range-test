import { render, screen } from "@testing-library/react";
import Value from "./Value";

test("returns an error when no Type prop is passed", () => {
  render(<Value />);
  const valueElement = screen.getByTestId("range-value-error");
  expect(valueElement).toBeInTheDocument();
  expect(valueElement.textContent).toBe(
    "ERROR: No type prop passed to <Value />."
  );
});

test("when type prop exists, but no initialValue prop is sent, renders Value with default value 1", () => {
  render(<Value type="min" />);
  const textValueElement = screen.getByTestId("range-value-min-text-value");
  expect(textValueElement.textContent).toBe("1");
});

test("renders Value with type min and value 20", () => {
  render(<Value type="min" initialValue="20" />);
  const textValueElement = screen.getByTestId("range-value-min-text-value");
  expect(textValueElement.textContent).toBe("20");
});
