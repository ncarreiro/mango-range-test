import { MouseEvent, RefObject, TouchEvent, useEffect, useState } from "react";
import styles from "./Bullet.module.scss";

const config = {
  size: 14,
};

const Bullet = ({
  id,
  bulletRef,
  handleMouseDown,
  getBulletPosition,
}: {
  id: string;
  bulletRef: RefObject<HTMLDivElement>;
  handleMouseDown: (event: MouseEvent | TouchEvent) => void;
  getBulletPosition: () => { x: number };
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [bulletPosition, setBulletPosition] = useState(0);

  useEffect(() => {
    setBulletPosition(getBulletPosition().x);
  }, [getBulletPosition]);

  const handleBulletSize = () => {
    return isHovered ? config.size * 1.5 : config.size;
  };

  return (
    <div
      ref={bulletRef}
      id={id}
      data-testid={id}
      onTouchStart={handleMouseDown}
      onMouseDown={handleMouseDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      onClick={function (event: MouseEvent & TouchEvent<HTMLDivElement>) {
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
      }}
      style={{
        left: bulletPosition + "%",
        width: handleBulletSize(),
        height: handleBulletSize(),
      }}
      className={styles.rangeBullet}
    />
  );
};

export default Bullet;
