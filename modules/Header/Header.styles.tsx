import classNames from "classnames";

export const headerWrapper = (
  props: any,
  isOpen: boolean,
  searchOpen: boolean,
) => ({
  className: classNames([props?.className], {
    open: isOpen,
    "search-open": searchOpen,
  }),
});

export const headerContent = {
  className: "header-content",
};

export const headerLogo = {
  className: "header-logo",
};

export const navToggleButtons = (isNavOpen: boolean, motion: any) => ({
  className: classNames("nav-toggle-wrapper", { open: isNavOpen }),
  initial: "closed",
  animate: isNavOpen ? "open" : "closed",
  ...motion,
});

export const navOpen = (motion: any) => ({
  className: "nav-toggle-open",
  variants: {
    closed: {
      opacity: 1,
    },
    open: {
      opacity: 0,
    },
  },

  ...motion,
});

export const navClose = (motion: any) => ({
  className: "nav-toggle-close",
  variants: {
    closed: {
      opacity: 0,
    },
    open: {
      opacity: 1,
      transition: {
        delay: 0.2,
      },
    },
  },
  initial: "closed",
  animate: "open",
  ...motion,
});
