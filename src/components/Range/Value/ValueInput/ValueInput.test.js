import { render, screen } from "@testing-library/react";
import ValueInput from "./ValueInput";

test("returns ValueInput", () => {
  render(<ValueInput />);
  const valueElement = screen.getByTestId("range-value-input");
  expect(valueElement).toBeInTheDocument();
});
