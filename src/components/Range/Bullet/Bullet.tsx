import { useState } from "react";
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
  bulletRef: any;
  handleMouseDown: (event: any) => void;
  getBulletPosition: () => { x: number };
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const bulletPosition = getBulletPosition();

  return (
    <div
      ref={bulletRef}
      id={id}
      data-testid={id}
      onTouchStart={handleMouseDown}
      onMouseDown={handleMouseDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      onClick={function (event: any) {
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
      }}
      style={{
        left: bulletPosition.x + "%",
        width: isHovered ? config.size * 1.5 : config.size,
        height: isHovered ? config.size * 1.5 : config.size,
      }}
      className={styles.rangeBullet}
    />
  );
};

export default Bullet;
