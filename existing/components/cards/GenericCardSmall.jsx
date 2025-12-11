import PropTypes from "prop-types";
import { ResponsiveImage, PreHeading, Link } from "..";
import classNames from "classnames";
import { useTranslation } from "next-i18next";

const GenericCardModel = ({ data, className, ...props }) => {
  const { t } = useTranslation("common");

  return (
    <div
      className={classNames("main-wrapper bg-white flex flex-col", className)}
      {...props}
    >
      <div className="img-wrapper aspect-[3/2] w-full">
        {data.image && (
          <ResponsiveImage
            image={data.image}
            widths={{ xs: 270, md: 332, lg: 392 }}
            heights={{ xs: 180, md: 221, lg: 261 }}
            className="h-full w-full object-cover"
            image-class="h-full w-full object-cover"
          />
        )}
      </div>
      <div className="content-wrapper font-primary mx-4 mt-6 mb-4 md:my-6 lg:m-6 flex flex-col justify-between grow">
        <div className="text-wrapper">
          {data.preHeading && (
            <PreHeading className="font-semibold text-small-paragraph text-grey3 mb-2 md:mb-4">
              {data.preHeading}
            </PreHeading>
          )}
          {data.headingTitle && (
            <p className="mb-2 md:mb-4 font-semibold text-[18px] leading-[24px] md:text-[26px] md:leading-[40px] lg:text-[28px] lg:leading-[40px]">
              {data.headingTitle}
            </p>
          )}
          {data.subHeading && (
            <PreHeading className="font-semibold text-small-paragraph text-grey3 mb-2 md:mb-4">
              {data.subHeading}
            </PreHeading>
          )}
          {data.description && (
            <p className="text-small-paragraph md:text-paragraph font-[400]">
              {data.description}
            </p>
          )}
        </div>
        {(data.primaryCta || data.secondaryCta) && (
          <div className="button-wrapper inline-flex justify-between gap-4 mt-6">
            <Link className="btn primary" link={data.primaryCta}>
              {t("general.$viewMore")}
            </Link>
            <Link className="btn secondary" link={data.secondaryCta} />
          </div>
        )}
      </div>
    </div>
  );
};

GenericCardModel.propTypes = {
  data: PropTypes.object.isRequired,
};

export default GenericCardModel;
