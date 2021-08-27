import styles from "./Line.module.scss";

const Line = () => {
  return (
    <div
      id="range-line"
      data-testid="range-line"
      className={styles.rangeLine}
    />
  );
};

export default Line;
