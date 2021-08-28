import { useState } from "react";
import styles from "./Bullet.module.scss";

const config = {
  size: 14,
};

const Bullet = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      data-testid="range-bullet"
      onMouseDown={() => console.log("PRESSED!")}
      onMouseEnter={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      style={{
        width: isHovered ? config.size * 1.2 : config.size,
        height: isHovered ? config.size * 1.2 : config.size,
      }}
      className={styles.rangeBullet}
    />
  );
};

export default Bullet;
