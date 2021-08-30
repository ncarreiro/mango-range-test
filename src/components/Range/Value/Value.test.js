import { render, screen } from "@testing-library/react";
import Value from "./Value";

test("when type prop exists, but no initialValue prop is sent, renders Value with an empty value", () => {
  render(
    <Value id="range-value-min" type="min" onValueSubmit={({ value }) => {}} />
  );
  const labelElement = screen.getByTestId("range-value-min-label-value");
  expect(labelElement.textContent).toBe("");
});

test("renders Value with type min and value 20", () => {
  render(<Value id="range-value-min" type="min" initialValue="20" />);
  const labelElement = screen.getByTestId("range-value-min-label-value");
  expect(labelElement.textContent).toBe("20");
});
