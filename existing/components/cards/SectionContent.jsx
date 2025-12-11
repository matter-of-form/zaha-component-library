import React from "react";
import PropTypes from "prop-types";
import { HeadingTag, Link, PreHeading } from "components";

const SectionContent = ({ data, ...props }) => {
  const {
    headingTitle,
    description,
    preHeading,
    subHeading,
    primaryCTA,
    secondaryCTA,
  } = data || {};

  return (
    <div {...props}>
      <div
        className="title-wrapper"
        role="contentinfo"
        aria-label="contentinfo"
      >
        {preHeading && (
          <PreHeading className="pre-heading uppercase font-primary text-base font-semibold text-subheading text-black my-4">
            {preHeading}
          </PreHeading>
        )}
        {headingTitle && (
          <HeadingTag
            data={headingTitle}
            className="heading-title title font-primary mt-7 color-from-bg"
          />
        )}
        {subHeading && (
          <PreHeading className="pre-heading font-primary text-base font-semibold text-subheading text-black my-4">
            {subHeading}
          </PreHeading>
        )}
      </div>

      {(description || primaryCTA || secondaryCTA) && (
        <div className="description-wrapper mb-4 mt-5 text-paragraph color-from-bg">
          <div
            dangerouslySetInnerHTML={{ __html: description }}
            className="description"
          ></div>

          <div className="button-wrapper flex justify-start mt-15 sm:mt-16 lg:mt-20">
            <Link
              className="btn primary self-end first:mr-4 only:mr-0"
              link={primaryCTA}
            />

            <Link className="btn secondary self-end" link={secondaryCTA} />
          </div>
        </div>
      )}
    </div>
  );
};

SectionContent.propTypes = {
  data: PropTypes.any.isRequired,
};

export default SectionContent;
