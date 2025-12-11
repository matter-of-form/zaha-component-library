import React, { useState, useRef } from "react";
import FormControl from "./FormControl";
import classnames from "classnames";
import { Formik, Field } from "formik";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { isInViewport } from "utils";

const UmbracoForm = ({ formDefinition, successClass, ...props }) => {
  const [activePageIndex, setActivePageIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const form = useRef();
  const { executeRecaptcha } = useGoogleReCaptcha();

  if (!formDefinition || !formDefinition.pages) {
    return null;
  }

  const initialValues = {};
  formDefinition?.pages.forEach((page) =>
    page.fieldsets.forEach((fieldset) =>
      fieldset.columns.forEach((column) =>
        column.fields.forEach((uField) => {
          if (uField.type.name === "Multiple choice") {
            initialValues[uField.alias] = [uField.settings.defaultValue];
          } else {
            initialValues[uField.alias] = uField.settings.defaultValue;
          }
        }),
      ),
    ),
  );

  const getActivePageFields = () => {
    const fields = [];
    if (formDefinition?.pages[activePageIndex]) {
      formDefinition?.pages[activePageIndex].fieldsets.forEach((fieldset) =>
        fieldset.columns.forEach((column) =>
          column.fields.forEach((uField) => fields.push(uField)),
        ),
      );
    }
    return fields;
  };

  const validate = (values) => {
    const errors = {};

    if (formDefinition?.pages[activePageIndex]) {
      const fields = getActivePageFields();

      fields.forEach((field) => {
        if (field.required && !values[field.alias]) {
          errors[field.alias] = field.requiredErrorMessage;
        } else if (field.pattern) {
          const re = new RegExp(field.pattern);
          if (!re.test(values[field.alias])) {
            errors[field.alias] = field.patternInvalidErrorMessage;
          }
        }
      });
    }

    setTimeout(() => {
      const element = form.current.querySelector(".input-group.error");
      if (element && !isInViewport(element)) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }
    }, 0);

    return errors;
  };

  const next = (errors, setTouched) => {
    if (Object.keys(errors).length === 0) {
      setActivePageIndex(activePageIndex + 1);
    } else {
      const fields = getActivePageFields();
      const touched = {};
      fields.forEach((field) => {
        touched[field.alias] = true;
      });
      setTouched(touched);
    }
  };

  const prev = () => {
    setActivePageIndex(activePageIndex - 1);
  };

  const submit = async (values, { setSubmitting }) => {
    setSubmitting(false);

    executeRecaptcha("enquiryFormSubmit").then(async (gReCaptchaToken) => {
      const submitRes = await fetch(
        `/api/umbraco/forms/api/v1.0/entries/${formDefinition.id}`,
        {
          method: "POST",
          body: JSON.stringify({ recaptchaToken: gReCaptchaToken, values }),
        },
      ).catch(console.error);

      if (submitRes.ok) {
        setSubmitted(true);
      } else {
        console.log(`Post Error. HTTP Response Code: ${submitRes?.status}`);
      }
    });
  };

  return (
    <div {...props}>
      {submitted ? (
        <div className={successClass}>{formDefinition.messageOnSubmit}</div>
      ) : (
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={submit}
        >
          {({ handleSubmit, isSubmitting, validateForm, setTouched }) => (
            <form ref={form} onSubmit={handleSubmit} className="form">
              <div className="flex">
                {formDefinition.pages &&
                  formDefinition.pages.map((page, pageIndex) => (
                    <div
                      key={pageIndex}
                      className={classnames(
                        "w-full",
                        activePageIndex === pageIndex ? "block" : "hidden",
                      )}
                    >
                      {page.fieldsets &&
                        page.fieldsets.map((fieldset) => (
                          <fieldset key={fieldset.id} className="fieldset">
                            {/*<legend className="px-2">{fieldset.caption}</legend>*/}
                            <div className="flex">
                              {fieldset.columns &&
                                fieldset.columns.map((column, columnIndex) => (
                                  <div
                                    key={columnIndex}
                                    className="flex flex-col w-full mx-2 first:ml-0 last:mr-0 only:mr-0"
                                  >
                                    {column.fields &&
                                      column.fields.map((uField) => {
                                        return (
                                          <Field
                                            key={uField.id}
                                            name={uField?.alias}
                                          >
                                            {({
                                              field, // { name, value, onChange, onBlur }
                                              // form: { touched, errors, dirty }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                              meta,
                                            }) => {
                                              return (
                                                <FormControl
                                                  id={uField.id}
                                                  type={uField?.type?.name}
                                                  label={uField?.caption}
                                                  error={
                                                    meta.touched && meta.error
                                                  }
                                                  maxLength={
                                                    uField?.settings
                                                      ?.maximumLength
                                                  }
                                                  placeholder={
                                                    uField?.settings
                                                      ?.placeholder
                                                  }
                                                  settings={uField?.settings}
                                                  options={uField?.preValues.map(
                                                    ({ caption, value }) => ({
                                                      label: caption,
                                                      value,
                                                    }),
                                                  )}
                                                  required={uField?.required}
                                                  disabled={isSubmitting}
                                                  selectPrompt={
                                                    uField?.settings
                                                      ?.selectPrompt
                                                  }
                                                  {...field}
                                                />
                                              );
                                            }}
                                          </Field>
                                        );
                                      })}
                                  </div>
                                ))}
                            </div>
                          </fieldset>
                        ))}
                    </div>
                  ))}
              </div>
              <div className="flex justify-end mt-4">
                {activePageIndex !== 0 && (
                  <button
                    className="btn secondary first:mr-4 only:mr-0"
                    onClick={prev}
                  >
                    {formDefinition.previousLabel}
                  </button>
                )}
                {activePageIndex === formDefinition.pages.length - 1 ? (
                  <input
                    type="submit"
                    className="btn primary"
                    value={formDefinition.submitLabel}
                  />
                ) : (
                  <div
                    type="button"
                    className="btn primary"
                    onClick={() =>
                      validateForm().then((errors) => next(errors, setTouched))
                    }
                  >
                    {formDefinition.nextLabel}
                  </div>
                )}
              </div>
            </form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default UmbracoForm;
