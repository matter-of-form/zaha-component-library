const MultiCheckbox = ({ options, name, ...props }) => {
  const handleMultiOptionChange = (value) => {
    const array = [...props.value];

    if (array.includes(value)) {
      const index = array.indexOf(value);
      array.splice(index, 1);
    } else {
      array.push(value);
    }

    if (props.onChange) {
      const event = { target: { name, value: array } };
      props.onChange(event);
    }
  };

  return (
    <>
      {options.map((option, index) => (
        <label key={name + "-" + index} className={`multi-checkbox ${name}`}>
          <input
            type="checkbox"
            className={`input ${props.value.includes(option.value) ? "checked" : ""}`}
            id={name + "-" + option.value}
            name={name}
            disabled={props.disabled}
            value={option.value}
            checked={props.value.includes(option.value)}
            onChange={() => handleMultiOptionChange(option.value)}
          />
          {option.label}
        </label>
      ))}
    </>
  );
};

export default MultiCheckbox;
