import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";

import {
  handleOnValueChange,
  handleOnValueSubmit,
} from "../components/Range/utils";

import Range from "../components/Range/Range";
import Debugger from "../components/Range/Debugger/Debugger";

const Exercise2 = () => {
  // Loading & Fetching state
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);

  // Min and Max range values
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);
  const [rangeValues, setRangeValues] = useState([]);

  // Min and Max Bullets positions
  const [minBulletX, setMinBulletX] = useState(0);
  const [maxBulletX, setMaxBulletX] = useState(0);

  // HTTP Mockup REST GET for Min and Max values
  useEffect(() => {
    if (loading && !fetching) {
      setFetching(true);

      axios
        .all([
          axios.get("https://demo0572524.mockable.io/mango/exercises/1/values"),
          axios.get("https://demo0572524.mockable.io/mango/exercises/2/values"),
        ])
        .then(
          axios.spread(
            (valuesResponse: AxiosResponse, rangeResponse: AxiosResponse) => {
              const {
                data: { min, max },
              } = valuesResponse;
              const {
                data: { range },
              } = rangeResponse;

              if (minValue !== min) {
                setMinValue(min);
                setMinBulletX(min);
              }

              if (maxValue !== max) {
                setMaxValue(max);
                setMaxBulletX(max);
              }

              if (rangeValues !== range) {
                setRangeValues(range);
              }

              setLoading(false);
              setFetching(false);
            }
          )
        );
    }
  }, [
    loading,
    fetching,
    minValue,
    maxValue,
    setMinBulletX,
    setMaxBulletX,
    rangeValues,
  ]);

  return (
    <div>
      {loading ? null : (
        <Range
          lineSteps={1000}
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
          rangeValues,
        }}
      />
    </div>
  );
};

export default Exercise2;
