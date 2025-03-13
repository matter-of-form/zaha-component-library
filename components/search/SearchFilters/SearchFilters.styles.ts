import classNames from "classnames";

export const filterWrapper = (compact?: boolean, open?: boolean) => ({
  className: classNames("filter-wrapper", { compact, open }),
});

export const compactFilters = {
  className: "compact-filters",
};

export const dropdownWrapper = (filters = []) => {
  const isDirty = filters.filter((val: any) => val.isSelected).length > 0;
  return {
    className: classNames("filter-wrapper", { dirty: isDirty }),
  };
};
