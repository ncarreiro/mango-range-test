import { render, screen, fireEvent } from "@testing-library/react";
import Value from "./Value";

test("when type prop exists, but no initialValue prop is sent, renders Value with an empty value", () => {
  render(<Value id="range-value-min" type="min" />);
  const labelElement = screen.getByTestId("range-value-min-label");
  expect(labelElement.textContent).toBe("");
});

test("renders Value with type min and value 20", () => {
  render(<Value id="range-value-min" type="min" value="20" />);
  const labelElement = screen.getByTestId("range-value-min-label");
  expect(labelElement.textContent).toBe("20");
});

test("renders ValueInput when editable prop is true and ValueLabel is clicked", () => {
  render(<Value id="range-value-min" type="min" value="20" editable={true} />);
  const labelElement = screen.getByTestId("range-value-min-label");
  labelElement.click();
  const inputElement = screen.getByTestId("range-value-min-input");
  expect(inputElement).toBeInTheDocument();
});

test("edits ValueInput value when typing", () => {
  render(
    <Value
      id="range-value-min"
      type="min"
      value="20"
      editable={true}
      onValueSubmit={(value) => console.log(value)}
    />
  );
  const labelElement = screen.getByTestId("range-value-min-label");
  labelElement.click();

  const inputElement = screen.getByTestId("range-value-min-input");
  inputElement.click();

  fireEvent.change(inputElement, { target: { value: 40 } });
  expect(inputElement.value).toBe("40");
});
