import React, { useEffect, useState } from "react";
import { PopoverMenu } from "components";
import classNames from "classnames";

const Dropdown = ({
  name,
  options,
  value,
  placeholder,
  onChange,
  onBlur,
  displayEmpty,
  className,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState();

  const _onChange = (option) => {
    const event = { target: { name, value: option.value } };
    if (onChange) {
      onChange(event);
    }
    setOpen(false);
    if (onBlur) {
      setTimeout(() => {
        onBlur(event);
      }, 0);
    }
  };

  useEffect(() => {
    if (value && options) {
      const option = options.find((option) => option.value === value);
      setTitle(option?.label);
    }
  }, [value, options]);

  return (
    <PopoverMenu
      open={open}
      title={title || placeholder}
      onOpen={() => setOpen(true)}
      className={classNames(title && "selected", className)}
      {...props}
    >
      <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
        {displayEmpty && (
          <li onClick={() => _onChange({})}>
            <div className="option block px-4 py-2 cursor-pointer hover:bg-grey6">
              &nbsp;
            </div>
          </li>
        )}
        {options &&
          options.map((option) => (
            <li key={option.value} onClick={() => _onChange(option)}>
              <div className="option block px-4 py-2 cursor-pointer hover:bg-grey6">
                {option.label}
              </div>
            </li>
          ))}
      </ul>
    </PopoverMenu>
  );
};

export default Dropdown;
