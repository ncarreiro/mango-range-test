import { useState, FormEvent, KeyboardEvent } from "react";
import styles from "./ValueInput.module.scss";

const ValueInput = ({
  type,
  initialValue,
  onValueSubmit,
  setEdit,
}: {
  type: string;
  initialValue: number;
  onValueSubmit: (value: number) => void;
  setEdit: (state: boolean) => void;
}) => {
  const [inputValue, setInputValue] = useState<number>(0);

  const handleValueOnKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setInputValue(initialValue);
      setEdit(false);
    }
  };

  const handleOnBlur = () => {
    setInputValue(initialValue);
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
    <form onSubmit={handleOnSubmit}>
      <input
        data-testid={`range-value-${type}-input`}
        autoFocus
        defaultValue={initialValue}
        type="number"
        onChange={(event) => handleOnValueChange(parseInt(event.target.value))}
        onKeyDown={handleValueOnKeyDown}
        onBlur={handleOnBlur}
        className={styles.rangeValueInput}
      />{" "}
      €
    </form>
  );
};

export default ValueInput;
