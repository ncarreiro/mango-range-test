const ValueLabel = ({ type, value, currency, handleLabelClick }: any) => {
  return (
    <div
      id={`range-value-${type}-label`}
      data-testid={`range-value-${type}-label`}
      onClick={() => handleLabelClick()}
    >
      <span
        id={`range-value-${type}-label-value`}
        data-testid={`range-value-${type}-label-value`}
      >
        {value}
      </span>{" "}
      {currency}
    </div>
  );
};

export default ValueLabel;
