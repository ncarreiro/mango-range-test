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
  min: number,
  maxBulletPosition: number,
  minBulletPosition: number
) => {
  let x = ((bulletX - min) / (max - min)) * 100;

  if (bulletX > maxBulletPosition)
    x = ((maxBulletPosition - min) / (max - min)) * 100;
  if (bulletX < minBulletPosition)
    x = ((minBulletPosition - min) / (max - min)) * 100;
  if (x > max) x = 100;
  if (x < min) x = 0;

  return { x };
};
