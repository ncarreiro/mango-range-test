import { useState } from "react";
import styles from "./Debugger.module.scss";

const Debugger = ({
  values: { minValue, maxValue, minBulletX, maxBulletX, rangeValues },
}: {
  values: {
    minValue: number;
    maxValue: number;
    minBulletX: number;
    maxBulletX: number;
    rangeValues?: number[];
  };
}) => {
  const [showDebug, setShowDebug] = useState(false);

  return (
    <div>
      <button onClick={() => setShowDebug(!showDebug)}>SHOW DEBUG</button>
      {showDebug && (
        <div className={styles.debugger}>
          <h3>DEBUG VALUES:</h3>
          <table>
            <thead>
              <tr>
                <th>Min</th>
                <th>Max</th>
                <th>minBulletX</th>
                <th>maxBulletX</th>
                <th>Range</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{minValue}</td>
                <td>{maxValue}</td>
                <td>{minBulletX}</td>
                <td>{maxBulletX}</td>
                <td>{JSON.stringify(rangeValues)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Debugger;
