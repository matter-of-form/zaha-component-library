import React from "react";

const RadioInputGroup = ({ options, name, ...props }) => {
  const handleOptionChange = (value) => {
    if (props.onChange) {
      const event = { target: { name, value } };
      props.onChange(event);
    }
  };

  return (
    <>
      {options.map((option, index) => (
        <label
          key={name + "-" + index}
          className="radio-group"
          onClick={() => handleOptionChange(option.value.toLowerCase())}
        >
          <input
            type="radio"
            className="input"
            id={option.value.toLowerCase()}
            name={name}
            value={option.value.toLowerCase()}
            defaultChecked={
              props.value.toLowerCase() === option.value.toLowerCase()
            }
          />
          {option.label}
        </label>
      ))}
    </>
  );
};

export default RadioInputGroup;
