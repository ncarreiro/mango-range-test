import { useState } from "react";

const Debugger = ({
  values: { minValue, maxValue, minBulletX, maxBulletX },
}: {
  values: {
    minValue: number;
    maxValue: number;
    minBulletX: number;
    maxBulletX: number;
  };
}) => {
  // Debug window
  const [showDebug, setShowDebug] = useState(false);

  return (
    <div>
      <button onClick={() => setShowDebug(!showDebug)}>SHOW DEBUG</button>
      {showDebug && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            padding: 12,
            fontWeight: 700,
          }}
        >
          <h3>DEBUG VALUES:</h3>
          <table>
            <thead>
              <tr>
                <th>Min</th>
                <th>Max</th>
                <th>minBulletX</th>
                <th>maxBulletX</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{minValue}</td>
                <td>{maxValue}</td>
                <td>{minBulletX}</td>
                <td>{maxBulletX}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Debugger;
