import { Box } from "../../base/Box";
import React from "react";
import { searchDrawer } from "./SearchDrawer.styles";
import SearchInput from "./chunks/SearchInput";
import { SearchDrawerProps } from "./SearchDrawer.types";

const SearchDrawer = ({
  searchOpen,
  breakpoint,
  buttonText,
}: SearchDrawerProps) => {
  return (
    <Box {...searchDrawer(searchOpen)}>
      <SearchInput
        buttonText={breakpoint !== "sm" ? buttonText || "Enter to search" : ""}
      />
    </Box>
  );
};

export default SearchDrawer;
