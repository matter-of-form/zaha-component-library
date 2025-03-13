import classNames from "classnames";

export const filterWrapper = (compact?: boolean) => ({
  className: classNames("filter-wrapper", { compact }),
});

export const dropdownWrapper = (filters = []) => {
  const isDirty = filters.filter((val: any) => val.isSelected).length > 0;
  return {
    className: classNames("filter-wrapper", { dirty: isDirty }),
  };
};
