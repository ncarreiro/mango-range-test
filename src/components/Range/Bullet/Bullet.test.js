import { render, screen } from "@testing-library/react";
import { getBulletPosition } from "../utils";
import Bullet from "./Bullet";

test("renders Bullet", () => {
  render(
    <Bullet
      id="range-bullet-min"
      bulletRef={() => {}}
      handleMouseDown={() => {}}
      getBulletPosition={() => getBulletPosition("1", "1", "1")}
    />
  );
  const bulletElement = screen.getByTestId("range-bullet-min");
  expect(bulletElement).toBeInTheDocument();
});
