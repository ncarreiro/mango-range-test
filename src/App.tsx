import { useState } from "react";
import "./App.css";
import Range from "./components/Range/Range";

function App() {
  // Min and Max range values
  const [minValue, setMinValue] = useState(1);
  const [maxValue, setMaxValue] = useState(10000);

  // Previous Min and Max range values
  const [prevMinValue, setPrevMinValue] = useState(minValue);
  const [prevMaxValue, setPrevMaxValue] = useState(maxValue);

  // Min and Max Bullets positions
  const [minBulletX] = useState(minValue);
  const [maxBulletX] = useState(maxValue);

  const handleOnChange = ({ type, value }: { type: string; value: number }) => {
    switch (type) {
      case "min":
        setMinValue(parseInt(value.toFixed(0)));
        break;
      case "max":
        setMaxValue(parseInt(value.toFixed(0)));
        break;
    }
  };

  const handleOnSubmit = ({ type, value }: { type: string; value: number }) => {
    switch (type) {
      case "min":
        if (value >= maxValue) {
          const minErrorMessage =
            "This min value is not valid (same or greater than max)";
          alert(minErrorMessage);
          setMinValue(prevMinValue);
          return false;
        }
        setMinValue(value);
        setPrevMinValue(value);
        return true;
      case "max":
        if (value <= minValue) {
          const maxErrorMessage =
            "This max value is not valid (same or less than min)";
          alert(maxErrorMessage);
          setMaxValue(prevMaxValue);
          return false;
        }
        setMaxValue(value);
        setPrevMaxValue(value);
        return true;
    }
  };

  const handleOnDragEnd = () => {
    console.log("handleOnDragEnd:", minBulletX, maxBulletX);
  };

  return (
    <div className="App">
      <Range
        min={minValue}
        max={maxValue}
        minBulletX={minBulletX}
        maxBulletX={maxBulletX}
        setMinValue={setMinValue}
        setMaxValue={setMaxValue}
        onValueChange={handleOnChange}
        onValueSubmit={handleOnSubmit}
        onBulletDragEnd={handleOnDragEnd}
      />
    </div>
  );
}

export default App;
