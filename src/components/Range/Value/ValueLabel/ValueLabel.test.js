import { render, screen } from "@testing-library/react";
import ValueLabel from "./ValueLabel";

test("returns ValueLabel", () => {
  render(<ValueLabel type="min" />);
  const valueElement = screen.getByTestId("range-value-min-label");
  expect(valueElement).toBeInTheDocument();
});
