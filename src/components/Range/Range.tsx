import { useState } from "react";
import Bullet from "./Bullet/Bullet";
import Line from "./Line/Line";
import Value from "./Value/Value";

const Range = () => {
  const [rangeValues, setRangeValues] = useState({ min: "1", max: "100" });

  const handleRangeValueValidation = ({
    type,
    value,
  }: {
    type: string;
    value: string;
  }) => {
    return new Promise((resolve, reject) => {
      switch (type) {
        case "min":
          if (parseInt(value) >= parseInt(rangeValues.max)) {
            const minErrorMessage =
              "This min value is not valid (same or greater than max)";
            alert(minErrorMessage);
            return reject(minErrorMessage);
          }
          break;
        case "max":
          if (parseInt(value) <= parseInt(rangeValues.min)) {
            const maxErrorMessage =
              "This max value is not valid (same or less than min)";
            alert(maxErrorMessage);
            return reject(maxErrorMessage);
          }
          break;
      }

      setRangeValues({ ...rangeValues, [type]: value });
      return resolve(true);
    });
  };

  return (
    <div
      data-testid="range"
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Value
        type="min"
        initialValue={rangeValues.min}
        onValueSubmit={({ value }) =>
          handleRangeValueValidation({ type: "min", value })
        }
      />
      <Bullet />
      <Line />
      <Bullet />
      <Value
        type="max"
        initialValue={rangeValues.max}
        onValueSubmit={({ value }) =>
          handleRangeValueValidation({ type: "max", value })
        }
      />
    </div>
  );
};

export default Range;
