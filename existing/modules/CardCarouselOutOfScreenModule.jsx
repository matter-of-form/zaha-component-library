import React, { useRef } from "react";
import { ModuleBase, EntityCard } from "components";
import Flicking, { FlickingError } from "@egjs/react-flicking";
import "@egjs/flicking-plugins/dist/pagination.css";
import "@egjs/react-flicking/dist/flicking.css";
import Arrow from "assets/arrow.svg";

const CardCarouselOutOfScreenModule = ({ data }) => {
  const { cardRow } = data || {};
  const carousel = useRef();

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
    <ModuleBase data={data} className="overflow-hidden">
      {cardRow.map((row, rIndex) => (
        <div
          key={rIndex}
          className="w-full pl-6 md:w-[790px] md:pl-10 xl:w-[1450px] xl:pl-20 md:m-auto "
        >
          <Flicking
            ref={carousel}
            align="prev"
            useResizeObserver={true}
            horizontal={true}
            circular={true}
            circularFallback="bound"
            className="pb-6 lg:pb-10"
          >
            {row.props.cards.map((card, index) => (
              <div key={index} className="flex mx-3 xl:mx-5 bg-white">
                <EntityCard
                  data={card}
                  className="w-[270px] md:w-[332px] lg:w-[392px]"
                />
              </div>
            ))}
          </Flicking>
          <div className="flex gap-3 md:justify-start">
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
export default CardCarouselOutOfScreenModule;
