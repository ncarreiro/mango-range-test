import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

import Range from "./components/Range/Range";

import "./App.css";

function App() {
  // Debug window
  const [showDebug, setShowDebug] = useState(false);

  // Min and Max range values
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);
  const [range, setRange] = useState([]);

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

  // HTTP Mockup REST GET for Range of values (Second Exercise)
  useEffect(() => {
    axios
      .get("https://demo0572524.mockable.io/mango/exercises/2/values")
      .then(({ data }) => {
        if (range !== data.range) {
          setRange(data.range);
        }
      });
  });

  const handleOnValueChange = ({
    type,
    value,
  }: {
    type: string;
    value: number;
  }) => {
    switch (type) {
      case "min":
        if (value < maxBulletX) {
          setMinBulletX(Math.trunc(value));
        }
        break;
      case "max":
        if (value > minBulletX) {
          setMaxBulletX(Math.trunc(value));
        }
        break;
    }
  };

  const handleOnValueSubmit = ({
    type,
    value,
  }: {
    type: string;
    value: number;
  }) => {
    switch (type) {
      case "min":
        if (value >= maxBulletX) {
          const minErrorMessage = `ERROR: New Min value is bigger than current Max value (max: ${maxBulletX}, new value: ${value})`;
          alert(minErrorMessage);
          return false;
        }
        setMinBulletX(value);
        return true;
      case "max":
        if (value <= minBulletX) {
          const maxErrorMessage = `ERROR: New Max value is smaller than current Min value (min: ${minBulletX}, new value: ${value})`;
          alert(maxErrorMessage);
          return false;
        }
        setMaxBulletX(value);
        return true;
    }
  };

  return (
    <div
      id="mango-range-app"
      data-testid="mango-range-app"
      className="mango-range-app"
    >
      {minValue && maxValue ? (
        <Router>
          <Switch>
            <Route exact path={["/", "/exercise1"]}>
              <Range
                min={minValue}
                max={maxValue}
                minBulletX={minBulletX}
                maxBulletX={maxBulletX}
                onValueChange={handleOnValueChange}
                onValueSubmit={handleOnValueSubmit}
              />
              <button onClick={() => setShowDebug(!showDebug)}>
                SHOW DEBUG
              </button>
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
            </Route>
            <Route exact path="/exercise2">
              <Range
                lineSteps={1000}
                min={minValue}
                max={maxValue}
                minBulletX={minBulletX}
                maxBulletX={maxBulletX}
                onValueChange={handleOnValueChange}
                onValueSubmit={handleOnValueSubmit}
              />
              <button onClick={() => setShowDebug(!showDebug)}>
                SHOW DEBUG
              </button>
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
            </Route>
          </Switch>
        </Router>
      ) : null}
    </div>
  );
}

export default App;
