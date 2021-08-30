import { render, screen } from "@testing-library/react";
import ValueInput from "./ValueInput";

test("returns ValueInput with type replaced in data-testid", () => {
  render(<ValueInput type="min" />);
  const valueElement = screen.getByTestId("range-value-min-input");
  expect(valueElement).toBeInTheDocument();
});
