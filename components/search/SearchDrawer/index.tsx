import { Box } from "../../base/Box";
import React from "react";
import { searchDrawer } from "./SearchDrawer.styles";
import SearchInput from "./chunks/SearchInput";
import { SearchDrawerProps } from "./SearchDrawer.types";

const SearchDrawer = ({ searchOpen }: SearchDrawerProps) => {
  return (
    <Box {...searchDrawer(searchOpen)}>
      <Box>
        <SearchInput />
      </Box>
    </Box>
  );
};

export default SearchDrawer;
