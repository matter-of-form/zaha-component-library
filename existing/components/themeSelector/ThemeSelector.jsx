import React, { useContext, useEffect } from "react";
import classNames from "classnames";
import SmootherContext from "../general/SmootherContext";

import Close from "assets/close.svg";

import tailwindConfig from "../../tailwind.config.js";
import { fixColor } from "utils";

const ThemeSelector = ({ openTheme, onThemeClose }) => {
  const scrollSmoother = useContext(SmootherContext);

  const backgroundColor = fixColor(tailwindConfig.theme.colors.baseColor);

  useEffect(() => {
    if (openTheme) {
      scrollSmoother?.paused(true);
    } else {
      scrollSmoother?.paused(false);
    }
  }, [scrollSmoother, openTheme]);

  const close = () => {
    onThemeClose();
  };

  return (
    <div
      style={{ backgroundColor }}
      className={classNames(
        "fixed top-0 left-0 z-40 w-full h-screen overflow-y-hidden transition-transform duration-500 dark:bg-gray-800 overflow-x-hidden",
        { "translate-x-full": !openTheme },
      )}
    >
      <div className="absolute z-20 w-full px-2 md:px-10 pt-4 md:pt-6 flex justify-between">
        <button
          onClick={close}
          className="btn primary z-10 !py-1 md:!py-0 !px-3 md:!px-4 !border-0 !bg-white/10 hover:!bg-white/20"
          aria-label="Close"
        >
          <Close role="presentation" className="!stroke-linen" />
        </button>
      </div>

      {/* <CreateTheme /> */}
    </div>
  );
};

export default ThemeSelector;
