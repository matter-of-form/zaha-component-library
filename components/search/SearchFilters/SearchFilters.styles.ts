import classNames from "classnames";

export const filterWrapper = (compact?: boolean, open?: boolean) => ({
  className: classNames("filter-wrapper", { compact, open }),
});

export const compactFilters = (open?: boolean) => ({
  className: "compact-filters",
  variants: {
    closed: {
      height: 0,
      overflow: "hidden",
    },
    open: {
      height: "auto",
      transitionEnd: {
        overflow: "visible",
      },
    },
  },
  transition: {
    type: "spring",
    damping: 30,
    stiffness: 150,
  },
  initial: "closed",
  animate: open ? "open" : "closed",
});

export const dropdownWrapper = (filters = []) => {
  const isDirty = filters.filter((val: any) => val.isSelected).length > 0;
  return {
    className: classNames("filter-wrapper", { dirty: isDirty }),
  };
};
