import React from "react";
import { Link } from "components";
import Chevron from "assets/chevron.svg";
import { ModuleBase } from "components";

const BreadcrumbsModel = ({ data }) => {
  return (
    <ModuleBase data={data} className="my-5 font-primary text-xs">
      <div className="container flex items-center gap-3.5">
        {data.crumbs?.map((link, index) =>
          link.href ? (
            <React.Fragment key={index}>
              <Link className="border-b" link={link} />
              <span>
                <Chevron role="presentation" />
              </span>
            </React.Fragment>
          ) : (
            <span key={index} className="text-grey2 font-semibold">
              {link.text}
            </span>
          ),
        )}
      </div>
    </ModuleBase>
  );
};
export default BreadcrumbsModel;
