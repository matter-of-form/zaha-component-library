import { Box } from "../../base/Box";
import React from "react";
import { searchDrawer } from "./SearchDrawer.styles";
import SearchInput from "./chunks/SearchInput";
import { SearchDrawerProps } from "./SearchDrawer.types";

const SearchDrawer = ({
  headerAction,
  setHeaderAction,
  breakpoint,
  buttonText,
}: SearchDrawerProps) => {
  return (
    <Box {...searchDrawer(headerAction === "search")}>
      <SearchInput
        buttonText={breakpoint !== "sm" ? buttonText || "Enter to search" : ""}
        headerAction={headerAction}
        setHeaderAction={setHeaderAction}
      />
    </Box>
  );
};

export default SearchDrawer;
