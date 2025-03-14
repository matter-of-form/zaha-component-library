import { FC, useState } from "react";
import { Popover, Stack, Text } from "../../../components";
import { getOptionLabel } from "../../../utils";
import { dropdownOption } from "./DropdownFilter.styles";

const DropdownFilter: FC<any> = ({
  filter,
  value,
  selectedFilters,
  onChange,
  icons,
  textStyles,
  variant,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const singleSelect = filter?.singleSelect || false;
  const options = filter?.filters || [];
  if (options.length < 1) return null;

  const handleOnChange = (checked: boolean, selectedValue: string) => {
    let newSelected = selectedFilters ? [...selectedFilters] : [];

    if (singleSelect) {
      const optionGuids = options.map(
        ({ filterGuid }: { filterGuid: string }) => filterGuid,
      );
      const hasOneSelected = newSelected.find((item: any) =>
        optionGuids.includes(item),
      );

      if (checked) {
        if (!newSelected.includes(selectedValue)) {
          if (hasOneSelected !== undefined) {
            newSelected.splice(newSelected.indexOf(hasOneSelected), 1) &&
              newSelected.push(selectedValue);
          } else {
            newSelected.push(selectedValue);
          }
        }
      } else {
        newSelected.splice(newSelected.indexOf(selectedValue), 1);
      }

      onChange(filter?.filterValue, newSelected);
      setIsChecked(checked);
      setIsDirty(
        options.some(({ filterGuid }) => newSelected.includes(filterGuid)),
      );
    } else {
      checked
        ? !newSelected.includes(selectedValue) &&
          newSelected.push(selectedValue)
        : newSelected.splice(newSelected.indexOf(selectedValue), 1);

      onChange(filter?.filterValue, newSelected);
      setIsChecked(checked);
      setIsDirty(
        options.some(({ filterGuid }) => newSelected.includes(filterGuid)),
      );
    }
  };

  const title =
    variant === "selectedInTitle"
      ? getOptionLabel(filter.filterName, options, selectedFilters)
      : filter.filterName;

  return (
    <Popover title={title} icons={icons} isDirty={isDirty}>
      {options.map((option: any) => {
        const isChecked = selectedFilters.includes(option.filterGuid);
        return (
          <Stack
            direction="row"
            key={option.filterGuid}
            {...dropdownOption(isChecked)}
            onClick={() => handleOnChange(!isChecked, option.filterGuid)}
          >
            <Text text={option.name} {...textStyles?.option} />
            {icons?.checked}
          </Stack>
        );
      })}
    </Popover>
  );
};
export default DropdownFilter;
