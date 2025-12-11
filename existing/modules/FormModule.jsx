import React, { useState, useEffect } from "react";
import { ModuleBase, UmbracoForm } from "components";

const FormModule = ({ data }) => {
  const [formDefinition, setFormDefinition] = useState();

  useEffect(() => {
    async function fetchData() {
      const dataRes = await fetch(
        `/api/umbraco/forms/api/v1.0/definitions/${data.formId}`,
      ).catch(console.error);
      if (dataRes && dataRes.ok) {
        const formData = await dataRes.json();
        setFormDefinition(formData);
      }
    }

    fetchData();
  }, [data.formId]);

  return (
    <ModuleBase data={data} className="text-black font-primary">
      <UmbracoForm
        className="container"
        successClass="text-center py-10 text-h3"
        formDefinition={formDefinition}
      />
    </ModuleBase>
  );
};

export default FormModule;
