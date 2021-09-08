import { render, screen, fireEvent } from "@testing-library/react";
import ValueInput from "./ValueInput";

test("returns ValueInput with type replaced in data-testid", () => {
  render(<ValueInput type="min" />);
  const inputElement = screen.getByTestId("range-value-min-input");
  expect(inputElement).toBeInTheDocument();
});

test("returns ValueInput with initial value 40", () => {
  render(<ValueInput type="min" initialValue={40} />);
  const inputElement = screen.getByTestId("range-value-min-input");
  expect(inputElement.value).toBe("40");
});

test("edits ValueInput number typing 60, with initial value 40", () => {
  render(<ValueInput type="min" initialValue={40} setEdit={() => {}} />);
  const inputElement = screen.getByTestId("range-value-min-input");
  fireEvent.change(inputElement, { target: { value: 60 } });
  expect(inputElement.value).toBe("60");
});
