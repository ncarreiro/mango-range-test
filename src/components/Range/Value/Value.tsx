import { useState } from "react";
import ValueInput from "./ValueInput/ValueInput";
import ValueLabel from "./ValueLabel/ValueLabel";
import valueStyles from "./Value.module.scss";

const Value = ({
  id,
  type,
  value,
  onValueSubmit,
}: {
  id: string;
  type: string;
  value: number;
  onValueChange: (value: number) => any;
  onValueSubmit: (value: number) => any;
}) => {
  const [edit, setEdit] = useState(false);

  const handleLabelClick = () => {
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
          initiaValue={value}
          setEdit={setEdit}
          onValueSubmit={(value: number) => handleValueInputOnSubmit(value)}
        />
      ) : (
        <ValueLabel
          type={type}
          value={value}
          currency="€"
          handleLabelClick={() => handleLabelClick()}
        />
      )}
    </div>
  );
};

export default Value;
