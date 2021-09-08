import { useState } from "react";
import ValueInput from "./ValueInput/ValueInput";
import ValueLabel from "./ValueLabel/ValueLabel";
import valueStyles from "./Value.module.scss";

const Value = ({
  id,
  type,
  value,
  editable,
  onValueSubmit,
}: {
  id: string;
  type: string;
  value: number;
  editable: boolean;
  onValueSubmit: (value: number) => void;
}) => {
  const [edit, setEdit] = useState(false);

  const handleLabelClick = () => {
    editable && setEdit(true);
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
          initialValue={value}
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
