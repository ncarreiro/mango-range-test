import { useEffect, useState } from "react";
import axios from "axios";

import {
  handleOnValueChange,
  handleOnValueSubmit,
} from "../components/Range/utils";

import Range from "../components/Range/Range";
import Debugger from "../components/Range/Debugger/Debugger";

const Exercise1 = () => {
  // Loading & Fetching state
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);

  // Min and Max range values
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);

  // Min and Max Bullets positions
  const [minBulletX, setMinBulletX] = useState(0);
  const [maxBulletX, setMaxBulletX] = useState(0);

  // HTTP Mockup REST GET for Min and Max values
  useEffect(() => {
    if (loading && !fetching) {
      setFetching(true);

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

          setLoading(false);
          setFetching(false);
        });
    }
  }, [loading, fetching, minValue, maxValue, setMinBulletX, setMaxBulletX]);

  return (
    <div>
      {loading ? null : (
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
      )}
      <Debugger
        values={{
          minValue,
          maxValue,
          minBulletX,
          maxBulletX,
        }}
      />
    </div>
  );
};

export default Exercise1;
