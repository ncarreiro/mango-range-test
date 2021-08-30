import { useState } from "react";
import ValueInput from "./ValueInput/ValueInput";
import ValueLabel from "./ValueLabel/ValueLabel";
import valueStyles from "./Value.module.scss";

const Value = ({
  id,
  type,
  initialValue,
  value,
  onValueChange,
  onValueSubmit,
}: {
  id: string;
  type: string;
  initialValue: number;
  value: number;
  onValueChange: (value: number) => any;
  onValueSubmit: (value: number) => any;
}) => {
  const [oldValue, setOldValue] = useState<number>(0);

  const [edit, setEdit] = useState(false);

  const handleLabelClick = () => {
    setOldValue(value);
    setEdit(true);
  };

  const handleValueInputOnSubmit = (value: number) => {
    setEdit(false);
    onValueSubmit(value);
  };

  return (
    <div id={id} data-testid={id} className={valueStyles.rangeValueContainer}>
      {edit ? (
        <ValueInput
          type={type}
          initiaValue={oldValue}
          setOldValue={setOldValue}
          setEdit={setEdit}
          onValueSubmit={(value: number) => handleValueInputOnSubmit(value)}
          onValueChange={(value: number) => onValueChange(value)}
        />
      ) : (
        <ValueLabel
          type={type}
          value={value || initialValue}
          currency="€"
          handleLabelClick={() => handleLabelClick()}
        />
      )}
    </div>
  );
};

export default Value;
