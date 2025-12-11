import PropTypes from "prop-types";
import React, { useRef, useEffect } from "react";
import { Link, ResponsiveImage } from "components";
import Flicking, { FlickingError, ViewportSlot } from "@egjs/react-flicking";

import { Pagination } from "@egjs/flicking-plugins";
import "@egjs/flicking-plugins/dist/pagination.css";
import "@egjs/react-flicking/dist/flicking.css";
import Arrow from "assets/arrow.svg";
import classNames from "classnames";
import { useTranslation } from "next-i18next";

const ProductRoomCardSmall = ({ data, className, ...props }) => {
  const price = "Price";
  const { t } = useTranslation("common");

  const carousel = useRef();
  useEffect(() => {
    carousel.current.on("ready", (e) => {
      e.currentTarget.addPlugins(
        new Pagination({
          type: "fraction",
        }),
      );
    });
  }, []);

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
      className={
        (classNames("product-card-small font-primary p-4 md:p-6", className),
        { ...props })
      }
    >
      <div className="img-wrapper w-full mb-6 xl:mb-0">
        <Flicking
          ref={carousel}
          hideBeforeInit={true}
          align="prev"
          useResizeObserver={true}
          horizontal={true}
          circular={true}
          circularFallback="bound"
          className=""
        >
          {data.images.map((restaurantItem, restaurantIndex) => (
            <div
              className="img-items mx-auto relative w-full  aspect-3/2"
              key={restaurantIndex}
            >
              <ResponsiveImage
                image={restaurantItem}
                widths={{ xs: 238, md: 402, lg: 760, xl: 760 }}
                heights={{ xs: 158, md: 268, lg: 507, xl: 507 }}
                className=" h-full w-full object-cover"
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

      <div className="card-data-wrapper md:-mt-[35px]">
        <div className="description-wrapper mb-4 lg:mb-6">
          <p className="text-small-paragraph text-grey3 font-semibold uppercase">
            {data.preHeading}
          </p>

          <p className="text-[22px] font-semibold leading:[30px] md:text-[26px] md:leading-[40px] lg:text-[28px] lg:leading-[40px] mt-2 mb-4 md:mt-4 lg:my-6">
            {data.headingTitle}
          </p>
          <p className="text-small-paragraph md:text-paragraph font-[400]">
            {data.description}
          </p>
        </div>

        <div className="flex flex-col justify-start gap-4 md:gap-6 md:flex-row md:flex-wrap">
          {data.keyFeatures.map((featureItem, featureIndex) => (
            <div
              className="feature-wrapper w-full md:w-[40%] flex items-center"
              key={featureIndex}
            >
              <div className="logo aspect-square w-[18px] h-[18px] mr-[15px]">
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

        <div className="button-wrapper mt-4 md:mt-8 lg:mt-10 md:flex md:gap-[72px] md:justify-between md:items-center lg:block">
          <div className="price font-[400] text-paragraph">
            <p>{price}</p>
          </div>

          <div className="buttons mt-4 md:mt-0 lg:mt-10 flex justify-between md:flex-col md:items-end lg:flex-row lg:justify-start">
            <Link
              className="btn primary self-end first:mr-4 md:mb-3 only:mr-0 first:md:mr-0 first:lg:mr-4 lg:self-start"
              link={data.primaryCta}
            >
              {t("cards.$viewRoom")}
            </Link>
            <Link
              className="btn secondary self-end lg:self-start"
              link={data.secondaryCta}
            ></Link>
          </div>
        </div>
      </div>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
};

ProductRoomCardSmall.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ProductRoomCardSmall;
