import { useEffect, useState } from "react";
import axios from "axios";

import Range from "../components/Range/Range";
import {
  handleOnValueChange,
  handleOnValueSubmit,
} from "../components/Range/utils";

const Exercise1 = () => {
  // Debug window
  const [showDebug, setShowDebug] = useState(false);

  // Min and Max range values
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);

  // Min and Max Bullets positions
  const [minBulletX, setMinBulletX] = useState(0);
  const [maxBulletX, setMaxBulletX] = useState(0);

  // HTTP Mockup REST GET for Min and Max values (First Exercise)
  useEffect(() => {
    axios
      .get("https://demo0572524.mockable.io/mango/exercises/1/values")
      .then(({ data }) => {
        if (minValue !== data.min) {
          setMinValue(data.min);
          setMinBulletX(data.min);
        }
        if (maxValue !== data.max) {
          setMaxValue(data.max);
          setMaxBulletX(data.max);
        }
      });
  }, [minValue, maxValue, setMinBulletX, setMaxBulletX]);

  return (
    <div>
      {minValue && maxValue ? (
        <Range
          min={minValue}
          max={maxValue}
          minBulletX={minBulletX}
          maxBulletX={maxBulletX}
          onValueChange={({ type, value }) =>
            handleOnValueChange({
              type,
              value,
              maxBulletX,
              minBulletX,
              setMinBulletX,
              setMaxBulletX,
            })
          }
          onValueSubmit={({ type, value }) =>
            handleOnValueSubmit({
              type,
              value,
              maxBulletX,
              minBulletX,
              setMinBulletX,
              setMaxBulletX,
            })
          }
        />
      ) : null}
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

export default Exercise1;
