import { Stack } from "../../../base/Stack";
import React from "react";
import { divider, searchButtonWrapper } from "../Nav.styles";
import { Box } from "../../../base/Box";
import { Button } from "../../../base/Button";

const SearchButton = ({
  setSearchOpen,
  label = "Open search",
}: {
  setSearchOpen: (headerAction: "search" | "navigation" | null) => void;
  label?: string;
}) => {
  return (
    <Stack {...searchButtonWrapper}>
      <Box {...divider} />
      <Button
        variant="navSearch"
        aria-label={label}
        onClick={() => setSearchOpen("search")}
      />
    </Stack>
  );
};

export default SearchButton;
