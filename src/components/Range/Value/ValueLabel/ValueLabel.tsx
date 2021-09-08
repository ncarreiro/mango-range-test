interface ValueLabelProps {
  type: string;
  value: number;
  currency: string;
  handleLabelClick: () => void;
}

const ValueLabel = ({
  type,
  value,
  currency,
  handleLabelClick,
}: ValueLabelProps) => {
  return (
    <div id={`range-value-${type}-label`} onClick={() => handleLabelClick()}>
      <span
        id={`range-value-${type}-label-value`}
        data-testid={`range-value-${type}-label`}
      >
        {value}
      </span>{" "}
      {currency}
    </div>
  );
};

export default ValueLabel;
