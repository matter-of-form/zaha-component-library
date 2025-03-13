import classNames from "classnames";

export const filterWrapper = (compact?: boolean) => ({
  className: classNames("filter-wrapper", { compact, open }),
});

export const compactFilters = (open?: boolean) => ({
  className: "compact-filters",
  variants: {
    closed: {
      height: 0,
    },
    open: {
      height: "auto",
    },
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
