import { useState } from "react";
import "./App.css";
import Range from "./components/Range/Range";

function App() {
  // Debug window
  const [showDebug, setShowDebug] = useState(false);

  // Min and Max range values
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(10000);

  // Min and Max Bullets positions
  const [minBulletX, setMinBulletX] = useState(minValue);
  const [maxBulletX, setMaxBulletX] = useState(maxValue);

  const handleOnChange = ({ type, value }: { type: string; value: number }) => {
    switch (type) {
      case "min":
        if (value > maxBulletX) return;
        setMinBulletX(Math.trunc(value));
        break;
      case "max":
        if (value < minBulletX) return;
        setMaxBulletX(Math.trunc(value));
        break;
    }
  };

  const handleOnSubmit = ({ type, value }: { type: string; value: number }) => {
    switch (type) {
      case "min":
        if (value >= maxValue) {
          const minErrorMessage = `ERROR: Min value is bigger than current Max (max: ${maxValue}, new value: ${value})`;
          alert(minErrorMessage);
          return false;
        }
        setMinValue(value);
        setMinBulletX(value);
        return true;
      case "max":
        if (value <= minValue) {
          const maxErrorMessage = `ERROR: Max value is smaller than current Min (min: ${minValue}, new value: ${value})`;
          alert(maxErrorMessage);
          return false;
        }
        setMaxValue(value);
        setMaxBulletX(value);
        return true;
    }
  };

  const handleOnDragEnd = () =>
    console.log("handleOnDragEnd: ", minBulletX, maxBulletX);

  return (
    <div className="App">
      <Range
        lineSteps={1000}
        min={minValue}
        max={maxValue}
        minBulletX={minBulletX}
        maxBulletX={maxBulletX}
        onValueChange={handleOnChange}
        onValueSubmit={handleOnSubmit}
        onBulletDragEnd={handleOnDragEnd}
      />
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
}

export default App;
