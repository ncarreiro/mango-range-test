import { useState, FormEvent, KeyboardEvent } from "react";
import styles from "./ValueInput.module.scss";

const ValueInput = ({
  type,
  initiaValue,
  onValueSubmit,
  setEdit,
}: {
  type: string;
  initiaValue: number;
  onValueSubmit: (value: number) => void;
  setEdit: (state: boolean) => void;
}) => {
  const [inputValue, setInputValue] = useState<number>(0);

  const handleValueOnKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setInputValue(initiaValue);
      setEdit(false);
    }
  };

  const handleOnBlur = () => {
    setInputValue(initiaValue);
    setEdit(false);
  };

  const handleOnValueChange = (value: number) => {
    setInputValue(value);
  };

  const handleOnSubmit = (event: FormEvent) => {
    event.preventDefault();
    onValueSubmit(inputValue);
  };

  return (
    <div data-testid={`range-value-${type}-input`}>
      <form onSubmit={handleOnSubmit}>
        <input
          autoFocus
          defaultValue={initiaValue}
          type="number"
          onChange={(event) =>
            handleOnValueChange(parseInt(event.target.value))
          }
          onKeyDown={handleValueOnKeyDown}
          onBlur={handleOnBlur}
          className={styles.rangeValueInput}
        />{" "}
        €
      </form>
    </div>
  );
};

export default ValueInput;
