import { MouseEvent, TouchEvent, useRef } from "react";

import { getBulletPosition, getClientPosition } from "./utils";

import Bullet from "./Bullet/Bullet";
import Line from "./Line/Line";
import Value from "./Value/Value";

interface RangeProps {
  disabled?: boolean;
  lineSteps: number;
  min: number;
  max: number;
  minBulletX: number;
  maxBulletX: number;
  onValueChange: ({ type, value }: { type: string; value: number }) => void;
  onValueSubmit: ({ type, value }: { type: string; value: number }) => void;
}

const Range = ({
  disabled = false,
  lineSteps,
  min,
  max,
  minBulletX,
  maxBulletX,
  onValueChange,
  onValueSubmit,
}: RangeProps) => {
  let draggingBulletType: "min" | "max" | "";

  const container = useRef<HTMLDivElement>(null);
  const start = useRef({ x: 0 });
  const offset = useRef({ x: 0 });

  const bulletRefMin = useRef(null);
  const bulletRefMax = useRef(null);

  const handleBulletPositionChange = ({ bulletX }: { bulletX: number }) => {
    const { width } = container?.current?.getBoundingClientRect() as DOMRect;
    let dx = 0;

    if (bulletX < 0) bulletX = 0;
    if (bulletX > width) bulletX = width;

    dx = (bulletX / width) * (max - min);

    const xValue =
      (dx !== 0 ? parseInt((dx / lineSteps).toString(), 10) * lineSteps : 0) +
      min;

    onValueChange({
      type: draggingBulletType,
      value: xValue,
    });
  };

  const getBulletDragPosition = (event: MouseEvent | TouchEvent) => {
    const clientPos = getClientPosition(
      event as MouseEvent<HTMLDivElement> & TouchEvent<HTMLDivElement>
    );
    const bulletPosition = clientPos.x + start.current.x - offset.current.x;

    return bulletPosition;
  };

  const handleBulletDrag = (event: MouseEvent | TouchEvent) => {
    event.preventDefault();
    handleBulletPositionChange({ bulletX: getBulletDragPosition(event) });
  };

  const handleOnBulletDragEnd = (event: Event | (MouseEvent & TouchEvent)) => {
    if (disabled) return;

    event.preventDefault();

    document.removeEventListener("mousemove", handleBulletDrag as any);
    document.removeEventListener("mouseup", handleOnBulletDragEnd);
    document.removeEventListener("touchmove", handleBulletDrag as any);
    document.removeEventListener("touchend", handleOnBulletDragEnd);
    document.removeEventListener("touchcancel", handleOnBulletDragEnd);

    draggingBulletType = "";
  };

  const handleOnBulletMouseDown = ({
    event,
    type,
  }: {
    event: MouseEvent | TouchEvent;
    type: "min" | "max";
  }) => {
    if (disabled) return;

    event.preventDefault();
    event.stopPropagation();

    // Setting up Bullet type (min or max)
    draggingBulletType = type;

    // Choosing bullet ref by type
    let bulletRef = type === "min" ? bulletRefMin : bulletRefMax;
    const dom = bulletRef.current as any;
    const clientPos = getClientPosition(
      event as MouseEvent<HTMLDivElement> & TouchEvent<HTMLDivElement>
    );

    start.current = {
      x: dom.offsetLeft,
    };

    offset.current = {
      x: clientPos.x,
    };

    // Adding Mouse and Touch listeners
    document.addEventListener("mousemove", handleBulletDrag as any);
    document.addEventListener("mouseup", handleOnBulletDragEnd);
    document.addEventListener("touchmove", handleBulletDrag as any);
    document.addEventListener("touchend", handleOnBulletDragEnd);
    document.addEventListener("touchcancel", handleOnBulletDragEnd);
  };

  return (
    <div
      id="range-container"
      data-testid="range-container"
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Value
        id="range-value-min"
        type="min"
        value={minBulletX}
        onValueChange={(value) => onValueChange({ type: "min", value })}
        onValueSubmit={(value) => onValueSubmit({ type: "min", value })}
      />
      <div id="range-container" data-testid="range" ref={container}>
        <Line>
          <Bullet
            id="range-bullet-min"
            bulletRef={bulletRefMin}
            handleMouseDown={(event: MouseEvent | TouchEvent) =>
              handleOnBulletMouseDown({ event, type: "min" })
            }
            getBulletPosition={() => getBulletPosition(minBulletX, max, min)}
          />
          <Bullet
            id="range-bullet-max"
            bulletRef={bulletRefMax}
            handleMouseDown={(event: MouseEvent | TouchEvent) =>
              handleOnBulletMouseDown({ event, type: "max" })
            }
            getBulletPosition={() => getBulletPosition(maxBulletX, max, min)}
          />
        </Line>
      </div>
      <Value
        id="range-value-max"
        type="max"
        value={maxBulletX}
        onValueChange={(value) => onValueChange({ type: "max", value })}
        onValueSubmit={(value) => onValueSubmit({ type: "max", value })}
      />
    </div>
  );
};

export default Range;
