import React from "react";
import PropTypes from "prop-types";
import { HeadingTag, Link, PreHeading } from "components";
import { stripHtml } from "utils";

const QuoteSectionContent = ({
  buttonWrapperClassName = "text-right mt-8 lg:mt-20",
  quoteWrapperClassName = "xl:flex w-full",
  authorSourceWrapperClassName = "grow self-end text-right",
  showBottomSpacing = false,
  data,
  ...props
}) => {
  const {
    quoteTitle,
    quote,
    preHeading,
    primaryCTA,
    secondaryCTA,
    author,
    source,
  } = data || {};

  return (
    <div {...props}>
      <div className="title-wrapper">
        {preHeading && (
          <PreHeading className="pre-heading uppercase font-primary font-semibold text-subheading sm:text-base text-grey3">
            {preHeading}
          </PreHeading>
        )}
        {quoteTitle.heading && (
          <HeadingTag
            data={quoteTitle}
            className="text-h2 font-primary mt-2 md:mt-4 mb-6 lg:mb-10 color-from-bg font-[300]"
          />
        )}
      </div>

      <div className={`quote-wrapper ${quoteWrapperClassName}`}>
        {quote && (
          <div
            dangerouslySetInnerHTML={{ __html: '"' + stripHtml(quote) + '"' }}
            className="font-primary xl:max-w-[912px] text-[1.375rem] leading-[1.875rem] md:text-[1.625rem] md:leading-[2.5rem] lg:text-[1.75rem] mb-6 xl:mb-0"
          ></div>
        )}
        <div
          className={`author-source-wrapper ${authorSourceWrapperClassName}`}
        >
          {author && (
            <div
              dangerouslySetInnerHTML={{ __html: author }}
              className="font-primary text-grey1 font-[600] text-base mb-2"
            ></div>
          )}
          {source && (
            <div
              dangerouslySetInnerHTML={{ __html: source }}
              className="font-primary text-grey1 text-base"
            ></div>
          )}
        </div>
      </div>
      {showBottomSpacing && <div className="mt-20"></div>}
      {(primaryCTA || secondaryCTA) && (
        <div className={`button-wrapper ${buttonWrapperClassName}`}>
          {primaryCTA && (
            <Link
              className="btn primary self-end px-2 md:px-2.5 mt-2 sm:mt-0"
              link={primaryCTA}
            />
          )}

          {secondaryCTA && (
            <Link
              className="btn secondary self-end px-2 md:px-2.5 ml-4 mt-2 sm:mt-0"
              link={secondaryCTA}
            />
          )}
        </div>
      )}
    </div>
  );
};

QuoteSectionContent.propTypes = {
  data: PropTypes.any.isRequired,
  buttonWrapperClassName: PropTypes.string,
};

export default QuoteSectionContent;
