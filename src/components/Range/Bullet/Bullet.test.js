import { render, screen } from "@testing-library/react";
import Bullet from "./Bullet";

test("renders Bullet", () => {
  render(<Bullet />);
  const bulletElement = screen.getByTestId("range-bullet");
  expect(bulletElement).toBeInTheDocument();
});
