import { FC, useState, useEffect } from "react";
import { Button, DropdownFilter, Stack } from "../../../components";
import { compactFilters, filterWrapper } from "./SearchFilters.styles";
import { useSearchParams } from "next/navigation";
import { useDimensions } from "../../../hooks";

const SearchFilters: FC<any> = ({
  dropdownVariant,
  filters,
  onChange,
  textStyles,
  compactOnMobile,
  compactFilterTitle,
  icons,
}) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const { breakpoint } = useDimensions();
  const [open, setOpen] = useState<boolean>(false);

  const isMobile = ["base", "sm"].includes(breakpoint);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const filters: string[] = params.getAll("filterid") || [];
    setSelectedFilters(filters);
  }, []);

  /* selectedFilters is an array of all available filter ids across filter dropdowns
   * handleOnChange determines which of these active IDs belong to which category and sends it back
   */

  const handleOnChange = (fieldName: string, selected: string[]) => {
    if (selected !== selectedFilters) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("filterid");
      params.delete("page");
      selected.forEach((id: string) => params.append("filterid", id));
      window.history.pushState(null, "", `?${params.toString()}`);
      setSelectedFilters(selected);
      onChange && onChange();
    }
  };

  const toggleOpen = () => {
    setOpen(prev => !prev);
  }

  if (!filters || filters.length < 1) return;
  return compactOnMobile && isMobile && (
    <Stack {...filterWrapper(compactOnMobile)}>
      <Button onClick={toggleOpen} text={compactFilterTitle} iconPost={icons?.dropdown} />
      <Stack {...compactFilters}>
        {filters.map((filter: any, index: number) => (
          <DropdownFilter
            key={`filter${index}`}
            selectedFilters={selectedFilters}
            filter={filter}
            onChange={handleOnChange}
            icons={icons}
            textStyles={textStyles}
            variant={dropdownVariant}
          />
        ))}
      </Stack>
    </Stack>
  ) : (
    <Stack {...filterWrapper()}>
      {filters.map((filter: any, index: number) => (
        <DropdownFilter
          key={`filter${index}`}
          selectedFilters={selectedFilters}
          filter={filter}
          onChange={handleOnChange}
          icons={icons}
          textStyles={textStyles}
          variant={dropdownVariant}
        />
      ))}
    </Stack>
  );
};
export default SearchFilters;
