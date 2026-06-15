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
  hideOnDesktop?: boolean,
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
      { "hide-on-desktop": hideOnDesktop },
      [colourCode],
    ),
    ...animProps,
    // Only enable the framer-motion hover gesture when real item animations
    // exist. Without them the nav item has no `hovered` variant, so forcing it
    // to become a motion element just makes framer fight the CSS transitions
    // (transform/opacity) on the same element -> hover flicker. When animations
    // are provided they already carry their own `whileHover`.
    ...(navItemAnimations ? { whileHover: "hovered" } : {}),
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

export const searchButtonWrapper = {
  className: "search-button-wrapper",
};

export const divider = {
  className: "nav-divider",
};
