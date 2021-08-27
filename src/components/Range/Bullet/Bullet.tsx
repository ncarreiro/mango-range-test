import styles from "./Bullet.module.scss";

const config = {
  size: 14,
};

const Bullet = () => {
  return (
    <div
      data-testid="range-bullet"
      onMouseDown={() => console.log("PRESSED!")}
      style={{
        width: config.size,
        height: config.size,
      }}
      className={styles.rangeBullet}
    />
  );
};

export default Bullet;
