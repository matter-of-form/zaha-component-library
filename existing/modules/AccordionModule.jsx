import React, { useState } from "react";
import { ModuleBase, PreHeading, HeadingTag, Link } from "components";
import ArrowForward from "assets/arrowForward.svg";
import classnames from "classnames";

const AccordionModule = ({ data }) => {
  const [activeIndexList, setActiveIndexList] = useState([]);

  const toggle = (index) => {
    let newArray = [...activeIndexList];
    if (newArray.includes(index)) {
      newArray = newArray.filter((i) => i !== index);
    } else {
      if (data.allowOpeningMultiple) {
        newArray = [index, ...newArray];
      } else {
        newArray = [index];
      }
    }
    setActiveIndexList(newArray);
  };

  return (
    <ModuleBase data={data}>
      <div className="container">
        <div className="title-wrapper">
          {data.preHeading && (
            <PreHeading className="uppercase font-primary font-semibold text-subheading lg:mt-4">
              {data.preHeading}
            </PreHeading>
          )}
          {data.headingTitle && (
            <HeadingTag
              data={data.headingTitle}
              className="font-primary mt-7 color-from-bg text-h2"
            />
          )}
        </div>

        {data.accordionElements && (
          <div className="mb-4 mt-10 text-paragraph color-from-bg">
            {data.accordionElements.map((element, index) => (
              <div
                key={index}
                className="border border-grey3 border-x-0 border-t-0"
              >
                <button
                  type="button"
                  className="flex items-center justify-between w-full pt-8 pb-2 text-h6 text-left pr-3"
                  onClick={() => toggle(index)}
                >
                  <span>{element.title}</span>
                  <div>
                    <ArrowForward
                      role="presentation"
                      className={classnames(
                        "stroke-black scale-50 transition-transform duration-200",
                        activeIndexList.includes(index)
                          ? "-rotate-90"
                          : " rotate-90",
                      )}
                    />
                  </div>
                </button>

                <div
                  className={classnames(
                    "transition-all duration-500 overflow-hidden",
                    activeIndexList.includes(index)
                      ? "max-h-screen py-4"
                      : "max-h-0 overflow-hidden",
                  )}
                >
                  {element.text && (
                    <div
                      dangerouslySetInnerHTML={{ __html: element.text }}
                      className="richtext-content"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end mt-10">
          <Link
            className="btn primary first:mr-4 only:mr-0"
            link={data.primaryCTA}
          />
          <Link className="btn secondary " link={data.secondaryCTA} />
        </div>
      </div>
    </ModuleBase>
  );
};

export default AccordionModule;
