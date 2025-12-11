import React, { useState, useRef, useEffect } from "react";
import { ModuleBase, ResponsiveImage, Link } from "components";
import Flicking, { FlickingError, ViewportSlot } from "@egjs/react-flicking";
import { Pagination } from "@egjs/flicking-plugins";
import "@egjs/flicking-plugins/dist/pagination.css";
import "@egjs/react-flicking/dist/flicking.css";
import { Perspective } from "@egjs/flicking-plugins";
import ArrowForward from "assets/arrowForward.svg";
import { useLayoutEffect } from "utils";
import classnames from "classnames";
import tailwindConfig from "../tailwind.config.js";

const MediaCarouselModule = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const carousel = useRef();
  const flickingPlugins = [
    new Perspective({ rotate: 0, scale: isDesktop ? 0.15 : 0 }),
  ];

  const carouselChanged = (currentTarget) => {
    setActiveIndex(currentTarget.index);
  };

  useEffect(() => {
    carousel.current.on("ready", (e) => {
      e.currentTarget.addPlugins(
        new Pagination({
          type: "bullet",
          renderBullet: (className) =>
            `<span class="${className}" role="button"></span>`,
        }),
      );
    });
  }, []);

  useLayoutEffect(() => {
    setFlickingScale();
    window.addEventListener("resize", setFlickingScale);
    return () => window.removeEventListener("resize", setFlickingScale);
  }, []);

  const setFlickingScale = () => {
    setIsDesktop(
      window.innerWidth >= parseInt(tailwindConfig.theme.screens.lg, 10),
    );
  };

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
    <ModuleBase data={data}>
      <div className="relative">
        <Flicking
          ref={carousel}
          plugins={flickingPlugins}
          align="center"
          useResizeObserver={true}
          horizontal={true}
          circular={true}
          onChanged={carouselChanged}
        >
          {data.mediaSlides.map((slide, index) => (
            <div
              key={index}
              className="w-[85%] sm:w-[70%] lg:w-3/5 mb-24 sm:mb-10 mx-1.5 sm:mx-10 origin-bottom"
            >
              <div className="aspect-video">
                <ResponsiveImage
                  image={slide.image}
                  widths={{
                    xs: 808,
                    sm: 808,
                    md: 808,
                    lg: 808,
                    xl: 1142,
                    xxl: 1600,
                  }}
                />
              </div>
              <div
                className={classnames("transition-opacity", {
                  "opacity-0": activeIndex !== index,
                })}
              >
                <p className="font-primary font-semibold text-paragraph  mb-2 mt-8 color-from-bg  lg:text-large-paragraph">
                  {slide.headingTitle}
                </p>
                <div className="flex flex-col lg:justify-between lg:flex-row">
                  <div
                    className="font-primary font-light text-small-paragraph color-from-bg lg:text-paragraph lg:w-3/5 mr-4"
                    dangerouslySetInnerHTML={{ __html: slide.description }}
                  />
                  <div className="mt-6 pb-4 md:pt-0 flex justify-end lg:mt-0">
                    <Link
                      className="btn primary mr-4"
                      link={slide.primaryCTA}
                    />
                    <Link className="btn secondary" link={slide.secondaryCTA} />
                  </div>
                </div>
              </div>
            </div>
          ))}
          <ViewportSlot>
            <div className="flicking-pagination relative mt-16 sm:mt-6 !bottom-0 [&_.flicking-pagination-bullet]:bg-grey4 [&_.flicking-pagination-bullet.flicking-pagination-bullet-active]:bg-grey1"></div>
          </ViewportSlot>
        </Flicking>
        <div className="w-[85%] sm:w-[calc(70%+8rem)] lg:w-[calc(60%+10rem)] pb-12 sm:pb-24 absolute flex justify-between items-end sm:items-center h-full top-0 left-0 right-0 m-auto ">
          <button
            className="btn secondary circle mt-7 sm:mt-0 z-10 w-9 h-9 p-[9px] sm:w-12 sm:h-12 sm:p-[15px]"
            onClick={move}
          >
            <ArrowForward role="presentation" className="rotate-180 scale-75" />
          </button>

          <button
            className="btn secondary circle mt-7 sm:mt-0 z-10 w-9 h-9 p-[9px] sm:w-12 sm:h-12 sm:p-[15px]"
            onClick={() => move(1)}
          >
            <ArrowForward role="presentation" className="scale-75" />
          </button>
        </div>
      </div>
    </ModuleBase>
  );
};

export default MediaCarouselModule;
