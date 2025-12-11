import React, { useState, useRef, useEffect } from "react";
import { ModuleBase, EntityCard } from "components";
import Flicking, { FlickingError, ViewportSlot } from "@egjs/react-flicking";
import { Pagination } from "@egjs/flicking-plugins";
import tailwindConfig from "../tailwind.config.js";
import { useLayoutEffect } from "utils";
import "@egjs/flicking-plugins/dist/pagination.css";
import "@egjs/react-flicking/dist/flicking.css";
import Arrow from "assets/arrow.svg";

const CardCarouselGenericModule = ({ data }) => {
  const { cardRow } = data || {};
  const carousel = useRef();
  const [plugins, setPlugins] = useState([]);

  useEffect(() => {
    setPaginationPlugin();
  }, []);

  useLayoutEffect(() => {
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const resize = () => {
    setPlugins([]);
  };

  useEffect(() => {
    if (plugins.length === 0) {
      setPaginationPlugin();
    }
  }, [plugins]);

  const setPaginationPlugin = () => {
    const isMobile =
      window.innerWidth < parseInt(tailwindConfig.theme.screens.md, 10);

    setPlugins([
      new Pagination({
        type: isMobile ? "fraction" : "bullet",
        selector: ".main-pagination",
        renderBullet:
          !isMobile &&
          ((className) => `<span class="${className}" role="button"></span>`),
      }),
    ]);
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
      {cardRow.map((row, rIndex) => (
        <div
          key={rIndex}
          className="w-[327px] md:w-[688px] xl:w-[1224px] m-auto "
        >
          <Flicking
            ref={carousel}
            plugins={plugins}
            align="prev"
            useResizeObserver={true}
            horizontal={true}
            circular={true}
            circularFallback="bound"
            className="pb-[80px] md:pb-[104px] lg:pb-[115px]"
          >
            {row.props.cards.map((card, index) => (
              <div key={index} className="flex mx-3 bg-white">
                <EntityCard
                  data={card}
                  className="w-[327px] md:w-[332px] xl:w-[392px]"
                />
              </div>
            ))}
            <ViewportSlot>
              <div className="main-pagination text-center md:!w-fit [&_.flicking-pagination-bullet]:bg-grey4 [&_.flicking-pagination-bullet.flicking-pagination-bullet-active]:bg-grey1 pb-0 mt-10 md:mt-14"></div>
            </ViewportSlot>
          </Flicking>
          <div className="flex gap-20 md:gap-3 justify-center md:justify-end -mt-28 md:-mt-32">
            <button
              className="btn text border circle p-0 w-10 h-10 z-10"
              onClick={move}
              aria-label="Prevues"
            >
              <Arrow role="presentation" className="rotate-180" />
            </button>

            <button
              className="btn text border circle p-0 w-10 h-10 z-10"
              onClick={() => move(1)}
              aria-label="Next"
            >
              <Arrow role="presentation" />
            </button>
          </div>
        </div>
      ))}
    </ModuleBase>
  );
};
export default CardCarouselGenericModule;
