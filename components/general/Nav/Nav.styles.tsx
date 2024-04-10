import { cva } from "class-variance-authority";
import classNames from "classnames";
import { camelToHyphen } from "../../../utils";

type NavVars = any;

// Nav Variant Styles
export const nav = cva("nav", {
  variants: {
    variant: {
      primary: "primary",
      secondary: "secondary",
      meganav: "meganav",
    },
    persistOn: {
      all: "",
      hover: "persist-hover",
      click: "persist-click",
    },
  },
  defaultVariants: {
    variant: "primary",
    persistOn: "all",
  },
});

// Nav Props
// @ts-ignore
export const navVars: NavVars = (variant, persistOn, isOpen, classes) => {
  const baseStyles = classNames(classes, { open: isOpen });

  return {
    className: nav({
      variant,
      persistOn,
      className: baseStyles,
    }),
  };
};

export const navPanelWrapper = (
  isActive: boolean,
  attach: any, //NavProps["attach"],
  hasImage: boolean,
  level: number,
  motion?: any,
) => {
  return {
    className: classNames(
      "nav-panel-wrapper",
      { "with-image": hasImage },
      [`level-${level}`],
      { [`attach-${attach}`]: attach != null },
      { active: isActive },
    ),
    ...motion,
  };
};

export const navPanel = (
  isActive: boolean,
  attach: any, //NavProps["attach"],
  motion?: any,
) => {
  return {
    className: classNames("nav-panel", { active: isActive }, [
      `attach-to${attach}`,
    ]),
    ...motion,
  };
};

export const navItem = (
  isActive: boolean,
  itemIcons: any,
  navStyles: string,
  index = 0,
  navItemAnimations?: any,
  hasChildren?: boolean,
  colourCode?: string,
) => {
  const animProps = navItemAnimations ? navItemAnimations(index) : {};

  return {
    className: classNames(
      "nav-item",
      [navStyles],
      { active: isActive },
      { "with-icon-pre": itemIcons?.iconPre || itemIcons?.subIconPre },
      { "with-icon-post": itemIcons?.iconPost || itemIcons?.subIconPost },
      { "has-children": hasChildren },
      [colourCode],
    ),
    ...animProps,
    whileHover: "hovered",
  };
};

export const navItemWrapper = (
  isActive: boolean,
  attach: any, //NavProps["attach"],
) => ({
  className: classNames(
    "nav-item-wrapper",
    { [`attach-${camelToHyphen(attach)}`]: attach != null },
    { active: isActive },
  ),
  initial: "inactive",
  animate: isActive ? "active" : "inactive",
});

export const colourSplash = (backgroundColor: string) => ({
  className: "colour-splash",
  style: {
    backgroundColor,
  } as any,
});

export const navImageWrapper = (level: number) => ({
  className: classNames("nav-image-wrapper", [`level-${level}`]),
});

export const navImage = (isActive: boolean) => ({
  className: classNames("nav-image", { active: isActive }),
});

export const navPanelWrapperRow = {
  className: "nav-panel-wrapper-row",
};

export const navPanelColumn = (
  width: number,
  attach: string,
  isScrollable: boolean,
) => {
  let panelWidth = {};
  if (attach === "slide") {
    panelWidth = { width };
  }

  return {
    className: classNames("nav-panel-column", [camelToHyphen(attach)], {
      scrollable: isScrollable,
    }),
    style: {
      ...panelWidth,
    },
  };
};

export const backButtonHeader = {
  className: "nav-panel-back",
};

export const megaNavWrapper = {
  className: "meganav-wrapper",
};

export const scrollbarsWrapper = (minHeight: number) => ({
  className: classNames("scrollbars-wrapper"),
  noScrollX: true,
  // style: {
  //   minHeight,
  // },
});
