import React, { useRef, useEffect } from "react";
import { ModuleBase, EntityCard } from "components";
import Flicking, { FlickingError, ViewportSlot } from "@egjs/react-flicking";
import { Pagination } from "@egjs/flicking-plugins";
import tailwindConfig from "../tailwind.config.js";
import "@egjs/flicking-plugins/dist/pagination.css";
import "@egjs/react-flicking/dist/flicking.css";
import Arrow from "assets/arrow.svg";

const CardCarouselFocusModule = ({ data }) => {
  const { cardRow } = data || {};
  const carousel = useRef();
  let progressPadding = 0;

  useEffect(() => {
    carousel.current?.on("ready", (e) => {
      e.currentTarget.addPlugins(new Pagination({ type: "fraction" }));
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

  const calcStyleValue = (progressMax, progress, valueStart, valueEnd) => {
    const decreasingProgress = progressMax - progress;
    const progressTime =
      valueEnd -
      decreasingProgress -
      (valueEnd - progressMax) / (progressMax / decreasingProgress);
    const value =
      decreasingProgress * (valueStart / progressMax) + progressTime;
    return Math.max(value, valueEnd);
  };

  const flickingMove = () => {
    const panels = carousel.current.visiblePanels;
    panels.forEach((panel) => {
      const progress = Math.abs(panel.outsetProgress);
      if (progress !== 0 && progressPadding === 0) {
        const windowSize = window.innerWidth;
        if (windowSize < parseInt(tailwindConfig.theme.screens.md, 10)) {
          progressPadding = 0.85; // sm
        } else if (windowSize < parseInt(tailwindConfig.theme.screens.xl, 10)) {
          progressPadding = 0.8; // md
        } else {
          progressPadding = 0.65; // lg
        }
      }
      const target = panel.element;
      let imgOpacity;
      let scale;
      if (progress !== 0) {
        imgOpacity = calcStyleValue(progressPadding, progress, 1, 0.5);
        scale = calcStyleValue(progressPadding, progress, 1, 0.654);
      }
      target.style.opacity = imgOpacity;
      target.style.scale = scale;
    });
  };

  return (
    <ModuleBase data={data} className="min-w-fit">
      {cardRow.map((row, rIndex) => (
        <div key={rIndex} className="w-screen max-w-[1440px] m-auto relative">
          <Flicking
            ref={carousel}
            align="center"
            useResizeObserver={true}
            horizontal={true}
            circular={true}
            circularFallback="bound"
            onMove={flickingMove}
            onReady={flickingMove}
            className="pb-[80px]"
          >
            {row.props.cards.map((card, index) => (
              <div
                key={index}
                className="card flex mx-[2px] md:mx-[34px] bg-white"
              >
                <EntityCard
                  data={card}
                  className="w-[270px] md:w-[450px] xl:w-[600px]"
                />
              </div>
            ))}
            <ViewportSlot>
              <div className="flicking-pagination !left-1/2 -translate-y-1/2 -translate-x-1/2  md:!w-fit [&_.flicking-pagination-bullet]:bg-grey4 [&_.flicking-pagination-bullet.flicking-pagination-bullet-active]:bg-grey1 pb-0 mt-10"></div>
            </ViewportSlot>
          </Flicking>
          <div className="flex justify-center z-10 gap-20 md:gap-[518px] -mt-[52px] md:mt-[20px] xl:mt-[15px] xl:gap-[686px] md:absolute md:top-1/2 md:left-1/2 md:-translate-y-1/2 md:-translate-x-1/2 ">
            <button
              className="btn text border circle p-0 w-10 h-10 z-10"
              onClick={move}
              aria-label="Prevues"
            >
              <Arrow className="rotate-180" />
            </button>

            <button
              className="btn text border circle p-0 w-10 h-10 z-10"
              onClick={() => move(1)}
              aria-label="Next"
            >
              <Arrow />
            </button>
          </div>
        </div>
      ))}
    </ModuleBase>
  );
};
export default CardCarouselFocusModule;
