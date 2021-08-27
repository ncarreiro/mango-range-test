import { useEffect, useState } from "react";
import styles from "./Value.module.scss";
import ValueInput from "./ValueInput/ValueInput";

const Value = ({
  type,
  initialValue,
  onValueSubmit,
}: {
  type: string;
  initialValue: string;
  onValueSubmit: ({ value }: { value: string }) => Promise<any>;
}) => {
  const [value, setValue] = useState("1");
  const [oldValue, setOldValue] = useState("");

  const [edit, setEdit] = useState(false);

  useEffect(() => {
    initialValue && setValue(initialValue);
  }, [initialValue]);

  if (type) {
    return (
      <div
        id={`range-value-${type}`}
        data-testid={`range-value-${type}`}
        className={styles.rangeValueContainer}
      >
        {edit ? (
          <ValueInput
            initialValue={initialValue}
            oldValue={oldValue}
            setOldValue={setOldValue}
            setEdit={setEdit}
            onValueSubmit={({ value }) => onValueSubmit({ value })}
          />
        ) : (
          <div
            id={`range-value-${type}-text`}
            data-testid={`range-value-${type}-text`}
            onClick={() => {
              setOldValue(value);
              setEdit(true);
            }}
          >
            <span
              id={`range-value-${type}-text-value`}
              data-testid={`range-value-${type}-text-value`}
            >
              {value}
            </span>{" "}
            €
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div data-testid="range-value-error">{`ERROR: No type prop passed to <Value />.`}</div>
    );
  }
};

export default Value;
