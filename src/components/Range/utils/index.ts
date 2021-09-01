export const getClientPosition = (event: MouseEvent & TouchEvent) => {
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
