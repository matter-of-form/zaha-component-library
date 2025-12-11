import PropTypes from "prop-types";
import { ResponsiveImage, Link, PreHeading } from "..";
import classNames from "classnames";
import { useTranslation } from "next-i18next";

const ProductRestaurantCardLarge = ({ data, className, ...props }) => {
  const { t } = useTranslation("common");

  return (
    <div
      className={classNames(
        "restaurant-card-large flex flex-col gap-6 lg:flex-row lg:gap-20 bg-white p-4 md:p-6 font-primary mt-10",
        className,
      )}
      {...props}
    >
      <div className="img-wrapper">
        <ResponsiveImage
          image={data.images[0]}
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
            <p className="text-small-paragraph md:text-paragraph font-[400]">
              {data.description}
            </p>
          )}
        </div>
        {(data.primaryCta || data.secondaryCta) && (
          <div className="button-wrapper mt-6">
            <Link
              className="btn primary mb-3 first:mr-4 only:mr-0"
              link={data.primaryCta}
            >
              {t("cards.$viewRestaurant")}
            </Link>
            <Link className="btn secondary" link={data.secondaryCta} />
          </div>
        )}
      </div>
    </div>
  );
};

ProductRestaurantCardLarge.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ProductRestaurantCardLarge;
