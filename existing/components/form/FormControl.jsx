import React from "react";
import classnames from "classnames";
import Dropdown from "./Dropdown";
import Datepicker from "./Datepicker";
import NumberInput from "./NumberInput";
import RadioGroupInput from "./RadioGroupInput";
import MultiCheckbox from "./MultiCheckbox";
import FormTitleAndDescription from "./FormTitleAndDescription";

const FormControl = ({
  id,
  type,
  label,
  name,
  error,
  options,
  selectPrompt,
  required,
  settings,
  ...props
}) => {
  let realType = null;
  if (
    ["text", "Short answer"].includes(type) &&
    settings?.fieldType === "number"
  ) {
    realType = "number";
  } else if (
    ["text", "Short answer"].includes(type) &&
    settings?.fieldType === "date"
  ) {
    realType = "date";
  } else if (["text", "Short answer"].includes(type)) {
    realType = "text";
  } else if (["checkbox", "Data Consent"].includes(type)) {
    realType = "checkbox";
  } else if (["select", "Dropdown"].includes(type)) {
    realType = "dropdown";
  } else if (["textarea", "Long answer"].includes(type)) {
    realType = "textarea";
  } else if (["datepicker"].includes(type)) {
    realType = "datepicker";
  } else if (["number"].includes(type)) {
    realType = "number";
  } else if (["Hidden"].includes(type)) {
    realType = "hidden";
  } else if (["Date"].includes(type)) {
    realType = "datepicker";
  } else if (["Single choice"].includes(type)) {
    realType = "radio";
  } else if (["Multiple choice"].includes(type)) {
    realType = "multicheckbox";
  } else if (["Title and description"].includes(type)) {
    realType = "titleAndDescription";
  } else if (["reCAPTCHA v3 with score"].includes(type)) {
    realType = "recaptcha";
  }

  let input = null;
  if (["text", "checkbox"].includes(realType)) {
    input = (
      <input id={id} type={realType} className="input" name={name} {...props} />
    );
  } else if (realType === "dropdown") {
    input = (
      <Dropdown
        id={name}
        className="input dropdown"
        name={name}
        options={options}
        displayEmpty={!required}
        required={required}
        {...props}
        placeholder={selectPrompt}
      />
    );
  } else if (realType === "textarea") {
    input = (
      <textarea
        id={name}
        type={realType}
        className="input"
        name={name}
        {...props}
      />
    );
  } else if (realType === "datepicker") {
    input = <Datepicker id={name} className="input" name={name} {...props} />;
  } else if (realType === "number") {
    input = (
      <NumberInput
        id={name}
        className="input"
        type={realType}
        name={name}
        defaultValue={
          settings?.defaultValue !== "" ? settings?.defaultValue : 0
        }
        {...props}
      />
    );
  } else if (realType === "date") {
    input = (
      <Datepicker
        id={name}
        className="input"
        name={name}
        minDate={new Date()}
        {...props}
      />
    );
  } else if (realType === "hidden") {
    input = (
      <input
        id={name}
        type={realType}
        className="input"
        name={name}
        {...props}
      />
    );
  } else if (realType === "radio") {
    input = (
      <RadioGroupInput
        options={options}
        required={required}
        settings={settings}
        name={name}
        {...props}
      />
    );
  } else if (realType === "multicheckbox") {
    input = (
      <MultiCheckbox
        options={options}
        required={required}
        settings={settings}
        name={name}
        {...props}
      />
    );
  } else if (realType === "titleAndDescription") {
    input = (
      <FormTitleAndDescription settings={settings} name={name} {...props} />
    );
  } else if (realType === "recaptcha") {
    input = (
      <div
        name={name}
        className="g-recaptcha"
        settings={settings}
        {...props}
        data-size="invisible"
      ></div>
    );
  }

  const labelElement = label && realType !== "hidden" && (
    <label htmlFor={realType === "checkbox" ? id : name} className="label">
      {label}
    </label>
  );

  let inputElement;

  if (realType) {
    if (realType === "checkbox") {
      inputElement = (
        <div className="checkbox">
          {input} {labelElement}
        </div>
      );
    } else {
      inputElement = (
        <>
          {labelElement} {input}
        </>
      );
    }
  }
  return (
    <div className={classnames("input-group", `field-${name}`, { error })}>
      {inputElement || (
        <div>
          Input type <b>{type}</b> not implemented
        </div>
      )}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default FormControl;
