import classNames from "classnames";
import Plus from "assets/plus.svg";
import Minus from "assets/minus.svg";
import { useTranslation } from "next-i18next";
import { useRef } from "react";

const NumberInput = ({
  name,
  value,
  onChange,
  className,
  minValue = 0,
  maxValue = Infinity,
  ...props
}) => {
  const { t } = useTranslation("common");
  let ref = useRef();

  const _onChange = (add) => {
    const currentValue = +ref.current.value;

    const event = { target: { name, value: currentValue + +add } };
    if (onChange) {
      onChange(event);
    }
  };

  if (!value) {
    value = minValue;
  }

  return (
    <div
      className={classNames(
        "number-input items-center justify-between px-4 py-2",
        className,
      )}
      {...props}
    >
      <button
        className="w-6 h-6 flex items-center justify-center"
        disabled={value <= minValue || props.disabled}
        aria-label={t("general.$decrease")}
        onClick={(e) => {
          e.preventDefault();
          _onChange(-1);
        }}
      >
        <Minus
          className={classNames(
            "fill-current w-5 h-5",
            value <= minValue && "fill-grey3",
          )}
        />
      </button>
      <input
        type="number"
        name={name}
        ref={ref}
        min={minValue}
        value={value}
        autoComplete="off"
        disabled={props.disabled}
        className={classNames("mx-6", value > minValue && "is-value")}
        onChange={(e) => {
          e.preventDefault();
          e.target.value = +e.target.value;
          onChange(e);
        }}
      />

      {/* <div className={classNames('mx-6', value > minValue && 'is-value')}>
        {value || value === 0 ? value : ''} {label}
      </div> */}
      <button
        className="w-6 h-6 flex items-center justify-center"
        disabled={value >= maxValue || props.disabled}
        aria-label={t("general.$increase")}
        onClick={(e) => {
          e.preventDefault();
          _onChange(1);
        }}
      >
        <Plus
          className={classNames(
            "fill-current w-5 h-5",
            value >= maxValue && "fill-grey3",
          )}
        />
      </button>
    </div>
  );
};

export default NumberInput;
