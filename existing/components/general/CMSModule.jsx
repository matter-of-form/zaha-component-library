import React from "react";
import PropTypes from "prop-types";
import Modules from "modules";

const CMSModule = ({ module, ...props }) =>
  module?.moduleName && typeof Modules[module.moduleName] !== "undefined" ? (
    React.createElement(Modules[module.moduleName], {
      data: {
        moduleName: module.moduleName,
        moduleId: module.moduleId,
        ...module.props,
      },
      ...props,
    })
  ) : (
    <div {...props} className={`bg-white text-black ${props.className}`}>
      The Module <b>{module?.moduleName}</b> has not been created yet.
    </div>
  );

CMSModule.propTypes = {
  module: PropTypes.object.isRequired,
};

export default CMSModule;
