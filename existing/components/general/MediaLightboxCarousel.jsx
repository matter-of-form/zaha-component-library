import React, { useContext, useRef, useEffect, useState } from "react";
import { ResponsiveImage, SmootherContext } from "components";
import Flicking, { FlickingError } from "@egjs/react-flicking";
import "@egjs/flicking-plugins/dist/pagination.css";
import "@egjs/react-flicking/dist/flicking.css";
import ArrowForward from "assets/arrowForward.svg";
import Close from "assets/close.svg";
import ModalPortal from "./ModalPortal";

const MediaLightboxCarousel = ({
  isOpen,
  setIsOpen,
  closeOnBgClick = false,
  slides,
  imageWidths,
  imageHeights,
  imageContainerWidthClassName = "w-[321px] md:w-[451px] lg:w-[808px]",
  imageContainerHeightClassName = "h-[183px] md:h-[253px] lg:h-[452px]",
}) => {
  const carousel = useRef();
  const [showCarousel, setShowCarousel] = useState(false);
  const scrollSmoother = useContext(SmootherContext);

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

  useEffect(() => {
    if (isOpen !== null) {
      scrollSmoother?.paused(true);
      initAndMoveTo(isOpen);
    }
  }, [scrollSmoother, isOpen]);

  const initAndMoveTo = async (step) => {
    try {
      await carousel.current.init();
      await carousel.current.moveTo(step);
      setShowCarousel(true);
    } catch (err) {
      if (!(err instanceof FlickingError)) {
        throw new Error(err);
      }
    }
  };
  const close = () => {
    scrollSmoother?.paused(false);
    carousel.current.destroy();
    setShowCarousel(false);
    setIsOpen(null);
  };

  return (
    <ModalPortal>
      {isOpen ? (
        <div
          className={`${
            showCarousel ? "" : "hidden"
          } fixed top-0 z-50 w-screen h-screen flex justify-center items-center flex-col`}
        >
          <div
            className="absolute opacity-50 bg-black w-screen h-screen"
            onClick={() => {
              if (closeOnBgClick) close();
            }}
          ></div>
          <button
            className="absolute top-8 right-11 md:top-10 md:right-16 lg:top-12 lg:right-28 btn text invert border circle p-0 w-10 h-10 md:w-12 md:h-12 z-10"
            onClick={() => {
              close();
            }}
          >
            <Close />
          </button>

          <Flicking
            className={`m-auto ${imageContainerWidthClassName} h-full pointer-events-none`}
            ref={carousel}
            align="center"
            useResizeObserver={true}
            horizontal={true}
            circular={true}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`flex justify-center items-center flex-col w-full`}
              >
                <div className="h-full w-full flex items-end mb-4 lg:mb-6 text-white">
                  {index + 1} of {slides.length}
                </div>
                <div
                  className={`pointer-events-auto w-full ${imageContainerHeightClassName}`}
                >
                  <ResponsiveImage
                    image={slide.image ? slide.image : slide}
                    widths={imageWidths}
                    heights={imageHeights}
                  />
                </div>
                <div className="h-full w-full">
                  <p className="font-primary font-semibold text-paragraph  mb-2 mt-8 color-from-bg lg:text-large-paragraph text-white">
                    {slide.headingTitle ? slide.headingTitle : slide.title}
                  </p>
                  <div className="flex flex-col lg:justify-between lg:flex-row">
                    <div
                      className="font-primary font-light text-small-paragraph color-from-bg lg:text-paragraph text-white"
                      dangerouslySetInnerHTML={{ __html: slide.description }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </Flicking>
          <div className="pointer-events-none w-[85%] md:w-[calc(70%+9rem)] lg:w-[calc(75%+9rem)] xxl:w-[calc(80%+6rem)] absolute flex justify-between items-end pb-[53px] md:pb-0 md:items-center h-screen top-0 left-0 right-0 m-auto ">
            <button
              className="pointer-events-auto btn text invert border circle p-0 w-10 h-10 md:w-12 md:h-12 z-10"
              onClick={move}
            >
              <ArrowForward role="presentation" className="rotate-180" />
            </button>

            <button
              className="pointer-events-auto btn text invert border circle p-0 w-10 h-10 md:w-12 md:h-12 z-10"
              onClick={() => move(1)}
            >
              <ArrowForward role="presentation" />
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </ModalPortal>
  );
};

export default MediaLightboxCarousel;
