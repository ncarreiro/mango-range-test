import { useEffect, useState } from "react";
import styles from "./ValueInput.module.scss";

const ValueInput = ({
  initialValue,
  oldValue,
  setOldValue,
  onValueSubmit,
  setEdit,
}: {
  initialValue: string;
  oldValue: string;
  setOldValue: (value: string) => void;
  onValueSubmit: ({ value }: { value: string }) => Promise<any>;
  setEdit: (value: boolean) => void;
}) => {
  const [value, setValue] = useState("1");

  useEffect(() => {
    initialValue && setValue(initialValue);
  }, [initialValue]);

  const handleValueEdit = (newValue: string) => {
    setValue(newValue);
  };

  const handleValueOnKeyDown = (key: string) => {
    if (key === "Escape") {
      setValue(oldValue);
      setOldValue("");
      setEdit(false);
    }
  };

  const handleValueSubmit = (event: any) => {
    event.preventDefault();
    onValueSubmit({ value }).then((validation) => {
      if (validation === true) {
        setOldValue("");
        setEdit(false);
      }
    });
  };

  return (
    <div data-testid="range-value-input">
      <form onSubmit={(event) => handleValueSubmit(event)}>
        <input
          autoFocus
          type="number"
          value={value}
          onChange={(event) => handleValueEdit(event?.target.value)}
          onKeyDown={(event) => handleValueOnKeyDown(event.key)}
          onBlur={() => {
            setValue(oldValue);
            setOldValue("");
            setEdit(false);
          }}
          className={styles.rangeValueInput}
        />{" "}
        €
      </form>
    </div>
  );
};

export default ValueInput;
