import PropTypes from "prop-types";
import { ResponsiveImage, PreHeading, Link } from "..";
import classNames from "classnames";
import { useTranslation } from "next-i18next";

const GenericCardModel = ({ data, className, ...props }) => {
  const { t } = useTranslation("common");

  return (
    <div
      className={classNames(
        "main-wrapper flex flex-col gap-6 md:gap-0 md:relative bg-white md:bg-transparent",
        className,
      )}
      {...props}
    >
      <div className="img-wrapper aspect-[3/2] md:top-0 md:left-0">
        <ResponsiveImage
          image={data.image}
          widths={{ xs: 327, md: 688, lg: 936 }}
          heights={{ xs: 218, md: 439, lg: 599 }}
          className="h-full w-full object-cover"
          image-class="h-full w-full object-cover"
        />
      </div>
      <div className="content-wrapper font-primary mx-4 md:m-0 md:p-6 md:absolute md:right-0 md:bottom-0 md:bg-white">
        <div className="text-wrapper">
          {data.preHeading && (
            <PreHeading className="font-semibold text-small-paragraph mb-2 md:mb-4 text-grey3">
              {data.preHeading}
            </PreHeading>
          )}
          {data.headingTitle && (
            <p className="mb-4 font-semibold text-[22px] leading:[30px] md:text-[22px] md:leading-[32px]">
              {data.headingTitle}
            </p>
          )}
          {data.subHeading && (
            <PreHeading className="text-small-paragraph mb-4 text-grey3 font-semibold">
              {data.subHeading}
            </PreHeading>
          )}
          {data.description && (
            <p className="text-small-paragraph lg:text-paragraph">
              {data.description}
            </p>
          )}
        </div>
        {(data.primaryCta || data.secondaryCta) && (
          <div className="button-wrapper inline-flex justify-between md:justify-start gap-4 md:gap-6 mt-6">
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
