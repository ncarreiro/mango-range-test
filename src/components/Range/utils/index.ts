import { MouseEvent, TouchEvent } from "react";

export interface RangeHandlersProps {
  type: string;
  value: number;
  maxBulletX: number;
  minBulletX: number;
  setMinBulletX: (value: number) => void;
  setMaxBulletX: (value: number) => void;
}

export const handleOnValueChange = ({
  type,
  value,
  maxBulletX,
  minBulletX,
  setMinBulletX,
  setMaxBulletX,
}: RangeHandlersProps) => {
  switch (type) {
    case "min":
      if (value < maxBulletX) {
        setMinBulletX(Math.trunc(value));
      }
      break;
    case "max":
      if (value > minBulletX) {
        setMaxBulletX(Math.trunc(value));
      }
      break;
  }
};

export const handleOnValueSubmit = ({
  type,
  value,
  maxBulletX,
  minBulletX,
  setMinBulletX,
  setMaxBulletX,
}: RangeHandlersProps) => {
  switch (type) {
    case "min":
      if (value >= maxBulletX) {
        const minErrorMessage = `ERROR: New Min value is bigger than current Max value (max: ${maxBulletX}, new value: ${value})`;
        alert(minErrorMessage);
        return false;
      }
      setMinBulletX(value);
      return true;
    case "max":
      if (value <= minBulletX) {
        const maxErrorMessage = `ERROR: New Max value is smaller than current Min value (min: ${minBulletX}, new value: ${value})`;
        alert(maxErrorMessage);
        return false;
      }
      setMaxBulletX(value);
      return true;
  }
};

// Get element positions
export const getClientPosition = (
  event: MouseEvent<HTMLDivElement> & TouchEvent<HTMLDivElement>
) => {
  const touches = event.touches;

  if (touches && touches.length) {
    const finger = touches[0];
    return {
      x: finger.clientX,
    };
  }

  return {
    x: event.clientX,
  };
};

export const getBulletPosition = (
  bulletX: number,
  max: number,
  min: number
) => {
  let x = Math.trunc(((bulletX - min) / (max - min)) * 100);

  return { x };
};
