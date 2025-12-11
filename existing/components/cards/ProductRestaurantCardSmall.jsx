import PropTypes from "prop-types";
import React, { useRef, useEffect } from "react";
import { ResponsiveImage, PreHeading, Link } from "components";
import Flicking, { FlickingError, ViewportSlot } from "@egjs/react-flicking";

import { Pagination } from "@egjs/flicking-plugins";
import "@egjs/flicking-plugins/dist/pagination.css";
import "@egjs/react-flicking/dist/flicking.css";
import Arrow from "assets/arrow.svg";
import classNames from "classnames";
import { useTranslation } from "next-i18next";

const ProductRestaurantCardSmall = ({ data, className, ...props }) => {
  const { t } = useTranslation("common");

  const carousel = useRef();
  useEffect(() => {
    carousel.current.on("ready", (e) => {
      e.currentTarget.addPlugins(new Pagination({ type: "fraction" }));
    });
  });

  const move = async (dir) => {
    try {
      if (dir > 0) {
        await carousel.current.next();
      } else {
        await carousel.current.prev();
      }
    } catch (err) {
      if (!(err instanceof FlickingError)) {
        throw new Error(err);
      }
    }
  };
  return (
    <div
      className={classNames(
        "restaurant-card-small flex flex-col p-4 md:p-6 font-primary",
        className,
      )}
      {...props}
    >
      <div className="img-wrapper w-full">
        <Flicking
          ref={carousel}
          align="prev"
          useResizeObserver={true}
          horizontal={true}
          circular={true}
          circularFallback="bound"
          className=""
        >
          {data.images.map((restaurantItem, restaurantIndex) => (
            <div
              className="img-items mx-auto relative w-full aspect-3/2"
              key={restaurantIndex}
            >
              <ResponsiveImage
                image={restaurantItem}
                widths={{ xs: 238, md: 402, lg: 344, xl: 344 }}
                heights={{ xs: 158, md: 268, lg: 229, xl: 229 }}
                className="h-full w-full object-cover"
                image-class="h-full w-full object-cover"
              />
            </div>
          ))}

          <ViewportSlot>
            <div className="wrapper ml-auto relative flex justify-between items-center bottom-[47px]  w-[154px] ">
              <button
                className="btn text pt-3 pl-3 pb-3 pr-[20px] hidden md:block z-10 "
                onClick={move}
              >
                <Arrow
                  role="presentation"
                  className="rotate-180 w-[24px] h-[24px]"
                />
              </button>

              <div className="flicking-pagination [&_.flicking-pagination-fraction-current]:mr-2 [&_.flicking-pagination-fraction-total]:ml-2 hidden md:flex justify-center items-center  h-[48px] -mb-[10px] absolute bg-white"></div>

              <button
                className="btn text pt-3 pl-3 pb-3 pr-[20px] hidden md:block  z-10"
                onClick={() => move(1)}
              >
                <Arrow
                  role="presentation"
                  className="w-[24px] h-[24px] mt-[4px]"
                />
              </button>
            </div>
          </ViewportSlot>
        </Flicking>
      </div>

      <div className="content-wrapper font-primary md:-mt-[35px] mt-6 flex flex-col justify-between grow">
        <div className="text-wrapper">
          {data.preHeading && (
            <PreHeading className="font-semibold text-small-paragraph text-grey3 mb-2 md:mb-4 lg:mb-6">
              {data.preHeading}
            </PreHeading>
          )}
          {data.headingTitle && (
            <p className="mb-4 lg:mb-6 font-semibold text-[22px] leading:[30px] md:text-[26px] md:leading-[40px] lg:text-[28px] lg:leading-[40px]">
              {data.headingTitle}
            </p>
          )}
          {data.description && (
            <p className="text-small-paragraph md:text-paragraph font-[400]">
              {data.description}
            </p>
          )}
        </div>
        {(data.primaryCta || data.secondaryCta) && (
          <div className="button-wrapper mt-4 md:mt-8 lg:mt-10 flex flex-col gap-3">
            <Link className="btn primary w-fit" link={data.primaryCta}>
              {t("cards.$viewRestaurant")}
            </Link>
            <Link className="btn secondary w-fit" link={data.secondaryCta} />
          </div>
        )}
      </div>
    </div>
  );
};

ProductRestaurantCardSmall.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ProductRestaurantCardSmall;
