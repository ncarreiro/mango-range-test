import styles from "./Line.module.scss";

const Line = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  return (
    <div id="range-line" data-testid="range-line" className={styles.rangeLine}>
      {children}
    </div>
  );
};

export default Line;
