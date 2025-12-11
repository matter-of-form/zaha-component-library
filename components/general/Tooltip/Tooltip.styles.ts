import classNames from "classnames";

export const tooltipWrapper = (
  isActive: boolean,
  className?: string,
  motion?: any,
) => {
  /** If motion is enabled, set the initial and animate props */
  const motionProps = motion
    ? {
        initial: "inactive",
        animate: isActive ? "active" : "inactive",
      }
    : {};

  return {
    className: classNames("tooltip-wrapper", [className], {
      show: isActive,
    }),
    ...motionProps,
  };
};

export const tooltipBubble = (anchor: string, motion = {}) => {
  return {
    className: classNames("tooltip-bubble", [`anchor-${anchor}`]),
    ...motion,
  };
};
