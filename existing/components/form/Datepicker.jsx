import classNames from "classnames";
import { default as RDatepicker, registerLocale } from "react-datepicker";
import { default as enGB } from "date-fns/locale/en-GB";
registerLocale("en-GB", enGB);

const Datepicker = ({
  name,
  value,
  onChange,
  className,
  placeholder,
  minDate,
  ...props
}) => {
  value = value ? new Date(value) : new Date();

  const _onChange = (value) => {
    const event = { target: { name, value: value } };
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <div className={classNames("datepicker relative w-full", className)}>
      <RDatepicker
        selected={value}
        onChange={_onChange}
        locale="en-GB"
        startDate={new Date()}
        minDate={minDate || new Date()}
        placeholderText={placeholder}
        formatWeekDay={(nameOfDay) => nameOfDay.slice(0, 3)}
        dateFormat="dd/MM/yyyy"
        name={name}
        showDisabledMonthNavigation
        {...props}
      />
    </div>
  );
};

export default Datepicker;
