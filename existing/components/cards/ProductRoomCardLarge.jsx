import PropTypes from "prop-types";
import { ResponsiveImage, Link, PreHeading } from "..";
import classNames from "classnames";
import { useTranslation } from "next-i18next";

const ProductRoomCardLarge = ({ data, className, ...props }) => {
  const { t } = useTranslation("common");

  return (
    <div
      {...props}
      className={classNames(
        "room-card-large bg-white flex flex-col lg:flex-row gap-6 lg:gap-20 font-primary p-4 md:p-6 mt-10",
        className,
      )}
    >
      <div className="img-wrapper">
        <ResponsiveImage
          image={data.images[1]}
          widths={{ xs: 295, md: 640, lg: 696, xl: 696 }}
          heights={{ xs: 196, md: 427, lg: 464, xl: 464 }}
          className="h-full w-full object-cover"
          img-class="h-full w-full object-cover"
        />
      </div>
      <div className="content-wrapper flex flex-col justify-between grow lg:w-[400px]">
        <div className="text-wrapper">
          {data.preHeading && (
            <PreHeading className="font-semibold text-grey3 text-small-paragraph mb-2 md:mb-6">
              {data.preHeading}
            </PreHeading>
          )}
          {data.headingTitle && (
            <p className="text-h5 mb-4 md:mb-6">{data.headingTitle}</p>
          )}
          {data.description && (
            <p className="text-small-paragraph md:text-paragraph font-[400] mb-4 md:mb-6">
              {data.description}
            </p>
          )}
        </div>
        <div className="flex flex-col justify-start gap-4 md:gap-6 md:flex-row md:flex-wrap">
          {data.keyFeatures.map((featureItem, featureIndex) => (
            <div
              className="feature-wrapper w-full md:w-[40%] flex items-center"
              key={featureIndex}
            >
              <div className="logo aspect-square w-[24px] h-[24px] mr-3">
                <ResponsiveImage
                  image={featureItem.logo}
                  widths={{ xs: 36 }}
                  heights={{ xs: 36 }}
                  image-class="h-full w-full object-cover "
                  className=" h-full w-full object-cover"
                />
              </div>

              <div className="text font-[400] text-small-paragraph md:text-paragraph">
                <p>{featureItem.text}</p>
              </div>
            </div>
          ))}
        </div>
        {(data.primaryCta || data.secondaryCta) && (
          <div className="button-wrapper flex flex-col items-start md:flex-row md:items-center md:justify-between lg:flex-col lg:items-start lg:justify-between lg:h-full">
            <div className="price mt-6 md:mt-10 lg:mt-6 font-[400] text-small-paragraph md:text-paragraph mb-6 md:mb-0">
              <p>Price</p>
            </div>
            <div>
              <Link
                className="btn primary mb-3 md:mb-0 mr-4 only:mr-0"
                link={data.primaryCta}
              >
                {t("cards.$viewRoom")}
              </Link>
              <Link className="btn secondary" link={data.secondaryCta} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

ProductRoomCardLarge.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ProductRoomCardLarge;
