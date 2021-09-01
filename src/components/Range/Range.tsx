import { useRef } from "react";

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
  onBulletDragEnd: () => void;
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
  onBulletDragEnd,
}: RangeProps) => {
  let draggingBulletType: "min" | "max" | "";

  const container = useRef<HTMLDivElement>(null);
  const start = useRef({ x: 0 });
  const offset = useRef({ x: 0 });

  const bulletRefMin = useRef(null);
  const bulletRefMax = useRef(null);

  const handlePositionChange = ({ pos }: { pos: number }) => {
    const { width } = container?.current?.getBoundingClientRect() as DOMRect;
    let dx = 0;

    if (pos < 0) pos = 0;
    if (pos > width) pos = width;

    dx = (pos / width) * (max - min);

    const x =
      (dx !== 0 ? parseInt((dx / lineSteps).toString(), 10) * lineSteps : 0) +
      min;

    onValueChange({
      type: draggingBulletType,
      value: x,
    });
  };

  const getBulletDragPosition = (event: any) => {
    const clientPos = getClientPosition(event);
    const pos = clientPos.x + start.current.x - offset.current.x;

    return pos;
  };

  const handleBulletDrag = (event: any) => {
    event.preventDefault();
    handlePositionChange({ pos: getBulletDragPosition(event) });
  };

  const handleOnBulletDragEnd = (event: any) => {
    if (disabled) return;

    event.preventDefault();

    document.removeEventListener("mousemove", handleBulletDrag);
    document.removeEventListener("mouseup", handleOnBulletDragEnd);
    document.removeEventListener("touchmove", handleBulletDrag);
    document.removeEventListener("touchend", handleOnBulletDragEnd);
    document.removeEventListener("touchcancel", handleOnBulletDragEnd);

    draggingBulletType = "";

    onBulletDragEnd();
  };

  const handleOnBulletMouseDown = ({
    event,
    type,
  }: {
    event: any;
    type: "min" | "max";
  }) => {
    if (disabled) return;

    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();

    // Setting up Bullet type (min or max)
    draggingBulletType = type;

    // Choosing bullet ref by type
    let bulletRef = type === "min" ? bulletRefMin : bulletRefMax;
    const dom = bulletRef.current as any;
    const clientPos = getClientPosition(event);

    start.current = {
      x: dom.offsetLeft,
    };

    offset.current = {
      x: clientPos.x,
    };

    // Adding Mouse and Touch listeners
    document.addEventListener("mousemove", handleBulletDrag);
    document.addEventListener("mouseup", handleOnBulletDragEnd);
    document.addEventListener("touchmove", handleBulletDrag);
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
        value={min}
        onValueChange={(value) => onValueChange({ type: "min", value })}
        onValueSubmit={(value) => onValueSubmit({ type: "min", value })}
      />
      <div id="range-container" data-testid="range" ref={container}>
        <Line>
          <Bullet
            id="range-bullet-min"
            bulletRef={bulletRefMin}
            handleMouseDown={(event) =>
              handleOnBulletMouseDown({ event, type: "min" })
            }
            getBulletPosition={() => getBulletPosition(minBulletX, max, min)}
          />
          <Bullet
            id="range-bullet-max"
            bulletRef={bulletRefMax}
            handleMouseDown={(event) =>
              handleOnBulletMouseDown({ event, type: "max" })
            }
            getBulletPosition={() => getBulletPosition(maxBulletX, max, min)}
          />
        </Line>
      </div>
      <Value
        id="range-value-max"
        type="max"
        value={max}
        onValueChange={(value) => onValueChange({ type: "max", value })}
        onValueSubmit={(value) => onValueSubmit({ type: "max", value })}
      />
    </div>
  );
};

export default Range;
